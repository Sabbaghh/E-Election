import React, { useState, useRef, useContext } from 'react';
import './css/LoginPage.css';
import LoginAvatar from '../assests/adminPanel/login.png';
import forgetAvatarfrom from '../assests/adminPanel/forget-pass.png';
import NavLinks from './loginAndReset';
import LoginForm from './LoginForm';
import { SimpleFade } from '../Animation/simpleFade';
import { motion } from 'framer-motion';
import { AuthContext } from '../Contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import Spinner from '../Shared/BackdropSpinner';
import { SecondaryAdmins } from '../FireBase/SecondaryAdminAuth'

const LoginPage = () => {
    const [toggle, setToggle] = useState(true);
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const login = useContext(AuthContext).login;
    const setCurrentUser = useContext(AuthContext).setCurrentUser;
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
            //if you can't find email for main admin look for secondary admins
            loginSecondaryAdmin(emailValue, passwordValue);
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
            //if you can't find email for main admin look for secondary admins
            resetSecondaryAdmin(emailValue);
        }
        setLoading(false);
    }

    //working on secondary admin app

    const loginSecondaryAdmin = async (emailValue, passwordValue) => {
        await SecondaryAdmins.signInWithEmailAndPassword(emailValue, passwordValue)
        try {
            SecondaryAdmins.onAuthStateChanged((user) => {
                setCurrentUser(user);
            });
            setError('');
            setLoading(true);
            history.push('/dashboard');
        } catch {
            alert('no')
            setError('Failed to login')
            setLoading(false);
        }
    }

    const resetSecondaryAdmin = async (emailValue) => {
        await SecondaryAdmins.sendPasswordResetEmail(emailValue)
        try {
            setError('');
            setLoading(true);
        } catch {
            alert('no');
            setError('Failed to reset password')
            setLoading(false);
        }

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