import { useState } from "react";

import {SelectedFile} from "./patentDisplaySubComponent/SelectedFile";
import {SimilarFiles} from "./patentDisplaySubComponent/SimilarFiles";

const Display = ({patents}) => {
    return (
        <div>
            <h2>Patent Display</h2>
            <div className="patents-container">
                {patents.map((patent, index) => (
                    <div key={index} className="patent-card">
                        <h3>{patent.name}</h3>
                        {/* Render other details of the patent as needed */}
                        <embed src={URL.createObjectURL(patent)} width="500" height="500" type="application/pdf"/>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Display;