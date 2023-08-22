import { Outlet } from "react-router-dom";

import React from "react";
import Header from "../Header/Header";

import Footer from "../Footer/Footer";


const Layout = () => {
    return (
        <React.Fragment>
            <Header></Header>
            <div className="main-container">
                <Outlet />
            </div>
            <Footer></Footer>
        </React.Fragment>
    );
};

export default Layout