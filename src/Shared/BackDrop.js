import React from 'react';
import './css/BackdropSpinner/BackDropSpinner.css'

const BackDrop = ({ children }) => {
    return (
        <div className='BackDrop'>
            {children}
        </div>
    );
};

export default BackDrop;