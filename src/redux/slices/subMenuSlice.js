import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    submenuActive: false,
};

const subMenuSlice = createSlice({
    name: 'subMenu',
    initialState,
    reducers: {
        subMenuActive(state, action) {
            state.submenuActive = action.payload;
        },
    }
});


export const {
    subMenuActive, 
} = subMenuSlice.actions;
export default subMenuSlice.reducer;