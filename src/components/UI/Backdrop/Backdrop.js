import React from 'react';
import './BackDrop.css';
import Spinner from '../Spinners/Spinner';
const Backdrop = () => {
    return (
        <div className='BackDrop'>
            <Spinner />
        </div>
    );
};

export default Backdrop;