import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    popupX: 0,
    popupY: 0,
    descriptionPopupActive: false,
    imagePopupActive: false,
    uploadImageStart: false,
    showDescriptionBackground: false,
    descriptionPopupValue: '',
    showStatTestPopup: false,
    statTestPopupData: undefined,
    uploadCharacterFile: {
        uploadPopupFile: undefined,
        uploadPopupFileData: undefined,
        uploadPopupFileUrl:  undefined,
    },
    characterTotalInfo: {

    },
    characterStatTest: {
        showStatResultPanel: false,
        statTestsResultAll: [],
        statModeTest: undefined,
        currentStatName: undefined,
        currentStatValue: 0,
        targetStatValue: 0,
        resultStatValue: 0,
        testMods: [
            {name: 'd4', selected: false }, 
            {name: 'd6', selected: false}, 
            {name: 'd8', selected: false}, 
            {name: 'd10', selected: false}, 
            {name: 'd12', selected: false}, 
            {name: 'd20', selected: true},
            {name: 'd100', selected: false},
        ],
        allAbilitiesTest: [],
    }
    
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
        },
        showDescriptionBackground(state, action) {
            state.showDescriptionBackground = action.payload;
        },
        statTestPanelShow(state, action) {
            state.characterStatTest.statTestPanelShow = action.payload;
        },
        statTestSelect(state, action) {
            const { statName } = action.payload;
            state.characterStatTest.currentStatName = statName;
        },
        setTargetStatValue(state, action) {
            const { targetValue } = action.payload;
            state.characterStatTest.targetStatValue = Number(targetValue);
        },
        selectTestMode(state, action) {
            const { testMode } = action.payload;
            state.characterStatTest.testMods =  [
                ...state.characterStatTest.testMods.map((mode) => {
                    return (
                        {
                            ...mode,
                            selected: false,
                        }
                    )
                })
                .filter((item) => item.name !== testMode), 
                    { name: testMode, selected: true}
            ].sort();
            state.characterStatTest.statModeTest = testMode;
        },
        resetTest(state) {
            state.characterStatTest.testMods = [
                {name: 'd4', selected: false }, 
                {name: 'd6', selected: false}, 
                {name: 'd8', selected: false}, 
                {name: 'd10', selected: false}, 
                {name: 'd12', selected: false}, 
                {name: 'd20', selected: true},
                {name: 'd100', selected: false},
            ];
            state.characterStatTest.showStatResultPanel = false;
            state.characterStatTest.statTestsResultAll = [];
            state.characterStatTest.statModeTest = undefined;
            state.characterStatTest.currentStatName = undefined;
            state.characterStatTest.currentStatValue = 0;
            state.characterStatTest.targetStatValue = 0;
            state.characterStatTest.resultStatValue = 0;
        },
        addStatTest(state, action) {
            const {statTest, type} = action.payload;
            if (type === 'pass') {
                state.characterStatTest.statTestsResultAll = [
                        ...state.characterStatTest.statTestsResultAll, {
                            stat: statTest.name,
                            baseRoll: statTest.rollValue,
                            value: statTest.value,
                            checkType: 'pass'
                        }
                ]
                return;
            }
            state.characterStatTest.statTestsResultAll = [
                ...state.characterStatTest.statTestsResultAll, {
                    stat: statTest.name,
                    baseRoll: statTest.rollValue,
                    value: statTest.value, 
                    checkType: 'fail'
                }
            ]
        },
        showStatResultPanel(state, action) {
            state.characterStatTest.showStatResultPanel = action.payload;
        },
        showStatTestPopupWindow(state, action) {
            const { statTest, show, client } = action.payload;
            state.popupX = client.x;
            state.popupY = client.y;
            state.showStatTestPopup = show;
            state.statTestPopupData = statTest;
        },
        addAllAbilitiesTest(state, action) {
            const { abilities } = action.payload
            state.allAbilitiesTest = [...abilities.map((item) => {
                return (
                    {
                        ...item,
                        selected: false,
                    }
                )
            })]
        },
        selectTestAbility(state, action) {

        }
    }
});

export const {
    descriptionPopup,
    closeDescriptionPopUp,
    saveDescription,
    imagePopupControl,
    uploadStatus,
    uploadPopupFile,
    showDescriptionBackground,
    showStatResultPanel,
    statTestSelect,
    setTargetStatValue,
    selectTestMode,
    resetTest,
    addStatTest,
    showStatTestPopupWindow,
    addAllAbilitiesTest,
    selectTestAbility
    
} = characterTotalSlice.actions;

export default characterTotalSlice.reducer;