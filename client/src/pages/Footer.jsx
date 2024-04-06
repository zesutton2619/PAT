import React from 'react';
import Dash from "./PatDashboard";

const Footer = () => {
    const scrollToHome = () => {
        const homeElement = document.getElementById('home');
        homeElement.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollPat = () => {
        const homeElement = document.getElementById('patDis');
        homeElement.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollResults = () => {
        const homeElement = document.getElementById('results');
        homeElement.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
            <button type="button"
                    onClick={scrollToHome}
                    className="inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600">
                <svg
                    className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-500"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                        d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                </svg>
                <span
                    className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-500">Home</span>
            </button>
            <button type="button"
                    onClick={scrollPat}
                    className="inline-flex flex-col items-center justify-center px-5 border-e border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600">
                <svg
                    className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-500"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        d="M20 23H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5.59a1 1 0 0 0 .7-0.29l4.59-4.59A1 1 0 0 1 15.59 0H20a1 1 0 0 1 1 1v22a1 1 0 0 1-1 1zM7 18h10v2H7v-2zm6-5V1.41L16.59 6H13z"/>
                </svg>
                <span
                    className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-500">Patents</span>
            </button>
            <button type="button"
                    onClick={scrollResults}
                    className="border-r border-gray-600 inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <svg
                    className="w-6 h-6 mb-.5 text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-500"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                          d="M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5Zm6.61 10.936a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clip-rule="evenodd"/>
                    <path
                        d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z"/>
                </svg>
                <span
                    className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-500">Manager</span>
            </button>
        </div>
    );
};

export default Footer;

