import React from "react";
import { useSelector, useDispatch } from "react-redux";



const UserCharacterEquipItemPopup = (props) => {
    const dispatch = useDispatch();
    
    return (
        <React.Fragment>
            <div className="character-item-eqip-popup-wrap" style={{left: `${props.mouseCords.x}px`, top: `${props.mouseCords.y}px`}}>
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
                            <div className="character-item-equipped-title">{props.infoItem.itemParams.name} {props.infoItem.itemId}</div>
                            <div className="character-item-equipped-row">
                                <div className="character-item-equipped-params-wrap">
                                    <div className="character-item-equipped-params">
                                        <ul>
                                            {Object.entries(props.infoItem.itemParams).map((param) => {
                                                return (
                                                    <React.Fragment key={Math.random()}>
                                                        <li>{`${param[0]} ${param[1]}`}</li>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="character-item-equipped-image-wrap">
                                    <div className="character-item-equipped-image">
                                        <img src="#" alt="img"/>
                                    </div>
                                    <div className="character-item-equipped-description">
                                        <p>{props.infoItem.itemParams.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="character-inventory-items-wrap">
                        <div className="character-inventory-items-title">Inventory items by slot</div>
                        <div className="character-inventory-items-wrap-select">
                            <select className="item-select">
                                <option value="">--Please choose an option--</option>
                                <option value="item 0">test</option>
                                <option value="item 1">test2</option>
                                <option value="item 2">test3</option>
                                <option value="item 3">test4</option>
                                <option value="item 4">test5</option>
                                <option value="item 5">test6</option>
                            </select>
                        </div>
                        <div className="character-inventory-items-controls">
                            <button onClick={() => props.addItemPopupHandler(true)}>add new</button>
                            <button>eqip selected</button>
                            <button>uneqip item</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default UserCharacterEquipItemPopup;