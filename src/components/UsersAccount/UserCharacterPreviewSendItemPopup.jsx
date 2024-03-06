import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
    showCharacterSendItemPopup,
    increaseDecreaseSendItem,
    changeSendItemCharacterMode
} from "../../redux/slices/userSlice";

const UserCharacterPreviewSendItemPopup = () => {
    const sendItemPopup = useSelector((state) => state.userData.previewCharacter.inventory.sendItemPopupShow);
    const sendItemSelected = useSelector((state) => state.userData.previewCharacter.inventory.sendItemSelected);
    const sendItemSelectedQnt = useSelector((state) => state.userData.previewCharacter.inventory.sendItemCurrentQnt);
    const sendItemCharactersMode = useSelector((state) => state.userData.previewCharacter.inventory.sendItemCharactersMode);
    const userCharacters = useSelector((state) => state.userData.userCharacters);
    const characterSelected = useSelector((state) => state.userData.previewCharacter.previewCharacterSelected);
    const dispatch = useDispatch();

    const closeSendItemPopupHandler = () => {
        dispatch(showCharacterSendItemPopup({status: false}))
    };
    
    const maxMinSendItemHandler = (param, value) => {
        dispatch(increaseDecreaseSendItem({param: param, value: value}))
    };

    const selectCharacterModeHandler = (param) => {
        dispatch(changeSendItemCharacterMode({mode: param}));
    };

    useEffect(() => {
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
                                    <div className="output-item-value">{sendItemSelectedQnt}</div>
                                    <div className="output-item-control">
                                        <span 
                                            className="output-item-control-plus"
                                            onClick={() => maxMinSendItemHandler('plus', 1)}
                                        ></span>
                                        <span 
                                            className="output-item-control-min"
                                            onClick={() => maxMinSendItemHandler('min', 1)}
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
                                    <button onClick={() => selectCharacterModeHandler('self')}>self characters</button>
                                </div>
                                <div className="send-item-othercharacters-mode-other">
                                    <button onClick={() => selectCharacterModeHandler('other')}>other characters</button>
                                </div>
                            </div>
                            {sendItemCharactersMode === 'self' ? 
                                <div className="send-item-popup-mycharacters-column-wrap">
                                    {userCharacters ?  userCharacters.map((character) => {
                                        if (characterSelected.id !== character.id && characterSelected.name !== character.name) {
                                            return (
                                                <React.Fragment key={Math.random()}>
                                                    <div className="send-item-popup-mycharacter-item">{character.name}</div>
                                                </React.Fragment>
                                            )
                                        }
                                    }): null}
                                    
                                </div>
                            : sendItemCharactersMode === 'other' ? 
                                <div className="send-item-popup-othercharacters-column-wrap">
                                    <div 
                                        className="send-item-popup-othercharacter-item"
                                    >other_character</div>
                                </div>
                            : null}
                        </div>        
                    </div>
                </div>
        </React.Fragment>
    )
};

export default UserCharacterPreviewSendItemPopup;