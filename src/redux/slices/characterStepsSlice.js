import { createSlice, current } from "@reduxjs/toolkit";

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
        subclassData: undefined,
        classActive: undefined,
        subclassActive: undefined,
        backgroundAllData: undefined,
        backgroundData: undefined,
        backgroundActive: undefined,
        statsModifers: [0, 0, 0, 0, 0, 0],
        resultCharStats: [],

    },
    statsRollCount: 0,
    statsTotalRoll: [0, 0, 0, 0, 0, 0],
    statModeSwitcher: false,
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
            state.characterSum.subraceActive = false;
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
                .sort((a, b) => a.class_data.name.toLowerCase().localeCompare(b.class_data.name.toLowerCase()))
        },
        selectClass(state, action) {
            state.characterSum.classData = action.payload;
            state.navNextBtnDisable = false;
            state.subclassActive = undefined;
            
        },
        selectSubclass(state, action) {
            state.characterSum.subclassData = action.payload;
            state.navNextBtnDisable = false;
            state.subclassActive = action.payload.subclassInfo.id;
        },
        unsetClass(state) {
            state.characterSum.classData = undefined;
            state.characterSum.subclassData = undefined;
            state.navNextBtnDisable = true;
            state.subclassActive = undefined;
        },
        addBackground(state, action) {
            state.characterSum.backgroundAllData = [...JSON.parse(action.payload)]
            if (state.characterSum.backgroundAllData.length > 10) {
                state.characterSum.backgroundData = [...state.characterSum.backgroundAllData.slice(0, 10)].sort((a, b) => a.name > b.name ? 1 : -1);
                
                return;
            }
            state.characterSum.backgroundData = [...JSON.parse(action.payload)]
        },
        selectBackground(state, action) {
            state.characterSum.backgroundActive = action.payload;
        },
        showMoreBackground(state, action) {
            const maxLength = state.characterSum.backgroundAllData.length;
            const currentLength = state.characterSum.backgroundData.length;

            if (currentLength + action.payload >= maxLength) {
                state.characterSum.backgroundData = [...state.characterSum.backgroundAllData].sort((a, b) => a.name > b.name ? 1 : -1);
                return;
            }
            state.characterSum.backgroundData = [...state.characterSum.backgroundAllData.slice(0, currentLength + action.payload)]
                .sort((a, b) => a.name > b.name ? 1 : -1)
        },
        activeNextBtn(state, action) {
            state.navNextBtnDisable = action.payload;
        },
        activePrevBtn(state, action) {
            state.navPrevBtnDisable = action.payload;
        },
        showPreviewPage(state, action) {
            state.showPreviewPage = action.payload;
        },
        statSwitcherMode(state, action) {
            if (action.payload === 1) {
                state.statModeSwitcher = true;
                return;
            }
            state.statModeSwitcher = false;
        },
        generateStatsRoll(state, action) {
            const dice = action.payload.dice;
            const count = action.payload.count;
            let name = undefined;
            let diceNumTmpArr = []
            const resultArr = []

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
        resetStatsTotalRoll(state) {
            state.statsTotalRoll = [0, 0, 0, 0, 0, 0];
            state.statsRollCount = 0;
            state.statRollInProgress = false;
        },
        generateStatModif(state, action) {
            const statsArr = action.payload;
            const statsModifers = statsArr.map((statValue, i) => {
                const modif = Math.floor((Number(statValue) - 10) / 2);
                return {id: Math.floor(Math.random() * 1000), value: statValue, modifer:modif};
            })
            state.characterSum.statsModifers = [...statsModifers];
        },
        spendStatFormRoll(state, action) {
            const statChange = action.payload;

            if (state.characterSum.resultCharStats.find((item) => item.id === statChange.id)) {
                state.characterSum.resultCharStats = [
                    ...state.characterSum.resultCharStats.filter((item) => item.id !== statChange.id),
                    statChange,
                ];
                return;
            }
            
            state.characterSum.resultCharStats = [...state.characterSum.resultCharStats, statChange];    
        },
    }
});


export const {
    setCharacterStep,
    addRaces,
    selectRace,
    selectSubrace,
    unsetRace,
    addClasses,
    selectClass,
    selectSubclass,
    unsetClass,
    addBackground,
    selectBackground,
    showMoreBackground,
    activeNextBtn,
    activePrevBtn,
    showPreviewPage,
    statSwitcherMode,
    generateStatsRoll,
    resetStatsTotalRoll,
    generateStatModif,
    spendStatFormRoll,
    
} = characterStepsSlice.actions;

export default characterStepsSlice.reducer;