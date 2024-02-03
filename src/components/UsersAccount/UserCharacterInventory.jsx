import React from "react";

const UserCharacterPreviewInventory = () => {
    return (
        <React.Fragment>
            <div className="preview-character-inventory-wrap">
                <div className="preview-character-inventory-main-row">
                    <div className="preview-character-inventory-item">
                        <div className="preview-character-inventory-item-title">Title</div>
                        <div className="preview-character-inventory-image-wrap">
                            <img src="/static/media/demo.630922c5cb9e25da873b.jpg" alt=""/>
                        </div>
                        <div className="preview-character-inventory-item-controls-row">
                            <div className="inventory-info-item-btn-wrap">
                                <span className="inventory-info-icon-btn"></span>
                            </div>
                            <div className="inventory-send-item-btn-wrap">
                                <span className="inventory-send-icon-btn"></span>
                            </div>
                            <div className="inventory-remove-item-btn-wrap">
                                <span className="inventory-remove-icon-btn"></span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="preview-character-inventory-item">
                        <div className="preview-character-inventory-item-title">Title</div>
                        <div className="preview-character-inventory-image-wrap">
                            <img src="/static/media/demo.630922c5cb9e25da873b.jpg" alt=""/>
                        </div>
                        <div className="preview-character-inventory-item-controls-row">
                            <div className="inventory-info-item-btn-wrap">
                                <span className="inventory-info-icon-btn"></span>
                            </div>
                            <div className="inventory-send-item-btn-wrap">
                                <span className="inventory-send-icon-btn"></span>
                            </div>
                            <div className="inventory-remove-item-btn-wrap">
                                <span className="inventory-remove-icon-btn"></span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </React.Fragment>
    )
};


export default UserCharacterPreviewInventory;