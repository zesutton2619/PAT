import os
import time
from sklearn.metrics.pairwise import cosine_similarity
from patentProcessing import PatentProcessor
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from pat import PAT
import zipfile

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
patent_processor = PatentProcessor()
pat_chat = PAT()


@app.route('/retrieve_patents', methods=['GET'])
def retrieve_patents():
    try:
        # Get the filenames of the PDF files from pat_chat.patent_file_names
        filenames = pat_chat.get_patent_file_names()
        print(filenames)

        if not filenames:
            return "No filenames provided", 400

        # Initialize a list to store the file paths
        file_paths = []

        # Construct the full paths to the PDF files
        for filename in filenames:
            file_path = os.path.join(os.getcwd(), filename)  # Assuming filename contains the relative path
            print("file_path: ", file_path)
            if not os.path.exists(file_path):
                return f"File '{filename}' not found", 404
            file_paths.append(file_path)

        # Create a zip file containing all PDF files
        zip_filename = "patent_files.zip"
        with zipfile.ZipFile(zip_filename, 'w', compression=zipfile.ZIP_STORED) as zipf:
            for file_path in file_paths:
                zipf.write(file_path, os.path.basename(file_path))

        # Send the zip file as an attachment
        return send_file(zip_filename, as_attachment=True, mimetype='application/zip')

    except Exception as e:
        print(str(e))
        return str(e), 500


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

    # Extract top result
    top_result = similarity_results[0] if similarity_results else None

    # Print for debugging

    # Stop the timer
    end_time = time.time()
    elapsed_time = end_time - start_time  # Calculate elapsed time

    # Print elapsed time for debugging
    print("Elapsed Time:", elapsed_time)

    print(similarities)
    print(top_result)
    pat_chat.set_patent_files([top_result], patent_processor.reference_patent)

    # Return top result
    return jsonify(top_result)


@app.route('/upload_patent', methods=['POST'])
def upload_patent():
    pat_chat.reset_patent_filenames()
    if 'file' not in request.files:
        return 'No file part', 400

    file = request.files['file']

    if file.filename == '':
        return 'No selected file', 400

    # Process the file here, for example, save it to a specific directory
    file.save('uploads\\' + file.filename)
    patent_processor.set_reference_patent_filename('uploads\\' + file.filename)

    return 'File uploaded successfully', 200


@app.route('/start_chat')
def start_chat():
    try:
        print("Chat started")
        pat_chat.set_chat_id()
        pat_chat.upload_files()
        return "Chat started successfully"
    except Exception as e:
        return str(e), 500  # Return error message and status code 500 if an error occurs


@app.route('/send_message', methods=['POST'])
def send_message():
    response = ""
    if request.method == 'POST':
        message = request.json.get('message')
        percentage = request.json.get('percentage')
        print("Message received: ", message)
        response = pat_chat.generate_response(message, percentage)
        print("Response: ", response)
    return response, 200


if __name__ == '__main__':
    app.run(debug=True)
