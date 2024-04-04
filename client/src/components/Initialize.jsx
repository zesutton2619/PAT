import React, { useState } from "react";

const Init = ({ onFileSelect, onDirectFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedDirectFile, setDirectFile] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedOption2, setSelectedOption2] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        onFileSelect(file);
    };

    const handleDirectFileChange = (event) => {
        const file = event.target.files[0];
        setDirectFile(file);
        onDirectFileSelect(file);
    }

    return (

        <div className="flex justify-center items-center mt-7">
            <div className="container flex flex-col items-center">
                <div
                    className="max-w-md w-full p-3 bg-white shadow-md border border-gray-700 rounded-lg overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                    <div className="p-4">
                        <h2 className="text-3xl font-bold text-gray-700 mb-4">Upload Patent</h2>
                        <div
                            className="flex items-center justify-center bg-gray-100 border-2 border-gray-300 rounded-lg p-4">
                            <label htmlFor="file-upload"
                                   className="cursor-pointer bg-white rounded-lg px-4 py-2 border border-gray-400 text-gray-800 hover:bg-gray-50 transition duration-300 flex-grow-0 flex-shrink-0">
                                Choose a file
                                <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange}/>
                            </label>
                            <span
                                className="ml-3 flex-grow">{selectedFile ? selectedFile.name : "No file selected"}</span>
                        </div>
                    </div>
                </div>

                <div
                    className="max-w-md w-full p-3 bg-white shadow-md border border-gray-700 rounded-lg overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 mt-5">
                    <div className="p-4">
                        <h2 className="text-3xl font-bold text-gray-700 mb-4">Add patent</h2>
                        <div
                            className="flex items-center justify-center bg-gray-100 border-2 border-gray-300 rounded-lg p-4">
                            <label htmlFor="file-upload2"
                                   className="cursor-pointer bg-white rounded-lg px-4 py-2 border border-gray-400 text-gray-800 hover:bg-gray-50 transition duration-300 flex-grow-0 flex-shrink-0">
                                Choose a file
                                <input id="file-upload2" type="file" className="sr-only" onChange={handleDirectFileChange}/>
                            </label>
                            <span
                                className="ml-3 flex-grow">{selectedDirectFile ? selectedDirectFile.name : "No file selected"}</span>
                        </div>
                    </div>
                </div>

                <div
                    className="max-w-md w-full p-3 bg-white border border-gray-700 shadow-md rounded-lg overflow-hidden mb-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 mt-5">
                    <div className="p-4">
                        <h2 className="text-3xl font-bold text-gray-700 mb-4">Select Category</h2>
                        <div
                            className="flex items-center justify-center bg-gray-100 border-2 border-gray-300 rounded-lg p-4">
                            <div className="relative inline-block text-left w-full">
                                <div>
                                    <button
                                        type="button"
                                        className="w-full px-4 py-2 text-left text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue"
                                        id="options-menu"
                                        aria-haspopup="true"
                                        aria-expanded="true"
                                    >
                                        {selectedOption ? selectedOption : "Select a category"}
                                    </button>
                                </div>
                                {selectedOption && (
                                    <div
                                        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div
                                            className="py-1"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="options-menu"
                                        >
                                            <button
                                                onClick={() => setSelectedOption("Option 1")}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                role="menuitem"
                                            >
                                                Option 1
                                            </button>
                                            <button
                                                onClick={() => setSelectedOption("Option 2")}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                role="menuitem"
                                            >
                                                Option 2
                                            </button>
                                            <button
                                                onClick={() => setSelectedOption("Option 3")}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                role="menuitem"
                                            >
                                                Option 3
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Init;
