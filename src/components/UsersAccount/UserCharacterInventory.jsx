import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showItemPopup } from "../../redux/slices/userSlice";

const UserCharacterPreviewInventory = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData.userData);
    const selectedCharacter = useSelector((state) => state.userData.previewCharacter.previewCharacterSelected);
    const itemPreviewPopupStatus = useSelector((state) => state.userData.previewCharacter.inventory.itemPopupShow);
    const itemPreviewPopupSelected = useSelector((state) => state.userData.previewCharacter.inventory.itemPopupSelected);

    const inventoryItemPopupHandler = (itemObj, statusValue) => {
        dispatch(showItemPopup({itemData: itemObj, status: statusValue}));
    };

    useEffect(() => {
        if (itemPreviewPopupStatus) {
            const characterId = selectedCharacter.id;
            const userId = userData.userId;
            console.log(itemPreviewPopupSelected.name)

            // const fetchFunc = async () => {
            //     await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userData.userId}/characters/${characterId}/inventory/`)
            // }
        }
    }, [itemPreviewPopupStatus])
    
    return (
        <React.Fragment>
            <div className="preview-character-inventory-wrap">
                <div className="preview-character-inventory-title"><h3>Инвентарь</h3></div>
                <div className="preview-character-inventory-gold-wrap">
                    <div className="preview-character-money-title"><h4>Валюта:</h4></div>
                    <div className="preview-character-inventory-money-row">
                        <div className="preview-character-inventory-money-gold">
                            <span className="character-inventory-coin-title">Зол</span>
                            <span className="character-inventory-coin-icon"></span>
                            <span className="character-inventory-coin-title">{selectedCharacter ? selectedCharacter.inventory.inventoryGold.gold : null}</span>
                        </div>
                        <div className="preview-character-inventory-money-silver">
                        <span className="character-inventory-coin-title">Сер</span>
                            <span className="character-inventory-coin-icon"></span>
                            <span className="character-inventory-coin-title">{selectedCharacter ? selectedCharacter.inventory.inventoryGold.silver : null}</span>
                        </div>
                        <div className="preview-character-inventory-money-bronze">
                            <span className="character-inventory-coin-title">Брон</span>
                            <span className="character-inventory-coin-icon"></span>
                            <span className="character-inventory-coin-title">{selectedCharacter ? selectedCharacter.inventory.inventoryGold.bronze : null}</span>
                        </div>
                    </div>
                </div>
                <div className="preview-character-inventory-main-row">
                    {selectedCharacter.inventory ? selectedCharacter.inventory.inventoryItems.map((inventoryItem) => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <div className="preview-character-inventory-item">
                                    <div className="preview-character-inventory-item-quantity">{`${inventoryItem.quantity} шт`}</div>
                                        <div className="preview-character-inventory-item-title">
                                            {inventoryItem.item.length > 0 ? inventoryItem.item[0]['name'] : null}
                                        </div>
                                        <div className="preview-character-inventory-image-wrap" onClick={() => inventoryItemPopupHandler(inventoryItem, true)}>
                                            <img src="/static/media/demo.630922c5cb9e25da873b.jpg" alt=""/>
                                        </div>
                                        <div className="preview-character-inventory-item-controls-row">
                                            <div className="inventory-info-item-btn-wrap">
                                                <span className="inventory-info-icon-btn"></span>
                                            </div>
                                        <div className="inventory-send-item-btn-wrap">
                                            <span className="inventory-send-icon-btn"></span>
                                        </div>
                                        <div className="inventory-remove-item-btn-wrap">
                                            <span className="inventory-remove-icon-btn"></span>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    }) : null}

                    {itemPreviewPopupStatus ? 
                        <div className="preview-character-inventory-item-popup-wrap">
                            <span 
                                className="inventory-item-popup-close-btn"
                                onClick={() => inventoryItemPopupHandler({}, false)}
                            ></span>
                            <div className="inventory-item-popup-controls-wrap">
                                <div className="inventory-item-popup-qnt">Количество 1 шт</div>
                                <div className="inventory-item-popup-controls-row">
                                    <div className="inventory-item-popup-control-item">
                                        <span className="inventory-item-popup-add-btn"></span>
                                    </div>
                                    <div className="inventory-item-popup-control-item">
                                        <span className="inventory-item-popup-send-item-btn"></span>
                                    </div>
                                    <div className="inventory-item-popup-control-item">
                                        <span className="inventory-item-popup-remove-btn"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="preview-character-inventory-item-body-wrap">
                                <div className="preview-character-inventory-item-popup-title">title</div>
                                <div className="preview-character-inventory-item-body">
                                    <div className="preview-character-inventory-img-wrap">
                                        <img src="#" />
                                    </div>
                                    <div className="preview-character-inventory-item-description">
                                        <p>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. 
                                            Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. 
                                            В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, 
                                            используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил 
                                            без заметных изменений пять веков, но и перешагнул в электронный дизайн. 
                                            Его популяризации в новое время послужили публикация листов Letraset с 
                                            образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа 
                                            Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    : null}
                </div>
            </div>
        </React.Fragment>
    )
};


export default UserCharacterPreviewInventory;