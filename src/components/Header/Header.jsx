import React from "react";
import HeaderSubMenu from "../HeaderSubMenu/HeaderSubMenu";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { subMenuActive }  from '../../redux/slices/subMenuSlice';
import LoginFrom from "../LoginForm/LoginForm";

const Header = () => {

    const subMenuStatus = useSelector((state) => state.subMenu);
    const loginFormStatus = useSelector((state) => state.headerLoginForm);
    const userData = useSelector((state) => state.userData);
    const dispatch =  useDispatch();

    const submenuHandler = () => {
        if (subMenuStatus.submenuActive)  {
            dispatch(subMenuActive(false));
            return;
        }
        dispatch(subMenuActive(true));    
    };

    return (
        <React.Fragment>
            <header className="page-header">
                <div className="container">
                <div className="menu-wrap">
                    <nav className="main-menu-nav">
                        <div className="logo-wrap">
                            <Link className="logo-link">logo</Link>
                        </div>
                        <div className="menu-links">
                            <Link className="menu-btn characters-link">build character</Link>
                            <Link className="menu-btn info-link">info</Link>
                            <Link className="menu-btn info-link">contact</Link>
                        </div>
                        <div className="account-wrap">
                            <Link onClick={submenuHandler} className="account-icon"></Link>
                            {subMenuStatus.submenuActive ?  <HeaderSubMenu /> : null}
                            {loginFormStatus.loginFormActive ?  <LoginFrom /> : null}
                            {userData.userData && userData.userData.auth ? <div className="username-account-wrap">{userData.userData.userName}</div> : null}
                        </div>
                    </nav>
                </div>
                </div>
            </header>
        </React.Fragment>
    );
};

export default Header;