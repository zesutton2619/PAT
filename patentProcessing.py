import os

import PyPDF2
import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer

from encryption import encrypt_file, decrypt_file


class PatentProcessor:
    """
        Handles processing of patent documents.

        Attributes:
        - vectorizer (TfidfVectorizer): TF-IDF vectorizer for text representation.
        - documents (list): List of processed document texts.
        - reference_vector (scipy.sparse.csr_matrix): TF-IDF vector of the reference patent.
        - reference_patent (str): File path of the reference patent.
        - direct_comparison_patents (list): List of file paths for patents used in direct comparison.
        """
    def __init__(self):
        """
        Initializes the PatentProcessor.
        """
        # Initialize TF-IDF vectorizer with consistent parameters
        self.vectorizer = TfidfVectorizer(stop_words=stopwords.words('english'))
        self.documents = None
        self.reference_vector = None
        self.reference_patent = None
        self.direct_comparison_patents = []

    def vectorize_documents(self, documents):
        """
        Vectorizes a list of documents using TF-IDF.

        Parameters:
        - documents (list): List of document texts.

        Returns:
        - scipy.sparse.csr_matrix: TF-IDF vectors of the documents.
        """
        # Fit the vectorizer on all documents to learn vocabulary
        self.documents = documents
        self.vectorizer.fit(documents)
        # Transform documents to TF-IDF vectors
        tfidf_vectors = self.vectorizer.transform(documents)
        return tfidf_vectors

    def set_reference_patent(self):
        """
        Sets the reference patent and its TF-IDF vector.
        """
        # Process the specified patent and set its TF-IDF vector as the reference
        decrypt_file(self.reference_patent)
        patent_text = self.process_pdf(self.reference_patent)
        encrypt_file(self.reference_patent)
        self.reference_vector = self.vectorizer.transform([patent_text])

    def set_reference_patent_filename(self, filename):
        """
        Sets the filename of the reference patent.

        Parameters:
        - filename (str): File path of the reference patent.
        """
        self.reference_patent = filename

    def set_direct_comparison_filenames(self, filename):
        """
        Adds a filename to the list of patents used in direct comparison.

        Parameters:
        - filename (str): File path of the patent for direct comparison.
        """
        self.direct_comparison_patents.append(filename)

    def reset_direct_comparison_filenames(self):
        """
        Resets the list of patents used in direct comparison.
        """
        self.direct_comparison_patents = []

    def get_direct_comparison_filenames(self):
        """
        Retrieves the list of patents used in direct comparison.

        Returns:
        - list: List of file paths for patents used in direct comparison.
        """
        return self.direct_comparison_patents

    @staticmethod
    def process_pdf(file_name):
        """
        Processes a PDF file and extracts text.

        Parameters:
        - file_name (str): File path of the PDF.

        Returns:
        - str: Processed text extracted from the PDF.
        """
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
        """
        Retrieves a list of patent PDF files in a directory.

        Parameters:
        - input_dir (str): Directory containing patent PDF files.

        Returns:
        - list: List of file paths for patent PDFs.
        """
        # Get a list of all PDF files in the input directory
        pdf_files = [os.path.join(input_dir, file) for file in os.listdir(input_dir) if file.endswith('.pdf')]
        return pdf_files
