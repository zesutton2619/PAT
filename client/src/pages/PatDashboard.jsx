// PatDashboard.jsx
import React, { useState } from "react";
import { Home } from './subpages/HomePage';
import { TopNav } from './pagecomponents/TopNavBar';

const Dash = () => {
    return (
        <div>
            <TopNav/>
            <Home/>
        </div>
    );
};

export default Dash;
