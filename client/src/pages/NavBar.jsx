import React from 'react';
import patLogo from '../images/patLogo.png'; // Import the logo file
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
            <div className="flex flex-grow justify-evenly">
                <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                    <li>
                        <Link to={'/'}
                              className="block py-2 mt-7 px-3 md:p-0 text-white bg-gray-700 rounded md:bg-transparent md:text-gray-700 md:dark:text-gray-500 dark:bg-gray-600 md:dark:bg-transparent"
                              aria-current="page">Home</Link>
                    </li>
                    <li>

                        <a href="#"
                           className="block py-2 mt-7 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 dark:text-white md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About
                            PAT</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src={require('../images/patLogo.png')}
                                 className="min-h-30 w-auto sm:h-20  filter invert" alt="Logo"/>
                            <span
                                className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PAT, the Patent AI</span>
                        </a>
                    </li>
                    <li>
                        <Link to={'/contact'}
                              className="block py-2 mt-7 px-3 md:p-0 text-white bg-gray-700 rounded md:bg-transparent md:text-gray-700 md:dark:text-gray-500 dark:bg-gray-600 md:dark:bg-transparent"
                              aria-current="page">Our Team</Link>
                    </li>
                    <li>
                        <Link to={'/eaglehacks'}
                              className="block py-2 mt-7 px-3 md:p-0 text-white bg-gray-700 rounded md:bg-transparent md:text-gray-700 md:dark:text-gray-500 dark:bg-gray-600 md:dark:bg-transparent"
                              aria-current="page">Eagle Hacks</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;