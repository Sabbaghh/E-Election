import React, { useState, createContext } from 'react';
import InnerNav from '../Shared/InnerNav';
import AdminsNavBar from '../Shared/AdminsNavBar';
import logo from '../assests/logo/e-election-logo.png';
import LogoElement from '../Shared/logoElement';
import ProfileSetting from '../Shared/ProfileSetting';
import WelcomeMsg from '../Shared/WelcomeMsg';
import SearchInput from '../Shared/SearchInput';
import Colleges from './Colleges';
import CollegeInformations from '../Shared/CollegeInformationsContainer';
import CollegeItems from '../Shared/CollegeItems';
import DefaultPage from './DefualtPage';
import ConfigPage from './ConfigPage'
import './css/MainAdmin.css';
export const DashboardContext = createContext();
const Dashboard = () => {
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentCollege, setCurrentCollege] = useState('');
    const value = {
        colleges,
        setColleges,
        error,
        setError,
        setLoading,
        loading,
        setCurrentCollege,
        currentCollege
    }
    const renderCurrentElement = () => {
        switch (currentCollege) {
            case 'config':
                return <ConfigPage />
            case 'profile':
                return <div>profile</div>
            case '':
                return <DefaultPage />
            default:
                return <CollegeItems />
        }
    }
    return (
        <DashboardContext.Provider value={value}>
            <div className='MainAdminDashboard'>
                <AdminsNavBar>
                    <InnerNav style={{ width: '6.5rem', backgroundColor: '#1b1e27', zIndex: 2 }} >
                        <LogoElement src={logo} alt="app-logo" width={'5rem'} height={'5rem'}
                            onfunction={() => setCurrentCollege('')} />
                        <ProfileSetting />
                    </InnerNav>
                    <InnerNav style={{ width: '18.5rem', backgroundColor: '#222632' }}>
                        <WelcomeMsg name={'ADMIN'} />
                        <SearchInput />
                        <Colleges />
                    </InnerNav>
                </AdminsNavBar>
                <CollegeInformations>
                    {renderCurrentElement()}
                </CollegeInformations>
            </div >
        </DashboardContext.Provider >
    );
};
export default Dashboard;