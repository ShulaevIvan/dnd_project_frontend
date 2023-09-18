import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    raceStats: {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0,
    },
    subraceStats: {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0,
    },
    minHitDice: 0,
    maxHitDice: 0,
    subraceActive: undefined,
};

const calculateStatsSlice = createSlice({
    name: 'loginForm',
    initialState,
    reducers: {
        addBaseStats(state, action) {
            console.log(action.payload)
        },
    }
});

export const {
    addBaseStats,

} = calculateStatsSlice.actions;

export default calculateStatsSlice.reducer;