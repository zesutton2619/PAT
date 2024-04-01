import os
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
        self.conn = sqlite3.connect('chat_threads.db')
        self.cursor = self.conn.cursor()
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS threads (chat_id TEXT, thread_id TEXT PRIMARY KEY)''')
        self.conn.commit()
        self.patent_file_names = []
        self.patent_files = []

    def upload_files(self):
        for patent_file_path in self.patent_file_names:
            file = self.client.files.create(
                file=open(patent_file_path, "rb"),
                purpose='assistants'
            )
            self.patent_files.append(file)

    def check_if_thread_exist(self, chat_id):
        self.cursor.execute('''SELECT thread_id FROM threads WHERE chat_id = ?''', (chat_id,))
        result = self.cursor.fetchone()
        if result:
            return result[0]  # Returns the thread_id if found
        else:
            return None

    def generate_response(self, message_body):
        # Assuming self.chat_id is set somewhere before calling generate_response
        thread_id = self.check_if_thread_exist(self.chat_id)
        if thread_id is None:
            print("creating new thread")
            thread = self.client.beta.threads.create()
            thread_id = thread.id
            # Insert the new thread_id into the database
            self.cursor.execute('''INSERT INTO threads (chat_id, thread_id) VALUES (?, ?)''',
                                (self.chat_id, thread_id))
            self.conn.commit()
        else:
            print("retrieving existing thread")
            thread = self.client.beta.threads.retrieve(thread_id)

        self.client.beta.threads.messages.create(
            thread_id=thread_id,
            role="user",
            content=message_body,
            file_ids=self.patent_files
        )
        new_message = self.run_assistant(thread)
        return new_message

    def run_assistant(self, thread):
        assistant_id = "asst_O3cXhBI0Y1J0DGJGl1OrAWcL"
        assistant = self.client.beta.assistants.retrieve(assistant_id)

        run = self.client.beta.threads.runs.create(
            thread_id=thread.id,
            assistant_id=assistant.id
        )

        while run.status != "completed":
            time.sleep(0.5)
            run = self.client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)

        messages = self.client.beta.threads.messages.list(thread_id=thread.id)
        message = messages.data[0].content[0].text.value

        return message

    def set_chat_id(self):
        if self.chat_id is None:
            self.chat_id = random.randint(1000, 9999)

    def set_patent_files(self, patent_files):
        for patent in patent_files:
            self.patent_file_names.append(patent[0])
