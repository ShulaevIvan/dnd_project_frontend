import React from "react";

const CharacterStepsInventory = () => {
    return (
        <React.Fragment>
            <div className="character-total-inventory-title">Start Inventory</div>
            <div className="character-total-inventory-wrap">
                <div className="character-total-inventory-row">
                    <div className="character-inventory-item-wrap">
                        <div className="character-inventory-gold-title">Char gold: </div>
                        <div className="character-inventory-gold-row">
                            <div className="character-inventory-gold-item">
                                <div className="mm">
                                    <span className="coin-icon"></span>
                                    <span className="coin-value">0</span>
                                </div>
                            </div>
                            <div className="character-inventory-gold-item">
                                <div className="sm">
                                    <span className="coin-icon"></span>
                                    <span className="coin-value">0</span>
                                </div>
                            </div>
                            <div className="character-inventory-gold-item">
                                <div className="zm">
                                    <span className="coin-icon"></span>
                                    <span className="coin-value">0</span>
                                </div>
                            </div>
                            <div className="character-inventory-gold-item">
                                <div className="em">
                                    <span className="coin-icon"></span>
                                    <span className="coin-value">0</span>
                                </div>
                            </div>
                            <div className="character-inventory-gold-item">
                                <div className="pm">
                                    <span className="coin-icon"></span>
                                    <span className="coin-value">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="character-inventory-item-wrap">inventory item</div>
                    <div className="character-inventory-item-wrap">inventory item</div>
                    <div className="character-inventory-item-wrap">inventory item</div>
                    <div className="character-inventory-item-wrap">inventory item</div>
                    <div className="character-inventory-item-wrap">inventory item</div>
                    <div className="character-inventory-item-wrap">inventory item</div>
                    <div className="character-inventory-item-wrap">inventory item</div>
                    <div className="character-inventory-item-wrap">inventory item</div>
                </div>

                <div className="character-stranges-weakness-row">
                    <div className="character-stranges-wrap">
                        <div className="character-stranges-item">stranges item</div>
                        <div className="character-stranges-item">stranges item</div>
                        <div className="character-stranges-item">stranges item</div>
                        <div className="character-stranges-item">stranges item</div>
                        <div className="character-stranges-item">stranges item</div>
                    </div>
                    <div className="character-weakness-wrap">
                        <div className="character-weakness-item">weakness item</div>
                        <div className="character-weakness-item">weakness item</div>
                        <div className="character-weakness-item">weakness item</div>
                        <div className="character-weakness-item">weakness item</div>
                        <div className="character-weakness-item">weakness item</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default CharacterStepsInventory;