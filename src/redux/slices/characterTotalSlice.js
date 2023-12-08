import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    popupX: 0,
    popupY: 0,
    descriptionPopupActive: false,
    imagePopupActive: false,
    uploadImageStart: false,
    descriptionPopupValue: '',
    uploadCharacterFile: {
        uploadPopupFile: undefined,
        uploadPopupFileData: undefined,
        uploadPopupFileUrl:  undefined,
    },
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
        },
        imagePopupControl(state, action) {
            const { client, actionType } = action.payload;
            if (client) {
                state.popupX = client.x;
                state.popupY = client.y;
            }
            state.imagePopupActive = actionType;
        },
        uploadStatus(state, action) {
            state.uploadStatus = action.payload;
        },
        uploadPopupFile(state, action) {
            const { file, fileData, url } = JSON.parse(action.payload);
            state.uploadCharacterFile.uploadPopupFile = file;
            state.uploadCharacterFile.uploadPopupFileData = fileData;
            state.uploadCharacterFile.uploadPopupFileUrl = url;
        }
    }
});

export const {
    descriptionPopup,
    closeDescriptionPopUp,
    saveDescription,
    imagePopupControl,
    uploadStatus,
    uploadPopupFile
    
} = characterTotalSlice.actions;

export default characterTotalSlice.reducer;