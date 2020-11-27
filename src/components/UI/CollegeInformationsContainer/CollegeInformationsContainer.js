import React from 'react';
import './CollegeInformationsContainer.css'

const CollegeInformations = ({ children }) => {
    return (
        <div className='CollegeInformations'>
            {children}
        </div>
    );
};

export default CollegeInformations;