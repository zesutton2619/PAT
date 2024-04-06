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
                              className="block py-2 mt-7 px-3 md:p-0 text-gray-200 bg-gray-700 rounded md:bg-transparent"
                              aria-current="page">Home</Link>
                    </li>
                    <li>

                        <a href="https://github.com/zesutton2619/PAT"
                           target="_blank"
                           className="block py-2 mt-7 px-3 md:p-0 text-gray-200 bg-gray-700 rounded md:bg-transparent ">About
                            PAT</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src={require('../images/patLogo.png')}
                                 className=" w-auto h-20 filter invert" alt="Logo"/>

                        </a>
                    </li>
                    <li>
                        <Link to={'/contact'}
                              className="block py-2 mt-7 px-3 md:p-0 text-gray-200 bg-gray-700 rounded md:bg-transparent"
                              aria-current="page">Our Team</Link>
                    </li>
                    <li>
                        <Link to={'/eaglehacks'}
                              className="block py-2 mt-7 px-3 md:p-0 text-gray-200 bg-gray-700 rounded md:bg-transparent "
                              aria-current="page">Eagle Hacks</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;