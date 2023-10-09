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
    disableStatSelectors: [],
    statBuyPoints: 27,
    currentStatBuyPoints: 0,
    statPrice: {maxValue: 13, minValue: 8, modifer: 1},
    charStatsTotal: [
        {name: 'str', value: 8, spend: 0},
        {name: 'dex', value: 8, spend: 0},
        {name: 'con', value: 8, spend: 0},
        {name: 'int', value: 8, spend: 0},
        {name: 'wis', value: 8, spend: 0},
        {name: 'cha', value: 8, spend: 0},
    ],
    spendPointsByStat: [
        {name: 'str', spend: 0},
        {name: 'dex', spend: 0},
        {name: 'con', spend: 0},
        {name: 'int', spend: 0},
        {name: 'wis', spend: 0},
        {name: 'cha', spend: 0},
    ]
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
            if (state.statsRollCount === 0) state.backupRaceStats = state.totalStats;
            state.totalStats = state.backupRaceStats;
            state.statsModifers = [0, 0, 0, 0, 0, 0];
            state.statsRollCount = 0;
            state.increaseStatsCount = 0;
            state.statsTotalRoll = [0, 0, 0, 0, 0, 0];
            state.statSelectedRoll = [];
            state.resultCharStats = [];
            state.resultCharStatsBackup = [];
            state.currentStatBuyPoints =  0;
            state.statPrice = {maxValue: 13, minValue: 8, modifer: 1};
            state.charStatsTotal = [
                {name: 'str', value: 8, spend: 0},
                {name: 'dex', value: 8, spend: 0},
                {name: 'con', value: 8, spend: 0},
                {name: 'int', value: 8, spend: 0},
                {name: 'wis', value: 8, spend: 0},
                {name: 'cha', value: 8, spend: 0},
            ];
            
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
        },
        buyStats(state, action) {
            state.currentStatBuyPoints = state.charStatsTotal.reduce((sum, item) => sum + item.spend, 0);
            const calcType = action.payload.plus;
            const statName = action.payload.data.name;
            let statValue = action.payload.data.value;
            let modifer = 0;

            if (calcType) {
                modifer = 0;
                statValue = action.payload.data.value + 1;
                if (statValue > 15 && calcType) return;
                if (statValue === state.statPrice.minValue || statValue === 9) modifer = 0;
                else if (statValue <= 13 && statValue !== 9) modifer = statValue - state.statPrice.minValue;
                else if (statValue === 14) modifer = (statValue - 1 - state.statPrice.minValue) + state.statPrice.modifer + 1;
                else if (statValue === 15) modifer = (statValue -1 - state.statPrice.minValue) + state.statPrice.modifer + 2;
                if (modifer !== 0 && state.currentStatBuyPoints >= 27 && calcType) return;
            }
            else {
                statValue = action.payload.data.value - 1;
                if (statValue < 8 && !calcType) return;
                if (action.payload.data.value === state.statPrice.minValue) modifer = 0;
                if (statValue === 15) modifer = 9;
                else if (statValue === 14) modifer = 7;
                else if (statValue <= 13 && statValue > 8) modifer = statValue - state.statPrice.minValue;
            }

            state.charStatsTotal = [...state.charStatsTotal].map((item) => {
                if (item.name === statName) {
                    return {
                        ...item,
                        value: statValue,
                        spend: modifer
                    }
                }
                return item;
            });
            
            state.currentStatBuyPoints = state.charStatsTotal.reduce((sum, item) => sum + item.spend, 0);
        },
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
    disableSelectStat,
    buyStats

} = calculateStatsSlice.actions;

export default calculateStatsSlice.reducer;