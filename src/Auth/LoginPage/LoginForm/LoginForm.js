import React from 'react';
import './loginForm.css';
const LoginForm = ({ type }) => {
    const submitHandler = (e) => {
        e.preventDefault();
    }
    const loginInputs = (
        <>
            <input type="email" placeholder='E-MAIL' />
            <input type="password" placeholder='PASSWORD' />
        </>
    );
    const resetInputs = (
        <>
            {/* <label htmlFor="email"> EMAIL :</label> */}
            <input type="email" placeholder='EMAIL' />
        </>
    );
    return (
        <form className='loginForm' onSubmit={(e) => submitHandler(e)}>
            {type === "login" ? loginInputs : resetInputs}
            <button>{type.toUpperCase()}</button>
        </form>
    );
};

export default LoginForm;