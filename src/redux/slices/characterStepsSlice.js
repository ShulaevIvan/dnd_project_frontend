import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allRaces: [],
    characterStepPage: 1,
    characterStepMaxPage: 5,
    stepsNames: ['race', 'class', 'background', 'stats', 'skills', 'total'],
    characterSum: {
        raceData: undefined,
        subraceActive: undefined,
        subraceData: undefined,
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
               return 'test';
            }
            const checkNum = Math.sign(Number(action.payload));

            if (state.characterStepPage > 5) state.characterStepPage = state.characterStepMaxPage;
            if (checkNum === -1 && state.characterStepPage > 1) {
                state.characterStepPage += Number(checkNum);
                return;
            }
            else if (checkNum === 1 && state.characterStepPage >= 1) {
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
        },
        selectSubrace(state, action) {
            if (action.payload) {
                const data = JSON.parse(action.payload);
                state.characterSum.subraceActive = true;
                state.characterSum.subraceData = data;
                return;
            }

            state.characterSum.subraceActive = false;
            state.characterSum.subraceData = null;   
        },
        activeNextBtn(state, action) {
            state.navNextBtnDisable = action.payload;
        },
        activePrevBtn(state, action) {
            state.navNextBtnDisable = action.payload;
        }
    }
});


export const {
    setCharacterStep,
    addRaces,
    selectRace,
    selectSubrace,
    activeNextBtn,
    activePrevBtn,
} = characterStepsSlice.actions;

export default characterStepsSlice.reducer;