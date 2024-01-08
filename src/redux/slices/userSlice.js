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
        }
    }
});


export const {
    getAuthState,  
    authUser,
    logoutUser,
    addUserCharacters,
    deleteUserCharacter,
} = userSlice.actions;
export default userSlice.reducer;