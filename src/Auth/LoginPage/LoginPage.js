import React, { useState, useRef, useContext } from 'react';
import './LoginPage.css';
//vectors
import LoginAvatar from '../../assests/adminPanel/login.png';
import forgetAvatarfrom from '../../assests/adminPanel/forget-pass.png';
//comps
import NavLinks from '../NavLinks/NavLinks';
import LoginForm from './LoginForm/LoginForm';
//animation
import { SimpleFade } from '../../Animation/simpleFade';
import { motion } from 'framer-motion';

import { AuthContext } from '../context/AuthContext';
//routers
import { useHistory } from 'react-router-dom';
//UI
import Spinner from '../../components/UI/Backdrop/Backdrop';

const LoginPage = () => {
    const [toggle, setToggle] = useState(true);
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const login = useContext(AuthContext).login;
    const resetPassword = useContext(AuthContext).resetPassword;


    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        let emailValue = emailRef.current.value;
        let passwordValue = passwordRef.current.value;
        try {
            setError('');
            setLoading(true);
            await login(emailValue, passwordValue);
            history.push('/dashboard');
        } catch {
            setError('failed to log in');
        }
        setLoading(false);
    }

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        let emailValue = emailRef.current.value;
        try {
            setError('');
            setLoading(true);
            await resetPassword(emailValue);
        } catch {
            setError('fail to reset password')
        }
        setLoading(false);
    }

    return (
        <div className='login-container'>
            {loading && <Spinner />}
            <div className='loginPage'>
                <div className='left-side'>

                    <NavLinks setToggle={setToggle} />
                    {toggle ?
                        <LoginForm type='login'
                            HandleSubmit={handleLoginSubmit}
                            emailRef={emailRef}
                            passwordRef={passwordRef} /> :
                        <LoginForm type='reset'
                            HandleSubmit={handleResetSubmit}
                            emailRef={emailRef} />
                    }
                    {error && <h1 style={{ margin: '10px', color: '#d62828' }}>{error}</h1>}
                </div>
                <div className='right-side'>
                    <motion.img variants={SimpleFade} initial='initial' animate='animate'
                        src={toggle ? LoginAvatar : forgetAvatarfrom} alt="Avatar" />
                </div>
            </div>
        </div>

    );
};

export default LoginPage;