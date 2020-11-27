import React from 'react';

const InnerNav = ({ children, style }) => {
    return (
        <div className='inner-sm-nav' style={style}>
            {children}
        </div>
    );
};
export default InnerNav;