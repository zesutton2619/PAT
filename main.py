from openai import OpenAI
import sqlite3
import os
import time
from dotenv import load_dotenv
from flask import Flask, request, send_file
import readPdf
import patentProcessing


class Backend:
    def __init__(self):
        self.conn = sqlite3.connect('patents_data.db')
        self.cursor = self.conn.cursor()
        openai_api_key = os.getenv('OPENAI_API_KEY')
        print("api key:", openai_api_key)
        self.client = OpenAI(api_key=openai_api_key)
        self.patent_ids = {"Utility": "asst_oXBuMXdQKmDvPSOBBnxL43GM"}

    def generate_response(self, message_body):
        thread = self.client.beta.threads.create()
        thread_id = thread.id
        self.client.beta.threads.messages.create(
            thread_id=thread_id,
            role="user",
            content=message_body,
        )
        new_message = self.run_assistant(thread)
        return new_message

    def run_assistant(self, thread):
        assistant_id = self.patent_ids["Utility"]
        assistant = self.client.beta.assistants.retrieve(f"{assistant_id}")

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


backend = Backend()
extracted_text = readPdf.extracted_text
# print("Extracted Text:", extracted_text)
response = backend.generate_response(readPdf.extracted_text)
print("Response: ", response)
