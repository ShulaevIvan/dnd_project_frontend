import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menu: [],
};

const instrumentsSlice = createSlice({
    name: 'instrumentsSlice',
    initialState,
    reducers: {
        instrumentsMenuSlice(state, action) {
            state.menu = [...JSON.parse(action.payload)]
        },

    }
});

export const {
    instrumentsMenuSlice
} = instrumentsSlice.actions;

export default instrumentsSlice.reducer;