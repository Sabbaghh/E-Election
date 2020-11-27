import React, { useContext } from 'react';
import { DashboardContext } from '../../Pages/Dashboards/MainAdminDashboard/MainAdminDashBoard';

const ProfileSetting = () => {
    const { setCurrentCollege } = useContext(DashboardContext);
    return (
        <div className='setting-conatiner AnyItem-container'>
            <div onClick={() => setCurrentCollege('profile')}>
                <i className="fas fa-sign-out-alt"></i>
            </div>
            <div onClick={() => setCurrentCollege('config')}>
                <i className="fas fa-cog"></i>
            </div>
        </div>
    );
};

export default ProfileSetting;