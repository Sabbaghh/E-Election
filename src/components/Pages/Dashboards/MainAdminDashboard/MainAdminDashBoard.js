import React, { useState, createContext } from 'react';
import InnerNav from '../../../UI/InnerNav/InnerNav';
import AdminsNavBar from '../../../UI/AdminsNavBar/AdminsNavBar';
import logo from '../../../../assests/logo/e-election-logo.png';
import LogoElement from '../../../UI/LogoElement/logoElement';
import ProfileSetting from '../../../UI/ProfileSettings/ProfileSetting';
import WelcomeMsg from '../../../UI/WelcomeMsg/WelcomeMsg';
import SearchInput from '../../../UI/inputs/SearchInput/SearchInput';
import Colleges from './Colleges/Colleges';
import CollegeInformations from '../../../UI/CollegeInformationsContainer/CollegeInformationsContainer';
import CollegeItems from '../../../UI/CollegesItems/CollegeItems';
import DefaultPage from '../../defualtPage/DefualtPage';
import ConfigPage from './ConfigPage/ConfigPage'
import './MainAdmin.css';
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