import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    userData: undefined,
    isAuthenticated : false,
};

const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        authUser(state, action) {
            state.userData = action.payload;
            state.isAuthenticated = true;
        },
        getAuthState(state, payload) {
            return  state.isAuthenticated;
        }
    }
});


export const {
    getAuthState,  
    authUser, 
} = userSlice.actions;
export default userSlice.reducer;