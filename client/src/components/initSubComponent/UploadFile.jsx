import React from "react";

export const UploadComponent = ({ onFileSelect, selectedFile }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        onFileSelect(file);
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full p-3 bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Upload File</h2>
                    <div className="flex items-center justify-center bg-gray-100 border-2 border-gray-300 rounded-lg p-4"
                         style={{height: "auto"}}>
                        <label htmlFor="file-upload"
                               className="cursor-pointer bg-white rounded-lg px-4 py-2 border border-gray-400 text-gray-800 hover:bg-gray-50 transition duration-300 flex-grow-0 flex-shrink-0">
                            Choose a file
                            <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange}/>
                        </label>
                        <span className="ml-3 flex-grow">{selectedFile ? selectedFile.name : "No file selected"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};