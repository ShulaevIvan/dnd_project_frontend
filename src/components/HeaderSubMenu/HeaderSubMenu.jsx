import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginFormActive } from "../../redux/slices/headerLoginFormSlice";
import { subMenuActive }  from '../../redux/slices/subMenuSlice';
import { logoutUser } from "../../redux/slices/userSlice";

const HeaderSubMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.userData);

    const loginHandler = (e) => {
        dispatch(subMenuActive(false));
        dispatch(loginFormActive(true));
    };


    const logoutHandler = async () => {
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/logout/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: userData.userData.userId,  email: userData.userData.userEmail}),
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(logoutUser());
                dispatch(subMenuActive(false));
                navigate('/')
            });
        };
        fetchFunc();
    };

    const autoCloseSubmenuHandler = () => {
        dispatch(subMenuActive(false));
    };

    return (
        <React.Fragment>
            <ul className="account-options account-options">
                {userData.isAuthenticated ?  <li><Link onClick={autoCloseSubmenuHandler} to={'/profile/'}>Profile</Link></li> : null }
                {userData.isAuthenticated ?  <li><Link onClick={autoCloseSubmenuHandler} to={'/profile/characters/'}>My Characters</Link></li> : null }
                {userData.isAuthenticated ? 
                    <li><Link onClick={logoutHandler}>Logout</Link></li> : 
                    <li><Link onClick={(e) => loginHandler(e)}>Login</Link></li>}
            </ul>
            <div>
                
            </div>
        </React.Fragment>
    );
};

export default HeaderSubMenu;