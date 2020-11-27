import React from 'react';
import './css/BackDropSpinner.css';
import Spinner from './Spinner';
const Backdrop = () => {
    return (
        <div className='BackDrop'>
            <Spinner />
        </div>
    );
};

export default Backdrop;