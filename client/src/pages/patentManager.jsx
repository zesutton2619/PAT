import React, {useEffect, useRef, useState} from "react";
import Init from './../components/Initialize';
import SubmitNResults from '../components/SubmitNResults';
import Display from '../components/PatentDisplay';
import {
    comparePatents,
    uploadPatent,
    retrievePatents,
    unzipFile,
    startChat,
    sendMessage,
    removeZipFile
} from "../apiFunctions";
import robotIcon from "../images/robot-solid.svg";
import Chat from './chatbot'
import NavBar from './NavBar'
import Footer from "./Footer"
import ReviewBar from "../components/submitNResultsSubComponent/review/ReviewBar";
import "../style/patentManager.css";
import {Document, Page} from "react-pdf";
import PDFViewer from "../components/PDFViewer";
import placeholderPDF from "../components/placeholder-pdf.pdf";
import PDFplaceholder from "../components/PDFplaceholder";

    const PatManager = () => {
        const [files, setFiles] = useState([]);
        const [selectedItem, setSelectedItem] = useState(null);

        const handleSelection = (item) => {
            console.log(item)
            setSelectedItem(item);
        };



        // Use useEffect to fetch the files once when the component mounts
        useEffect(() => {
            const fetchFiles = async () => {
                try {
                    const response = await fetch('http://localhost:5000/files'); // Adjust the URL as needed
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status}`);
                    }
                    const data = await response.json();
                    setFiles(data);
                } catch (error) {
                    console.error("Failed to fetch files:", error);
                }
            };

            fetchFiles();
        }, []); // Empty dependency array means this effect runs once on mount

        function toggleSelection(item) {
            // Implementation of toggleSelection
            setSelectedItem(selectedItem === item ? null : item);
            console.log("Toggling selection for:", item);
        }

        return (
            <div className="flex w-screen" style={{height: '42rem'}}>
                <div className="w-1/2 h-full">
                    <div
                        className="relative flex bg-white shadow-lg rounded-sm border border-gray-200 ml-5 mr-1 h-full pr-10 ">
                        <div
                            className="w-2/3 text-3xl font-bold text-gray-700 ml-10 mt-8 absolute top-0 left-0 text-center mb-10">Manage
                            Patents Database
                        </div>
                        <div className="w-2/3 p-4 mr-7 border border-gray-300 rounded m-20">
                            {/* Display the list of file names fetched from the backend */}
                            <div className="flex w-full"><h1 className="flex mx-auto">File Name 1</h1></div>
                            <div className="flex w-full"><h1 className="flex mx-auto">File Name 1</h1></div>
                            <div className="flex w-full"><h1 className="flex mx-auto">File Name 1</h1></div>
                        </div>
                        <div className="w-1/3 flex flex-col mt-11 p-4 mx-auto items-center ml-2">
                            <p className="text-3xl font-bold text-gray-700 mt-3 mb-4 text-center">Select Patent</p>
                            <button
                                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded text-center w-full cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                                onClick={() => document.getElementById('file-upload').click()}>
                                View Patent
                            </button>

                            <h2 className="text-3xl font-bold text-gray-700 mb-4 mx-auto mt-6 ">Upload Patent</h2>
                            <div
                                className="flex items-center justify-center bg-gray-700 border-2 border-gray-700 rounded-lg p-4 mx-auto w-full ">
                                <label htmlFor="file-upload"
                                       className="cursor-pointer text-gray-700 bg-gray-200 rounded-lg px-4 py-2 border border-gray-200 hover:bg-gray-50 transition duration-300 flex-grow-0 flex-shrink-0">
                                    Choose a file
                                    <input id="file-upload" type="file" className="sr-only text-gray-200"
                                    />
                                </label>
                                <span
                                    className="ml-3 flex-grow text-gray-200"> No file selected</span>
                            </div>

                            <label htmlFor="category-dropdown"
                                   className="text-3xl font-bold text-gray-700 mt-6 mb-4 text-center">Select
                                Category</label>
                            <select id="category-dropdown"
                                    className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded text-center w-full cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                                <option value="category1">Category 1</option>
                                <option value="category2">Category 2</option>
                                <option value="category3">Category 3</option>
                            </select>
                            <div className="border-t border-gray-800 mt-8 w-full">
                                <p className="text-3xl font-bold text-gray-700 mt-6 mb-2 text-center">Submit Patent</p>
                            </div>
                            <button
                                className="bg-gray-700 hover:bg-gray-700-700 text-white font-bold py-2 px-4 mt-1 rounded inline-block text-center w-full cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 ">
                    <div
                        className="relative mr-5 flex bg-white shadow-lg rounded-sm border border-gray-200 ml-5 h-full pr-10 ">
                        <div className="patent-card p-3 items-center"
                             style={{minWidth: '100%', maxWidth: 'calc(100% - 20px)'}}>
                            <h3 className="  border-gray-700 mb-2 text-center text-3xl font-bold text-gray-700 mt-6">Patent Selected</h3>
                            <div className="pdf-container border border-gray-300 rounded-lg p-2 overflow-hidden ">
                                <PDFplaceholder pdfUrl={placeholderPDF}/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );

    };


export default PatManager;

