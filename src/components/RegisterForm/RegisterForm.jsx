import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginFormActive, registerFormActive } from "../../redux/slices/headerLoginFormSlice";

const RegisterForm = () => {
    const dispatch = useDispatch();

    const closeFormHandler = () => {
        dispatch(registerFormActive(false));
    };
    
    return (
        <React.Fragment>
            <div className="register-form-header-wrap">
                <span className="register-form-close-btn" onClick={closeFormHandler}></span>
                <form className="register-form-header">
                    <label htmlFor="register-from-header-login-input">Login</label>
                    <input type="text" />
                    <label htmlFor="register-from-header-email-input">Name</label>
                    <input type="text" />
                    <label htmlFor="register-from-header-password-input">Password</label>
                    <input type="password" />
                    <label htmlFor="register-from-header-password-repeat-input">Password Repeat</label>
                    <input type="password" />
                    <label htmlFor="register-from-header-email-input">Email</label>
                    <input type="text" />
                </form>
                <div className="register-from-login-btn-wrap">
                    <button>Register</button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default RegisterForm;