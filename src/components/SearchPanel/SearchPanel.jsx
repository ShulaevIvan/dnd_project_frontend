import React from "react";


const SeachPanel = () => {
    return (
        <React.Fragment>
            <div  className="main-search-wrap container">
                <div className="main-search-input-wrap">
                    <span className="main-search-btn"></span>
                    <input className="main-search-input" type="text"  placeholder="search"/>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SeachPanel;