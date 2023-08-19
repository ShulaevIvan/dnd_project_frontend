import React from "react";
import { Link } from "react-router-dom";


const Manuals = () => {
    return (
        <React.Fragment>
            <div className="container">
                <div className="manuals-wrap">
                    <div className="manual-item-box">
                        <div className="manual-item-title-wrap">
                            <h4>Player Handbook</h4>
                        </div>
                        
                    </div>
                    <div className="manual-item-box">
                        <div className="manual-item-title-wrap">
                            <h4>Player Handbook</h4>
                        </div>
                        <div className="manual-item-background-wrap">
                            <div className="manual-item-background-description-wrap">
                             <p>deasasd asddasdasd asdasdasd asdasd </p>
                             <p>deasasd asddasdasd asdasdasd asdasd </p>
                             <p>deasasd asddasdasd asdasdasd asdasd </p>
                             <p>deasasd asddasdasd asdasdasd asdasd </p>
                             <p>deasasd asddasdasd asdasdasd asdasd </p>
                             <p>deasasd asddasdasd asdasdasd asdasd </p>
                             <p>deasasd asddasdasd asdasdasd asdasd </p>
                            </div>
                            <div className="manual-item-background-btn-wrap">
                                <Link className="manual-item-background-link">Link</Link>
                            </div>
                        </div>
                    </div>
                    <div className="manual-item-box">
                        <div className="manual-item-title-wrap">
                            <h4>Player Handbook</h4>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Manuals;