import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginFormActive } from "../../redux/slices/headerLoginFormSlice";
import { subMenuActive }  from '../../redux/slices/subMenuSlice';


const HeaderSubMenu = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData);
    const headerLoginForm = useSelector((state) => state.headerLoginForm);

    const loginHandler = (e) => {
        dispatch(subMenuActive(false));
        dispatch(loginFormActive(true));
    };

    const logoutHandler = () => {
        console.log('logout');
    };

    return (
        <React.Fragment>
            <ul className="account-options account-options">
                {userData.isAuthenticated ?  <li><Link>Мои персонажи</Link></li> : null }
                {userData.isAuthenticated ? <li><Link onClick={logoutHandler}>Выйти</Link></li> : <li><Link onClick={(e) => loginHandler(e)}>Войти</Link></li>}
            </ul>
            <div>
                
            </div>
        </React.Fragment>
    );
};

export default HeaderSubMenu;