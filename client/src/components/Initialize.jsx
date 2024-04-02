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
                    <div className="flex items-start ml-20 p-5 flex-col  bg-white shadow-md rounded-lg overflow-hidden">

                        <PatentCategoryDropdown />

                        <OrthopedicCategorySelect />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Init;
