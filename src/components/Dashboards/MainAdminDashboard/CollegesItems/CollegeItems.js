import React, { useState, useContext, useEffect } from 'react';
import { DashboardContext } from '../MainAdminDashBoard';
import './CollegeItems.css'

const CollegeItems = () => {
    const { setCurrentItem, currentItem } = useContext(DashboardContext);
    const [adminClass, setAdminClass] = useState('');
    const [candidateClass, setCandidateClass] = useState('');

    const setActive = (currentItem) => {
        switch (currentItem) {
            case 'admin':
                setAdminClass('active');
                setCandidateClass('');
                break;
            case 'candidates':
                setCandidateClass('active');
                setAdminClass('');
                break;
            default:
                setCandidateClass('');
                setAdminClass('');
                break;
        }
    }
    useEffect(() => {
        setActive(currentItem);
    }, [])

    return (
        <div className='college-items-conatiner'>
            <div
                className={`item ${adminClass}`}
                onClick={() => {
                    setCurrentItem(currentItem);
                    setActive('admin');
                }}
            >
                <div className='icon' > <i className="fas fa-users-cog"></i> </div>
                <div className='itemName'>ADMIN</div>
            </div>
            <div
                className={`item ${candidateClass}`}
                onClick={() => {
                    setCurrentItem('candidates');
                    setActive('candidates');
                }}
            >
                <div className='icon'> <i className="fas fa-users"></i> </div>
                <div className='itemName'>CANDIDATES</div>
            </div>
        </div>
    );
};

export default CollegeItems;