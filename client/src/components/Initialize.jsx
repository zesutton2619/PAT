import { useState } from "react";
import {UploadComponent} from './initSubComponent/UploadFile.jsx';
import {PatentCategoryDropdown} from './initSubComponent/PatentCategoryDropdown.jsx';
import {OrthopedicCategorySelect} from './initSubComponent/OrthopedicCategorySelect.jsx';

const Init = () => {
    return (
      <div className="container">
        <UploadComponent />
        <PatentCategoryDropdown />
        <OrthopedicCategorySelect />
      </div>
    );  };

export default Init;