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
    statBuyFreePoints: 6,
    currentStatBuyPoints: 0,
    statPrice: {maxValue: 13, minValue: 8, maxValue: 15, modifer: 1},
    allRaceBonuceStats:  [],
    minMaxBtnsBlock: false,
    setupStatsComplete: false,
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
    ],
    charOtherStats: {
        ac: 0,
        init: 0,
        move: 0,
        prof: 0,
        hp: 0,
        hitDice: 0,
    }
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
            let diceNumTmpArr = [];
            const resultArr = [];

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
                return {
                    id: Math.floor(Math.random() * 1000), 
                    value: statValue, 
                    modifer: Math.sign(modif) && statValue >= 10 ? `+${modif}` : `${modif}`
                };
            })
            state.statsModifers = [...statsModifers];
        },
        spendStatFormRoll(state, action) {
            const statChange = action.payload;
            const actionType = action.payload.manual;

            state.resultCharStats = [...state.resultCharStats].filter((item) => item.statParam !== statChange.statParam);
            
            if (state.resultCharStats.find((item) => item.statParam === statChange.statParam)) {
                state.resultCharStats = [
                    ...state.resultCharStats.filter((item) => item.statParam.toLowerCase() !== statChange.statParam),
                    statChange,
                ];
                return;
            }

            state.resultCharStats = [...state.resultCharStats, statChange];

            if (state.resultCharStats.length === 6 && !actionType) state.setupStatsComplete = true;
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
            state.totalStats = [];
            state.statsModifers = [0, 0, 0, 0, 0, 0];
            state.statsRollCount = 0;
            state.increaseStatsCount = 0;
            state.statsTotalRoll = [0, 0, 0, 0, 0, 0];
            state.statSelectedRoll = [];
            state.resultCharStats = [];
            state.resultCharStatsBackup = [];
            state.charStatsTotal = [];
            state.allRaceBonuceStats = [];
            state.currentStatBuyPoints =  0;
            state.statBuyFreePoints = 6;
            state.setupStatsComplete = false;
            state.statPrice = {maxValue: 13, minValue: 8, modifer: 1};
            state.minMaxBtnsBlock = false;
            state.charOtherStats = {};
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
            state.statBuyFreePoints = state.charStatsTotal.filter((item) => item.value === 8).length;

            state.resultCharStats = [...state.resultCharStats.map((item) => {
                const modif = Math.floor((Number(item.value) - 10) / 2);
                return (
                    {
                        ...item,
                        modifer: Math.sign(modif) && item.value >= 10 ? `+${modif}` : `${modif}`,

                    }
                )
            })];

            state.charStatsTotal = [...state.charStatsTotal.map((item) => {
                const modif = Math.floor((Number(item.value) - 10) / 2);
                return (
                    {
                        ...item,
                        modifer: Math.sign(modif) && item.value >= 10 ? `+${modif}` : `${modif}`,

                    }
                )
            })];
            
        },
        addCharStats(state, action) {
            const chooseType = action.payload.opType;
            const statType = action.payload.statParam.toLowerCase();

            let plusValue = action.payload.value + 1;
            let minValue = action.payload.value - 1;
            
            if (chooseType !== undefined) {
                if (chooseType && plusValue >= 15) plusValue = 15;
                if (!chooseType && minValue <= 8) minValue = 8;

                state.totalStats = {
                    ...state.totalStats,
                    [statType]: chooseType ? plusValue : minValue,
                };
                return;
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
            if (state.currentStatBuyPoints > 27) return;
            if (state.currentStatBuyPoints <= 28) {
                switch(calcType ? statValue + 1 : statValue - 1) {
                    case 8:
                        modifer = 0
                        break
                    case 9:
                        modifer = 1;
                        break
                    case 10:
                        modifer = 2;
                        break
                    case 11:
                        modifer = 3;
                        break
                    case 12:
                        modifer = 4;
                        break
                    case 13:
                        modifer = 5;
                        break
                    case 14:
                        modifer = 7;
                        break
                    case 15:
                        modifer = 9;
                        break
                    default:
                        break;
                }
                if ((statValue === 15 && calcType) || (statValue === 8 && !calcType)  || state.currentStatBuyPoints + modifer === state.statBuyPoints -1) return;
                calcType ? statValue = action.payload.data.value + 1 : statValue = action.payload.data.value - 1;
            }
            
            state.currentStatBuyPoints = state.statBuyPoints - modifer;

            state.charStatsTotal = [...state.charStatsTotal].map((item) => {
                if (item.name === statName && (state.currentStatBuyPoints + modifer === state.statBuyPoints && calcType)) {
                    return {
                        ...item,
                        value: statValue,
                        spend: modifer
                    }
                }
                else if ((item.name === statName && (state.currentStatBuyPoints + modifer === state.statBuyPoints && !calcType))) {
                    return {
                        ...item,
                        value: statValue,
                        spend: modifer
                    }
                }
                return item;
            });

            state.resultCharStats = [...state.resultCharStats.map((item) => {
                if (item.name === statName) {
                    const modif = Math.floor((Number(statValue) - 10) / 2);
                    return {
                        ...item,
                        value: statValue,
                        modifer:  Math.sign(modifer) && modifer >= 10 ? `+${modif}` : `${modif}`,
                    }
                }
               return item;
            })];

            state.currentStatBuyPoints = state.charStatsTotal.reduce((sum, item) => sum + item.spend, 0)
        },
        addAllRaceBonuceStats(state, action) {
            state.allRaceBonuceStats = [...action.payload];
        },
        addRaceBonuceStat(state, action) {
            const bonuceStat = action.payload;

            if (state.allRaceBonuceStats.some((item) => item.name === bonuceStat.name)) return;

            
            state.charStatsTotal = [...state.charStatsTotal.map((item) => {
                if (item.name === bonuceStat.name && !state.allRaceBonuceStats.some((item) => item.name === bonuceStat.name)) {
                    const newValue = state.charStatsTotal.find((item) => item.name === bonuceStat.name).value += bonuceStat.value;

                    return {
                        ...item,
                        value: newValue,
                    }
                }
                return item;
            })];
            
            const newValue = state.totalStats[bonuceStat.name] + bonuceStat.value;

            state.totalStats = {
                ...state.totalStats,
                [bonuceStat.name.replace(/_\w+$/, '')]: newValue,
            };


            state.resultCharStats = [...state.resultCharStats.map((item) => {
                if (item.name === bonuceStat.name) {
                    const modif = Math.floor((Number(newValue) - 10) / 2);
                    return {
                        ...item,
                        value: newValue,
                        modifer:  Math.sign(modif) && item.value >= 10 ? `+${modif}` : `${modif}`,
                    }
                }
               return item;
            })];

            
            state.allRaceBonuceStats = [...state.allRaceBonuceStats, bonuceStat];
        },
        blockIncreaseBtns(state, action) {
            state.minMaxBtnsBlock = action.payload;
        },
        calculateOtherStats(state, action) {
            const { speed, baseHits, minDiceHit, maxDiceHit,} = action.payload;
            const charDex = state.resultCharStats.find((item) => item.statParam === 'dex');
            const charCon = state.resultCharStats.find((item) => item.statParam === 'con');
            
            state.charOtherStats = {
                ...state.charOtherStats,
                ac: charDex ? Math.sign(charDex.modifer)  === 1 ? 10 + Number(charDex.modifer) : 10 - Number(charDex.modifer) : '-',
                init: charDex ? Math.sign(charDex.modifer)  === 1 ? 10 + Number(charDex.modifer) : 10 - Number(charDex.modifer) : '-',
                move: speed,
                prof: 1,
                hp: charCon ? Number(baseHits) + Number(charCon.modifer) : '-',
                hitDice: `${minDiceHit} k ${maxDiceHit}`,
            };
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
    disableSelectStat,
    buyStats,
    addChooseCharStats,
    addAllRaceBonuceStats,
    addRaceBonuceStat,
    blockIncreaseBtns,
    calculateOtherStats

} = calculateStatsSlice.actions;

export default calculateStatsSlice.reducer;