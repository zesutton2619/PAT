from sklearn.feature_extraction.text import TfidfVectorizer
import os
import nltk
from nltk.corpus import stopwords
import PyPDF2

class PatentProcessor:
    def __init__(self):
        # Initialize TF-IDF vectorizer with consistent parameters
        self.vectorizer = TfidfVectorizer(stop_words=stopwords.words('english'))
        self.documents = None
        self.reference_vector = None

    def process_pdf(self, file_name):
        patent_text = ""
        with open(file_name, "rb") as file:
            # Create a PDF reader object
            pdf_reader = PyPDF2.PdfReader(file)

            # Extract text from all pages
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                patent_text += page.extract_text()

        # Preprocess the text (tokenization, lowercasing)
        tokenized_text = nltk.word_tokenize(patent_text.lower())
        preprocessed_text = " ".join(tokenized_text)

        return preprocessed_text

    def vectorize_documents(self, documents):
        # Fit the vectorizer on all documents to learn vocabulary
        self.documents = documents
        self.vectorizer.fit(documents)
        # Transform documents to TF-IDF vectors
        tfidf_vectors = self.vectorizer.transform(documents)
        return tfidf_vectors

    def set_reference_patent(self, filename):
        # Process the specified patent and set its TF-IDF vector as the reference
        patent_text = self.process_pdf(filename)
        self.reference_vector = self.vectorizer.transform([patent_text])

    def pdfs_in_directory(self, input_dir):
        # Get a list of all PDF files in the input directory
        pdf_files = [os.path.join(input_dir, file) for file in os.listdir(input_dir) if file.endswith('.pdf')]

        # Create a list of dictionaries containing file information
        patent_files = [{"filename": file} for file in pdf_files]

        return patent_files
