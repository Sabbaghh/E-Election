import React from 'react';
import './Inner-small-nav.css'

const InnerSmNav = ({ children }) => {
    return (
        <div className='inner-sm-nav'>
            {children}
        </div>
    );
};

export default InnerSmNav;