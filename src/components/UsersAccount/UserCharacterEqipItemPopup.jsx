import React from "react";

const UserCharacterEqipItemPopup = (props) => {

    return (
        <React.Fragment>
            <div className="character-item-eqip-popup-wrap" style={{left: `${props.mouseCords.x / 2 - 200}px`, top: `${props.mouseCords.y / 2 - 100}px`}}>
                <div className="character-item-eqip-title">{props.infoItem.slot} Slot</div>
                <div className="character-item-eqip-close-btn-wrap">
                    <span 
                        className="character-item-eqip-close-btn"
                        onClick={() => props.itemInfoHandler(props.infoItem, false)}
                    ></span>
                </div>
                <div className="character-item-eqip-body-wrap">
                    <div className="character-item-equipped-wrap">
                        <div className="character-item-equipped">
                            <div className="character-item-equipped-title">Gold helm</div>
                            <div className="character-item-equipped-row">
                                <div className="character-item-equipped-params-wrap">
                                    <div className="character-item-equipped-params">
                                        <ul>
                                            <li>params 1</li>
                                            <li>params 2</li>
                                            <li>params 3</li>
                                            <li>params 4</li>
                                            <li>params 5</li>
                                            <li>params 6</li>
                                            <li>params 7</li>
                                            <li>params 8</li>
                                            <li>params 9</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="character-item-equipped-image-wrap">
                                    <div className="character-item-equipped-image">
                                        <img src="#" alt="img"/>
                                    </div>
                                    <div className="character-item-equipped-description">
                                        <p>description</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="character-inventory-items-wrap">
                        <div className="character-inventory-items-title">Inventory items by slot</div>
                        <select id="pet-select">
                            <option value="">--Please choose an option--</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="hamster">Hamster</option>
                            <option value="parrot">Parrot</option>
                            <option value="spider">Spider</option>
                            <option value="goldfish">Goldfish</option>
                        </select>
                        <div className="character-inventory-items-controls">
                            <button>eqip selected</button>
                            <button>uneqip item</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default UserCharacterEqipItemPopup;