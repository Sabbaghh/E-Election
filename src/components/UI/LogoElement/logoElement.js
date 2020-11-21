import React from 'react';

const logoElement = ({ src, width, height, alt, onfunction }) => {
    return (
        <div>
            <div className='AnyItem-container' style={{ border: 'none' }} onClick={onfunction} >
                <div className='logo' style={{ width, height }}>
                    <img src={src} alt={`${alt}-logo`} />
                </div>
            </div>
        </div>
    );
};

export default logoElement;