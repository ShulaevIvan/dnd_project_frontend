import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allRaces: [],
    allClasses: [],
    allAbilites: [],
    allAbilitesChunks: {},
    allInstruments: [],
    allWeapons: [],
    allArmor: [],
    allLanguages: [],
    allWordViews: {
        good: [
            {name: 'lawfull good', shortName: 'lg'}, 
            {name: 'neutral good', shortName: 'ng'}, 
            {name: 'chaotic good',  shortName: 'chg'}
        ],
        neutral: [
            {name: 'lawfull neutral', shortName: 'ln'}, 
            {name: 'true neutral', shortName: 'tn'}, 
            {name: 'chaotic neutral', shortName: 'chn'}
        ],
        evil: [
            {name: 'lawfull evil', shortName: 'le'}, 
            {name: 'neutral evil', shortName: 'ne'}, 
            {name: 'chaotic evil', shortName: 'che'}
        ],
    },
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
        backgroundWorldViewActive: undefined,
        allCharArmorMastery: [],
        allCharWeaponMastery: [],
        allCharInstrumentMastery: [],
        choosenCharAbilites: [],
    },
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
            state.characterSum.backgroundWorldViewActive = undefined;
            state.characterSum.backgroundActive = action.payload;
        },
        selectWorldView(state, action) {
            const { worldView } = action.payload;
            state.characterSum.backgroundWorldViewActive = worldView;
            
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
            else if (action.payload === -1) {
                state.statModeSwitcher = false;
            }
            
        },
        addAbilites(state, action) {
            state.allAbilites = [];
            const { abilities } = action.payload;
            const part1 = abilities.slice(0, abilities.length / 2);
            const part2 = abilities.slice(abilities.length /2);
            state.allAbilites = [...abilities];
            state.allAbilitesChunks = {part1: part1, part2: part2};
        },
        addCharBonuceAbilites(state, action) {
            const { bonuceAbilities } = action.payload;
            state.bonuceAbilities = bonuceAbilities;
        },
        addBonuceAbility(state, action) {
            const ability = action.payload;
            state.characterSum.classData.classAbilities = [...state.characterSum.classData.classAbilities, ability];
        },
        addMastery(state, action) {
            const data = action.payload.data;
            const param = action.payload.param;

            if (param === 'instruments') {
                if (state.characterSum.backgroundActive[0].instrumentMastery) {
                    state.characterSum.allCharInstrumentMastery = [
                        ...state.characterSum.backgroundActive[0].instrumentMastery,
                    ]
                }
                else if (state.characterSum.classData.classInstrumentMastery) {
                    state.characterSum.allCharInstrumentMastery = [
                        ...state.characterSum.classData.classInstrumentMastery,
                    ]
                }
                state.allInstruments = [...JSON.parse(data)];
            }
            else if (param === 'weapons') {
                state.characterSum.allCharWeaponMastery = [
                    ...state.characterSum.classData.classWeaponMastery,
                    ...state.characterSum.backgroundActive[0].weaponMastery,  
                ]
                state.allWeapons = [...JSON.parse(data)];
            }
            else if (param === 'armor') {
                state.characterSum.allCharArmorMastery = [
                    ...state.characterSum.classData.classArmorMastery,
                    ...state.characterSum.backgroundActive[0].armorMastery,  
                ]
                state.allArmor = [...JSON.parse(data)];
            }
        },
        addLanguages(state, action) {
            state.allLanguages = [...JSON.parse(action.payload)];
        },
        chooseCharAbility(state, action) {
            const ability = action.payload
            state.characterSum.choosenCharAbilites = [...state.characterSum.choosenCharAbilites.filter((item) => item.id !== ability.id), ability]
        }
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
    selectWorldView,
    showMoreBackground,
    activeNextBtn,
    activePrevBtn,
    showPreviewPage,
    statSwitcherMode,
    addAbilites,
    addCharBonuceAbilites,
    addBonuceAbility,
    addMastery,
    addLanguages,
    chooseCharAbility,
    
} = characterStepsSlice.actions;

export default characterStepsSlice.reducer;