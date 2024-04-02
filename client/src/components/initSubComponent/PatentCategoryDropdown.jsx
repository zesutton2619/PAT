import React, { useState } from "react";

export const PatentCategoryDropdown = () => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="relative w-full md:w-64 mt-2 ">
            <label htmlFor="category" className="block text-lg font-bold text-gray-700">Patent Category</label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <select
                    id="category"
                    name="category"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={selectedOption}
                    onChange={handleOptionChange}
                >
                    <option value="">Select Patent Category</option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                    <option value="category3">Category 3</option>
                    <option value="category4">Category 4</option>
                    <option value="category5">Category 5</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7 7l3-3 3 3m-3 4l-3 3-3-3m6-3v6" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>
    );
};
