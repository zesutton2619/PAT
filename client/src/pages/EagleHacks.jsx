import React from "react";
import Navbar from "./NavBar";
import NavBar from "./NavBar";

const EagleHacks = () => {
    return (
        <div>
            <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <NavBar/>
            </nav>
            <div className="flex justify-center mt-5 ">
                <div className=" bg-white rounded-lg shadow-2xl p-8 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-95">
                    <h2 className="text-2xl text-gray-700 font-bold mb-4 flex justify-center animate-fade-in animate-bounce">
                        Eagle Hacks 2024
                    </h2>
                    <div className="grid grid-cols-2 justify-center">
                        <img src={require('../images/eaglehackslogo.png')}
                             className="rounded-lg mb-4 w-90 h-auto animate-fade-in invert"
                             alt="Logo"/>
                        <img src={require('../images/logos.png')}
                             className="rounded-lg mb-4 w-90 h-auto animate-fade-in"
                             alt="Logo"/>
                    </div>
                    <div
                        className=" bg-white rounded-lg shadow-xl shadow-lg p-8 animate-fade-in border-b-4 border-l-4 border-gray-200">
                        <p className="text-xl text-gray-700 font-semibold  flex justify-center">
                            Eagle Hacks 2024 is a student-run hackathon organized by the
                            Software Engineering Club at our campus.
                        </p>
                        <p className="text-xl text-gray-700 font-semibold  flex justify-center">
                            The event involves students collaborating to develop innovative projects within a limited
                            time frame.
                        </p>
                        <p className="text-xl text-gray-700 font-semibold  flex justify-center">
                            Eagle Hacks took place from March 30th to April 6th.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EagleHacks;