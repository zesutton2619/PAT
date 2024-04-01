import { useState } from "react";

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

export const SimilarFiles = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
      setPageNumber(1); // Reset page number when a new file is selected
    };
  
    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    };
  
    const nextPage = () => {
      if (pageNumber < numPages) {
        setPageNumber(pageNumber + 1);
      }
    };
  
    const prevPage = () => {
      if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
      }
    };
  
    return (
      <div className="pdf-display">
        <div className="upload-box">
          <h2 className='text-6xl'>Upload File</h2>
          <input type="file" onChange={handleFileChange} accept="application/pdf" />
          {selectedFile && (
            <div>
              <p>Selected File: {selectedFile.name}</p>
              <Document
                file={selectedFile}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              <div>
                <p>
                  Page {pageNumber} of {numPages}
                </p>
                <button onClick={prevPage} disabled={pageNumber <= 1}>
                  Previous Page
                </button>
                <button onClick={nextPage} disabled={pageNumber >= numPages}>
                  Next Page
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="tab-buttons">
          <button onClick={() => setSelectedFile(null)}>Tab 1</button>
          <button onClick={() => setSelectedFile(null)}>Tab 2</button>
          <button onClick={() => setSelectedFile(null)}>Tab 3</button>
          <button onClick={() => setSelectedFile(null)}>Tab 4</button>
          <button onClick={() => setSelectedFile(null)}>Tab 5</button>
        </div>
      </div>
    );
  };