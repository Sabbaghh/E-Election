import React, { useState, useEffect } from 'react';
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

const LoginPage = () => {
    const [toggle, setToggle] = useState(true);
    useEffect(() => {
        console.log('changes');
    }, [toggle]);

    return (
        <div className='login-container'>
            <div className='loginPage'>
                <div className='left-side'>
                    <NavLinks setToggle={setToggle} />
                    {toggle ?
                        <LoginForm type='login' /> :
                        <LoginForm type='reset' />
                    }
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