import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    subraceStats: {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0,
    },
    raceStats: {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0,
    },
    totalStats: {
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
            const subraceStatsMode = action.payload.subrace;

            state.raceStats.str = action.payload.stats.str_bonuce;
            state.raceStats.dex = action.payload.stats.dex_bonuce;
            state.raceStats.con = action.payload.stats.con_bonuce;
            state.raceStats.int = action.payload.stats.int_bonuce;
            state.raceStats.wis = action.payload.stats.wis_bonuce;
            state.raceStats.cha = action.payload.stats.cha_bonuce;

            if (subraceStatsMode) {
                state.subraceStats.str = action.payload.stats.str_bonuce;
                state.subraceStats.dex = action.payload.stats.dex_bonuce;
                state.subraceStats.con = action.payload.stats.con_bonuce;
                state.subraceStats.int = action.payload.stats.int_bonuce;
                state.subraceStats.wis = action.payload.stats.wis_bonuce;
                state.subraceStats.cha = action.payload.stats.cha_bonuce;

                Object.entries(state.subraceStats).forEach((stat) => {
                    if (stat[1] > state.raceStats[stat[0]] || stat[1] < state.raceStats[stat[0]]) {
                        state.raceStats[stat[0]] = stat[1]
                    }
                    state.raceStats[stat[0]] = stat[1]
                });
            }
            state.totalStats = state.raceStats;
        },
        addBaseHits(state, action) {
            state.minHitDice = action.payload.minHits;
            state.maxHitDice = action.payload.maxHits;
        }
    }
});

export const {
    addBaseStats,
    addBaseHits,

} = calculateStatsSlice.actions;

export default calculateStatsSlice.reducer;