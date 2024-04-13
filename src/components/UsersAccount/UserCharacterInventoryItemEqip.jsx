import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { 
    showCharacterEqipPopup
} from "../../redux/slices/userSlice";

const UserCharacterInventoryItemEqip = () => {
    const dispatch = useDispatch();
    const characterEqipPopupStatus = useSelector((state) => state.userData.previewCharacter.inventory.characterEqipPopupStatus);
    const characterEqipItems = useSelector((state) => state.userData.previewCharacter.inventory.characterEqipItems);
    const mouseCords = useSelector((state) => state.userData.previewCharacter.inventory.characterEqipPopupPosition);

    const characterEqipPopupHandler = (e, status) => {
        const cords = {x: e.clientX, y: e.clientY};
        if (characterEqipPopupStatus){
            dispatch(showCharacterEqipPopup({status: false, positionX: Number(cords.y), positionY: Number(cords.x - 200)}));
            return;
        }
        dispatch(showCharacterEqipPopup({status: status, positionX: Number(cords.y), positionY: Number(cords.x - 200)}));
    };

    const characterItemInfoPopupHandler = (itemObj) => {
        console.log(itemObj)
    };

    

    return (
        <React.Fragment>
            <div className="preview-character-eqip-main-row">
                <div className="preview-character-eqip-btn-wrap">
                    <span className="preview-character-eqip-title"><h4>Экипировка:</h4></span>
                    <span 
                        className="preview-character-eqip-btn"
                        onClick={(e) => characterEqipPopupHandler(e, true)}
                    ></span>
                </div>

                {characterEqipPopupStatus ?
                    <div className="preview-character-eqip-popup-wrap" style={{left: `${mouseCords.x}px`, top: `${mouseCords.y}px`}}>
                        <div className="preview-character-eqip-popup-close-wrap">
                            <span 
                                className="preview-character-eqip-popup-close-btn"
                                onClick={(e) => characterEqipPopupHandler(e, false)}
                            ></span>
                        </div>
                        <div className="preview-character-eqip-popup-header">
                            <h3>Надетые вещи</h3>
                        </div>

                        <div className="eqip-container-body">
                            <div className="eqip-left-side">
                                {characterEqipItems.filter((itemObj) => itemObj.position === 'left').map((item) => {
                                    return (
                                        <React.Fragment key={Math.random()}>
                                            <div className={`eqip-${item.name}-wrap`}>
                                                <div className="visual-eqip-item">
                                                    <div className="visual-eqip-item-title">
                                                        <span className="visual-eqip-item-name">{item.name}</span>
                                                        <span 
                                                            className="visual-eqip-info"
                                                            onClick={() => characterItemInfoPopupHandler(item)}
                                                        ></span>
                                                    </div>
                                                    <div className="visual-eqip-item-body">
                                                        <div className="visual-eqip-item-class">magic</div>
                                                        <div className="visual-eqip-item-name">test item name equip</div>
                                                    </div>
                                                    <div className="visual-eqip-item-controls">
                                                        <div className="visual-eqip-item-add-btn-wrap">
                                                            <button>add</button>
                                                        </div>
                                                        <div className="visual-eqip-item-remove-btn-wrap">
                                                            <button>remove</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>

                            <div className="eqip-right-side">
                                {characterEqipItems.filter((itemObj) => itemObj.position === 'right').map((item) => {
                                    return (
                                        <React.Fragment key={Math.random()}>
                                            <div className={`eqip-${item.name}-wrap`}>
                                                <div className="visual-eqip-item">
                                                    <div className="visual-eqip-item-title">
                                                        <span className="visual-eqip-item-name">{item.name}</span>
                                                        <span 
                                                            className="visual-eqip-info"
                                                            onClick={() => characterItemInfoPopupHandler(item)}
                                                        ></span>
                                                    </div>
                                                    <div className="visual-eqip-item-body">
                                                        <div className="visual-eqip-item-class">magic</div>
                                                        <div className="visual-eqip-item-name">test item name equip</div>
                                                    </div>
                                                    <div className="visual-eqip-item-controls">
                                                        <div className="visual-eqip-item-add-btn-wrap">
                                                            <button>add</button>
                                                        </div>
                                                        <div className="visual-eqip-item-remove-btn-wrap">
                                                            <button>remove</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                : null}
                <div className="character-item-eqip-popup-wrap">
                    <div className="character-item-eqip-title">Head Slot</div>
                    <div className="character-item-eqip-close-btn-wrap"></div>
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
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default UserCharacterInventoryItemEqip;