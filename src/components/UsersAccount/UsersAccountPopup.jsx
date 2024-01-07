import React from "react";

const UsersAccopuntPopup = () => {
    return (
        <React.Fragment>
            <div className="user-info-controls-popup-wrap">
                <div className="user-info-controls-popup-close-wrap">
                    <span className="user-info-controls-popup-close-btn"></span>
                </div>
                <div className="user-info-controls-popup-title">
                    Title
                </div>
                <div className="user-info-controls-popup-inputs">
                    <div className="user-info-controls-popup-input">
                        <label>Label for input</label>
                        <input type="text" />
                    </div>
                    <div className="user-info-controls-popup-input">
                        <label>Label for input</label>
                        <input type="text" />
                    </div>
                </div>
                <div className="user-info-controls-popup-save-wrap">
                    <div className="user-info-controls-popup-save-btn">
                        <button>save</button>
                    </div>
                </div>
               
            </div>
        </React.Fragment>
    )
};

export default UsersAccopuntPopup;