import React from 'react';
import './defuatPage.css';
import Logo from './../../../assests/logo/e-election-logo.png'
import LogoElemnt from '../../UI/LogoElement/logoElement';

const DefualtPage = () => {
    return (
        <div className='DefualtPage'>
            <LogoElemnt width='20rem' height='20rem' src={Logo} />
        </div>
    );
};

export default DefualtPage;