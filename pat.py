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
        openai_api_key = os.getenv('ZACH_OPENAI_API_KEY')
        self.client = OpenAI(api_key=openai_api_key)
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

        print(self.patent_files)

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

    def generate_response(self, message_body):
        # Assuming self.chat_id is set somewhere before calling generate_response
        thread_id = self.check_if_thread_exist(self.chat_id)

        self.client.beta.threads.messages.create(
            thread_id=thread_id,
            role="user",
            content=message_body,
            file_ids=self.patent_files
        )
        new_message = self.run_assistant(thread_id)
        return new_message

    def run_assistant(self, thread_id):
        assistant_id = "asst_O3cXhBI0Y1J0DGJGl1OrAWcL"
        assistant = self.client.beta.assistants.retrieve(assistant_id)

        run = self.client.beta.threads.runs.create(
            thread_id=thread_id,
            assistant_id=assistant.id,
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
