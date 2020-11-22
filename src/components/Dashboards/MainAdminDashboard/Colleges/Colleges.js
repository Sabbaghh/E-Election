import React, { useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import logo from '../../../../assests/logo/e-election-logo.png'
import { DashboardContext } from '../MainAdminDashBoard';
import { ProjectFireStore, TimeStamps } from '../../../../FireBase/fireBase';
import LogoElemnt from '../../../UI/LogoElement/logoElement'

const Colleges = () => {
    const {
        colleges,
        setColleges,
        setLoading,
        setError,
        setCurrentCollege
    } = useContext(DashboardContext);


    useEffect(() => {
        let collegesList = [];
        setLoading(true);
        ProjectFireStore.collection('Collage').get().then(res => {
            res.docs.forEach(doc => {
                collegesList.push(doc.data()[`Name`]);
            })
            setColleges(collegesList);
            setLoading(false);
        }).catch(err => {
            setError(err);
        })
    }, []);

    return (
        <>
            {colleges &&
                colleges.map(el => {
                    return (
                        <div key={el} className='anyitem-container-row'
                            onClick={(e) => { setCurrentCollege(el) }}>
                            <LogoElemnt src={logo} alt={el} width={'4rem'} height={'4rem'} />
                            <div className='AnyItem-container'
                                style={{ width: '70%', border: 'none', textAlign: 'end' }}>
                                <div style={{ width: '90%', border: 'none', textAlign: 'start' }}>
                                    <h4>{el}</h4>
                                    <span style={{ color: 'blue' }}> READY</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
        </>
    );
};

export default Colleges;