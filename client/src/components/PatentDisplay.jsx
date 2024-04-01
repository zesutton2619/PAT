import { useState } from "react";

import {SelectedFile} from "./patentDisplaySubComponent/SelectedFile";
import {SimilarFiles} from "./patentDisplaySubComponent/SimilarFiles";

const Display = () => {
    return (
        <div>
            <SelectedFile />
            <SimilarFiles />
        </div>
    )
}


export default Display;