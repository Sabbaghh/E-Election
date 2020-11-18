import React from 'react';
import './AdminNavBar.css';

const AdminsNavBar = ({ children }) => {
    return (
        <div className='AdminNavBar'>
            {children}
        </div>
    );
};

export default AdminsNavBar;