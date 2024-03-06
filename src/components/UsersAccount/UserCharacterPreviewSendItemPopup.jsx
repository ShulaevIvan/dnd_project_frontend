import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showCharacterSendItemPopup } from "../../redux/slices/userSlice";

const UserCharacterPreviewSendItemPopup = () => {
    const sendItemPopup = useSelector((state) => state.userData.previewCharacter.inventory.sendItemPopupShow);
    const sendItemSelected = useSelector((state) => state.userData.previewCharacter.inventory.sendItemSelected);
    const dispatch = useDispatch();

    const closeSendItemPopupHandler = () => {
        dispatch(showCharacterSendItemPopup({status: false}))
    };
    
    const maxMinSendItemHandler = () => {

    };

    useEffect(() => {
        console.log(sendItemSelected)
    }, [sendItemSelected])

    return (
        <React.Fragment>
            <div className="preveiw-character-send-item-popup-wrap">
                <span 
                    className="preveiw-character-send-item-popup-close-btn"
                    onClick={closeSendItemPopupHandler}
                ></span>
                <div className="preveiw-character-send-item-popup-body">
                    <div className="preveiw-character-send-item-popup-title">Send Item Form</div>
                        <div className="output-items-row">
                            <div className="output-items-list-column">
                                <div className="output-item-wrap">
                                    <div className="output-item-name">{sendItemSelected.name}</div>
                                    <div className="output-item-value">{sendItemSelected.quantity}</div>
                                    <div className="output-item-control">
                                        <span 
                                            className="output-item-control-plus"
                                            onClick={() => maxMinSendItemHandler('plus')}
                                        ></span>
                                        <span 
                                            className="output-item-control-min"
                                            onClick={() => maxMinSendItemHandler('min')}
                                        ></span>
                                    </div>
                                </div>
                            </div>
                            <div className="output-items-target-character-column">
                                <div className="output-items-target-character-item">
                                    <span className="output-item-target-character-remove"></span>
                                    <div className="output-item-target-character">Character Name</div>
                                </div>
                            </div>
                            <div className="output-items-controls-column">
                                <div className="output-item-btn-send-wrap">
                                    <button className="output-item-btn-send">Send</button>
                                </div>
                            </div>
                        </div>
                        <div className="send-item-popup-send-item-popup-address-row">
                            <div className="send-item-othercharacters-search-wrap">
                                <label>Search character</label>
                                <input type="text" />
                            </div>
                            <div className="send-item-othercharacters-mode-wrap">
                                <div className="send-item-othercharacters-mode-self">
                                    <button>self characters</button>
                                </div>
                                <div className="send-item-othercharacters-mode-other">
                                    <button>other characters</button>
                                </div>
                            </div>
                            <div className="send-item-popup-mycharacters-column-wrap">
                                <div className="send-item-popup-mycharacter-item">mycharacter</div>
                            </div>
                            <div className="send-item-popup-othercharacters-column-wrap">
                                <div className="send-item-popup-othercharacter-item">other_character</div>
                            </div>
                        </div>        
                    </div>
                </div>
        </React.Fragment>
    )
};

export default UserCharacterPreviewSendItemPopup;