import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    userData: undefined,
    isAuthenticated : false,
    userCharactersAvatarsLoadEnd: true,
    userCharacters: [],
    userCharactersFilters: [
        {name: 'Name', active: false}, 
        {name: 'Level',  active: false}, 
        {name: 'Class', active: false}
    ],
    userCharactersFilterStatus: {
        nameFilter: 'up',
    },
    previewCharacter: {
        previewAbilityPopup: {
            previewAbilityPopupActive: false,
            previewAbilitySelected: undefined,
            x: 0,
            y: 0,
        },
        previewCharacterActive: false,
        previewCharacterSelected: undefined,
        fullDescrShow: false,
        spellbook: {
            spellbookPopupShow: false,
            spellbookItemPopupShow: false,
            selectedPopupSpell: undefined,
            maxSpellLevel: 0,
            spellLevels: [
                {level: 0, active: false},
                {level: 1, active: false},
                {level: 2, active: false},
                {level: 3, active: false},
                {level: 4, active: false},
                {level: 5, active: false},
                {level: 6, active: false},
                {level: 7, active: false},
                {level: 8, active: false},
                {level: 9, active: false}
            ],
            characterSpells: [],
            allCharacterSpells: [],
        },
        skills: {
            skillPopupShow: false,
            skillPopupActive: undefined,
            skillPopupActiveInfo: {},
        },
        mastery: {
            masteryPopupShow: false,
            masteryInfoSelected: undefined,
            masteryPopupActive: undefined,
        },
        inventory: {
            allCharacterItems: [],
            itemPopupShow: false,
            itemPopupSelected: undefined,
            itemInfoAddPopup: false,
            itemInfoPopupSelected: undefined,
            addItemPopupShow: false,
            addItemQuantity: 0,
            preloadAddItemsPopup: [],
            searchInputText: '',
            prevSearchInputText: '',
            searchInputEnd: true,
            filterType: 'reset',
            sendItemPopupShow: false,
            sendItemSelected: undefined,
            sendItemSelectedMaxQnt: 0,
            sendItemCurrentQnt: 0,
            sendItemCharactersMode: 'self',
            characterToSendSelected: undefined,
            sendGoldPopupShow: false,
            sendCurrencySelected: 'Gold',
            moneyTypes: [
                {moneyType: 'Gold', active: true},
                {moneyType: 'Silver', active: false},
                {moneyType: 'Bronze', active: false},
            ],
            moneyTransferInput: {
                moneyType: null,
                status: true,
                value: 0,
            },
            moneyTransferSendBtnActive: false,
            moneyTransferSelectedCharacter: undefined,
            moneyTransferSendCharacterMode: 'self',
            showCharacterAddMoneyPopup: false,
            addMoneyPopupMode: 'plus',
            addMoneyPopupBtnSave: false,
            characterEquipPopupStatus: false,
            characterEquipPopupPosition: {
                x: 0,
                y: 0,
            },
            allCharacterEquipItems: [],
            characterEquipItems: [
                { slot: 'head', position: 'left', equipItem: undefined },
                { slot: 'armor', position: 'left', equipItem: undefined },
                { slot: 'waist', position: 'left', equipItem: undefined },
                { slot: 'hands', position: 'left', equipItem: undefined },
                { slot: 'feet', position: 'left', equipItem: undefined },
                { slot: 'instrument', position: 'left', equipItem: undefined },
                { slot: 'neck', position: 'right', equipItem: undefined },
                { slot: 'weapon', position: 'right', equipItem: undefined },
                { slot: 'weapon-shield', position: 'right', equipItem: undefined },
                { slot: 'arms', position: 'right', equipItem: undefined },
                { slot: 'l-ring', position: 'right', equipItem: undefined },
                { slot: 'r-ring', position: 'right', equipItem: undefined },
            ],
            characterEquipItemInfoPopupShow: false,
            characterEquipItemInfoPopupSelect: undefined,
            characterEquipAddItemPopupShow: false,
            characterEquipFilterItems: [],
        }
    },
};

const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        authUser(state, action) {
            const data = JSON.parse(action.payload)
            state.userData = data;
            state.isAuthenticated = true;
        },
        logoutUser(state, action) {
            state.userData = {};
            state.isAuthenticated = false;
        },
        getAuthState(state, action) {
            return  state.isAuthenticated;
        },
        addUserCharacters(state, action) {
            const { characters } = action.payload;
            if (characters && characters.length > 0) {
                state.userCharacters = characters;
            }
        },
        deleteUserCharacter(state, action) {
            const { characterId } = action.payload;
            state.userCharacters = [...state.userCharacters.filter((item) => item.id !== characterId)];
        },
        addUserCharacterAvatarBlob(state, action) {
            const { userCharacterId, avatarBlob } = action.payload;
            if (!avatarBlob) return;

            const targetCharaceter = state.userCharacters.find((item) => item.id === userCharacterId);

            state.userCharacters = [...state.userCharacters.map((character) => {
                if (character.id === targetCharaceter.id) {
                    return {
                        ...character,
                        avatarBlob: avatarBlob,

                    }
                }
                return character;
            })];
        },
        previewCharacterAction(state, action) {
            const { characterPreview, previewStatus } = action.payload;

            state.previewCharacter.previewCharacterActive = previewStatus;
            state.previewCharacter.previewCharacterSelected = characterPreview;
        },
        charactersFilters(state, action) {
            const { filterParam, sortType } = action.payload;
            const nameFilterStatus = state.userCharactersFilterStatus.nameFilter;
            const keyParam = filterParam.toLowerCase();

            if (keyParam === 'name') {
                state.userCharactersFilters = [...state.userCharactersFilters.map((item) => {
                    if (item.name.toLowerCase() === keyParam) {
                        return (
                            {
                                ...item,
                                active: true,
                            }
                        )
                    }
                    return item;
                })];
                nameFilterStatus === 'down' ? 
                    state.userCharacters = [...state.userCharacters.sort((a, b) => a[keyParam].localeCompare(b[keyParam]))].reverse() :
                    state.userCharacters = [...state.userCharacters.sort((a, b) => a[keyParam].localeCompare(b[keyParam]))];
            }
            if (keyParam === 'name' && nameFilterStatus === 'up') {
                state.userCharactersFilterStatus.nameFilter = 'down';
                return;
            }
            state.userCharactersFilterStatus.nameFilter = 'up';
            
        },
        avatarsLoadEnd(state, action) {
            const { status } = action.payload;
            state.userCharactersAvatarsLoadEnd = status;
        },
        abilityPopup(state, action) {
            const { popupStatus, ability, x, y } = action.payload;
            if (!ability) {
                state.previewCharacter.previewAbilityPopup.previewAbilityPopupActive = false;
                state.previewCharacter.previewAbilityPopup.previewAbilitySelected = {};
                return;
            }
            state.previewCharacter.previewAbilityPopup.previewAbilityPopupActive = popupStatus;
            state.previewCharacter.previewAbilityPopup.previewAbilitySelected = ability;
            state.previewCharacter.previewAbilityPopup.x = (Number(x / 2) + 100);
            state.previewCharacter.previewAbilityPopup.y = (Number(y / 2) + 50);
        },
        abilityPopupAddDescription(state, action) {
            const { description } = action.payload;
            state.previewCharacter.previewAbilityPopup.previewAbilitySelected = {
                ...state.previewCharacter.previewAbilityPopup.previewAbilitySelected,
                description: description
            }
        },
        showFullDescription(state, action) {
            const { status } = action.payload;
            state.previewCharacter.fullDescrShow = status;
        },
        showSpellbookPopup(state, action) {
            const { status } = action.payload;
            state.previewCharacter.spellbook.spellbookPopupShow = status;
        },
        showSpellbookItemPopup(state, action) {
            const { status, spell } = action.payload;
            state.previewCharacter.spellbook.spellbookItemPopupShow = status;
            if (spell) state.previewCharacter.spellbook.selectedPopupSpell = spell;
        },
        selectSpellbookSpellLevel(state, action) {
            const { spellLevel, status } = action.payload;
            state.previewCharacter.spellbook.characterSpells = [...state.previewCharacter.spellbook.allCharacterSpells];
            state.previewCharacter.spellbook.spellLevels = [
                ...state.previewCharacter.spellbook.spellLevels.filter((item) => item.level !== spellLevel).map((spellLevelObj)=> {
                    return {
                        ...spellLevelObj,
                        active: false,
                    }
                }),
                {level: spellLevel, active: status}
            ].sort((a, b) => a.level - b.level);

            const sortObj = state.previewCharacter.spellbook.spellLevels.find((item) => item.active);

            if (sortObj) {
                state.previewCharacter.spellbook.characterSpells = 
                    state.previewCharacter.spellbook.characterSpells.filter((item) => item.spellLevel === sortObj.level);
                return;
            }
        },
        addUserCharacterSpells(state, action) {
            const { charSpells } = action.payload;
            if (charSpells && charSpells.length > 0) {
                const sortedSpells = charSpells.sort((a, b) => a.spellLevel - b.spellLevel);
                const maxSpellLevel = Array.from(sortedSpells).slice(-1).pop().spellLevel;
                state.previewCharacter.spellbook.spellLevels = state.previewCharacter.spellbook.spellLevels.filter((item) => item.level <= maxSpellLevel);
                state.previewCharacter.spellbook.characterSpells = sortedSpells;
                state.previewCharacter.spellbook.allCharacterSpells = sortedSpells;

                return;
            }
        },
        showPopupSkill(state, action) {
            const { skill, status } = action.payload;
            state.previewCharacter.skills.skillPopupActive = skill;
            state.previewCharacter.skills.skillPopupShow = status;
        },
        addPopupSkillActive(state, action) {
            const { skill } = action.payload
            state.previewCharacter.skills.skillPopupActiveInfo = skill;
        },
        addUserCharacterItems(state, action) {
            const { items } = action.payload;
            const addedItems = items.map((item) => {
                if (item.image && item.image.data) {
                    const byteCharacters = atob(item.image.data);
                    const byteArrays = [];
                    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                        const slice = byteCharacters.slice(offset, offset + 512);
                        byteArrays.push(new Uint8Array([...slice].map(char => char.charCodeAt(0))));
                    }
                    let blobData = new Blob(byteArrays, {type: item.image.ext});
                    
                    return {
                        ...item,
                        blobData: URL.createObjectURL(blobData),
                    }
                }
                return {...item}
            });
            if (addedItems && addedItems.length > 0) {
                state.previewCharacter.inventory.allCharacterItems = [...addedItems];
                return;
            }
            state.previewCharacter.inventory.allCharacterItems = items;
        },
        removeUserCharacterItems(state, action) {
            const { itemId, itemName, newQuantity, remove, many } = action.payload;
            if (remove && !many && !newQuantity) {
                state.previewCharacter.inventory.allCharacterItems = [
                    ...state.previewCharacter.inventory.allCharacterItems.filter((item) => item.itemId !== itemId && item.name !== itemName)
                ];
            }
            if (!many && newQuantity) {
                state.previewCharacter.inventory.allCharacterItems = [
                    ...state.previewCharacter.inventory.allCharacterItems.map((item) => {
                        if (item.itemId === itemId && item.name === itemName) {
                            return {
                                ...item,
                                quantity: newQuantity,
                            };
                        }
                        return {...item};
                    })
                ];
            }
        },
        changeCharacterInventoryItemQuantity(state, action) {
            const { inventoryItem, quantity, mode } = action.payload;
            let removedItem = undefined;
            state.previewCharacter.inventory.allCharacterItems = [
                ...state.previewCharacter.inventory.allCharacterItems.map((item) => {
                    if (item.name === inventoryItem.name && item.type === inventoryItem.type && mode) {
                        const checkZero = Number(item.quantity) - Number(quantity)
                        if (checkZero <= 0) removedItem = item;
                        return {
                            ...item,
                            quantity: mode === 'min' ? 
                                Number(item.quantity) - Number(quantity) : 
                                mode === 'plus' ? Number(item.quantity) + Number(quantity) : 
                                item.quantity,
                        }
                    }
                    return item;
                })
            ];
            state.previewCharacter.inventory.allCharacterItems = state.previewCharacter.inventory.allCharacterItems.filter((item) => item.quantity > 0);
        },
        showItemPopup(state, action) {
            const { itemData, status } = action.payload;
            state.previewCharacter.inventory.itemPopupShow = status;
            
            if (itemData && itemData.quantity) {
                state.previewCharacter.inventory.itemPopupSelected = itemData;
                return;
            }
            state.previewCharacter.inventory.itemPopupSelected = {};
        },
        addBlobImage(state, action) {
            const { blobData } = action.payload;
            state.previewCharacter.inventory.allCharacterItems = [
                ...state.previewCharacter.inventory.allCharacterItems.map((item) => {
                    return (
                        {
                            ...item,
                            blobData: blobData
                        }
                    )
                })
            ]
        },
        showAddItemPopup(state, action) {
            const { status} = action.payload;
            state.previewCharacter.inventory.showAddItemPopup = status;
            state.previewCharacter.inventory.itemInfoPopupSelected = undefined;
        },
        addPreloadItems(state, action) {
            const { weapons, armor, instruments, loadmore, searchItems } = action.payload;
            if (searchItems && searchItems.length > 0) {
                state.previewCharacter.inventory.preloadAddItemsPopup = [...searchItems];
                return;
            }
            if (loadmore) {
                state.previewCharacter.inventory.preloadAddItemsPopup = [
                    ...state.previewCharacter.inventory.preloadAddItemsPopup,
                    ...weapons,
                    ...armor,
                    ...instruments
                ]
                return;
            }
            
            state.previewCharacter.inventory.preloadAddItemsPopup = [
                ...weapons,
                ...armor,
                ...instruments
            ]
        },
        selectPopupAddItem(state, action) {
            const { itemSelected } = action.payload;
            state.previewCharacter.inventory.itemInfoPopupSelected = itemSelected;
            state.previewCharacter.inventory.addItemQuantity = 0;
        },
        addItemSelectQuantity(state, action) {
            const { qnt, actionType, reset } = action.payload;
            if (reset) {
                state.previewCharacter.inventory.addItemQuantity = 0;
                state.previewCharacter.inventory.itemInfoPopupSelected = undefined;
                return;
            }
            if (actionType === 'min' && state.previewCharacter.inventory.addItemQuantity > 0) {
                state.previewCharacter.inventory.addItemQuantity = state.previewCharacter.inventory.addItemQuantity -= qnt;
            }
            else if (actionType === 'plus') {
                state.previewCharacter.inventory.addItemQuantity = state.previewCharacter.inventory.addItemQuantity += qnt;
            }
        },
        showInfoPopupAddItem(state, action) {
            const { itemSelected, status} = action.payload;
            state.previewCharacter.inventory.itemInfoAddPopup = status;
            state.previewCharacter.inventory.itemInfoPopupSelected = itemSelected;
        },
        searchPopupAddItemText(state, action) {
            const { inputText, status } = action.payload; 
            state.previewCharacter.inventory.searchInputText = inputText;
            state.previewCharacter.inventory.searchInputEnd = status;
        },
        filterPopupAddItem(state, action) {
            const { filterType } = action.payload;
            state.previewCharacter.inventory.filterType = filterType;
        },
        showCharacterMasteryPopup(state, action) {
            const { status, mastery, masteryType } = action.payload;
            state.previewCharacter.mastery.popupShow = status;
            state.previewCharacter.mastery.masteryInfoSelected = mastery;
        },
        showCharacterSendItemPopup(state, action) {
            const { status, sendItem } = action.payload;
            state.previewCharacter.inventory.sendItemPopupShow = status;
            if (sendItem) {
                state.previewCharacter.inventory.sendItemSelectedMaxQnt = Number(sendItem.quantity);
                state.previewCharacter.inventory.sendItemSelected = sendItem;
                state.previewCharacter.inventory.sendItemCurrentQnt = 1;
                state.previewCharacter.inventory.sendItemCharactersMode = 'self';
            }
        },
        increaseDecreaseSendItem(state, action) {
            const { param, value } = action.payload;
            if (state.previewCharacter.inventory.sendItemSelected && state.previewCharacter.inventory.sendItemSelected.quantity >= 0) {
                const maxQnt = state.previewCharacter.inventory.sendItemSelected.quantity;
                const currentQnt = state.previewCharacter.inventory.sendItemCurrentQnt;
                if (param === 'plus' && maxQnt > 0 && currentQnt < maxQnt) {
                    state.previewCharacter.inventory.sendItemCurrentQnt = state.previewCharacter.inventory.sendItemCurrentQnt + Number(value);
                }
                else if (param === 'min' && maxQnt >= currentQnt && currentQnt - Number(value) > 0) {
                    state.previewCharacter.inventory.sendItemCurrentQnt = state.previewCharacter.inventory.sendItemCurrentQnt - Number(value);
                }
            }
        },
        changeSendItemCharacterMode(state, action) {
            const { mode } = action.payload;
            state.previewCharacter.inventory.sendItemCharactersMode = mode;
        },
        selectCharacterToSend(state, action) {
            const { character, select } = action.payload;
            if (!select) {
                state.previewCharacter.inventory.selectCharacterToSend = {};
                return;
            }
            state.previewCharacter.inventory.selectCharacterToSend = character;
        },
        showSendGoldPopup(state, action) {
            const { status } = action.payload
            state.previewCharacter.inventory.sendGoldPopupShow = status;
            state.previewCharacter.inventory.sendCurrencySelected = 'Gold';
            state.previewCharacter.inventory.moneyTypes = [
                {moneyType: 'Gold', active: false},
                {moneyType: 'Silver', active: false},
                {moneyType: 'Bronze', active: false},
            ];
            state.previewCharacter.inventory.moneyTransferSelectedCharacter = {character:  undefined, selected: false};
            state.previewCharacter.inventory.moneyTransferSendMode = 'self';
            state.previewCharacter.inventory.moneyTransferSendBtnActive = true;
        },
        moneyTransferSelectType(state, action) {
            const { moneyType, status } = action.payload;
            state.previewCharacter.inventory.moneyTypes = state.previewCharacter.inventory.moneyTypes.map((item) => {
                if (item.moneyType === moneyType) {
                    return {
                        ...item,
                        active: status,
                    };
                }
                return {
                    ...item,
                    active: false,
                };
            });

            state.previewCharacter.inventory.moneyTransferInput = {
                ...state.previewCharacter.inventory.moneyTransferInput,
                moneyType: moneyType,
            };
        },
        addMoneySelectType(state, action) {
            const { moneyType, status } = action.payload;
            state.previewCharacter.inventory.moneyTypes = state.previewCharacter.inventory.moneyTypes.map((item) => {
                if (item.moneyType === moneyType) {
                    return {
                        ...item,
                        active: status,
                    };
                }
                return {
                    ...item,
                    active: false,
                };
            });
        },
        moneyTransferInput(state, action) {
            const { value, status, type } = action.payload;
            state.previewCharacter.inventory.moneyTransferInput = {
                moneyType: type,
                value: value,
                status: status
            }
        },
        moneyTransferSendBtn(state, action) {
            const { status } = action.payload;
            state.previewCharacter.inventory.moneyTransferSendBtnActive = status;
        },
        moneyTransferSelectCharacter(state, action) {
            const { character, select } = action.payload;
            if (!select) {
                state.previewCharacter.inventory.moneyTransferSelectedCharacter = {character:  undefined, selected: false};;
                return;
            }
            state.previewCharacter.inventory.moneyTransferSelectedCharacter = {character:  character, selected: true};
        },
        moneyTransferSendMode(state, action) {
            const { mode } = action.payload;
            if (mode === state.previewCharacter.inventory.moneyTransferSendMode) return;
            state.previewCharacter.inventory.moneyTransferSelectedCharacter = {character:  undefined, selected: false};
            state.previewCharacter.inventory.moneyTransferSendMode = mode;
        },
        updateCharacterMoney(state, action) {
            const { characterId, characterName, moneyData } = action.payload;
            if (characterId && characterName && moneyData) {
                state.userCharacters = [...state.userCharacters.map((character) => {
                    if (character.id === characterId && character.name === characterName) {
                        state.previewCharacter.previewCharacterSelected = {
                            ...state.previewCharacter.previewCharacterSelected,
                            inventory: {
                                ...state.previewCharacter.previewCharacterSelected.inventory,
                                inventoryGold: {
                                    gold: Number(moneyData.gold),
                                    silver: Number(moneyData.silver),
                                    bronze: Number(moneyData.bronze)
                                }
                            }
                        }
                        return (
                            {
                                ...character,
                                inventory: {
                                    ...character.inventory,
                                    inventoryGold: {
                                        gold: Number(moneyData.gold),
                                        silver: Number(moneyData.silver),
                                        bronze: Number(moneyData.bronze)
                                    }
                                }
                            }
                        )
                    }
                    return {...character}
                })]
            }
        },
        showCharacterAddMoneyPopup(state, action) {
            const { status, mode } = action.payload;
            if (!status) {
                state.previewCharacter.inventory.moneyTypes = [
                    {moneyType: 'Gold', active: true},
                    {moneyType: 'Silver', active: false},
                    {moneyType: 'Bronze', active: false},
                ];
                state.previewCharacter.inventory.addMoneyPopupMode = 'plus';
            }
            if (!mode) state.previewCharacter.inventory.addMoneyPopupMode = 'plus';
            state.previewCharacter.inventory.showCharacterAddMoneyPopup = status;
            state.previewCharacter.inventory.addMoneyPopupMode = mode;
        },
        addMoneyPopupBtnSaveStatus(state, action) {
            const { status } = action.payload;
            state.previewCharacter.inventory.addMoneyPopupBtnSave = status;
        },
        showCharacterEquipPopup(state, action) {
            const { status, positionX, positionY, equipItems } = action.payload;
            state.previewCharacter.inventory.characterEquipPopupStatus = status;
            state.previewCharacter.inventory.characterEquipPopupPosition = {
                x: positionX,
                y: positionY
            };
            if (status) {
                state.previewCharacter.inventory.characterEquipItems = state.previewCharacter.inventory.characterEquipItems.map((itemObj) => {
                    return (
                        {
                            ...itemObj,
                            equipItem: equipItems.find((equipItem) => equipItem.slot === itemObj.slot),
                        }
                    )
                });
            }
        },
        addCharacterEquipItems(state, action) {
            const { equipItems } = action.payload;
            state.previewCharacter.inventory.allCharacterEquipItems = equipItems;
        },
        showCharacterEquipItemInfoPopup(state, action) {
            const { status, eqipItem, itemParams } = action.payload;
            state.previewCharacter.inventory.characterEquipItemInfoPopupShow = status;
            state.previewCharacter.inventory.characterEquipItemInfoPopupSelect = {...eqipItem, itemParams: itemParams};
        },
        showCharacterAddItemPopup(state, action) {
            const { status } = action.payload;
            state.previewCharacter.inventory.characterEquipAddItemPopupShow = status;
        },
        addEquipItemPoupSaveItems(state, action) {
            const { filterItems } = action.payload;
            state.previewCharacter.inventory.characterEquipFilterItems = filterItems;

        }
    }
});


export const {
    getAuthState,  
    authUser,
    logoutUser,
    addUserCharacters,
    deleteUserCharacter,
    addUserCharacterAvatarBlob,
    previewCharacterAction,
    charactersFilters,
    avatarsLoadEnd,
    abilityPopup,
    abilityPopupAddDescription,
    showFullDescription,
    showSpellbookPopup,
    showSpellbookItemPopup,
    selectSpellbookSpellLevel,
    addUserCharacterSpells,
    showPopupSkill,
    addPopupSkillActive,
    addUserCharacterItems,
    showItemPopup,
    addBlobImage,
    showAddItemPopup,
    addPreloadItems,
    showInfoPopupAddItem,
    searchPopupAddItemText,
    filterPopupAddItem,
    selectPopupAddItem,
    addItemSelectQuantity,
    removeUserCharacterItems,
    showCharacterMasteryPopup,
    showCharacterSendItemPopup,
    increaseDecreaseSendItem,
    changeSendItemCharacterMode,
    selectCharacterToSend,
    changeCharacterInventoryItemQuantity,
    showSendGoldPopup,
    moneyTransferSelectType,
    moneyTransferInput,
    moneyTransferSendBtn,
    moneyTransferSelectCharacter,
    moneyTransferSendMode,
    updateCharacterMoney,
    showCharacterAddMoneyPopup,
    addMoneySelectType,
    addMoneyPopupBtnSaveStatus,
    showCharacterEquipPopup,
    addCharacterEquipItems,
    showCharacterEquipItemInfoPopup,
    showCharacterAddItemPopup,
    addEquipItemPoupSaveItems
} = userSlice.actions;
export default userSlice.reducer;