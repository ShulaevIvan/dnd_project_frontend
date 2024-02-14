import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUserCharacterItems, showItemPopup, addBlobImage } from "../../redux/slices/userSlice";

const UserCharacterPreviewInventory = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData.userData);
    const allCharacterInventory = useSelector((state) => state.userData.previewCharacter.inventory);
    const selectedCharacter = useSelector((state) => state.userData.previewCharacter.previewCharacterSelected);
    const itemPreviewPopupStatus = useSelector((state) => state.userData.previewCharacter.inventory.itemPopupShow);
    const itemViewSelected = useSelector((state) => state.userData.previewCharacter.inventory.itemPopupSelected);

    const inventoryItemPopupHandler = (itemObj, statusValue) => {
        dispatch(showItemPopup({itemData: itemObj, status: statusValue}));
    };

    useEffect(() => {
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userData.userId}/characters/${selectedCharacter.id}/inventory/`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(addUserCharacterItems({items: data.items}));
            })
        }
        fetchFunc();
    }, []);

    useEffect(() => {
        if (itemPreviewPopupStatus) {
            // const image = loadItemImage(itemViewSelected.image.data);
            // dispatch(addBlobImage({blobData: image, type: 'image/jpeg'}))
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
                    {console.log(allCharacterInventory.allCharacterItems)}
                    {allCharacterInventory.allCharacterItems ? allCharacterInventory.allCharacterItems.map((inventoryItem) => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <div className="preview-character-inventory-item">
                                    <div className="preview-character-inventory-item-quantity">{1}</div>
                                        <div className="preview-character-inventory-item-title">
                                            {inventoryItem.name}
                                        </div>
                                        <div className="preview-character-inventory-image-wrap">
                                            <img src={inventoryItem && inventoryItem.blobData ? inventoryItem.blobData : '#'} alt=""/>
                                        </div>
                                        <div className="preview-character-inventory-item-controls-row">
                                            <div className="inventory-info-item-btn-wrap">
                                                <span 
                                                    className="inventory-info-icon-btn"
                                                    onClick={() => inventoryItemPopupHandler(inventoryItem, true)}
                                                ></span>
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
                                <div className="inventory-item-popup-qnt">{itemViewSelected ? `Количество: ${itemViewSelected.quantity} шт` : null} </div>
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
                                <div className="preview-character-inventory-item-popup-title">{itemViewSelected ? itemViewSelected.name : null}</div>
                                <div className="preview-character-inventory-item-body">
                                    <div className="preview-character-inventory-img-wrap">
                                        <img src={itemViewSelected && itemViewSelected.blobData ? itemViewSelected.blobData : '#'} />
                                    </div>
                                    <div className="preview-character-inventory-item-description">
                                        <p>{itemViewSelected && itemViewSelected.description ? itemViewSelected.description : null}
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