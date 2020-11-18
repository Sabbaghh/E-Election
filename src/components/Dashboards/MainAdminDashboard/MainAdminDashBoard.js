import React from 'react';
import InnerSmNav from '../../UI/Inner-sm-nav/Inner-sm-nav';
// import Spinner from '../../UI/Spinners/Spinner';
import AdminsNavBar from '../../UI/AdminsNavBar/AdminsNavBar';
import logo from '../../../assests/logo/e-election-logo.png'

const Dashboard = () => {
    return (
        <div className='MainAdminDashboard'>
            <AdminsNavBar>
                <InnerSmNav >
                    <div className='logo-container'>
                        <div className='logo'>
                            <img src={logo} alt="app-logo" />
                        </div>
                    </div>
                    <div className='setting-conatiner'>
                        <div>
                            <i className="fas fa-user"></i>
                        </div>
                        <div>
                            <i className="fas fa-cog"></i>
                        </div>
                    </div>
                </InnerSmNav>
            </AdminsNavBar>
        </div>
    );
};

export default Dashboard;