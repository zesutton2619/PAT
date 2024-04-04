import os
import random
import re
import sqlite3
import threading
import time

from dotenv import load_dotenv
from openai import OpenAI

from encryption import encrypt_file, decrypt_file


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
        print("Upload Files:", self.patent_file_names)
        patent_file_names = self.get_patent_file_names()
        print("Upload Patent Files:", patent_file_names)
        for patent_file_path in self.patent_file_names:
            # Check if the file is already uploaded
            existing_file = next(
                (file for file in existing_files if file.filename == os.path.basename(patent_file_path)), None)

            if existing_file:
                # If the file exists, append its ID
                self.patent_files.append(existing_file.id)
                print("File exists")
            else:
                decrypt_file(patent_file_path)
                # If the file doesn't exist, upload it
                file = self.client.files.create(
                    file=open(patent_file_path, "rb"),
                    purpose='assistants'
                )
                self.patent_files.append(file.id)

                encrypt_file(patent_file_path)

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
            instructions="You are Pat, a chat bot from Patent AI Technology (PAT). "
                         "You are an expert in patents with a specialty in orthopedic patents. "
                         "Refer to the patents provided and any information they user has provided "
                         "to answer any questions that the user has. ",
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
        thread_id = self.check_if_thread_exist(self.chat_id)

        print("Percentage: ", percentage)
        print("Patent_files: ", self.patent_files)

        if message_body == "Started Conversation from Compare with percentage" and percentage is not None:
            message_body = (f"{self.patent_files[0]} is the patent I provided and {self.patent_files[1]} "
                            f"is the patent my patent was compared to. The comparison was made using a "
                            f"TF-IDF (Term Frequency-Inverse Document Frequency) approach. Then Cosine similarity "
                            f"is calculated between the TF-IDF vectors of the two patents. The cosine similarity was "
                            f"found to be {percentage}% similar in text."
                            f"Your response should be clear, concise, and follow this format without using asterisks "
                            f"to indicate bold formatting:\n\n"
                            f"1. Pat's Thoughts on Text Similarity: Provide insights into why the patents"
                            f" exhibit a {percentage}% similarity in text. Focus on structural "
                            f"similarities, common technical terms, or linguistic patterns.\n\n"
                            f"2. Pat's Thoughts on Context Similarity: Objectively analyze the extent of similarity in "
                            f"context between the patents. The context similarity percentage reflects the degree of "
                            f"overlap in ideas, concepts, or technical approaches.\n\n"
                            f"3. Context Similarity Percentage: (Context Similarity Percentage Value goes here. "
                            f"Always include this value)"
                            f"Note: The context similarity percentage should accurately reflect the observed "
                            f"similarities in context. A percentage closer to 0% indicates minimal context "
                            f"similarities, while a higher percentage implies significant overlap. The percentage"
                            f"should not be a range only one value. You're not required to explain the percentage "
                            f"separately; it should reflect your analysis directly")

        print("Message Body: ", message_body)

        self.client.beta.threads.messages.create(
            thread_id=thread_id,
            role="user",
            content=message_body
        )
        new_message = self.run_assistant(thread_id)
        print("\nOriginal Response: ", new_message, "\n\n")
        if percentage is not None:
            message, context_percentage = self.get_context_similarity_percentage(new_message)
        else:
            message = new_message
            context_percentage = None
        print("Stripped Message: ", message)
        print("Context percentage: ", context_percentage)
        return message, context_percentage

    def run_assistant(self, thread_id):
        print(self.client.beta.assistants.list())

        run = self.client.beta.threads.runs.create(
            thread_id=thread_id,
            assistant_id=self.assistant.id,
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
        print("Patent Files set: ", self.patent_file_names)

    def get_patent_file_names(self):
        return self.patent_file_names

    def reset_pat_chat(self):
        self.chat_id = None
        self.patent_file_names = []
        self.patent_files = []

    @staticmethod
    def get_context_similarity_percentage(message):
        # Define a regular expression pattern to extract the context similarity percentage
        percentage_pattern = r'3. Context Similarity Percentage:\s*\n*([^%]+)%?'

        # Search for the percentage pattern in the message
        match = re.search(percentage_pattern, message)

        if match:
            # Extract the percentage value from the matched group
            context_similarity_percentage = int(match.group(1).strip())
            # Remove the line containing the context similarity percentage from the message
            formatted_message = re.sub(percentage_pattern, '', message)
            return formatted_message.strip(), context_similarity_percentage
        else:
            return message.strip(), None
