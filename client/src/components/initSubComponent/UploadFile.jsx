import { useState } from "react";

export const UploadComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    return (
      <div className="upload-box">
        <input type="file" onChange={handleFileChange} />
        {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      </div>
    );
  };