import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";

import { 
    addMoneyPopupBtnSaveStatus, 
    showCharacterAddMoneyPopup,
    updateCharacterMoney,
    addMoneySelectType,
} from "../../redux/slices/userSlice";

const UserCharacterPreviewAddMoneyPopup = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData.userData);
    const charMoneyTypes = useSelector((state) => state.userData.previewCharacter.inventory.moneyTypes);
    const selectedCharacter = useSelector((state) => state.userData.previewCharacter.previewCharacterSelected);
    const addMoneyPopupMode = useSelector((state) => state.userData.previewCharacter.inventory.addMoneyPopupMode);
    const addMoneyBtnStatus = useSelector((state) => state.userData.previewCharacter.inventory.addMoneyPopupBtnSave);

    const addCharacterMoneyInputRef = useRef(null);

    const checkActiveMoneyType = () => {
        const moneyTypeActive = charMoneyTypes.find((item) => item.active);
        if (moneyTypeActive) return moneyTypeActive.moneyType;
        return '';
    };

    const selectMoneyTypeHandler = (moneyObj) => {
        dispatch(addMoneyPopupBtnSaveStatus({status: true}));
        dispatch(addMoneySelectType({moneyType: moneyObj.moneyType, status: true}));
    };

    const addMoneyPopupHandler = (popupStatus, caclMode) => {
        dispatch(addMoneyPopupBtnSaveStatus({status: true}));
        if (addCharacterMoneyInputRef.current && !popupStatus) addCharacterMoneyInputRef.current.value = '';
        dispatch(showCharacterAddMoneyPopup({status: popupStatus, mode: caclMode}));
    };

    const addCharacterMoneyInputHandler = () => {
        if (addCharacterMoneyInputRef.current && Number(addCharacterMoneyInputRef.current.value) && !isNaN(addCharacterMoneyInputRef.current.value)) {
            console.log(isNaN(addCharacterMoneyInputRef.current.value))
            dispatch(addMoneyPopupBtnSaveStatus({status: false}));
            return;  
        }
        dispatch(addMoneyPopupBtnSaveStatus({status: true}));
        addCharacterMoneyInputRef.current.value = '';
    };

    const addCharacterMoneyClearInputHandler = () => {
        if (addCharacterMoneyInputRef.current && addCharacterMoneyInputRef.current.value) {
            dispatch(addMoneyPopupBtnSaveStatus({status: true}));
            addCharacterMoneyInputRef.current.value = '';
            return;  
        }
    };

    const addCharacterMoneySaveHandler = () => {
        const moneyTypeActive = checkActiveMoneyType();
        if (moneyTypeActive && addCharacterMoneyInputRef.current.value) {
            const sendData = {
                characterId: selectedCharacter.id,
                characterName: selectedCharacter.name,
                moneyType: moneyTypeActive.toLowerCase(),
                moneyValue: addCharacterMoneyInputRef.current.value,
                mode: addMoneyPopupMode,
            };
            const fetchFunc = async () => {
                await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userData.userId}/characters/${selectedCharacter.id}/inventory/?add=gold`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(sendData)
                })
                .then((response) => {
                    if (response.status === 201) {
                        dispatch(addMoneyPopupBtnSaveStatus({status: true}));
                        dispatch(showCharacterAddMoneyPopup({status: false, mode: 'plus'}));
                        addCharacterMoneyInputRef.current.value = '';
                        return response.json();
                    }
                })
                .then((data) => {
                    dispatch(updateCharacterMoney({
                        characterId: selectedCharacter.id, 
                        characterName: selectedCharacter.name,
                        moneyData: data.money
                    }));
                });
            };
            fetchFunc();
        }
    };

    return (
        <React.Fragment>
            <div className="add-character-gold-popup-wrap">
                <div className="add-character-money-close-btn-wrap">
                    <span 
                        className="add-character-money-close-btn"
                        onClick={() => addMoneyPopupHandler(false)}
                    ></span>
                </div>

                <div className="add-character-money-popup-header">
                    <div className="add-character-money-mode">{`Mode: ${addMoneyPopupMode}`}</div>
                        <div className="add-character-money-select-row">
                            {charMoneyTypes.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <div className={`add-character-money-item-btn ${item.active ? 'add-character-money-item-btn-active': null}`}>
                                            <button onClick={() => selectMoneyTypeHandler(item, true)}>{item.moneyType}</button>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    </div>

                    <div className="add-character-money-popup-body">
                        <div className="add-character-money-input-title">
                            <h3>{`${checkActiveMoneyType()} input`}</h3>
                            <div className="add-character-money-input-wrap">
                                <input
                                    ref={addCharacterMoneyInputRef} 
                                    className="add-character-money-input" type="text"
                                    onChange={addCharacterMoneyInputHandler}
                                    onClick={addCharacterMoneyClearInputHandler}
                                />
                            </div>
                        </div>
                        <div className="add-character-money-controls-wrap">
                            <div className="add-character-money-controls-save-btn-wrap">
                                <button 
                                    disabled={addMoneyBtnStatus}
                                    onClick={!addMoneyBtnStatus ? addCharacterMoneySaveHandler : null}
                                >save</button>
                            </div>
                            <div className="add-character-money-controls-cancel-btn-wrap">
                                <button onClick={() => addMoneyPopupHandler(false)}>cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
        </React.Fragment>
    )
};

export default UserCharacterPreviewAddMoneyPopup;