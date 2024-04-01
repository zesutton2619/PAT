import os
import time
from sklearn.metrics.pairwise import cosine_similarity
from patentProcessing import PatentProcessor
from flask import Flask, jsonify, request
from flask_cors import CORS
from pat import PAT

app = Flask(__name__)
CORS(app)
patent_processor = PatentProcessor()
pat_chat = PAT()


@app.route('/calculate-similarities', methods=['GET'])
def calculate_similarities():
    start_time = time.time()  # Start the timer
    patent_list = patent_processor.get_patent_list("Utility Patents")
    preprocessed_texts = []

    # Process PDFs and collect preprocessed texts
    for filename in patent_list:
        preprocessed_text = patent_processor.process_pdf(filename)
        preprocessed_texts.append(preprocessed_text)

    # Vectorize documents and set reference patent
    tfidf_vectors = patent_processor.vectorize_documents(preprocessed_texts)
    patent_processor.set_reference_patent()

    similarities = []
    filenames = []  # List to store filenames

    # Calculate similarities
    for tfidf_vector, filename in zip(tfidf_vectors, patent_list):
        similarity = cosine_similarity(patent_processor.reference_vector, tfidf_vector)[0][0]
        similarities.append(similarity)
        filenames.append((filename, similarity))  # Store filename along with similarity

    # Sort based on similarity scores
    similarity_results = sorted(filenames, key=lambda x: x[1], reverse=True)

    # Extract top 5 filenames and similarity scores
    top_5_results = similarity_results[:5]

    # Print for debugging

    # Stop the timer
    end_time = time.time()
    elapsed_time = end_time - start_time  # Calculate elapsed time

    # Print elapsed time for debugging
    print("Elapsed Time:", elapsed_time)

    print(similarities)
    print(top_5_results)
    pat_chat.set_patent_files(top_5_results)

    # Return top 5 results
    return jsonify(top_5_results)


@app.route('/upload_patent', methods=['POST'])
def upload_patent():
    if 'file' not in request.files:
        return 'No file part', 400

    file = request.files['file']

    if file.filename == '':
        return 'No selected file', 400

    # Process the file here, for example, save it to a specific directory
    file.save('uploads/' + file.filename)
    patent_processor.set_reference_patent_filename('uploads/' + file.filename)

    return 'File uploaded successfully', 200


@app.route('/start_chat')
def start_chat():
    print("chat started")
    pat_chat.set_chat_id()
    pat_chat.upload_files()


@app.route('/send_message', methods=['POST'])
def send_message():
    response = ""
    if request.method == 'POST':
        message = request.json.get('message')
        print("Message received: ", message)
        response = pat_chat.generate_response(message)
    return response, 200


if __name__ == '__main__':
    app.run(debug=True)
