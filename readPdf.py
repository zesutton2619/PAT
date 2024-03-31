import PyPDF2


def extract_text_from_pdf(pdf_path):
    text = ""
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        num_pages = len(reader.pages)
        for page_number in range(num_pages):
            page = reader.pages[page_number]
            text += page.extract_text()
    return text


def main():
    pdf_text = extract_text_from_pdf('US20210236182A1 (low similarity).pdf')
    # Find the index of the "detailed description" substring
    start_index = pdf_text.find("0051")
    if start_index != -1:
        # Extract text from the "detailed description" to the next 7000 characters
        end_index = start_index + 7000
        extracted_text = pdf_text[start_index:end_index]
        # print(extracted_text)
    else:
        print("Detailed description not found in the PDF.")

    return extracted_text


extracted_text = main()
