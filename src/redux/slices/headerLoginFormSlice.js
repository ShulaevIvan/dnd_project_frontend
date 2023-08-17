import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    loginFormActive: false,
    registerFormActive: false,
    forgotPasswordFormActive: false
};

const headerLoginFormSlice = createSlice({
    name: 'loginForm',
    initialState,
    reducers: {
        loginFormActive(state, action) {
            state.loginFormActive = action.payload;
        },
        registerFormActive(state, action) {
            state.registerFormActive = action.payload;
        },
        forgotPasswordActive(state, action) {
            state.forgotPasswordFormActive = action.payload;
        }
    }
});


export const {
    loginFormActive,
    registerFormActive,
    forgotPasswordActive
} = headerLoginFormSlice.actions;

export default headerLoginFormSlice.reducer;