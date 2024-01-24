import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    loginFormActive: false,
    registerFormActive: false,
    forgotPasswordFormActive: false,
    enterPushed: false,
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
        },
        registerEnterKey(state, action) {
            const { key } = action.payload;
            if (key === 'Enter') {
                state.enterPushed = true;
                return;
            }
            state.enterPushed = false;
            
        }
    }
});


export const {
    loginFormActive,
    registerFormActive,
    forgotPasswordActive,
    registerEnterKey
} = headerLoginFormSlice.actions;

export default headerLoginFormSlice.reducer;