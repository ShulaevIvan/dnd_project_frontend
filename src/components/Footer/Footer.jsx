import React from "react";
import { Link } from "react-router-dom";

const Footer =  () => {
    return (
        <React.Fragment>
            <footer className="footer">
                <div className="footer-top">
                    <div className="footer-logo-block">
                        Logo
                    </div>
                    <div className="footer-menu-wrap">
                        <div className="footer-column">
                            <div className="footer-column-content">
                                <h4>Title 1</h4>
                                <Link href="#" className="footer-link">Link  1</Link>
                                <Link href="#" className="footer-link">Link  2</Link>
                                <Link href="#" className="footer-link">Link  3</Link>
                                <Link href="#" className="footer-link">Link  4</Link>
                                <Link href="#" className="footer-link">Link  5</Link>
                            </div>
                        </div>
                        <div className="footer-column">
                            <div className="footer-column-content">
                                <h4>Title 2</h4>
                                <Link href="#" className="footer-link">Link  1</Link>
                                <Link href="#" className="footer-link">Link  2</Link>
                                <Link href="#" className="footer-link">Link  3</Link>
                            </div>
                        </div>
                        <div className="footer-column">
                            <div className="footer-column-content">
                                <h4>Title 3</h4>
                                <Link href="#" className="footer-link">Link  1</Link>
                                <Link href="#" className="footer-link">Link  2</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-copy"><Link href="#">copyright@demo.com</Link></div>
                </div>
            </footer>
        </React.Fragment>
    );
};

export default Footer;