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
    allSendDataValid: false,
    uploadCharacterFile: {
        uploadPopupFile: undefined,
        uploadPopupFileData: undefined,
        uploadPopupFileUrl:  undefined,
    },
    characterTotalInfo: {
        charDescription: undefined,
    },
    characterStatTest: {
        showStatResultPanel: false,
        statTestsResultAll: [],
        statModeTest: undefined,
        currentStatName: undefined,
        currentStatValue: 0,
        targetStatValue: 0,
        resultStatValue: 0,
        penaltyActive: false,
        advantageActive: false,
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
    },
    characterAbilityTest: {
        testCounter: 0,
        currentAbilityName: undefined,
        currentAbilityValue: 0,
        targetAbilityValue: 0,
        resultAbilityValue: 0,
        penaltyActive: false,
        advantageActive: false,
        showAbilityResultPanel: false,
        allAbilityTests: [],
        showTestResutPopup: false,
        testAbilityPopup: undefined,
    },
    characterSendData: {
        characterName: undefined,
        characterDescription: undefined,
        characterAvatar: undefined,
        characterLevel: undefined,
        characterRace: undefined,
        characterClass: undefined,
        characterSubclass: undefined,
        characterBackground: undefined,
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
            state.characterStatTest.penaltyActive = false;
            state.characterStatTest.advantageActive = false;
        },
        addStatTest(state, action) {
            const {statTest, type} = action.payload;
            if (type === 'pass') {
                state.characterStatTest.statTestsResultAll = [
                        ...state.characterStatTest.statTestsResultAll, {
                            stat: statTest.name,
                            baseRoll: statTest.rollValue,
                            value: statTest.value,
                            checkType: 'pass',
                        }
                ]
                return;
            }

            state.characterStatTest.statTestsResultAll = [
                ...state.characterStatTest.statTestsResultAll, {
                    stat: statTest.name,
                    baseRoll: statTest.rollValue,
                    value: statTest.value, 
                    checkType: 'fail',
                }
            ]
        },
        showTestResultPanel(state, action) {
            const { panelName, value } = action.payload;
            if (panelName === 'stat') {
                state.characterStatTest.showStatResultPanel = value;
                return;
            }
            if (panelName === 'ability') {
                state.characterAbilityTest.showAbilityResultPanel = value;
                return;
            }
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
            const { abilityName, selected } = action.payload;
            let targetAbility = state.allAbilitiesTest.find((item) => item.name === abilityName);
            state.characterAbilityTest.currentAbilityName = targetAbility.name;
            state.characterAbilityTest.currentAbilityValue = targetAbility.value;
            targetAbility = {
                ...targetAbility,
                selected: selected,
            }
            state.allAbilitiesTest = [...state.allAbilitiesTest.filter((item) => item.name !== targetAbility.name).map((abil) => {
                return (
                    {
                        ...abil,
                        selected: false
                    }
                )
            }), targetAbility].sort((a, b) => a.name.localeCompare(b.name));
        },
        addAbilityTest(state, action) {
            const { abilityTest, type } = action.payload;
            state.characterAbilityTest.resultAbilityValue = abilityTest.value; 
            state.characterAbilityTest.testCounter = state.characterAbilityTest.testCounter + 1;
            state.characterAbilityTest.allAbilityTests = [...state.characterAbilityTest.allAbilityTests, {
                ...abilityTest,
                checkType: type,
                testId:  state.characterAbilityTest.testCounter,
            }];
        },
        resetAbilityTest(state) {
            state.characterAbilityTest.allAbilityTests = [];
            state.characterAbilityTest.showAbilityResultPanel = false;
            state.characterAbilityTest.testCounter = 0;
            state.characterAbilityTest.penaltyActive = false;
            state.characterAbilityTest.advantageActive = false;
        },
        showAbilityTestPopup(state, action) {
            const { abilityTest, show } = action.payload;
            state.characterAbilityTest.showTestResutPopup = show;
            state.characterAbilityTest.testAbilityPopup = abilityTest;
        },
        penaltyActive(state, action) {
            const { penaltyType, penaltyValue } = action.payload;
            
            if (penaltyType === 'stat') {
                state.characterStatTest.penaltyActive = penaltyValue;
            }
            else if (penaltyType === 'ability') {
                state.characterAbilityTest.penaltyActive = penaltyValue;
            }
        },
        advantageActive(state, action) {
            const { advantageType, advantageValue } = action.payload;

            if (advantageType === 'stat') {
                state.characterStatTest.advantageActive = advantageValue;
            }
            else if (advantageType === 'ability') {
                state.characterAbilityTest.advantageActive = advantageValue;
            }
        },
        sendCharacterData(state, action) {
            state.allSendDataValid = false;
            const { characterData } = action.payload;
            const checkData = Object.values(characterData).every(item => item);
            if (!checkData) return;

            state.characterSendData.characterName = characterData.characterName;
            state.characterSendData.characterDescription = characterData.characterDescription;
            state.characterSendData.characterAvatar = characterData.characterAvatar;
            state.characterSendData.characterLevel = characterData.characterLevel;
            state.characterSendData.characterRace = characterData.characterRace;
            state.characterSendData.characterClass = characterData.characterClass;
            state.characterSendData.characterSubclass = characterData.characterSubclass;
            state.characterSendData.characterBackground = characterData.characterBackground;

            state.allSendDataValid = true;

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
    showTestResultPanel,
    statTestSelect,
    setTargetStatValue,
    selectTestMode,
    resetTest,
    addStatTest,
    showStatTestPopupWindow,
    addAllAbilitiesTest,
    selectTestAbility,
    addAbilityTest,
    resetAbilityTest,
    showAbilityTestPopup,
    penaltyActive,
    advantageActive
    
} = characterTotalSlice.actions;

export default characterTotalSlice.reducer;