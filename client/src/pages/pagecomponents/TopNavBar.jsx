import React, { useState } from "react";
import { Link } from 'react-router-dom';
export const TopNav = () => {
    return (
        <nav className="flex justify-center border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <button data-collapse-toggle="navbar-solid-bg" type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-solid-bg" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            <Link to={'/'} className="block py-2 mt-7 px-3 md:p-0 text-white bg-gray-700 rounded md:bg-transparent md:text-gray-700 md:dark:text-gray-500 dark:bg-gray-600 md:dark:bg-transparent"
                                  aria-current="page">Home</Link>
                        </li>
                        <li>

                            <a href="#"
                               className="block py-2 mt-7 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 dark:text-white md:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About
                                PAT</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                                <img src={require('../../images/patLogo.png')}
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
                            <Link to={'/eaglehacks'} className="block py-2 mt-7 px-3 md:p-0 text-white bg-gray-700 rounded md:bg-transparent md:text-gray-700 md:dark:text-gray-500 dark:bg-gray-600 md:dark:bg-transparent"
                                  aria-current="page">Eagle Hacks</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};