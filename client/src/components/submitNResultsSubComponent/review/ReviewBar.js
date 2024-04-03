import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ReviewsProvider from "./ReviewsProvider";

const ReviewBar = (props) => {
    const { score } = props;

    const calcColor = (percent, start, end) => {
        let a = percent / 100,
            b = (end - start) * a,
            c = b + start;

        return "hsl(" + c + ", 100%, 50%)";
    };

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
                            strokeWidth: 5, // Adjust the trail width here
                        },
                        path: {
                            strokeLinecap: "butt",
                            transform: "rotate(-126deg)",
                            transformOrigin: "center center",
                            stroke: calcColor(value, 0, 120),
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
                    svgStyle={{ maxHeight: "200px", maxWidth: "400px" }} // Adjusted SVG height and width
                />
            )}
        </ReviewsProvider>
    );
};

export default ReviewBar;
