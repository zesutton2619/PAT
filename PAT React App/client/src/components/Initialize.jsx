import React, { useState } from "react";
import chatIcon from "../images/comment-solid.svg";
import uploadIcon from "../images/file-solid.svg"
import uploadSecIcon from "../images/file-export-solid.svg"
import catIcon from "../images/layer-group-solid.svg"

const Init = ({ onFileSelect, onDirectFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedDirectFile, setDirectFile] = useState(null);
    const [selectedOption, setSelectedOption] = useState("Select a category");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        onFileSelect(file);
    };

    const handleDirectFileChange = (event) => {
        const file = event.target.files[0];
        setDirectFile(file);
        onDirectFileSelect(file);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };


    return (
        <div className="flex justify-center items-center mt-7">
            <div className="container flex flex-col items-center">
                <div className="max-w-md w-full p-3 bg-white shadow-md border overflow-hidden border-gray-700 rounded-lg overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                    <div className="p-4">
                        <h2 className="text-3xl font-bold text-gray-700 mb-4 overflow-hidden mx-auto"><img src={uploadIcon} className="inline-block h-6 mb-2 w-6  ml-2"/> Upload
                            Patent</h2>
                        <div
                            className="flex items-center justify-center bg-gray-100 overflow-hidden border-2 border-gray-300 rounded-lg p-4">
                            <label htmlFor="file-upload"
                                   className="cursor-pointer bg-white rounded-lg overflow-hidden px-4 py-2 border border-gray-400 text-gray-800 hover:bg-gray-50 transition duration-300 flex-grow-0 flex-shrink-0">
                                Choose a file
                                <input id="file-upload" type="file" className="sr-only overflow-hidden" onChange={handleFileChange}/>
                            </label>
                            <span
                                className="ml-3 flex-grow">{selectedFile ? selectedFile.name : "No file selected"}</span>
                        </div>
                    </div>
                </div>

                <div
                    className="max-w-md w-full p-3 bg-white shadow-md border border-gray-700 rounded-lg overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 mt-5">
                    <div className="p-4">
                        <h2 className="text-3xl font-bold text-gray-700 mb-4"><img src={uploadSecIcon} className="inline-block h-6 mb-2 w-6  ml-2"/> Additional
                            Patent</h2>
                        <div
                            className="flex items-center justify-center bg-gray-100 border-2 border-gray-300 rounded-lg p-4">
                            <label htmlFor="file-upload2" className="cursor-pointer bg-white rounded-lg px-4 py-2 border border-gray-400 text-gray-800 hover:bg-gray-50 transition duration-300 flex-grow-0 flex-shrink-0">
                                Choose a file
                                <input id="file-upload2" type="file" className="sr-only" onChange={handleDirectFileChange}/>
                            </label>
                            <span className="ml-3 flex-grow">{selectedDirectFile ? selectedDirectFile.name : "No file selected"}</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-md w-full p-3 bg-white border border-gray-700 shadow-md rounded-lg overflow-hidden mb-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 mt-5">
                    <div className="p-4">
                        <h2 className="text-3xl font-bold text-gray-700 mb-4"><img src={catIcon} className="inline-block h-6 mb-2 w-6 ml-2 mr-2"/>Select
                            Category</h2>
                        <div
                            className="flex items-center justify-center bg-gray-100 border-2 border-gray-300 rounded-lg p-4">
                            <div className="flex">
                                <button
                                    onClick={() => handleOptionSelect("Utility Patents")}
                                    className={`py-2 px-4 text-sm text-gray-700 hover:bg-gray-300 transition-colors duration-300 ${selectedOption === "Utility Patents" && "bg-gray-700 text-white rounded hover:bg-gray-700"}`}
                                >
                                    Utility Patents
                                </button>
                                <button
                                    onClick={() => handleOptionSelect("Design Patents")}
                                    className={`py-2 px-4 text-sm text-gray-700 hover:bg-gray-300 transition-colors duration-300 ${selectedOption === "Design Patents" && "bg-gray-700 text-white rounded hover:bg-gray-700"}`}
                                >
                                    Design Patents
                                </button>
                                <button
                                    onClick={() => handleOptionSelect("Plant Patents")}
                                    className={`py-2 px-4 text-sm text-gray-700 hover:bg-gray-300 transition-colors duration-300 ${selectedOption === "Plant Patents" && "bg-gray-700 text-white rounded hover:bg-gray-700"}`}
                                >
                                    Plant Patents
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Init;
