import React from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginFormActive, registerFormActive, forgotPasswordActive } from "../../redux/slices/headerLoginFormSlice";
import { authUser } from "../../redux/slices/userSlice";
import RegisterForm from "../RegisterForm/RegisterForm";
import { emailValidate } from "../FormsRegExp/FormsRegExp";
import { Link } from "react-router-dom";

const LoginFrom = () => {
    const dispatch = useDispatch();
    const registerFormState = useSelector((state) => state.headerLoginForm.registerFormActive);
    const forgotPswdFormState = useSelector((state) => state.headerLoginForm.forgotPasswordFormActive)

    const initialState = {
        loginInputRef: useRef(null),
        passwordInputRef: useRef(null),
        forgotPasswordRef: useRef(null),
        loginBtnDisable: true,
        errorMessage: '',
        forgotPasswordError: false,
        forgotPasswordMessageDisplay: false,
    };
    const [loginFromState, setLoginFormState] = useState(initialState);

    const closeFormHandler = () => {
        if (!forgotPswdFormState) {
            loginFromState.loginInputRef.current.value = '';
            loginFromState.passwordInputRef.current.value ='';
        }
        
        dispatch(loginFormActive(false));
        dispatch(forgotPasswordActive(false));
        setLoginFormState(prevState => ({
            ...prevState,
            errorMessage: prevState.errorMessage = '',
        }));
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
            .then((response) => {
                if (response.status === 404) {
                    setLoginFormState(prevState => ({
                        ...prevState,
                        errorMessage: prevState.errorMessage = 'username or password not valid',
                    }));
                    return response.status;
                }
                return response.json()
            })
            .then((data) => {
                if (data && data.token) {
                    dispatch(authUser(JSON.stringify(data)));
                    dispatch(loginFormActive(false));
                    setLoginFormState(prevState => ({
                        ...prevState,
                        errorMessage: prevState.errorMessage = '',
                    }));
                }
            });
        };
        await fetchFunc();
        
    };

    const registerHandler = () => {
        dispatch(registerFormActive(true));
    };

    const loginInputHandler = () => {
        const pattern = emailValidate;
        if (loginFromState.loginInputRef.current.value.match(pattern)) {
            setLoginFormState(prevState => ({
                ...prevState,
                loginBtnDisable: prevState.loginBtnDisable = false
            }));
            return;
        }
        setLoginFormState(prevState => ({
            ...prevState,
            loginBtnDisable: prevState.loginBtnDisable = true,
        }));
    };

    const forgotPasswordHandler = () => {
        dispatch(forgotPasswordActive(true));
    };
    
    const forgotPasswordClose = () => {
        dispatch(forgotPasswordActive(false));
    };

    const forgotPasswordSend = () => {
        if (loginFromState.forgotPasswordRef.current.value.match(emailValidate)) {
            const fetchFunc = async () => {
                await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/recover/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email: loginFromState.forgotPasswordRef.current.value})
                })
                .then((response) => {
                    if (response.status === 200) {
                        setLoginFormState(prevState => ({
                            ...prevState,
                            forgotPasswordError: prevState.forgotPasswordError = false,
                            forgotPasswordMessageDisplay: loginFromState.forgotPasswordMessageDisplay = true,
                        }));
                        loginFromState.forgotPasswordRef.current.value = '';

                        return response.json();
                    }
                    setLoginFormState(prevState => ({
                        ...prevState,
                        forgotPasswordError: prevState.forgotPasswordError = true,
                        forgotPasswordMessageDisplay: loginFromState.forgotPasswordMessageDisplay = false,
                    }));

                    loginFromState.forgotPasswordRef.current.value = '';

                    return response.status;
                });
            };
            fetchFunc();
            return;
        }
        setLoginFormState(prevState => ({
            ...prevState,
            forgotPasswordError: prevState.forgotPasswordError = true,
            forgotPasswordMessageDisplay: loginFromState.forgotPasswordMessageDisplay = false,
        }));
    };

    return (
        <React.Fragment>
            {!registerFormState ?
            <div className="login-form-header-wrap">
                <span className="login-form-close-btn" onClick={closeFormHandler}></span>
                {!forgotPswdFormState ? 
                <form className="login-form-header">
                    <label htmlFor="login-from-header-login-input">Login</label>
                        <input ref={loginFromState.loginInputRef} onChange = {loginInputHandler} id="login-from-header-login-input" type="text" />
                    <label htmlFor="password-from-header-password-input">Password</label>
                        <input ref={loginFromState.passwordInputRef} id="password-from-header-password-input" type="password" />
                        <Link onClick={forgotPasswordHandler} className="login-form-forgot-password">forgot password</Link>
                </form>
                : null}
                {forgotPswdFormState ?
                    <div className="forgot-password-wrap">
                        <span className="login-form-close-btn" onClick={forgotPasswordClose}></span>
                        <div className="forgot-password-input-wrap">
                            <label htmlFor="forgot-password-input">Your email</label>
                            <input ref={loginFromState.forgotPasswordRef} id="forgot-password-input" className="forgot-password-input" type="text" />
                            <p className="forgot-password-message">{loginFromState.forgotPasswordMessageDisplay ? 'the password has been sent to your email' : null }</p>
                            <p className="forgot-password-error">{loginFromState.forgotPasswordError ? 'email not exists' : null}</p>
                            <button onClick={forgotPasswordSend}>send</button>
                        </div>
                    </div> 
                : null}

                {!forgotPswdFormState ?
                <React.Fragment>
                    <div className="login-form-btns-wrap">
                        <div className="login-from-register-btn-wrap">
                            <button onClick={registerHandler}>Register</button>
                        </div>
                        <div className="login-from-login-btn-wrap">
                            <button onClick={loginHandler}>Login</button>
                            {/* <button onClick={loginHandler} disabled={loginFromState.loginBtnDisable}>Login</button> */}
                        </div>
                    </div>
                    <div className="login-error-message">{loginFromState.errorMessage }</div>
                </React.Fragment>
                : null}
                
            </div> 
            : <RegisterForm />}
            
        </React.Fragment>
    );
};

export default LoginFrom;