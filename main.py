import os
import time
from sklearn.metrics.pairwise import cosine_similarity
from patentProcessing import PatentProcessor
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from pat import PAT
import zipfile
from bleach import clean

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
patent_processor = PatentProcessor()
pat_chat = PAT()

# Define allowed file extensions and maximum file size
ALLOWED_EXTENSIONS = {'pdf'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB


# Function to check if the file extension is allowed
def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


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


@app.route('/calculate-similarities', methods=['POST'])
def calculate_similarities():
    start_time = time.time()  # Start the timer
    direct_comparison = request.json.get('directComparison')
    preprocessed_texts = []
    print("direct_comparison", direct_comparison)
    if direct_comparison:

        patent_list = patent_processor.get_direct_comparison_filenames()
        print("patent list:", patent_list)

        if len(patent_list) != 2:
            return 'Direct comparison requires exactly two patents', 400

        # Process PDFs and collect preprocessed texts
        for filename in patent_list:
            preprocessed_text = patent_processor.process_pdf(filename)
            preprocessed_texts.append(preprocessed_text)

        # Vectorize documents
        tfidf_vectors = patent_processor.vectorize_documents(preprocessed_texts)

        # Calculate similarity between the two patents
        similarity = cosine_similarity(tfidf_vectors[0], tfidf_vectors[1])[0][0]

        pat_chat.set_patent_files(patent_list[1], patent_list[0])

        return jsonify((patent_list[1], similarity))

    else:

        patent_list = patent_processor.get_patent_list("Utility Patents")

        # Process PDFs and collect preprocessed texts
        for filename in patent_list:
            preprocessed_text = patent_processor.process_pdf(filename)
            preprocessed_texts.append(preprocessed_text)

        # Vectorize documents and set reference patent
        tfidf_vectors = patent_processor.vectorize_documents(preprocessed_texts)
        patent_processor.set_reference_patent()

        filenames = []  # List to store filenames
        similarities = []

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
    pat_chat.reset_pat_chat()
    patent_processor.reset_direct_comparison_filenames()

    files = []
    for key, file in request.files.items():
        if key.startswith('file'):
            files.append(file)

    if not files:
        print("No files received")
        return 'No files received', 400

    elif len(files) == 1:
        file = files[0]
        if file.filename == '':
            print('No selected file')
            return 'No selected file', 400

        if file and allowed_file(file.filename):
            if file.content_length > MAX_CONTENT_LENGTH:
                print('File size exceeds maximum limit')
                return 'File size exceeds maximum limit', 400

            file.save(os.path.join('uploads', file.filename))
            patent_processor.set_reference_patent_filename(file.filename)

            return 'File uploaded successfully', 200

        else:
            print('Invalid file type')
            return 'Invalid file type', 400

    else:
        for file in files:
            if file.filename == '':
                print('No selected file')
                return 'No selected file', 400

            if file and allowed_file(file.filename):
                if file.content_length > MAX_CONTENT_LENGTH:
                    print('File size exceeds maximum limit')
                    return 'File size exceeds maximum limit', 400

                file.save(os.path.join('uploads', file.filename))
                patent_processor.set_direct_comparison_filenames('uploads\\'+file.filename)
                # Optionally, you can process each file here if needed

            else:
                print('Invalid file type')
                return 'Invalid file type', 400

        return 'Files uploaded successfully', 200


@app.route('/start_chat')
def start_chat():
    try:
        print("Chat started")
        pat_chat.set_chat_id()
        pat_chat.upload_files()
        pat_chat.create_assistant()
        return "Chat started successfully"
    except Exception as e:
        return "Error", 500  # Return error message and status code 500 if an error occurs


@app.route('/send_message', methods=['POST'])
def send_message():

    message = request.json.get('message')
    percentage = request.json.get('percentage')

    # Validate and sanitize inputs
    if not message or not isinstance(message, str):
        return jsonify({'error': 'Invalid message'}), 400

    message = clean(message)  # Sanitize HTML input

    # Call generate_response to get the response and context percentage
    print("Message Received: ", message)
    print("Percentage Received", percentage)
    response, context_percentage = pat_chat.generate_response(message, percentage)

    print("Response: ", response)

    # Return both the response and context percentage
    return jsonify({'text': response, 'context_percentage': context_percentage}), 200


if __name__ == '__main__':
    app.run(debug=True)
