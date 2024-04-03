import React from 'react';
import patLogo from '../images/patLogo.png'; // Import the logo file

const Navbar = () => {
    return (
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
            <div className="flex items-center flex-grow">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={patLogo} className="min-h-30 w-auto sm:h-20 filter invert" alt="Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PAT, the Patent AI</span>
                </a>
            </div>
            <div className="flex flex-grow justify-evenly">
                <a
                    href="#"
                    className="block py-2 px-3 md:p-0 text-white bg-gray-700 rounded md:bg-transparent md:text-gray-700 md:dark:text-gray-500 dark:bg-gray-600 md:dark:bg-transparent"
                    aria-current="page"
                >
                    Home
                </a>
                <a
                    href="#"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 dark:text-white md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                    About PAT
                </a>
                <a
                    href="#"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 dark:text-white md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                    Our Team
                </a>
                <a
                    href="#"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 dark:text-white md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                    Eagle Hacks
                </a>
            </div>
        </div>
    );
};

export default Navbar;
