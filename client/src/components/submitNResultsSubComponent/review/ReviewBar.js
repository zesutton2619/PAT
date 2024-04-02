import React from "react";
import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ReviewsProvider from "./ReviewsProvider";


const ReviewBar = (props) => { // Added props parameter here
    const { score } = props;

    const calcColor = (percent, start, end) => { // Corrected function definition
        let a = percent / 100,
            b = (end - start) * a,
            c = b + start;

        // Return css hsl color string
        return "hsl(" + c + ", 100%, 50%)";
    }

    return (
        <ReviewsProvider valueStart={0} valueEnd={score}>
            {(value) => (
                <CircularProgressbar
                    value={value}
                    text={`${value}%`}
                    circleRatio={0.7}
                    styles={{
                        trail: {
                            strokeLinecap: "butt",
                            transform: "rotate(-126deg)",
                            transformOrigin: "center center",
                        },
                        path: {
                            strokeLinecap: "butt",
                            transform: "rotate(-126deg)",
                            transformOrigin: "center center",
                            stroke: calcColor(value, 0, 120)
                        },
                        text: {
                            fill: "#000",
                            fontSize: "16px"
                        },
                    }}
                    strokeWidth={10}
                />
            )}
        </ReviewsProvider>
    );
};

export default ReviewBar;