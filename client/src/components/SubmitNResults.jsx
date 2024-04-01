import { useState } from "react";

import {PATBuddy} from "./submitNResultsSubComponent/PATBuddy";
import { Results } from "./submitNResultsSubComponent/Results";
import { SubmitButton } from "./submitNResultsSubComponent/SubmitButton";
import { sendMessage, comparePatents, startChat, handleSubmit } from "../apiFunctions";

const SubmitNResults = () => {
    const [percentage, setPercentage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [text, setText] = useState('');
    const [inputPercentage, setInputPercentage] = useState('');
  
    const handleSubmit = async () => {
      setIsLoading(true);
  
      // Simulate a delay of 10 seconds
      await new Promise(resolve => setTimeout(resolve, 10000));
  
      setIsLoading(false);
      setPercentage(inputPercentage);
    };
  
    const handleInputChange = event => {
      setInputPercentage(event.target.value);
    };
  
    const handleTextChange = event => {
      setText(event.target.value);
    };

    function handleButtonClick() {
        handleSubmit();
        comparePatents();
    }
  
    return (
      <div className="flex flex-col items-center h-screen mt-10">
        {isLoading ? (
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        ) : (
          <div className="relative">
            <div className="flex items-center justify-center">
              <div
                className="bg-gray-200 rounded-full h-40 w-40 flex items-center justify-center text-5xl font-bold text-gray-800"
                style={{ transform: `rotate(${percentage * 3.6}deg)` }}
              >
                {percentage}%
              </div>
            </div>
            <div className="absolute bottom-0 right-0 mb-10 mr-40">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p>{text}</p>
              </div>
              <div className="absolute bg-white h-4 w-4 -top-1 -left-1 border-2 border-gray-200 transform rotate-45"></div>
            </div>
          </div>
        )}
  
        <div className="mt-8 flex items-center">
          <input
            type="number"
            value={inputPercentage}
            onChange={handleInputChange}
            placeholder="Enter Percentage"
            className="border border-gray-300 rounded-lg px-4 py-2 mr-4"
          />
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter Text"
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <button
            onClick={handleButtonClick}
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    );
}

export default SubmitNResults;