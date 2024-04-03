import React from 'react';

const Footer = () => {
    return (
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
            <button type="button"
                    className="inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600">
                <svg
                    className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-500"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                        d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                </svg>
                <span
                    className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-500">Home</span>
            </button>
            <button type="button"
                    className="inline-flex flex-col items-center justify-center px-5 border-e border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600">
                <svg
                    className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-500"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        d="M20 23H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5.59a1 1 0 0 0 .7-0.29l4.59-4.59A1 1 0 0 1 15.59 0H20a1 1 0 0 1 1 1v22a1 1 0 0 1-1 1zM7 18h10v2H7v-2zm6-5V1.41L16.59 6H13z"/>
                </svg>
                <span
                    className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-500">Patents</span>
            </button>
            <button type="button"
                    className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <svg
                    className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-500"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"/>
                </svg>
                <span
                    className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-500">Settings</span>
            </button>
            <button type="button"
                    className="inline-flex flex-col items-center justify-center px-5 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 group border-x dark:border-gray-600">
                <svg
                    className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-500"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                        d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>
                <span
                    className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-500">Profile</span>
            </button>
        </div>
    );
};

export default Footer;
