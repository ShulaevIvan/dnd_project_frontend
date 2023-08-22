import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menu: [],
    referenceBookCharClasses: [],
};

const referenceBookSlice = createSlice({
    name: 'referenceBookSlice',
    initialState,
    reducers: {
        referenceBookMenu(state, action) {
            state.menu = [...JSON.parse(action.payload)]
        },
        referenceBookCharClasses(state, action) {
            state.referenceBookCharClasses = [...JSON.parse(action.payload)];
        },

    }
});

export const {
    referenceBookMenu,
    referenceBookCharClasses,
} = referenceBookSlice.actions;

export default referenceBookSlice.reducer;