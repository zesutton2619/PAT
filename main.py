import os
import time
import json
from dotenv import load_dotenv
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from openai import OpenAI
from patentProcessing import PatentProcessor


# class Backend:
#     def __init__(self):
#         load_dotenv()
#         openai_api_key = os.getenv('ZACH_OPENAI_API_KEY')
#         self.client = OpenAI(api_key=openai_api_key)
#         self.patent_ids = {"Utility": "asst_Xqr6xGeJg7EWx9TxFklh9Dbp",
#                            "Test": "asst_Yfd4Esowv7T9nmuRaeCtVDFv"}
#
#     def upload_file(self, patent_file_path):
#         file = self.client.files.create(
#             file=open(patent_file_path, "rb"),
#             purpose='assistants'
#         )
#         return file
#
#     def generate_response(self, patent_file_path):
#         # file = self.upload_file(patent_file_path)
#         thread = self.client.beta.threads.create()
#         thread_id = thread.id
#         self.client.beta.threads.messages.create(
#             thread_id=thread_id,
#             role="user",
#             content="There are three patents in the file I gave you, What are the names of these three patents?",
#             # file_ids=[file.id]
#         )
#         new_message = self.run_assistant(thread)
#         return new_message
#
#     def run_assistant(self, thread):
#         assistant_id = self.patent_ids["Test"]
#         assistant = self.client.beta.assistants.retrieve(assistant_id)
#
#         run = self.client.beta.threads.runs.create(
#             thread_id=thread.id,
#             assistant_id=assistant.id
#         )
#
#         while run.status != "completed":
#             time.sleep(0.5)
#             run = self.client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
#
#         messages = self.client.beta.threads.messages.list(thread_id=thread.id)
#         message = messages.data[0].content[0].text.value
#
#         return message


patent_processor = PatentProcessor()
patent_files = patent_processor.pdfs_in_directory("Utility Patents")

# Process each patent and store preprocessed text
preprocessed_texts = [patent_processor.process_pdf(file_info["filename"]) for file_info in patent_files]

# Vectorize the preprocessed texts
tfidf_vectors = patent_processor.vectorize_documents(preprocessed_texts)

patent_processor.set_reference_patent("US_11942209_B2_I.pdf")

# Calculate similarities
similarities = []
for tfidf_vector in tfidf_vectors:
    similarity = cosine_similarity(patent_processor.reference_vector, tfidf_vector)[0][0]
    similarities.append(similarity)

print(similarities)


