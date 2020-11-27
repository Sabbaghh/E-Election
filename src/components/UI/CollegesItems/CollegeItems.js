import React, { useContext } from 'react';
import { DashboardContext } from '../../Pages/Dashboards/MainAdminDashboard/MainAdminDashBoard';
import AddAdminForm from '../../../components/Pages/Dashboards/MainAdminDashboard/AddAdminForm/AddAdminForm'
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