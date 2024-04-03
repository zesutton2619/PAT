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
        self.reference_patent = None
        self.direct_comparison_patents = []

    def vectorize_documents(self, documents):
        # Fit the vectorizer on all documents to learn vocabulary
        self.documents = documents
        self.vectorizer.fit(documents)
        # Transform documents to TF-IDF vectors
        tfidf_vectors = self.vectorizer.transform(documents)
        return tfidf_vectors

    def set_reference_patent(self):
        # Process the specified patent and set its TF-IDF vector as the reference
        patent_text = self.process_pdf(self.reference_patent)
        self.reference_vector = self.vectorizer.transform([patent_text])

    def set_reference_patent_filename(self, filename):
        self.reference_patent = filename

    def set_direct_comparison_filenames(self, filename):
        self.direct_comparison_patents.append(filename)

    def reset_direct_comparison_filenames(self):
        self.direct_comparison_patents = []

    def get_direct_comparison_filenames(self):
        return self.direct_comparison_patents

    @staticmethod
    def process_pdf(file_name):
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

    @staticmethod
    def get_patent_list(input_dir):
        # Get a list of all PDF files in the input directory
        pdf_files = [os.path.join(input_dir, file) for file in os.listdir(input_dir) if file.endswith('.pdf')]
        return pdf_files
