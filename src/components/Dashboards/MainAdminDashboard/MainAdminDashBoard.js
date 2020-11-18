import React from 'react';
import InnerNav from '../../UI/InnerNav/InnerNav';
// import Spinner from '../../UI/Spinners/Spinner';
import AdminsNavBar from '../../UI/AdminsNavBar/AdminsNavBar';
import logo from '../../../assests/logo/e-election-logo.png'

const Dashboard = () => {
    return (
        <div className='MainAdminDashboard'>
            <AdminsNavBar>
                <InnerNav style={{ width: '6.5rem', backgroundColor: '#1b1e27', zIndex: 2 }} >
                    <div className='AnyItem-container'>
                        <div className='logo'>
                            <img src={logo} alt="app-logo" />
                        </div>
                    </div>
                    <div className='setting-conatiner AnyItem-container'>
                        <div>
                            <i className="fas fa-user"></i>
                        </div>
                        <div>
                            <i className="fas fa-cog"></i>
                        </div>
                    </div>
                </InnerNav>
                <InnerNav style={{ width: '18.5rem', backgroundColor: '#222632' }}>
                    <div className='AnyItem-container'>
                        <h2 className='weclome-msg'>WELCOME TO THE MAIN ADMIN PANEL</h2>
                    </div>
                </InnerNav>
            </AdminsNavBar>
        </div >
    );
};

export default Dashboard;