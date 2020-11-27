import React from 'react';
import './BackDropSpinner.css';
import Spinner from '../../../UI/Spinners/Spinner';
const Backdrop = () => {
    return (
        <div className='BackDrop'>
            <Spinner />
        </div>
    );
};

export default Backdrop;