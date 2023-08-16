import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginFormActive, registerFormActive } from "../../redux/slices/headerLoginFormSlice";
import { authUser } from "../../redux/slices/userSlice";
import RegisterForm from "../RegisterForm/RegisterForm";

const LoginFrom = () => {
    const dispatch = useDispatch();
    const registerFormState = useSelector((state) => state.headerLoginForm.registerFormActive);
    const initialState = {
        loginInputRef: useRef(null),
        passwordInputRef: useRef(null),
    };
    const [loginFromState, setLoginFormState] = useState(initialState);
    const closeFormHandler = () => {
        loginFromState.loginInputRef.current.value = '';
        loginFromState.passwordInputRef.current.value ='';
        dispatch(loginFormActive(false));
    };

    const loginHandler = async () => {
        const sendData = {
            email: loginFromState.loginInputRef.current.value,
            password: loginFromState.passwordInputRef.current.value
        };

        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendData)
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.token) {
                    dispatch(authUser(JSON.stringify(data)));
                    dispatch(loginFormActive(false));
                }
            });
        };
        await fetchFunc();
        
    };

    const registerHandler = () => {
        // dispatch(loginFormActive(false));
        dispatch(registerFormActive(true));
    };

    return (
        <React.Fragment>
            {!registerFormState ?
            <div className="login-form-header-wrap">
                <span className="login-form-close-btn" onClick={closeFormHandler}></span>
                <form className="login-form-header">
                    <label htmlFor="login-from-header-login-input">Login</label>
                        <input ref={loginFromState.loginInputRef} id="login-from-header-login-input" type="text" />
                    <label htmlFor="password-from-header-password-input">Password</label>
                        <input ref={loginFromState.passwordInputRef} id="password-from-header-password-input" type="password" />
                </form>
                <div className="login-form-btns-wrap">
                    <div className="login-from-register-btn-wrap">
                        <button onClick={registerHandler}>Register</button>
                    </div>
                    <div className="login-from-login-btn-wrap">
                        <button onClick={loginHandler}>Login</button>
                    </div>
                </div>
            </div> 
            : <RegisterForm />}
            
        </React.Fragment>
    );
};

export default LoginFrom;