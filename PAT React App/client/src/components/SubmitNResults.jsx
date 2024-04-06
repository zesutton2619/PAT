import React, { useState } from "react";

const Init = ({ onFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        onFileSelect(file);
    };

    return (
        <div className="flex justify-center items-center mt-7">
            <div className="container flex flex-col items-stretch">
                <div className="flex items-start">
                    <div className="flex-1 bg-gray-100 flex items-center justify-center">
                        <div className="max-w-md w-full p-3 bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">Upload File</h2>
                                <div className="flex items-center justify-center bg-gray-100 border-2 border-gray-300 rounded-lg p-4">
                                    <label htmlFor="file-upload" className="cursor-pointer bg-white rounded-lg px-4 py-2 border border-gray-400 text-gray-800 hover:bg-gray-50 transition duration-300 flex-grow-0 flex-shrink-0">
                                        Choose a file
                                        <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                                    </label>
                                    <span className="ml-3 flex-grow">{selectedFile ? selectedFile.name : "No file selected"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-gray-100 flex items-center justify-center ml-4">
                        <div className="max-w-md w-full p-3 bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="p-4">
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">Select Category</h2>
                                <div className="flex items-center justify-center bg-gray-100 border-2 border-gray-300 rounded-lg p-4">
                                    <div className="relative inline-block text-left w-full">
                                        <div>
                                            <button type="button" className="w-full px-4 py-2 text-left text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue" id="options-menu" aria-haspopup="true" aria-expanded="true">
                                                {selectedOption ? selectedOption : "Select a category"}
                                                <svg className="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M7 7l3-3 3 3m-3 4l-3 3-3-3m6-3v6" clipRule="evenodd"/>
                                                </svg>
                                            </button>
                                        </div>
                                        {/* Dropdown panel, show/hide based on dropdown state */}
                                        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" aria-labelledby="options-menu">
                                            <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={() => setSelectedOption("Category 1")}>Category 1</button>
                                            <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={() => setSelectedOption("Category 2")}>Category 2</button>
                                            <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={() => setSelectedOption("Category 3")}>Category 3</button>
                                            <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={() => setSelectedOption("Category 4")}>Category 4</button>
                                            <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={() => setSelectedOption("Category 5")}>Category 5</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Init;
