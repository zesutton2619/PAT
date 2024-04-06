import React from "react";
import Navbar from "./NavBar";
import NavBar from "./NavBar";

const ContactPage = () => {
    return (
        <div>
            <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <NavBar/>
            </nav>
            <div className="flex justify-center mt-10  mx-20 animate-fade-in animate-fade-in transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                <div className="bg-white rounded-lg shadow-xl p-8 w-5/6">
                    <h2 className="text-5xl font-bold mb-10 flex justify-center text-gray-700 animate-bounce">Our
                        Team!</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {/* First row */}
                        <div className="flex flex-col items-center">
                            <img src={require('../images/paulopic.png')}
                                 className="rounded-lg mb-2 w-64 h-auto"
                                 alt="Logo"/>
                            <p className="text-xl  text-gray-700 font-semibold">Paulo Drefahl</p>
                            <p className="text-sm text-gray-700 font-semibold">Full Stack Developer</p>
                            <a
                                href="https://www.linkedin.com/in/paulodrefahl/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 font-bold"
                            >
                                LinkedIn
                            </a>
                            <a
                                href="https://github.com/PauloDrefahl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 font-bold underline"
                            >
                                <img src={require('../images/githublogo.png')}
                                     className="rounded-lg mb-2 w-12 h-auto"
                                     alt="Logo"/>
                            </a>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={require('../images/zachpic.png')}
                                 className="rounded-lg mb-2 w-64 h-auto"
                                 alt="Logo"/>
                            <p className="text-xl text-gray-700 font-semibold">Zach Sutton</p>
                            <p className="text-sm text-gray-700 font-semibold">Full Stack Developer</p>
                            <a
                                href="https://www.linkedin.com/in/zachary-sutton-1648b9227/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 font-bold"
                            >
                                LinkedIn
                            </a>
                            <a
                                href="https://github.com/zesutton2619"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 font-bold underline"
                            >
                                <img src={require('../images/githublogo.png')}
                                     className="rounded-lg mb-2 w-12 h-auto"
                                     alt="Logo"/>
                            </a>
                        </div>
                        {/* Second row */}
                        <div className="flex flex-col items-center">
                            <img src={require('../images/kevinpic.png')}
                                 className="rounded-lg mb-2 w-64 h-auto"
                                 alt="Logo"/>
                            <p className="text-xl text-gray-700 font-semibold">Kevin Kostage</p>
                            <p className="text-sm text-gray-700 font-semibold">Full Stack Developer</p>
                            <a
                                href="https://www.linkedin.com/in/kevin-kostage/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 font-bold"
                            >
                                LinkedIn
                            </a>
                            <a
                                href="https://github.com/Keko787"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 font-bold underline"
                            >
                                <img src={require('../images/githublogo.png')}
                                     className="rounded-lg mb-2 w-12 h-auto"
                                     alt="Logo"/>
                            </a>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={require('../images/gregpic.png')}
                                 className="rounded-lg mb-2 w-64 h-auto"
                                 alt="Logo"/>
                            <p className="text-xl text-gray-700 font-semibold">Greg Bateham</p>
                            <p className="text-sm text-gray-700 font-semibold">Frontend Developer</p>
                            <a
                                href="https://www.linkedin.com/in/gregory-bateham-186520201/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 font-bold"
                            >
                                LinkedIn
                            </a>
                            <a
                                href="https://github.com/gdxbs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 font-bold underline"
                            >
                                <img src={require('../images/githublogo.png')}
                                     className="rounded-lg mb-2 w-12 h-auto"
                                     alt="Logo"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ContactPage;