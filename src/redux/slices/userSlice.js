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
            const targetCharaceter = state.userCharacters.find((item) => item.id === userCharacterId);
            targetCharaceter.avatarBlob = avatarBlob;
            
            state.userCharacters = [...state.userCharacters.filter((item) => item.id !== userCharacterId), targetCharaceter];
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
    addUserCharacterSpells
} = userSlice.actions;
export default userSlice.reducer;