import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    userData: undefined,
    isAuthenticated : false,
    userCharacters: [],
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
} = userSlice.actions;
export default userSlice.reducer;