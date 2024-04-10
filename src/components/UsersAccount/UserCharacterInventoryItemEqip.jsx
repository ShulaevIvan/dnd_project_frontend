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
            dispatch(showCharacterEqipPopup({status: false, positionX: Number(cords.y / 1.2), positionY: Number(cords.x - 400)}));
            return;
        }
        dispatch(showCharacterEqipPopup({status: status, positionX: Number(cords.y / 1.2), positionY: Number(cords.x - 400)}));
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
                                                        <span>{item.name}</span>
                                                        <span className="visual-eqip-info">info</span>
                                                    </div>
                                                    <div className="visual-eqip-item-body">
                                                        <div className="visual-eqip-item-class">magic</div>
                                                        <div className="visual-eqip-item-name">test item name equip</div>
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
                                                    <div className="visual-eqip-item-title">{item.name}</div>
                                                    <div className="visual-eqip-item-body">
                                                        <div className="visual-eqip-item-class">magic</div>
                                                        <div className="visual-eqip-item-name">test item name equip</div>
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
                
            </div>
        </React.Fragment>
    )
};

export default UserCharacterInventoryItemEqip;