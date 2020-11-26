import React, { useContext } from 'react';
import { DashboardContext } from '../MainAdminDashBoard';
import AddAdminForm from '../../../UI/inputs/AddAdminForm/AddAdminForm'
import './CollegeItems.css'

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