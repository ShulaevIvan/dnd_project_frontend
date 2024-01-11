import { createSlice } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";

const initialState = {
    currentAbilityPoints: 0,
    maxAbilityPoints: 0,
    baseAbilityPoints: 0,
    masteryPoints: 2,
    choosenAbilities: [],
    choosenLanguages: [],
    bonuceAbilities: [],
    choosenSkills : [],
    freeBonuceAbilities: [],
    anyAbilityCount: 0,
    maxAnyAbilityCount: 0,
    backgroundAbilityCount: 0,
    maxBackgroundAbilityCount: 0,
    maxRaceAbilityCount: 0,
    raceAbilityCount: 0,
    anyLanguagePoints: 0,
    maxLanguagePoints: 0,
    addedAbilities: [],
    initialClassAbilities: [],
    initialLanguages: [],
    resultCharAbilities: [],
    raceBonuceAbilities: undefined,
    backgroundBonuceAbilities: undefined,
    languagePanelActive: false,
    instrumentPanelActive: false,
    maxAnyInstrumentPoints: 0,
    currentAnyInstrumentPoints: 0,
    backupClassAbilities: [],
    backupRaceAbilities: [],
    backupBackgroundAbilities: [],


};

const calculateAbilitiesSlice = createSlice({
    name: 'calculateAbility',
    initialState,
    reducers: {
        addAbilityPoints(state, action) {
            state.choosenAbilities = [];
            state.freeBonuceAbilities = [];
            state.bonuceAbilities = [];
            state.resultCharAbilities = [];
            
            const abilityPoints = Number(action.payload.abilityPoints);
            state.maxAbilityPoints = abilityPoints;
            state.currentAbilityPoints = abilityPoints;
        },
        chooseAbility(state, action) {
            const ability = action.payload.ability;
            const addType = action.payload.addType;
            const abilExists = state.choosenAbilities.find((item) => item.id === ability.id);

            if (!abilExists && addType === 'any' && state.anyAbilityCount >= 0) {
                state.choosenAbilities = [...state.choosenAbilities, ability];
                state.freeBonuceAbilities = [...state.freeBonuceAbilities, ability];
                state.anyAbilityCount = Number(state.anyAbilityCount) - 1;
                state.addedAbilities = [...state.addedAbilities, ability];
                return;
            }
            else if (addType === 'race') {
                if (abilExists && state.raceAbilityCount >= 0) {
                    state.choosenAbilities = state.choosenAbilities.filter((item) => item.id !== ability.id)
                    state.freeBonuceAbilities = state.freeBonuceAbilities.filter((item) => item.id !== ability.id)
                    state.raceAbilityCount = state.raceAbilityCount + 1;
                    return;
                }
                state.choosenAbilities = [...state.choosenAbilities, ability];
                state.freeBonuceAbilities = [...state.freeBonuceAbilities, ability];
                state.addedAbilities = [...state.addedAbilities, ability];
                state.raceAbilityCount = state.raceAbilityCount - 1;
              
            }
            else if (addType === 'background') {
                if (abilExists && state.backgroundAbilityCount >= 0) {
                    state.choosenAbilities = state.choosenAbilities.filter((item) => item.id !== ability.id)
                    state.freeBonuceAbilities = state.freeBonuceAbilities.filter((item) => item.id !== ability.id)
                    state.backgroundAbilityCount = state.backgroundAbilityCount  + 1;
                    return;
                }
                state.choosenAbilities = [...state.choosenAbilities, ability];
                state.freeBonuceAbilities = [...state.freeBonuceAbilities, ability];
                state.addedAbilities = [...state.addedAbilities, ability];
                state.backgroundAbilityCount = state.backgroundAbilityCount - 1;
            }
            
            if (state.currentAbilityPoints > 0 && addType === 'regular' && !abilExists) {
                state.choosenAbilities = [...state.choosenAbilities, ability];
                state.currentAbilityPoints = Number(state.currentAbilityPoints) - 1;
                return;
            }
            else if (abilExists && addType === 'regular') {
                state.choosenAbilities = [...state.choosenAbilities.filter((item) => item.id !== ability.id)];
                state.currentAbilityPoints = Number(state.currentAbilityPoints) + 1;
                return;
            }
           
        },
        addBonuceAbilities(state, action) {
            const { initialClassAbilities, raceBonuceAbilities, backgroundBonuceAbilities } = action.payload;
            state.initialClassAbilities = initialClassAbilities;
            const bonuceAbilitiesSum = [];
            state.anyAbilityCount = 0;
            let abilObj;

            raceBonuceAbilities.map((item) => {
                abilObj = {
                    name: item.skill_data,
                    value: item.skill_value,
                }
                const abilExists = state.bonuceAbilities.find((abil) => abil.name === item.skill_data);
                if (abilExists) abilObj.value += 1;
                bonuceAbilitiesSum.push(abilObj);
                return item;
            });

            backgroundBonuceAbilities.map((item) => {
                abilObj = {
                    name: item.name,
                    value: 1,
                }
                const abilExists = state.bonuceAbilities.find((abil) => abil.name === item.name);
                if (abilExists) abilObj.value += 1;
                bonuceAbilitiesSum.push(abilObj);
                return item;
            });
            state.raceBonuceAbilities = raceBonuceAbilities;
            state.backgroundBonuceAbilities = backgroundBonuceAbilities;

            const anyAbilityCount = bonuceAbilitiesSum.filter((item) => item.name.replace(/\s\w+$/, '') === 'any').reduce((sum, item) => sum + item.value, 0);
            state.anyAbilityCount = anyAbilityCount;
           
            state.bonuceAbilities = bonuceAbilitiesSum;
            
            state.maxBackgroundAbilityCount = state.backgroundBonuceAbilities.length;
            state.backgroundAbilityCount = state.maxBackgroundAbilityCount;
            state.raceAbilityCount = state.maxRaceAbilityCount;

            state.maxAnyAbilityCount = state.anyAbilityCount;
            state.maxRaceAbilityCount = raceBonuceAbilities.filter((item) => item.skill_type === 'ability' && item.skill_data.replace(/\s\w+$/, '') !== 'any').length;
            
        },
        removeBonuceAbility(state, action) {
            const removeBonuce = action.payload;
            state.bonuceAbilities.filter((item) => item !== removeBonuce.name);
        },
        spendAnyAbilityBonuce(state, action) {
            state.anyAbilityCount = state.anyAbilityCount - Number(action.payload);
        },
        saveResultAbilities(state, action) {
            const abilities = action.payload;
            state.resultCharAbilities = [...abilities];
        },
        resetAbilityPoints(state) {
            state.choosenAbilities = [];
            state.freeBonuceAbilities = [];
            state.choosenLanguages = [...state.initialLanguages].filter((item) => item.id !== 9);
            state.currentAbilityPoints = state.maxAbilityPoints;
            state.anyAbilityCount = state.maxAnyAbilityCount;
            state.backgroundAbilityCount = state.maxBackgroundAbilityCount;
            state.raceAbilityCount = state.maxRaceAbilityCount;
            state.anyLanguagePoints = state.maxLanguagePoints
            state.currentAnyInstrumentPoints = state.maxAnyInstrumentPoints;
            state.choosenInstruments = [...state.initialInstruments];
            state.addedAbilities = [];
        },
        addAnyLanguagePoints(state, action) {
            const { backgroundLanguages } = action.payload;
            state.anyLanguagePoints = backgroundLanguages.filter((item) => item.id === 9).length;
            state.maxLanguagePoints = state.anyLanguagePoints;
        },
        chooseLanguage(state, action) {
            const {language, typeAdd } = action.payload;
          
            if (typeAdd === 'arr') {
                state.initialLanguages = [...language]
                state.choosenLanguages = [
                    ...language,
                ].filter((item) => item.id !== 9);
                return;
            }
            state.choosenLanguages = [...state.choosenLanguages, language];
            state.anyLanguagePoints = Number(state.anyLanguagePoints) - 1;
        },
        chooseInstrument(state, action) {
            const {instrument, typeAdd } = action.payload;
            if (typeAdd === 'arr') {
                const filterInstrumentsArr = instrument.filter((obj, index, self) => index === self.findIndex((i) => (i.id === obj.id && i.name === obj.name)));
                state.initialInstruments = [...filterInstrumentsArr]
                state.choosenInstruments = [
                    ...filterInstrumentsArr
                ];

                state.maxAnyInstrumentPoints = state.choosenInstruments.filter((item) => item.id === 10).length;
                state.currentAnyInstrumentPoints = state.maxAnyInstrumentPoints;
                return;
            }
            state.choosenInstruments = [...state.choosenInstruments, instrument];
            state.currentAnyInstrumentPoints = state.currentAnyInstrumentPoints - 1;
        },
        activeAddMasteryPanel(state, action) {
            const { type, value } = action.payload;
            if (type === 'lang') {
                state.activeLanguagePanel = value;
            }
            if (type === 'instrument') {
                state.instrumentPanelActive = value;
            }
        },
        addBonuceSkill(state, action) {
            const { type, skill } = action.payload;
            const checkSkill = state.choosenSkills.find((item) => item.id === skill.id && item.name === skill.name);
            if (!checkSkill) state.choosenSkills = [...state.choosenSkills, {...skill, type: type}];
        },
        resetCalculateAbilState(state) {
            state.resultCharAbilities = [];
            state.addedAbilities = [];
        },
        backupBonuceAbilities(state, action) {
            const { classAbilities, raceAbilities, backgroundAbilities } = action.payload;
            state.backupClassAbilities = [...classAbilities];
            state.backupRaceAbilities = [...raceAbilities];
            state.backupBackgroundAbilities = [...backgroundAbilities];
        }
        
    },
    extraReducers: (builder) => builder.addCase(resetAbilitiesState, () => initialState),
});

export const {
    addAbilityPoints,
    chooseAbility,
    addBonuceAbilities,
    removeBonuceAbility,
    spendAnyAbilityBonuce,
    saveResultAbilities,
    resetAbilityPoints,
    addAnyLanguagePoints,
    chooseLanguage,
    chooseInstrument,
    activeAddMasteryPanel,
    addBonuceSkill,
    resetCalculateAbilState,
    backupBonuceAbilities

} = calculateAbilitiesSlice.actions;

export const resetAbilitiesState = createAction('RESET_ABILITIES_STATE');
export default calculateAbilitiesSlice.reducer;