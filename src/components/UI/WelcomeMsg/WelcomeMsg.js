import React from 'react';

const WelcomeMsg = ({ name }) => {
    return (
        <div className='AnyItem-container'>
            <h2 className='weclome-msg'>{`WELCOME TO THE MAIN ${name} PANEL`}</h2>
        </div>
    );
};

export default WelcomeMsg;