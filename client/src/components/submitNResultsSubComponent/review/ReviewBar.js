import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ReviewsProvider from "./ReviewsProvider";

const ReviewBar = (props) => {
    const { score } = props;
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPercentage(prevPercentage => {
                if (prevPercentage >= score) {
                    clearInterval(interval);
                    return score;
                }
                return prevPercentage + 1;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [score]);

    return (
        <ReviewsProvider valueStart={0} valueEnd={score}>
            {(value) => (
                <CircularProgressbar
                    value={value}
                    text={`${percentage}%`}
                    circleRatio={0.7}
                    styles={{
                        trail: {
                            strokeLinecap: "butt",
                            transform: "rotate(-126deg)",
                            transformOrigin: "center center",
                            strokeWidth: 5, // Adjust the trail width here
                        },
                        path: {
                            strokeLinecap: "butt",
                            transform: "rotate(-126deg)",
                            transformOrigin: "center center",
                            stroke: `hsl(${value * 1.2}, 100%, 50%)`,
                            strokeWidth: 5, // Adjust the path width here
                        },
                        text: {
                            fill: "#000",
                            fontSize: "16px", // Adjust the font size here
                        },
                        // Adjusted styles for medium-sized elements
                        root: {
                            width: "300px", // Adjust the width here
                            height: "200px", // Adjust the height here
                        },
                    }}
                    strokeWidth={5}
                    value={percentage}
                />
            )}
        </ReviewsProvider>
    );
};

export default ReviewBar;

