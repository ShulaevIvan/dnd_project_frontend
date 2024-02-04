import React from "react";

const UserCharacterPreviewInventory = () => {
    return (
        <React.Fragment>
            <div className="preview-character-inventory-wrap">
                <div className="preview-character-inventory-title"><h3>Инвентарь</h3></div>
                <div className="preview-character-inventory-gold-wrap">
                    <div className="preview-character-money-title"><h4>Валюта:</h4></div>
                    <div className="preview-character-inventory-money-row">
                        <div className="preview-character-inventory-money-gold">
                            <span className="character-inventory-coin-title">Зол</span>
                            <span className="character-inventory-coin-icon"></span>
                            <span className="character-inventory-coin-title">100</span>
                        </div>
                        <div className="preview-character-inventory-money-silver">
                        <span className="character-inventory-coin-title">Сер</span>
                            <span className="character-inventory-coin-icon"></span>
                            <span className="character-inventory-coin-title">100</span>
                        </div>
                        <div className="preview-character-inventory-money-bronze">
                            <span className="character-inventory-coin-title">Брон</span>
                            <span className="character-inventory-coin-icon"></span>
                            <span className="character-inventory-coin-title">100</span>
                        </div>
                    </div>
                </div>
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