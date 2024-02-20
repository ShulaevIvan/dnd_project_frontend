import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUserCharacterItems, showItemPopup, showAddItemPopup, addPreloadItems} from "../../redux/slices/userSlice";

const UserCharacterPreviewInventory = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData.userData);
    const allCharacterInventory = useSelector((state) => state.userData.previewCharacter.inventory);
    const selectedCharacter = useSelector((state) => state.userData.previewCharacter.previewCharacterSelected);
    const itemPreviewPopupStatus = useSelector((state) => state.userData.previewCharacter.inventory.itemPopupShow);
    const itemViewSelected = useSelector((state) => state.userData.previewCharacter.inventory.itemPopupSelected);
    const addItemPopupStatus = useSelector((state) => state.userData.previewCharacter.inventory.showAddItemPopup);
    const preloadAddItemsPopup = useSelector((state) => state.userData.previewCharacter.inventory.preloadAddItemsPopup);

    const inventoryItemPopupHandler = (itemObj, statusValue) => {
        dispatch(showItemPopup({itemData: itemObj, status: statusValue}));
    };

    const addItemPopupHandler = (statusValue) => {
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reference_book/items/?chunk=4`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.items) {
                    dispatch(addPreloadItems({
                        weapons: data.items.weapons,
                        armor: data.items.armor,
                        instruments: data.items.instruments,
                        loadmore: false,
                    }));
                }
            });
        };
        if (statusValue) fetchFunc();
        dispatch(showAddItemPopup({status: statusValue}));
    };

    const loadMorePopupHandler = () => {
        const loadedItems = preloadAddItemsPopup.map((item) => { return ({ id: item.id, name: item.name, type: item.itemType })});
        const sendData = {
            count: 4,
            existingItems: loadedItems
        }
        
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reference_book/items/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sendData),
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(addPreloadItems({
                    weapons: data.items.weapons,
                    armor: data.items.armor,
                    instruments: data.items.instruments,
                    loadmore: true,
                }));
            })
        }
        fetchFunc();
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
                    <div className="preview-character-inventory-item-add">
                        <span 
                            className="add-character-item-btn"
                            onClick={() => addItemPopupHandler(true)}
                        ></span>
                    </div>
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
                    {addItemPopupStatus ?
                        <div className="preview-character-add-item-popup-wrap">
                            <span 
                                className="preview-character-add-item-popup-close-btn"
                                onClick={() => addItemPopupHandler(false)}
                            ></span>
                            <div className="preview-character-add-item-popup-body">
                                <div className="preview-character-add-items-search-panel-wrap">
                                    <label htmlFor="add-items-search-panel">Search item</label>
                                    <input id="add-items-search-panel" type="text" className="preview-character-add-items-search-panel"/>
                                </div>
                                <div className="preview-character-add-items-row">
                                    <div className="preview-character-add-weapons-btn-wrap">
                                        <button>add weapons</button>
                                    </div>
                                    <div className="preview-character-add-armor-btn-wrap">
                                        <button>add armor</button>
                                    </div>
                                    <div className="preview-character-add-instruments-btn-wrap">
                                        <button>add instrument</button>
                                    </div>
                                    <div className="preview-character-add-other-btn-wrap">
                                        <button>add other</button>
                                    </div>
                                </div>
                                <div className="preview-character-add-item-popup-preview">
                                    <div className="preview-character-add-item-popup-row">
                                        {preloadAddItemsPopup ? preloadAddItemsPopup.map((item) => {
                                            return (
                                                <React.Fragment key={Math.random()}>
                                                    <div className="addding-item-popup-preview">
                                                        <div className="addding-item-popup-preview-title">{item.name}</div>
                                                        <div className="adding-item-popup-preview-image-wrap">
                                                            <img src="http://localhost:3000/static/media/demo.630922c5cb9e25da873b.jpg" alt="#"/>
                                                        </div>
                                                        <div className="adding-item-popup-preview-btn-wrap">
                                                            <span className="adding-item-popup-preview-btn-info"></span>
                                                            <span className="adding-item-popup-preview-btn-add"></span>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            )
                                        }) : null}
                                    </div>
                                    <div className="preview-character-add-item-popup-load-more-wrap">
                                        <button onClick={loadMorePopupHandler}>load more</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    : null}
                    
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
                                    <div className="preview-character-inventory-item-body-row">
                                        <div className="preview-character-inventory-img-wrap">
                                            <img src={itemViewSelected && itemViewSelected.blobData ? itemViewSelected.blobData : '#'} />
                                        </div>
                                        <div className="preview-character-invewntory-item-parametrs">
                                            <ul>
                                                <li>1</li>
                                                <li>1</li>
                                                <li>1</li>
                                                <li>1</li>
                                                <li>1</li>
                                                <li>1</li>
                                            </ul>
                                        </div>
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