import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import logo from '../../../../assests/logo/e-election-logo.png'
import { DashboardContext } from '../MainAdminDashBoard';
import LogoElemnt from '../../../UI/LogoElement/logoElement'

const Colleges = () => {
    const { colleges, setColleges, setLoading, setError, setCurrentCollege } = useContext(DashboardContext);

    useEffect(() => {
        setLoading(true);
        axios.get('https://e-election-e4023.firebaseio.com/colleges-demo.json')
            .then(res => {
                setColleges(res.data)
                setLoading(false);
                console.log(res.data);
            })
            .catch(err => { setError(err) })
    }, []);

    return (
        <>
            {colleges !== null &&
                Object.keys(colleges).map(el => {
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
                })
            }
        </>
    );
};

export default Colleges;