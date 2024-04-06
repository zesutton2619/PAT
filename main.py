import os
import time
import zipfile
from bleach import clean
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from sklearn.metrics.pairwise import cosine_similarity
from pat import PAT
from patentProcessing import PatentProcessor
from encryption import encrypt_file, decrypt_file
import json
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
patent_processor = PatentProcessor()
pat_chat = PAT()

# Define allowed file extensions and maximum file size
ALLOWED_EXTENSIONS = {'pdf'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB

directory_to_watch = os.path.abspath("C:\\Users\\ph-mo\\OneDrive\\Desktop\\patBackend-2.0\\Patents\\Utility Patents")  # Change this to your directory

class DirectoryWatchHandler(FileSystemEventHandler):
    def on_any_event(self, event):
        print(f"Event triggered: {event}")  # Debugging line
        print("Updating files list...")  # Debugging line
        update_files_json()

# Function to check if the file extension is allowed
def allowed_file(filename):
    """
    Check if the file extension is allowed.

    Parameters:
    filename (str): The name of the file.

    Returns:
    bool: True if the file extension is allowed, False otherwise.
    """
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def update_files_json(directory_to_watch):
    print("Updating File list")
    try:
        print("Reading Directory")
        all_files = []
        # Use os.walk to iterate through each directory and subdirectory
        for root, dirs, files in os.walk(directory_to_watch):
            # Combine the directory path with each filename to get the full path
            #full_paths = [os.path.join(root, name) for name in files]
            all_files.extend(files)

        # Optionally, sort files alphabetically; adjust as needed
        all_files.sort()

        print("Writing Directory into file")
        with open('files.json', 'w') as f:
            json.dump(all_files, f, indent=2)
        print("Files list updated in files.json")
    except Exception as e:
        print(f"Error updating the files list: {e}")

@app.route('/retrieve_patents', methods=['GET'])
def retrieve_patents():
    """
    Retrieve patents and send them as a zip file.

    Returns:
    file: A zip file containing the patents.
    """
    try:
        # Get the filenames of the PDF files from pat_chat.patent_file_names
        filenames = pat_chat.get_patent_file_names()
        print("retrieve filenames: ", filenames)

        if not filenames:
            return "No filenames provided", 400

        # Initialize a list to store the file paths
        file_paths = []

        # Construct the full paths to the PDF files
        for filename in filenames:
            file_path = os.path.join(os.getcwd(), filename)  # Assuming filename contains the relative path
            decrypt_file(file_path)
            print("retrieve file_path: ", file_path)
            if not os.path.exists(file_path):
                return f"File '{filename}' not found", 404
            file_paths.append(file_path)

        # Create a zip file containing all PDF files
        zip_filename = "patent_files.zip"
        with zipfile.ZipFile(zip_filename, 'w', compression=zipfile.ZIP_STORED) as zipf:
            for file_path in file_paths:
                zipf.write(file_path, os.path.basename(file_path))
                encrypt_file(file_path)

        # Send the zip file as an attachment
        return send_file(zip_filename, as_attachment=True, mimetype='application/zip')

    except Exception as e:
        print(str(e))
        return str(e), 500


@app.route('/remove_zipfile', methods=['GET'])
def remove_zipfile():
    """
    Remove the generated zip file.

    Returns:
    str: Success message if the zipfile is removed, otherwise an error message.
    """
    try:
        os.remove("patent_files.zip")
        return "Successfully removed zipfile", 200
    except Exception as e:
        return str(e), 500


@app.route('/calculate-similarities', methods=['POST'])
def calculate_similarities():
    """
    Calculate similarities between patents.

    Returns:
    json: A JSON object containing the top result.
    """
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
            decrypt_file(filename)
            preprocessed_text = patent_processor.process_pdf(filename)
            preprocessed_texts.append(preprocessed_text)
            encrypt_file(filename)

        # Vectorize documents
        tfidf_vectors = patent_processor.vectorize_documents(preprocessed_texts)

        # Calculate similarity between the two patents
        similarity = cosine_similarity(tfidf_vectors[0], tfidf_vectors[1])[0][0]

        top_result = (patent_list[1], similarity)

        pat_chat.set_patent_files([top_result], patent_list[0])

        return jsonify((patent_list[1], similarity))

    else:

        patent_list = patent_processor.get_patent_list(os.path.join("Patents", "Utility Patents"))
        print("patent list:", patent_list)

        # Process PDFs and collect preprocessed texts
        for filename in patent_list:
            decrypt_file(filename)
            preprocessed_text = patent_processor.process_pdf(filename)
            preprocessed_texts.append(preprocessed_text)
            encrypt_file(filename)

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
    """
    Upload a patent file.

    Returns:
    str: Success message if the file is uploaded successfully, otherwise an error message.
    """
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
            filepath = os.path.join('uploads', file.filename)
            file.save(filepath)
            encrypt_file(filepath)
            patent_processor.set_reference_patent_filename(filepath)
            print("Reference patent path: ", patent_processor.reference_patent)

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
                filename = os.path.join('uploads', file.filename)
                file.save(filename)
                encrypt_file(filename)
                patent_processor.set_direct_comparison_filenames(filename)
                # Optionally, you can process each file here if needed

            else:
                print('Invalid file type')
                return 'Invalid file type', 400

        return 'Files uploaded successfully', 200


@app.route('/start_chat')
def start_chat():
    """
    Start a chat session.

    Returns:
    str: Success message if the chat is started successfully, otherwise an error message.
    """
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
    """
    Send a message to the chatbot.

    Returns:
    json: A JSON object containing the response and context percentage.
    """
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

@app.route('/files', methods=['GET'])
def get_files():
    print("Sending file json to list component")
    try:
        with open('files.json', 'r') as f:
            files = json.load(f)
        return jsonify(files)
    except FileNotFoundError:
        return jsonify({"error": "folders.json not found"}), 404


@app.route('/retrieve_single_PDF', methods=['POST'])
def get_pdf():
    """
        Retrieve patent and send file.

        Returns:
        file: A pdf file containing the patent.
    """
    print("sending pdf")
    try:
        # Get the filenames of the PDF files from pat_chat.patent_file_names
        filename = request.json['filename']
        print("retrieve filename: ", filename)

        if not filename:
            return "No filename provided", 400

        # Initialize a list to store the file paths

        # Construct the full paths to the PDF files
        file_path = os.path.join(os.getcwd(), 'Patents/Utility Patents', filename)  # Assuming filename contains the relative path
        decrypt_file(file_path)
        print("retrieve file_path: ", file_path)
        if not os.path.exists(file_path):
            return f"File '{filename}' not found", 404

        # Create a zip file containing PDF file
        zip_filename = "patent_file.zip"
        with zipfile.ZipFile(zip_filename, 'w', compression=zipfile.ZIP_STORED) as zipf:
            zipf.write(file_path, os.path.basename(file_path))
            encrypt_file(file_path)

        # Send the zip file as an attachment
        return send_file(zip_filename, as_attachment=True, mimetype='application/zip')

    except Exception as e:
        print(str(e))
        return str(e), 500


@app.route('/add_patent', methods=['POST'])
def add_patent():
    """
    Add a patent file.

    Returns:
    str: Success message if the file is uploaded successfully, otherwise an error message.
    """

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
            filepath = os.path.join('Patents/Utility Patents', file.filename)
            file.save(filepath)
            encrypt_file(filepath)

            return 'File uploaded successfully', 200

        else:
            print('Invalid file type')
            return 'Invalid file type', 400



if __name__ == '__main__':
    print("I am here")
    update_files_json(directory_to_watch)
    event_handler = DirectoryWatchHandler()
    observer = Observer()
    observer.schedule(event_handler, directory_to_watch, recursive=True)
    observer.start()

    try:
        app.run(debug=True, use_reloader=False)  # use_reloader=False to prevent duplicate watchers
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
