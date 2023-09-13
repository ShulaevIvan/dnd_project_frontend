import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allRaces: [],
    allClasses: [],
    showPreviewPage: false,
    characterStepPage: 1,
    characterStepMaxPage: 5,
    stepsNames: ['race', 'class', 'background', 'stats', 'skills', 'total'],
    characterSum: {
        raceData: undefined,
        subraceActive: undefined,
        subraceData: undefined,
        classData: undefined,
        classActive: undefined,
    },
    navNextBtnDisable: true,
    navPrevBtnDisable: true,
};

const characterStepsSlice = createSlice({
    name: 'loginForm',
    initialState,
    reducers: {
        setCharacterStep(state, action) {
            if (isNaN(action.payload)) {
               state.characterStepPage = 1;
               return;
            }
            const checkNum = Math.sign(Number(action.payload));

            if (state.characterStepPage > 5) state.characterStepPage = state.characterStepMaxPage;
            if (checkNum === -1 && state.characterStepPage > 1 && !isNaN(action.payload)) {
                state.characterStepPage += Number(checkNum);
                return;
            }
            else if (checkNum === 1 && state.characterStepPage >= 1 && !isNaN(action.payload)) {
                state.characterStepPage += Number(checkNum);
                return;
            }
        },
        addRaces(state, action) {
            state.allRaces = [...JSON.parse(action.payload)].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        },
        selectRace(state, action) {
            const data = JSON.parse(action.payload);
            state.characterSum.raceData = data.raceData;
            state.navNextBtnDisable = false;
        },
        selectSubrace(state, action) {
            if (action.payload) {
                const data = JSON.parse(action.payload);
                state.characterSum.subraceActive = true;
                state.characterSum.subraceData = data;
                state.navNextBtnDisable = false;
                return;
            }

            state.characterSum.subraceActive = false;
            state.characterSum.subraceData = null;   
        },
        unsetRace(state) {
            state.characterSum.subraceActive = undefined;
            state.characterSum.raceData = undefined;
            state.characterSum.subraceData = undefined;
        },
        addClasses(state, action) {
            state.allClasses = [...JSON.parse(action.payload)]
                .sort((a, b) => a.class_data.name.toLowerCase().localeCompare(a.class_data.name.toLowerCase()))
        },
        selectClass(state, action) {
            state.characterSum.classData = action.payload;
            state.navNextBtnDisable = false;
        },
        unsetClass(state) {
            state.characterSum.classData = undefined;
            state.navNextBtnDisable = true;
        },
        activeNextBtn(state, action) {
            state.navNextBtnDisable = action.payload;
        },
        activePrevBtn(state, action) {
            state.navPrevBtnDisable = action.payload;
        },
        showPreviewPage(state, action) {
            state.showPreviewPage = action.payload;
        }
    }
});


export const {
    setCharacterStep,
    addRaces,
    selectRace,
    selectSubrace,
    addClasses,
    selectClass,
    unsetClass,
    activeNextBtn,
    activePrevBtn,
    showPreviewPage,
} = characterStepsSlice.actions;

export default characterStepsSlice.reducer;