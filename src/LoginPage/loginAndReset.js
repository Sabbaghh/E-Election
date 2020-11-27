import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WhileHover } from '../Animation/ScaleonHover';
import './css/loginAndReset.css'

const NavLinks = (props) => {
    const [toggle, setToggle] = useState(false);
    return (
        <div className='login-f-pass'>
            <ul>
                <motion.li
                    variants={WhileHover}
                    whileHover='hover'
                    onClick={() => {
                        toggle && setToggle(!toggle);
                        props.setToggle(true);
                    }}
                    style=
                    {toggle ?
                        { backgroundColor: '#FFF', color: '#855774' } :
                        { backgroundColor: '#855774', color: '#FFF' }}>
                    LOGIN
                </motion.li>
                <motion.li
                    variants={WhileHover}
                    whileHover='hover'
                    onClick={() => {
                        !toggle && setToggle(!toggle);
                        props.setToggle(false);
                    }}
                    style=
                    {!toggle ?
                        { backgroundColor: '#FFF', color: '#855774' } :
                        { backgroundColor: '#855774', color: '#FFF' }}>
                    RESET PASSWORD
                </motion.li>
            </ul>
        </div >
    );
};

export default NavLinks;