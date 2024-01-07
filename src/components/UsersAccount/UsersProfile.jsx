import React from "react";

import UsersCharacters from "./UsersCharacters";
import UsersAccopuntPopup from "./UsersAccountPopup";

const UsersProfile = () => {
    return (
        <React.Fragment>
            <div className="user-profile-main-row">
                <div className="user-profile-main-wrap">
                    <div className="user-profile-avatar-column">
                        <h2>Profile Name</h2>
                        <div className="user-profile-avatar-wrap">
                            <div className="user-profile-avatar">
                                <img src="#" />
                            </div>
                            <div className="user-profile-avatar-controls-wrap">
                                <div className="user-profile-avatar-btn-wrap">
                                    <button>Upload image</button>
                                </div>
                            </div>
                        </div>
                        {/* <UsersAccopuntPopup /> */}
                    </div>

                    <div className="user-profile-main-column">
                        <div className="user-profile-min-info-wrap">
                            <div className="user-info-controls">
                                <div className="user-profile-username">
                                    <span className="user-info-controls-title">Username:</span> 
                                    <span className="user-profile-value">TEST NAME</span> 
                                    <span className="user-profile-edit-btn"></span>
                                </div>
                                <div className="user-profile-email">
                                    <span className="user-info-controls-title">Email:</span>  
                                    <span className="user-profile-value">TEST NAME</span> 
                                    <span className="user-profile-edit-btn"></span>
                                </div>
                                <div className="user-profile-password">
                                    <span className="user-info-controls-title">Password:</span> 
                                    <span className="user-profile-value">TEST NAME</span>
                                    <span className="user-profile-edit-btn"></span>
                                </div>
                                <div className="user-profile-password">
                                    <span className="user-info-controls-title">City:</span>
                                    <span className="user-profile-value">TEST NAME</span>
                                    <span className="user-profile-edit-btn"></span>
                                </div>
                                <div className="user-profile-password">
                                    <span className="user-info-controls-title">Phone:</span>
                                    <span className="user-profile-value">TEST NAME</span>
                                    <span className="user-profile-edit-btn"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <UsersCharacters />
            </div>


        </React.Fragment>
    )
};

export default UsersProfile;