import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    referenceBookCharClasses: [],
};

const referenceBookSlice = createSlice({
    name: 'referenceBookSlice',
    initialState,
    reducers: {
        referenceBookCharClasses(state, action) {
            state.referenceBookCharClasses = [...JSON.parse(action.payload)];
        },

    }
});

export const {
    referenceBookCharClasses,
} = referenceBookSlice.actions;

export default referenceBookSlice.reducer;