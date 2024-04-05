// PatDashboard.jsx
import React, {useRef, useState} from "react";
import Init from './../components/Initialize';
import SubmitNResults from '../components/SubmitNResults';
import Display from '../components/PatentDisplay';
import { comparePatents, uploadPatent, retrievePatents, unzipFile, startChat, sendMessage, removeZipFile, formatPlaceholder } from "../apiFunctions";
import robotIcon from "../images/robot-solid.svg";
import Chat from './chatbot'
import NavBar from './NavBar'
import Footer from "./Footer"
import ReviewBar from "../components/submitNResultsSubComponent/review/ReviewBar";
import placeholder from "./../components/placeholder-pdf.pdf"
import { Helmet } from 'react-helmet';
import PATicon from './../images/pat_12.png';
import PatManager from "./patentManager";





const Dash = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectDirectFile, setDirectFile] = useState(null);
    const [syntaxPercentage, setSyntaxPercentage] = useState(0);
    const [contextPercentage, setContextPercentage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [text, setText] = useState('');
    const [inputPercentage, setInputPercentage] = useState('');
    const [patents, setPatents] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const initialBotMessageSent = useRef(false);
    const [foundSimilarPatent, setFoundSimilarPatent] = useState("None")



    const handleCompareAll = async () => {
        if (selectedFile) {
            console.log("TEST: ", selectedFile);
            setIsLoading(true);
            await uploadPatent([selectedFile]);
            let percentage = await comparePatents();
            setSyntaxPercentage(percentage);
            const response = await retrievePatents();
            if (response.ok) {
                const blob = await response.blob();
                const zipFile = new File([blob], 'patents.zip', { type: 'application/zip' });
                const patents = await unzipFile(zipFile);
                setPatents(patents);
                const names = patents.map(patent => patent.name);
                let name1 = names[1]
                setFoundSimilarPatent(name1)
            } else {
                console.error('Failed to retrieve patents:', response.statusText);
            }
            await removeZipFile();
            await startChat();
            const { text, contextPercentage } = await sendMessage("Started Conversation from Compare with percentage", percentage);
            console.log("Message", text);
            setContextPercentage(contextPercentage);
            setIsLoading(false);
            // compare_message(text);
            setText(text)
            let names = patents.map(patent => patent.name);

        } else {
            console.error("No file selected");
        }
    };

    const handleDirectCompare = async ()=> {
        console.log("Selected Files: ", [selectedFile, selectDirectFile])
        setIsLoading(true)
        await uploadPatent([selectedFile, selectDirectFile]);
        let percentage = await comparePatents(true);
        setSyntaxPercentage(percentage)
        const response = await retrievePatents();
        if (response.ok) {
            const blob = await response.blob();
            const zipFile = new File([blob], 'patents.zip', { type: 'application/zip' });
            const patents = await unzipFile(zipFile);
            setPatents(patents);
        } else {
            console.error('Failed to retrieve patents:', response.statusText);
        }
        await removeZipFile();
        await startChat();
        const { text, contextPercentage } = await sendMessage("Started Conversation from Compare with percentage", percentage);
        console.log("Message", text);
        setContextPercentage(contextPercentage);
        setText(text);
        setIsLoading(false);
        setFoundSimilarPatent(selectDirectFile.name);

    }

    const handleFileSelect = (file) => {
        setSelectedFile(file);
    };

    const handleFileSelect2 = (file) => {
        setDirectFile(file)
    }

    const setPlaceholder = (placeholder) => {
        let placeHolderFile = formatPlaceholder(placeholder)
        setPatents([placeHolderFile, placeHolderFile])
    }

    return (
        <div>

            <Helmet>
                <title>PAT, Your Patent AI</title>
            </Helmet>

            <div>
                <nav id={"home"} className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <NavBar/>
                </nav>


                <div className="flex">
                    <div className="flex-grow w-[50%] pl-15 justify-start mb-10">
                        <div className="flex">
                            <div className="w-1/2 ml-5">
                                <Init onFileSelect={handleFileSelect} onDirectFileSelect={handleFileSelect2}/>
                                <div className="flex justify-center items-center mt-5 mx-auto">
                                    <button
                                        onClick={handleDirectCompare}
                                        className="flex bg-gray-700 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transform hover:scale-110 transition duration-300 ease-in-out mr-4"
                                    >
                                        DIRECT COMPARE
                                    </button>
                                    <button
                                        onClick={handleCompareAll}
                                        className="flex bg-gray-700 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transform hover:scale-110 transition duration-300 ease-in-out"
                                    >
                                        GENERAL COMPARE
                                    </button>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="flex flex-col items-center mt-5 ml-10">
                                    {isLoading ? (
                                        <div className="flex items-center justify-center h-screen">
                                            <div className="absolute top-1/2">
                                                <div
                                                    className='flex space-x-2 justify-center items-center bg-white'>
                                                    <span className='sr-only'>Loading...</span>
                                                    <div
                                                        className='h-8 w-8 bg-gray-700 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                                    <div
                                                        className='h-8 w-8 bg-gray-700 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                                    <div className='h-8 w-8 bg-gray-700 rounded-full animate-bounce'></div>
                                                </div>
                                            </div>
                                        </div>

                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <div
                                                className="flex bg-white shadow-lg rounded-sm border border-gray-200 p-0 mb-2 px-8 pt-5 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                                                <div className="relative flex items-center flex-col">
                                                    <ReviewBar score={syntaxPercentage}/>
                                                    <h1 className="text-2xl font-bold text-gray-700 mb-4">Text
                                                        Similarity</h1>
                                                </div>
                                            </div>

                                            <div
                                                className="flex bg-white shadow-lg rounded-sm border border-gray-200 px-8 pt-5 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                                                <div className="relative flex items-center flex-col">
                                                    <ReviewBar score={contextPercentage}/>
                                                    <span className="text-2xl font-bold text-gray-700 mb-4">Context Similarity</span>
                                                </div>
                                            </div>


                                            <div>
                                                <div
                                                    className="flex bg-white shadow-lg rounded-sm border border-gray-200 px-8 p-5 w-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 mt-7">
                                                    <div className="flex flex-col items-center justify-center mx-auto">
                                                        <h1 className="text-lg text-gray-600 font-medium mb-2">Most Similar
                                                            Patent Found:</h1>
                                                        <p className="text-lg text-gray-700 font-bold">{foundSimilarPatent}</p>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="flex-grow w-[50%] ml-10 border-3 border-solid border-gray-400 dark:border-gray-600 pl-4 mt-8 mb-10 h-400">
                        <Chat botMessage={text}/>
                    </div>


                </div>


                <div id={"patDis"} className="flex mt-5 pt-10">
                    <Display patents={patents} onLoad={setPlaceholder}/>
                </div>



                <div className="min-h-screen">
                    <div className="flex mt-5 pt-10 h-full">
                        <PatManager />
                    </div>
                </div>


                <div
                    className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                    <Footer/>

                </div>


            </div>
        </div>


    );
};

export default Dash;
