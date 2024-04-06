import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";

import { 
    showSendGoldPopup,
    moneyTransferSendBtn,
    moneyTransferSelectType,
    moneyTransferInput,
    updateCharacterMoney,
    moneyTransferSendMode,
    moneyTransferSelectCharacter,

} from "../../redux/slices/userSlice";

const UserCharacterInventoryGoldTransferPopup = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData.userData);
    const charMoneyTypes = useSelector((state) => state.userData.previewCharacter.inventory.moneyTypes);
    const selectedCharacter = useSelector((state) => state.userData.previewCharacter.previewCharacterSelected);
    const moneyTransferSendBtnStatus = useSelector((state) => state.userData.previewCharacter.inventory.moneyTransferSendBtnActive);
    const moneyTransferToCharacterSend = useSelector((state) => state.userData.previewCharacter.inventory.moneyTransferSelectedCharacter);
    const moneyTransferSendModeActive = useSelector((state) => state.userData.previewCharacter.inventory.moneyTransferSendMode);
    const userCharacters = useSelector((state) => state.userData.userCharacters);

    const moneyTransferInputRef = useRef(null);

    const characterMoneyTransferPopupHandler = (popupStatus) => {
        dispatch(showSendGoldPopup({status: popupStatus}));
    };

    const characterTransferMoneySelectHandler = (moneyObj) => {
        let status = true;
        if (moneyObj.active) {
            status = false;
            dispatch(moneyTransferSendBtn({status: true}));
            dispatch(moneyTransferSelectType({moneyType: moneyObj.moneyType, status: status}));
            moneyTransferInputRef.current.value = '';
            return;
        }
        moneyTransferInputRef.current.value = selectedCharacter.inventory.inventoryGold[`${moneyObj.moneyType.toLowerCase()}`];
        dispatch(moneyTransferSelectType({moneyType: moneyObj.moneyType, status: status}));
        dispatch(moneyTransferInput({
            moneyType: moneyObj.moneyType,
            value: Number(moneyTransferInputRef.current.value),
            status: true
        }));
    };

    const getCharacterTransferMaxGold = () => {
        const activeMoneyType = charMoneyTypes.find((item) => item.active);
        if (!activeMoneyType) return;
        const value = selectedCharacter.inventory.inventoryGold[`${activeMoneyType.moneyType.toLowerCase()}`];
        return `Max ${activeMoneyType.moneyType} ${value}`;
    };

    const moneyTransferInputClearHandler = () => {
        moneyTransferInputRef.current.value = '';
        dispatch(moneyTransferSendBtn({status: true}));
    };

    const moneyTransferInputHandler = () => {
        const selectedMoney = charMoneyTypes.find((item) => item.active);
        if (selectedMoney) {
            dispatch(moneyTransferInput({
                type: selectedMoney.moneyType.toLowerCase(),
                value: Number(moneyTransferInputRef.current.value),
                status: true
            }));
        }
    };

    const moneyTransferSendHandler = () => {
        const sendData = {
            moneyData: {
                money: charMoneyTypes.find((item) => item.active).moneyType.toLowerCase(),
                value: Number(moneyTransferInputRef.current.value),
            },
            charSend: {
                id: selectedCharacter.id, 
                name: selectedCharacter.name
            },
            charRecive: {
                id: moneyTransferToCharacterSend.character.id, 
                name: moneyTransferToCharacterSend.character.name
            }
        };
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userData.userId}/characters/${selectedCharacter.id}/inventory/?send=gold`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sendData)
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(updateCharacterMoney({
                    characterId: selectedCharacter.id, 
                    characterName: selectedCharacter.name,
                    moneyData: data.money
                }));
            });
        };
        fetchFunc();
    };

    const moneyTransferSelectModeHandler = (mode) => {
        dispatch(moneyTransferSendMode({mode: mode}));
    };

    const moneyTransferUserCharactersView = () => {
        const uniqueCharacters = userCharacters.filter((item) => item.id !== selectedCharacter.id).map((character) => {
            return (
                <React.Fragment key={Math.random()}>
                    <div 
                        className={
                            moneyTransferToCharacterSend &&  moneyTransferToCharacterSend.character
                                && moneyTransferToCharacterSend.character.id === character.id && moneyTransferToCharacterSend.selected ? 
                                    'inventory-gold-my-character-item-selected' : 'inventory-gold-my-character-item'
                            }
                        onClick={() => goldTransferSelectCharacterHandler(character)}
                    >
                        {`${character.name} lvl (${character.lvl})`}
                    </div>
                </React.Fragment>
            )
        });
        return uniqueCharacters;
    };

    const goldTransferSelectCharacterHandler = (characterObj) => {
        if (moneyTransferToCharacterSend && !moneyTransferToCharacterSend.character) {
            dispatch(moneyTransferSelectCharacter({character: characterObj, select: true}));
            return;
        }
        dispatch(moneyTransferSelectCharacter({character: characterObj, select: false}));
    };


    return (
        <React.Fragment>
            <div className="inventory-gold-transfer-popup-wrap">
                <span 
                    className="inventory-gold-transfer-close-btn"
                    onClick={() => characterMoneyTransferPopupHandler(false)}
                ></span>
                <div className="inventory-gold-transfer-body">
                    <div className="inventory-gold-transfer-title">Gold Transfer Title</div>
                    <div className="inventory-gold-transfer-types-row">
                        {charMoneyTypes.map((item) => {
                            return (
                                <React.Fragment key={Math.random()}>
                                    <div 
                                        className={
                                            `${item.active ? 'inventory-gold-transfer-item-active' : 
                                                'inventory-gold-transfer-item'} ${item.moneyType.toLowerCase()}`
                                        }
                                        onClick={() => characterTransferMoneySelectHandler(item)}
                                    >{item.moneyType}</div>
                                </React.Fragment>
                            )
                        })}
                    </div>
                    <div className="inventory-gold-input-row">
                        <div className="inventory-gold-input-wrap">
                            <div className="inventory-gold-title">
                                {getCharacterTransferMaxGold()}
                            </div>
                            <input
                                className="inventory-gold-input" 
                                ref={moneyTransferInputRef} type="text"
                                onClick={moneyTransferInputClearHandler}
                                onChange={moneyTransferInputHandler}
                            />
                        </div>
                        <div className="inventory-gold-btn-send-wrap">
                            <button 
                                disabled={moneyTransferSendBtnStatus}
                                onClick={!moneyTransferSendBtnStatus ? moneyTransferSendHandler : null}
                            >Send</button>
                        </div>
                    </div>
                            
                    <div className="inventory-gold-character-select-wrap">
                        <div className="inventory-gold-character-select-mode-wrap">
                            <div className="inventory-gold-character-select-mode-item">
                                <button onClick={() => moneyTransferSelectModeHandler('self')}>self characters</button>
                            </div>
                            <div className="inventory-gold-character-select-mode-item">
                                <button onClick={() => moneyTransferSelectModeHandler('other')}>other characters</button>
                            </div>
                        </div>
                        {moneyTransferSendModeActive === 'self' ?
                            <div className="inventory-gold-my-characters-select-column">
                                {
                                    charMoneyTypes.filter((item) => item.active).length > 0 ? 
                                        moneyTransferUserCharactersView().map((item) => item) : null
                                }
                            </div>
                        : <div className="inventory-gold-other-characters-select-column"></div>}
                                    
                                    
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default UserCharacterInventoryGoldTransferPopup;