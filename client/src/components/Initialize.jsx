import { useState } from "react";
import { UploadComponent } from './initSubComponent/UploadFile.jsx';
import { PatentCategoryDropdown } from './initSubComponent/PatentCategoryDropdown.jsx';
import { OrthopedicCategorySelect } from './initSubComponent/OrthopedicCategorySelect.jsx';

const Init = () => {
    return (
        <div className="flex justify-center items-center mt-7">
            <div className="container flex flex-col items-center">
                <div className="flex items-start">
                    <UploadComponent />
                    <div className="mt-5 ml-20 flex flex-col items-center">

                        <PatentCategoryDropdown />

                        <OrthopedicCategorySelect />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Init;
