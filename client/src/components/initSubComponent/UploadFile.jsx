// ./initSubComponent/UploadFile.jsx
import React, { useState } from "react";

export const UploadComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-5">
            <div className="p-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Upload File</h2>
                <div className="flex items-center justify-center bg-gray-100 border-2 border-gray-300 rounded-lg p-4">
                    <label htmlFor="file-upload" className="cursor-pointer bg-white rounded-lg px-4 py-2 border border-gray-300 text-gray-800 hover:bg-gray-50 transition duration-300">
                        Choose a file
                        <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                    </label>
                    <span className="ml-3">{selectedFile ? selectedFile.name : "No file selected"}</span>
                </div>
            </div>
        </div>
    );
};
