import React from 'react';
import './CollegeInformations.css'

const CollegeInformations = ({ children }) => {
    return (
        <div className='CollegeInformations'>
            {children}
        </div>
    );
};

export default CollegeInformations;