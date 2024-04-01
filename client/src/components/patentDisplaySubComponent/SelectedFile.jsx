import { useState } from "react";

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';


export const SelectedFile = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
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
      <div className="upload-box">
        <h2 className='text-6xl'>Upload File</h2>
        <input type="file" onChange={handleFileChange} accept="application/pdf" />
        {selectedFile && (
          <div>
            <p>Selected File: {selectedFile.name}</p>
            <Document
              file={selectedFile}
              onLoadSuccess={onDocumentLoadSuccess}>
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
    );
};
