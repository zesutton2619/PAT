import React, { useState } from "react";
import { comparePatents, uploadPatent, retrievePatents, unzipFile } from "../apiFunctions";
import robotIcon from '../images/robot-solid.svg'; // Adjust the path based on your directory structure
import Display from "./PatentDisplay";



const SubmitNResults = ({ selectedFile }) => {
    const [percentage, setPercentage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [text, setText] = useState('');
    const [inputPercentage, setInputPercentage] = useState('');
    const [patents, setPatents] = useState([]);

    // const handleFileSelect = (file) => {
    //     setSelectedFile(file);
    // };

    // const handleSubmit = async () => {
    //     setIsLoading(true);
    //
    //     // Simulate a delay of 5 seconds
    //     await new Promise(resolve => setTimeout(resolve, 5000));
    //
    //     setIsLoading(false);
    // };

    const handleInputChange = event => {
        setInputPercentage(event.target.value);
    };

    const handleTextChange = event => {
        setText(event.target.value);
    };

    function handleButtonClick() {
        let percentage = comparePatents(setPercentage);
        // handleSubmit();
    }

    const handleCompare = async () => {
        if (selectedFile) {
            setIsLoading(true);
            await uploadPatent(selectedFile);
            let percentage = await comparePatents(); // Wait for comparePatents() to complete and return a value
            setPercentage(percentage);
            const response = await retrievePatents();
            if (response.ok) {
                const blob = await response.blob();
                const zipFile = new File([blob], 'patents.zip', { type: 'application/zip' });
                const patents = await unzipFile(zipFile);
                setPatents(patents); // Set the patents state with the retrieved patents
            } else {
                console.error('Failed to retrieve patents:', response.statusText);
            }
            setIsLoading(false);
            console.log('Percentage:', percentage); // Do something with the percentage value
        } else {
            console.error("No file selected");
        }
    };



    return (

        <div className="flex flex-col items-center h-screen mt-10">
            <button
                onClick={handleCompare}
                className="ml-4 bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
            >
                Compare
            </button>
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <div className="relative flex items-center">
                    <div
                        className="bg-gray-200 rounded-full h-40 w-40 flex items-center justify-center text-5xl font-bold text-gray-800 mr-8"

                    >
                        {percentage}%
                    </div>


                    <div className="flex items-start gap-2.5">
                        <img src={robotIcon} alt="Robot Icon" className="w-8 h-8 rounded-full"/>
                        <div
                            className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <span
                                    className="text-sm font-semibold text-gray-900 dark:text-white">PAT</span>
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                            </div>
                            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">The Patents are not
                                similar, they have many differences</p>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                        </div>
                        <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots"
                                data-dropdown-placement="bottom-start"
                                className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                                type="button">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                                <path
                                    d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                            </svg>
                        </button>
                        <div id="dropdownDots"
                             className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownMenuIconButton">
                                <li>
                                    <a href="#"
                                       className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                </li>
                                <li>
                                    <a href="#"
                                       className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8 flex items-center mt-5">
                <Display patents={patents} />
                <input
                    type="text"
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Talk to PAT"
                    className="border border-gray-300 rounded-lg px-4 py-2"
                />
                <button
                    onClick={handleButtonClick}
                    className="ml-4 bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default SubmitNResults;
