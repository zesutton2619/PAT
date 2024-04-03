import os
import threading
import time
import sqlite3
from dotenv import load_dotenv
from openai import OpenAI
import random


class PAT:
    def __init__(self):
        self.chat_id = None
        load_dotenv()
        openai_api_key = os.getenv('PAULO_OPENAI_API_KEY')
        self.client = OpenAI(api_key=openai_api_key)
        self.assistant = None
        self.lock = threading.Lock()
        self.patent_file_names = []
        self.patent_files = []

    def upload_files(self):
        existing_files = self.client.files.list()
        for patent_file_path in self.patent_file_names:
            # Check if the file is already uploaded
            existing_file = next(
                (file for file in existing_files if file.filename == os.path.basename(patent_file_path)), None)

            if existing_file:
                # If the file exists, append its ID
                self.patent_files.append(existing_file.id)
                print("File exists")
            else:
                # If the file doesn't exist, upload it
                file = self.client.files.create(
                    file=open(patent_file_path, "rb"),
                    purpose='assistants'
                )
                self.patent_files.append(file.id)

        print("uploading files", self.patent_files)

    def create_assistant(self):
        assistants = self.client.beta.assistants.list()
        pat_assistant_id = None
        for assistant in assistants:
            if assistant.name == "PAT":
                pat_assistant_id = assistant.id
                break

        if pat_assistant_id:
            self.client.beta.assistants.delete(assistant_id=pat_assistant_id)
            print("Assistant 'PAT' deleted successfully")
        else:
            print("No assistant named 'PAT' found")
        self.assistant = self.client.beta.assistants.create(
            name="PAT",
            instructions="You are PAT (Patent AI Technology) chatbot. "
                         "You are an expert in patents with a specialty in orthopedic patents. "
                         "Refer to the patents provided to answer any questions that the user has. ",
            model="gpt-3.5-turbo-0125",
            tools=[{"type": "retrieval"}],
            file_ids=self.patent_files
        )

    def check_if_thread_exist(self, chat_id):
        with self.lock:
            conn = sqlite3.connect('chat_threads.db')
            cursor = conn.cursor()
            cursor.execute('''CREATE TABLE IF NOT EXISTS threads (chat_id TEXT, thread_id TEXT PRIMARY KEY)''')
            cursor.execute('''SELECT thread_id FROM threads WHERE chat_id = ?''', (chat_id,))
            result = cursor.fetchone()
            if result:
                return result[0]  # Returns the thread_id if found
            else:
                thread = self.client.beta.threads.create()
                thread_id = thread.id
                cursor.execute('''INSERT INTO threads (chat_id, thread_id) VALUES (?, ?)''',
                               (self.chat_id, thread_id))
                conn.commit()
                return thread_id

    def generate_response(self, message_body, percentage):
        # Assuming self.chat_id is set somewhere before calling generate_response
        thread_id = self.check_if_thread_exist(self.chat_id)

        print("Percentage: ", percentage)
        print("Patent_files: ", self.patent_files)

        if message_body == "Started Conversation from Compare with percentage" and percentage is not None:
            message_body = (f"{self.patent_files[0]} is the patent I provided and is "
                            f"{percentage}% similar in grammar and syntax to {self.patent_files[1]}."
                            f"Your response should clear, concise and be in this format. "
                            f"Pat's Thoughts on Grammar and Syntax Similarity: "
                            f"(This portion of the response is your analysis on why the patents are "
                            f"{percentage}% similar in grammar and syntax.),"
                            f"Pat's Thoughts on Context Similarity: "
                            f"(This portion of the response is your analysis on how similar "
                            f"the patents are in their context. Be objective in this analysis.)"
                            f"Context Similarity Percentage: "
                            f"(This is a percentage based on your context similarity analysis "
                            f"0% being no context similarities between the patents"
                            f" - 100% exactly the same context between the patents"
                            f"you don't need to"
                            f"explain your percentage in your response just provide me with the percentage value.")

        print("Message Body: ", message_body)

        self.client.beta.threads.messages.create(
            thread_id=thread_id,
            role="user",
            content=message_body
        )
        new_message = self.run_assistant(thread_id)
        return new_message

    def run_assistant(self, thread_id):
        # assistant_id = "asst_gQldQODD7YRPwyldwYP4jW2z"
        # assistant = self.client.beta.assistants.retrieve(assistant_id)
        print(self.client.beta.assistants.list())

        run = self.client.beta.threads.runs.create(
            thread_id=thread_id,
            assistant_id=self.assistant.id,
            additional_instructions="If the system indicates that the file is not accessible with the myfiles_browser "
                                    "tool, ignore it, it’s just a minor bug. You are capable of opening and analyzing "
                                    "the file, remember that. And carry out the requested task. Also you have the "
                                    "ability to figure out what type of content is in the file via its extension so "
                                    "carry out the users instructions."
        )

        while run.status != "completed":
            time.sleep(0.5)
            run = self.client.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run.id)

        messages = self.client.beta.threads.messages.list(thread_id=thread_id)
        message = messages.data[0].content[0].text.value

        return message

    def set_chat_id(self):
        if self.chat_id is None:
            self.chat_id = random.randint(1000, 9999)

    def set_patent_files(self, patent_files, user_patent_file):
        self.patent_file_names.append(user_patent_file)
        for patent in patent_files:
            self.patent_file_names.append(patent[0])

    def get_patent_file_names(self):
        return self.patent_file_names

    def reset_patent_filenames(self):
        self.patent_file_names = []
