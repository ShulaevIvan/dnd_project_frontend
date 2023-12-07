import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    popupX: 0,
    popupY: 0,
    descriptionPopupActive: false,
    descriptionPopupValue: '',
    characterTotalInfo: {

    },
    
}

const characterTotalSlice = createSlice({
    name: 'characterTotal',
    initialState,
    reducers: {
        descriptionPopup(state, action) {
            const { client, active } = action.payload;
            if (client) {
                state.popupX = client.x;
                state.popupY = client.y;
            }
            state.descriptionPopupActive = active;
        },
        closeDescriptionPopUp(state) {
            state.descriptionPopupActive = false;
        },
        saveDescription(state, action) {
            state.characterTotalInfo.charDescription = action.payload;
        }
    }
});

export const {
    descriptionPopup,
    closeDescriptionPopUp,
    saveDescription,
    
} = characterTotalSlice.actions;

export default characterTotalSlice.reducer;