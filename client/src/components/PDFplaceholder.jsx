import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFplaceholder = ({ pdfUrl }) => {
    const [numPages, setNumPages] = useState(null);

    // Function to load the number of pages in the PDF
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div style={{ width: '100%', maxHeight: '500px', overflow: 'auto' }}>
            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (_, index) => (
                    <Page
                        key={`page${index + 1}`}
                        pageNumber={index + 1}
                        width={800}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                    />
                ))}
            </Document>
        </div>
    );
};

export default PDFplaceholder;


