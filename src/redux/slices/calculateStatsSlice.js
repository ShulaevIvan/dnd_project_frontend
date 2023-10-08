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
    statsModifers: [0, 0, 0, 0, 0, 0],
    statsRollCount: 0,
    increaseStatsCount: 0,
    statsTotalRoll: [0, 0, 0, 0, 0, 0],
    statSelectedRoll: [],
    resultCharStats: [],
    resultCharStatsBackup: [],
    backupRaceStats: [],
    disableStatSelectors: []
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
        },
        generateStatsRoll(state, action) {
            const dice = action.payload.dice;
            const count = action.payload.count;
            let name = undefined;
            let diceNumTmpArr = []
            const resultArr = []

            if (state.statsRollCount === 0) state.backupRaceStats = state.totalStats;
            state.totalStats = state.backupRaceStats;
            state.disableStatSelectors = [];
            state.statsTotalRoll = [];
            state.statsRollCount += 1;

            for (let i = 0; i < 6; i += 1) {
                for (let j = 0; j < count; j += 1) {
                    const randStatNum = Math.floor(1  + Math.random() * (dice + 1 - 1));
                    diceNumTmpArr.push(randStatNum)
                }
                const minNum = Math.min.apply(null, diceNumTmpArr);
                const minNumIndex = diceNumTmpArr.indexOf(minNum);
                diceNumTmpArr.pop(minNumIndex);
                diceNumTmpArr = diceNumTmpArr.reduce((prev, next) => {
                    return prev+next;
                });
                
                resultArr.push(diceNumTmpArr);
                diceNumTmpArr = [];
            }
            
            state.statsTotalRoll = [...resultArr];
        },
        generateStatsModif(state, action) {
            state.resultCharStats = [];
            const statsArr = action.payload;
            const statsModifers = statsArr.map((statValue, i) => {
                const modif = Math.floor((Number(statValue) - 10) / 2);
                return {id: Math.floor(Math.random() * 1000), value: statValue, modifer: modif};
            })
            state.statsModifers = [...statsModifers];
        },
        spendStatFormRoll(state, action) {
            const statChange = action.payload;
            state.resultCharStats = [...state.resultCharStats].filter((item) => item.statParam !== statChange.statParam && item.statParam);
            
            if (state.resultCharStats.find((item) => item.id === statChange.id)) {
                state.resultCharStats = [
                    ...state.resultCharStats.filter((item) => item.id !== statChange.id && item.statParam),
                    statChange,
                ];
                return;
            }
            
            state.resultCharStats = [...state.resultCharStats, statChange];
        },
        backupCharStats(state) {
            if (state.resultCharStatsBackup.length === 0) {
                state.resultCharStatsBackup = [...state.statsModifers];
                return;
            }
            state.characterSum.resultCharStats = [];
            
        },
        restoreCharStats(state) {
            if (state.resultCharStatsBackup.length > 0) {
                state.totalStats = state.backupRaceStats;
                state.statsModifers = [...state.resultCharStatsBackup];
                state.resultCharStatsBackup = [];
                state.disableStatSelectors = [];
                return;
            }
        },
        resetCharStats(state) {
            state.statsModifers = [0, 0, 0, 0, 0, 0];
            state.statsRollCount = 0;
            state.increaseStatsCount = 0;
            state.statsTotalRoll = [0, 0, 0, 0, 0, 0];
            state.statSelectedRoll = [];
            state.resultCharStats = [];
            state.resultCharStatsBackup = [];
            
        },
        recalcModifers(state) {
            state.resultCharStats = [...state.resultCharStats.map((item) => {
                const modif = Math.floor((Number(item.value) - 10) / 2);
                return (
                    {
                        ...item,
                        modifer: modif,

                    }
                )
            })]
        },
        addCharStats(state, action) {
            const statType = action.payload.statParam.toLowerCase();
            state.totalStats = {
                ...state.totalStats,
                [statType]: action.payload.value
            }
        },
        disableSelectStat(state, action) {
            state.disableStatSelectors = [...state.disableStatSelectors, action.payload]
        }

    }
});

export const {
    addBaseStats,
    addBaseHits,
    generateStatsRoll,
    generateStatsModif,
    addBonuceStatToRoll,
    spendStatFormRoll,
    backupCharStats,
    restoreCharStats,
    resetCharStats,
    recalcModifers,
    addCharStats,
    disableSelectStat

} = calculateStatsSlice.actions;

export default calculateStatsSlice.reducer;