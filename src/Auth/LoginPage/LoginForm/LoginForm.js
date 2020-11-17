import React from 'react';
import './loginForm.css';
const LoginForm = ({ type, emailRef, passwordRef, HandleSubmit }) => {
    const loginInputs = (
        <>
            <input type="email" placeholder='E-MAIL' ref={emailRef} />
            <input type="password" placeholder='PASSWORD' ref={passwordRef} />
        </>
    );
    const resetInputs = (
        <>
            {/* <label htmlFor="email"> EMAIL :</label> */}
            <input type="email" placeholder='EMAIL' ref={emailRef} />
        </>
    );
    return (
        <form className='loginForm' onSubmit={(e) => HandleSubmit(e)}>
            {type === "login" ? loginInputs : resetInputs}
            <button>{type.toUpperCase()}</button>
        </form>
    );
};

export default LoginForm;