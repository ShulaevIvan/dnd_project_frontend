import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allRaces: [],
    characterSum: {
        raceId: undefined,
    }
};

const characterStepsSlice = createSlice({
    name: 'loginForm',
    initialState,
    reducers: {
        addRaces(state, action) {
            state.allRaces = [...JSON.parse(action.payload)].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        },
        selectRace(state, action) {
            state.characterSum.raceId = action.payload
        }
    }
});


export const {
    addRaces,
    selectRace
} = characterStepsSlice.actions;

export default characterStepsSlice.reducer;