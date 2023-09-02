import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allRaces: [],
    characterStepPage: undefined,
    characterSum: {
        raceData: undefined,
        subraceData: undefined,
    }
};

const characterStepsSlice = createSlice({
    name: 'loginForm',
    initialState,
    reducers: {
        setCharacterStep(state, action) {
            state.characterStepPage = action.payload;
        },
        addRaces(state, action) {
            state.allRaces = [...JSON.parse(action.payload)].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        },
        selectRace(state, action) {
            const data = JSON.parse(action.payload)
            state.characterSum.raceData = data.raceData;
        },
        selectSubrace(state, action) {
            state.characterSum = action.payload
        }
    }
});


export const {
    setCharacterStep,
    addRaces,
    selectRace,
    selectSubrace
} = characterStepsSlice.actions;

export default characterStepsSlice.reducer;