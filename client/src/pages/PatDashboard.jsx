import React from 'react';

import "../style/index.css";

import Init from './../components/Initialize';
import SubmitNResults from '../components/SubmitNResults';
import Display from '../components/PatentDisplay';

const Dash = () => {
    return (
        <div>
            <Init/>
            <SubmitNResults/>
            <Display/>
        </div>
    );
};
    
export default Dash;
