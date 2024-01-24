import React from "react";
import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { loginFormActive, registerFormActive } from "../../redux/slices/headerLoginFormSlice";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const loginRef = useRef(null);
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const emailRef = useRef(null);

    const closeFormHandler = () => {
        dispatch(registerFormActive(false));
    };

    const registerHandler = () => {
        const registerData = {
            login: loginRef.current.value,
            userName: nameRef.current.value,
            userPassword: passwordRef.current.value,
            email: emailRef.current.value
        }

        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData)
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(registerFormActive(false));
                dispatch(loginFormActive(false));
            })
        };

        fetchFunc();
    };
    
    return (
        <React.Fragment>
            <div className="register-form-header-wrap">
                <span className="register-form-close-btn" onClick={closeFormHandler}></span>
                <form className="register-form-header">
                    <label htmlFor="register-from-header-login-input">Login</label>
                    <input ref={loginRef} type="text" />
                    <label htmlFor="register-from-header-email-input">Name</label>
                    <input ref={nameRef} type="text" />
                    <label htmlFor="register-from-header-password-input">Password</label>
                    <input ref={passwordRef} type="password" />
                    <label htmlFor="register-from-header-password-repeat-input">Password Repeat</label>
                    <input ref={confirmPasswordRef} type="password" />
                    <label htmlFor="register-from-header-email-input">Email</label>
                    <input ref={emailRef} type="text" />
                </form>
                <div className="register-from-login-btn-wrap">
                    <button onClick={registerHandler}>Register</button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default RegisterForm;