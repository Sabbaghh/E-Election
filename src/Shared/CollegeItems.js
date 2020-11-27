import React, { useContext } from 'react';
import { DashboardContext } from '../MainAdminDashboard/MainAdminDashBoard';
import AddAdminForm from '../MainAdminDashboard/AddAdminForm'
import './css/CollegeItems.css'

const CollegeItems = () => {
    const {
        currentCollege
    } = useContext(DashboardContext);

    return (
        <>
            <div className='college-items-conatiner'>
                <div className='item'>
                    <div className='icon' > <i className="fas fa-users-cog"></i> </div>
                    <div className='itemName'>{currentCollege} FACULTY ADMIN</div>
                </div>
            </div>
            <AddAdminForm />
        </>
    );
};

export default CollegeItems;