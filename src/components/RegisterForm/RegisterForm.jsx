import React from "react";
import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { loginFormActive, registerFormActive } from "../../redux/slices/headerLoginFormSlice";

const RegisterForm = () => {

    const initialState = {
        loginRef: useRef(null),
        nameRef: useRef(null),
        passwordRef: useRef(null),
        confirmPasswordRef: useRef(null),
        emailRef: useRef(null),
        registerData: undefined,
    };
    const [registerFormState, setRegisterFormState] = useState(initialState);
    const dispatch = useDispatch();

    const closeFormHandler = () => {
        dispatch(registerFormActive(false));
    };

    const registerHandler = () => {
        const registerData = {
            login: registerFormState.loginRef.current.value,
            userName: registerFormState.nameRef.current.value,
            userPassword: registerFormState.passwordRef.current.value,
            email: registerFormState.emailRef.current.value
        }

        const  fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData)
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
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
                    <input ref={registerFormState.loginRef} type="text" />
                    <label htmlFor="register-from-header-email-input">Name</label>
                    <input ref={registerFormState.nameRef} type="text" />
                    <label htmlFor="register-from-header-password-input">Password</label>
                    <input ref={registerFormState.passwordRef} type="password" />
                    <label htmlFor="register-from-header-password-repeat-input">Password Repeat</label>
                    <input ref={registerFormState.confirmPasswordRef} type="password" />
                    <label htmlFor="register-from-header-email-input">Email</label>
                    <input ref={registerFormState.emailRef} type="text" />
                </form>
                <div className="register-from-login-btn-wrap">
                    <button onClick={registerHandler}>Register</button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default RegisterForm;