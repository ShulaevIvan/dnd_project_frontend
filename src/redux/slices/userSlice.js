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
    }
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
} = userSlice.actions;
export default userSlice.reducer;