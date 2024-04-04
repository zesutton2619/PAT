import React from "react";
import Navbar from "./NavBar";

const EagleHacks = () => {
    return (
        <div>
            <Navbar />
            <div className="flex justify-center mt-10 ">
                <div className=" bg-white rounded-lg shadow-lg p-8 ">
                    <h2 className="text-2xl font-bold mb-4 flex justify-center animate-fade-in animate-bounce">
                        Eagle Hacks 2024
                    </h2>
                    <div className="flex justify-center">
                        <img src={require('../images/eaglehackslogo.png')}
                              className="rounded-lg mb-4 w-90 h-auto animate-fade-in invert"
                              alt="Logo"/>
                    </div>
                    <div className=" bg-white rounded-lg shadow-lg p-8 animate-fade-in">
                        <p className="text-xl font-semibold dark:text-white flex justify-center">
                            Eagle Hacks 2024 is a student-run hackathon organized by the
                            Software Engineering Club at our campus.
                        </p>
                        <p className="text-xl font-semibold dark:text-white flex justify-center">
                            The event involves students collaborating to develop innovative projects within a limited
                            time frame.
                        </p>
                        <p className="text-xl font-semibold dark:text-white flex justify-center">
                            Eagle Hacks took place from March 30th to April 6th.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EagleHacks;