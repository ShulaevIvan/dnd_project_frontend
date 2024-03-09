import React from "react";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
    addUserCharacterItems,
    removeUserCharacterItems,
    showItemPopup, 
    showAddItemPopup, 
    addPreloadItems,
    showInfoPopupAddItem,
    searchPopupAddItemText,
    filterPopupAddItem,
    selectPopupAddItem,
    addItemSelectQuantity,
    showCharacterSendItemPopup,
    showSendGoldPopup
} from "../../redux/slices/userSlice";

import UserCharacterPreviewSendItemPopup from "./UserCharacterPreviewSendItemPopup";

const UserCharacterPreviewInventory = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData.userData);
    const allCharacterInventory = useSelector((state) => state.userData.previewCharacter.inventory);
    const selectedCharacter = useSelector((state) => state.userData.previewCharacter.previewCharacterSelected);
    const itemPreviewPopupStatus = useSelector((state) => state.userData.previewCharacter.inventory.itemPopupShow);
    const itemViewSelected = useSelector((state) => state.userData.previewCharacter.inventory.itemPopupSelected);
    const addItemPopupStatus = useSelector((state) => state.userData.previewCharacter.inventory.showAddItemPopup);
    const selectedAddItemQuantity = useSelector((state) => state.userData.previewCharacter.inventory.addItemQuantity);
    const preloadAddItemsPopup = useSelector((state) => state.userData.previewCharacter.inventory.preloadAddItemsPopup);
    const showInfoAddItemPopup = useSelector((state) => state.userData.previewCharacter.inventory.itemInfoAddPopup);
    const selectedAddItemInfoPopup = useSelector((state) => state.userData.previewCharacter.inventory.itemInfoPopupSelected);
    const searchInputText = useSelector((state) => state.userData.previewCharacter.inventory.searchInputText);
    const filterTypeStatus = useSelector((state) => state.userData.previewCharacter.inventory.filterType);
    const sendItemPopup = useSelector((state) => state.userData.previewCharacter.inventory.sendItemPopupShow);
    const sendGoldPopup = useSelector((state) => state.userData.previewCharacter.inventory.sendGoldPopupShow);

    const searchInputRef = useRef(null);
    const addItemQuantityRef = useRef(null);

    const inventoryItemInfoHandler = (itemObj, statusValue) => {
        dispatch(showItemPopup({itemData: itemObj, status: statusValue}));
    };

    const sendInventoryItemHandler = (itemObj, status) => {
        dispatch(showCharacterSendItemPopup({status: status, sendItem: itemObj}))
    };

    const inventoryItemRemoveHandler = (itemObj, qnt) => {
        let quantity;
        if (itemObj && itemObj.quantity < qnt) quantity = itemObj.quantity; 
        quantity = qnt;
        const data = {
            id: itemObj.id,
            itemId: itemObj.itemId,
            name: itemObj.name,
            count: quantity,
            type: itemObj.type,
            characterId: selectedCharacter.id,
        };

        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userData.userId}/characters/${selectedCharacter.id}/inventory/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(removeUserCharacterItems({
                    itemId: data.itemId, 
                    itemName: data.name, 
                    newQuantity: data.status === 'removed' ? 0 : data.count, 
                    remove: data.status === 'removed' ? true : false,
                    many: false
                }))
                
            })
        };
        fetchFunc();
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
        const loadedItems = preloadAddItemsPopup.map((item) => {return ({ id: item.id, name: item.name, type: item.itemType })});
        const sendData = {
            count: 4,
            existingItems: loadedItems
        };
        
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
            });
        }
        fetchFunc();
    };

    const searchInputHandler = (e) => {
        dispatch(searchPopupAddItemText({inputText: searchInputRef.current.value, status: false}));
    };

    const addItemInfoPopupHandler = (itemObj, popupStatus) => {
        dispatch(showInfoPopupAddItem({itemSelected: itemObj, status: popupStatus}))
    };

    const addItemInfoPopupCloseHandler = () => {
        dispatch(showInfoPopupAddItem({itemSelected: {}, status: false}))
    };

    const addItemInfoFilterHandler = (filterKey) => {
        dispatch(filterPopupAddItem({filterType: filterKey}));
    };

    const selectAddItemHandler = (e, itemObj) => {
        if (selectedAddItemInfoPopup && selectedAddItemInfoPopup.id === itemObj.id && selectedAddItemInfoPopup.itemType === itemObj.itemType) {
            dispatch(selectPopupAddItem({itemSelected: undefined}));
            return;
        }
        dispatch(selectPopupAddItem({itemSelected: itemObj}));
    };

    const addItemChangeQuantityHandler = (actionType, value=1) => {
        dispatch(addItemSelectQuantity({qnt: value, actionType: actionType}));
    };

    const addItemToCharacterHandler = (itemObj) => {
        const sendData = {
            itemId: itemObj.id,
            itemName: itemObj.name,
            itemType: itemObj.itemType,
            itemId: itemObj.itemId,
            quantity: selectedAddItemQuantity,
            characterId: selectedCharacter.id,
            characterName: selectedCharacter.name,
        };
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userData.userId}/characters/${selectedCharacter.id}/inventory/?add=item`, {
                method: 'POST',
                body: JSON.stringify(sendData)
            })
            .then((response) => {
                if (response.status === 201) dispatch(addItemSelectQuantity({reset: true}));
                return response.json();
            })
            .then((data) => {
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
                        getCharacterInventoryItems();
                    })
                }
                fetchFunc();
            })
        };
        fetchFunc();
        // dispatch(addItemSelectQuantity({reset: true}));
    };

    const getCharacterInventoryItems = async () => {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userData.userId}/characters/${selectedCharacter.id}/inventory/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            dispatch(addUserCharacterItems({items: data.items}));
        })
    };

    const characterMoneyTransferHandler = (popupStatus) => {
        dispatch(showSendGoldPopup({status: popupStatus}));
    };

    useEffect(() => {
        if (addItemQuantityRef.current) addItemQuantityRef.current.value = selectedAddItemQuantity;
    }, [selectedAddItemQuantity, addItemQuantityRef.current, selectedCharacter.id]);

    useEffect(() => {
        if (filterTypeStatus && filterTypeStatus === 'reset') {
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
            fetchFunc();
            return;
        }
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reference_book/items/?filter=${filterTypeStatus}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(addPreloadItems({
                    weapons: filterTypeStatus === 'weapons' ? data[filterTypeStatus] : [],
                    armor: filterTypeStatus=== 'armor' ? data[filterTypeStatus] : [],
                    instruments: filterTypeStatus === 'instruments' ? data[filterTypeStatus] : [],
                    loadmore: false,
                    searchItems: false
                }));
            })
        }
        fetchFunc();
    }, [filterTypeStatus]);

    useEffect(() => {
        getCharacterInventoryItems();
    }, [selectedCharacter.id]);

    useEffect(() => {
        if (!searchInputRef.current) return;
        const itemsUrl = `${process.env.REACT_APP_BACKEND_URL}/api/reference_book/items/`
        setTimeout(() => {
            if (searchInputRef.current && searchInputRef.current.value === searchInputText) {
                dispatch(searchPopupAddItemText({inputText: searchInputRef.current.value, status: true}));
                const fetchFunc = async () => {
                    await fetch(`${itemsUrl}?item=${searchInputText}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data && data.items.length > 0) {
                            dispatch(addPreloadItems({
                                searchItems: data.items
                            }));
                            return;
                        }
                        else if (data && data.items.length === 0) {
                            dispatch(addPreloadItems({
                                weapons: [],
                                armor: [],
                                instruments: [],
                                loadmore: false,
                            }));
                        }
                    });
                }
                fetchFunc();
                return;
            }
        }, 500);

        if (searchInputRef.current && (searchInputRef.current.value === '' || searchInputRef.current.value === ' ')) {
            const fetchFunc = async () => {
                await fetch(`${itemsUrl}?chunk=4`, {
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
            fetchFunc();
            return;
        }
        dispatch(searchPopupAddItemText({inputText: searchInputRef.current.value, status: false}));
       
    }, [searchInputText]);
    
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
                        <div className="preview-character-inventory-gold-transfer-wrap">
                            <span 
                                className="inventory-gold-transfer-btn"
                                onClick={() => characterMoneyTransferHandler(true)}
                            ></span>
                        </div>
                    </div>
                    {sendGoldPopup ?
                        <div className="inventory-gold-transfer-popup-wrap">
                            <span 
                                className="inventory-gold-transfer-close-btn"
                                onClick={() => characterMoneyTransferHandler(false)}
                            ></span>
                            <div className="inventory-gold-transfer-body">
                                <div className="inventory-gold-transfer-title">Gold Transfer Title</div>
                                <div className="inventory-gold-transfer-types-row">
                                    <div className="inventory-gold-transfer-item gold">Gold</div>
                                    <div className="inventory-gold-transfer-item-active silver">Silver</div>
                                    <div className="inventory-gold-transfer-item bronze">Bronze</div>
                                </div>
                                <div className="inventory-gold-input-row">
                                    <div className="inventory-gold-input-wrap">
                                        <div className="inventory-gold-title">Input digit</div>
                                        <input type="text" />
                                    </div>
                                    <div className="inventory-gold-btn-send-wrap">
                                        <button>Send</button>
                                    </div>
                                </div>
                            
                                <div className="inventory-gold-character-select-wrap">
                                    <div className="inventory-gold-my-characters-select-column">
                                        <div className="inventory-gold-my-character-item">character name</div>
                                        <div className="inventory-gold-my-character-item">character name</div>
                                        <div className="inventory-gold-my-character-item">character name</div>
                                    </div>
                                    <div className="inventory-gold-other-characters-select-column">2</div>
                                </div>
                            </div>
                        </div>
                    : null}
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
                                    <div className="preview-character-inventory-item-quantity">{inventoryItem.quantity}</div>
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
                                                    onClick={() => inventoryItemInfoHandler(inventoryItem, true)}
                                                ></span>
                                            </div>
                                        <div className="inventory-send-item-btn-wrap">
                                            <span 
                                                className="inventory-send-icon-btn"
                                                onClick={() => sendInventoryItemHandler(inventoryItem, true)}
                                            ></span>
                                        </div>
                                        <div className="inventory-remove-item-btn-wrap">
                                            <span 
                                                className="inventory-remove-icon-btn"
                                                onClick={() => inventoryItemRemoveHandler(inventoryItem, 1)}
                                            ></span>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    }) : null}
                    {sendItemPopup ? <UserCharacterPreviewSendItemPopup /> : null}
                    
                    {addItemPopupStatus ?
                        <div className="preview-character-add-item-popup-wrap">
                            <span 
                                className="preview-character-add-item-popup-close-btn"
                                onClick={() => addItemPopupHandler(false)}
                            ></span>
                            <div className="preview-character-add-item-popup-body">
                                <div className="preview-character-add-items-search-panel-wrap">
                                    <label htmlFor="add-items-search-panel">Search item</label>
                                    <input
                                        ref={searchInputRef}
                                        onInput={searchInputHandler} 
                                        id="add-items-search-panel" type="text" className="preview-character-add-items-search-panel"
                                    />
                                </div>
                                <div className="preview-character-add-items-row">
                                    <div className="preview-character-add-weapons-btn-wrap">
                                        <button onClick={() => addItemInfoFilterHandler('weapons')}>weapons</button>
                                    </div>
                                    <div className="preview-character-add-armor-btn-wrap">
                                    <button onClick={() => addItemInfoFilterHandler('armor')}>armor</button>
                                    </div>
                                    <div className="preview-character-add-instruments-btn-wrap">
                                    <button onClick={() => addItemInfoFilterHandler('instruments')}>instrument</button>
                                    </div>
                                    <div className="preview-character-add-other-btn-wrap">
                                        <button>other</button>
                                    </div>
                                    <div className="preview-character-add-reset-btn-wrap">
                                        <button
                                            disabled={filterTypeStatus === 'reset' ? true : false} 
                                            onClick={() => addItemInfoFilterHandler('reset')}
                                        >reset</button>
                                    </div>
                                </div>
                                <div className="preview-character-add-item-popup-preview">
                                    <div className="preview-character-add-item-popup-row">
                                        {preloadAddItemsPopup ? preloadAddItemsPopup.map((item) => {
                                            return (
                                                <React.Fragment key={Math.random()}>
                                                    <div className= {
                                                        selectedAddItemInfoPopup && selectedAddItemInfoPopup.id === item.id && 
                                                                selectedAddItemInfoPopup.itemType === item.itemType ? 
                                                                    "addding-item-popup-preview-selected" : "addding-item-popup-preview"
                                                    }>
                                                        <div className="addding-item-popup-preview-title">{item.name}</div>
                                                        <div 
                                                            className="adding-item-popup-preview-image-wrap" 
                                                            onClick={(e) => selectAddItemHandler(e, item)}>
                                                            <img src="http://localhost:3000/static/media/demo.630922c5cb9e25da873b.jpg" alt="#"/>
                                                        </div>
                                                        <div className="adding-item-popup-preview-btn-wrap">
                                                            <span 
                                                                className="adding-item-popup-preview-btn-info"
                                                                onClick={() => addItemInfoPopupHandler(item, true)}
                                                            ></span>
                                                            {selectedAddItemInfoPopup && selectedAddItemInfoPopup.id === item.id && 
                                                                selectedAddItemInfoPopup.name === item.name ? 
                                                                    <span className="adding-item-popup-quantity">
                                                                        <span
                                                                            className="adding-item-popup-quantity-plus"
                                                                            onClick={() => addItemChangeQuantityHandler('plus')}
                                                                        ></span>
                                                                        <input 
                                                                            ref={addItemQuantityRef}
                                                                            type="text" 
                                                                            defaultValue={0}
                                                                        />
                                                                        <span 
                                                                            className="adding-item-popup-quantity-min"
                                                                            onClick={() => addItemChangeQuantityHandler('min')}
                                                                        ></span>
                                                                    </span> 
                                                            :null}
                                                            
                                                            <span
                                                                className={
                                                                    selectedAddItemQuantity && selectedAddItemInfoPopup.id === item.id && 
                                                                        selectedAddItemInfoPopup.name === item.name ? 'adding-item-popup-preview-btn-add' : 
                                                                            'adding-item-popup-preview-btn-add-disabled'
                                                                    }
                                                                onClick={() => addItemToCharacterHandler(item)}
                                                            ></span>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            )
                                        }) : null}
                                    </div>
                                    <div className="preview-character-add-item-popup-load-more-wrap">
                                        <button onClick={loadMorePopupHandler}>load more</button>
                                    </div>
                                    {showInfoAddItemPopup ?
                                        <React.Fragment key={Math.random()}>
                                            <div className="preview-character-add-item-preview-popup-wrap">
                                                <div className="preview-character-add-item-preview-popup-close-btn-wrap">
                                                    <span 
                                                        className="preview-character-add-item-preview-popup-close-btn"
                                                        onClick={addItemInfoPopupCloseHandler}
                                                    ></span>
                                                </div>
                                                <div className="preview-character-add-item-preview-popup-body">
                                                    <div className="preview-character-add-item-preview-popup-title">
                                                        {selectedAddItemInfoPopup.name}
                                                    </div>
                                                    <div className="preview-character-add-item-preview-popup-description">
                                                        <p>{selectedAddItemInfoPopup.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    : null}
                                </div>
                            </div>
                        </div>
                    : null}
                    
                    {itemPreviewPopupStatus ? 
                        <div className="preview-character-inventory-item-popup-wrap">
                            <span 
                                className="inventory-item-popup-close-btn"
                                onClick={() => inventoryItemInfoHandler({}, false)}
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