import React, { useState, createContext, useEffect } from 'react';
import InnerNav from '../../UI/InnerNav/InnerNav';
import Spinner from '../../UI/Spinners/Spinner';
import AdminsNavBar from '../../UI/AdminsNavBar/AdminsNavBar';
import logo from '../../../assests/logo/e-election-logo.png';
import LogoElemnt from '../../UI/LogoElement/logoElement';
import ProfileSetting from '../../UI/ProfileSettings/ProfileSetting';
import WelcomeMsg from '../../UI/WelcomeMsg/WelcomeMsg';
import SearchInput from '../../UI/inputs/SearchInput/SearchInput';
import Colleges from './Colleges/Colleges';
import CollegeInformations from '../../UI/CollegeInformations/CollegeInformations';
import CollegeItems from './CollegesItems/CollegeItems';
import DefaultPage from '../../UI/defualtPage/DefualtPage';
import './MainAdmin.css'
export const DashboardContext = createContext();

const Dashboard = () => {
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentCollege, setCurrentCollege] = useState('');
    const [currentItem, setCurrentItem] = useState('admin');
    const value = {
        colleges,
        setColleges,
        error,
        setError,
        setLoading,
        setCurrentCollege,
        setCurrentItem,
        currentItem
    }
    const returnToDefualtPage = () => {
        console.log('hehe');
        setCurrentCollege('');
    }
    useEffect(() => {
        return;
    }, [])
    return (
        <DashboardContext.Provider value={value}>
            <div className='MainAdminDashboard'>
                <AdminsNavBar>
                    <InnerNav style={{ width: '6.5rem', backgroundColor: '#1b1e27', zIndex: 2 }} >
                        <LogoElemnt src={logo} alt="app-logo" width={'5rem'} height={'5rem'} alt={'app'} onfunction={() => returnToDefualtPage()} />
                        <ProfileSetting />
                    </InnerNav>
                    <InnerNav style={{ width: '18.5rem', backgroundColor: '#222632' }}>
                        <WelcomeMsg name={'ADMIN'} />
                        <SearchInput />
                        <div className='AnyItem-container college-container'>
                            {loading && <Spinner />}
                            <Colleges />
                        </div>
                    </InnerNav>
                </AdminsNavBar>
                <CollegeInformations>
                    {currentCollege ? <CollegeItems /> : <DefaultPage />}
                </CollegeInformations>
            </div >
        </DashboardContext.Provider >
    );
};

export default Dashboard;