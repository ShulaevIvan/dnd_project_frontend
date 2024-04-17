import React from "react";
import { useSelector, useDispatch } from "react-redux";
import UserCharacterEquipItemPopup from "./UserCharacterEquipItemPopup";
import { useEffect } from "react";
import { 
    showCharacterEquipPopup,
    showCharacterEquipItemInfoPopup,
    addCharacterEquipItems

} from "../../redux/slices/userSlice";

const UserCharacterInventoryItemEquip = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData.userData);
    const selectedCharacter = useSelector((state) => state.userData.previewCharacter.previewCharacterSelected);
    const characterEquipPopupStatus = useSelector((state) => state.userData.previewCharacter.inventory.characterEquipPopupStatus);
    const characterEquipItemInfoPopupStatus = useSelector((state) => state.userData.previewCharacter.inventory.characterEquipItemInfoPopupShow);
    const characterEquipItemInfoSelected = useSelector((state) => state.userData.previewCharacter.inventory.characterEquipItemInfoPopupSelect);
    const characterEquipItems = useSelector((state) => state.userData.previewCharacter.inventory.characterEquipItems);
    const allCharacterEquipItems = useSelector((state) => state.userData.previewCharacter.inventory.allCharacterEquipItems);
    const mouseCords = useSelector((state) => state.userData.previewCharacter.inventory.characterEquipPopupPosition);
    

    const characterEquipPopupHandler = (e, status) => {
        const cords = {x: e.clientX, y: e.clientY};
        if (characterEquipPopupStatus) {
            dispatch(showCharacterEquipPopup({status: status, positionX: Number(cords.y), positionY: Number(cords.x - 200), equipItems: []}));
            return;
        }

        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userData.userId}/characters/${selectedCharacter.id}/inventory/?equip=items`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(showCharacterEquipPopup({
                    status: status, 
                    positionX: Number(cords.y), 
                    positionY: Number(cords.x - 200),
                    equipItems: data.items
                }));
            });
        };
        fetchFunc();
    };

    const characterItemInfoPopupHandler = (itemObj, status) => {
        const item_stats = getBaseItemInfo(itemObj.slot);
        dispatch(showCharacterEquipItemInfoPopup({status: status, eqipItem: itemObj, itemParams: item_stats}));
    };

    const getBaseItemInfo = (slot) => {
        if (slot && allCharacterEquipItems && allCharacterEquipItems.length > 0) {
            return allCharacterEquipItems.find((equipItem) => equipItem.slot === slot).item;
        }
        return 'none';
    };

    useEffect(() => {
        if (characterEquipPopupStatus) {
            const fetchFunc = async () => {
                const url = `${process.env.REACT_APP_BACKEND_URL}/api/users/${userData.userId}/characters/${selectedCharacter.id}/inventory/equipped-items/`;
                await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    dispatch(addCharacterEquipItems({equipItems: data.items}));
                })
            }
            fetchFunc();
        }
    }, [characterEquipPopupStatus])

    return (
        <React.Fragment>
            <div className="preview-character-eqip-main-row">
                <div className="preview-character-eqip-btn-wrap">
                    <span className="preview-character-eqip-title"><h4>Экипировка:</h4></span>
                    <span 
                        className="preview-character-eqip-btn"
                        onClick={(e) => characterEquipPopupHandler(e, true)}
                    ></span>
                </div>

                {characterEquipPopupStatus ?
                    <div className="preview-character-eqip-popup-wrap" style={{left: `${mouseCords.x}px`, top: `${mouseCords.y}px`}}>
                        <div className="preview-character-eqip-popup-close-wrap">
                            <span 
                                className="preview-character-eqip-popup-close-btn"
                                onClick={(e) => characterEquipPopupHandler(e, false)}
                            ></span>
                        </div>
                        <div className="preview-character-eqip-popup-header">
                            <h3>Надетые вещи</h3>
                        </div>

                        <div className="eqip-container-body">
                            <div className="eqip-left-side">
                                {characterEquipItems.filter((itemObj) => itemObj.position === 'left').map((item) => {
                                    return (
                                        <React.Fragment key={Math.random()}>
                                            <div className={`eqip-${item.name}-wrap`}>
                                                <div className="visual-eqip-item">
                                                    <div className="visual-eqip-item-title">
                                                        <span className="visual-eqip-item-name">{item.slot}</span>
                                                        <span 
                                                            className="visual-eqip-info"
                                                            onClick={() => characterItemInfoPopupHandler(item, true)}
                                                        ></span>
                                                    </div>
                                                    <div className="visual-eqip-item-body">
                                                        <div className="visual-eqip-item-class">magic</div>
                                                        <div className="visual-eqip-item-name">{getBaseItemInfo(item.slot).name}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>

                            <div className="eqip-right-side">
                                {characterEquipItems.filter((itemObj) => itemObj.position === 'right').map((item) => {
                                    return (
                                        <React.Fragment key={Math.random()}>
                                            <div className={`eqip-${item.name}-wrap`}>
                                                <div className="visual-eqip-item">
                                                    <div className="visual-eqip-item-title">
                                                        <span className="visual-eqip-item-name">{item.slot}</span>
                                                        <span 
                                                            className="visual-eqip-info"
                                                            onClick={() => characterItemInfoPopupHandler(item, true)}
                                                        ></span>
                                                    </div>
                                                    <div className="visual-eqip-item-body">
                                                        <div className="visual-eqip-item-class">magic</div>
                                                        <div className="visual-eqip-item-name">{getBaseItemInfo(item.slot).name}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {characterEquipItemInfoPopupStatus ? 
                                                <UserCharacterEquipItemPopup
                                                    key={Math.random()} 
                                                    itemInfoHandler={characterItemInfoPopupHandler}
                                                    infoItem={characterEquipItemInfoSelected}
                                                    item={item.equipItem}
                                                    mouseCords={mouseCords}
                                                /> 
                                            : null}
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

export default UserCharacterInventoryItemEquip;