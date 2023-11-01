import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentAbilityPoints: 0,
    maxAbilityPoints: 0,
    baseAbilityPoints: 0,
    masteryPoints: 2,
    choosenAbilities: [],
    choosenLanguages: [],
    bonuceAbilities: [],
    freeBonuceAbilities: [],
    anyAbilityCount: 0,
    maxAnyAbilityCount: 0,
    backgroundAbilityCount: 0,
    maxBackgroundAbilityCount: 0,
    anyLanguagePoints: 0,
    addedAbilities: [],
    initialClassAbilities: [],
    resultCharAbilities: [],
    raceBonuceAbilities: undefined,
    backgroundBonuceAbilities: undefined,
    languagePanelActive: false,

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
            

            if (!abilExists && addType === 'any' && state.anyAbilityCount > 0) {
                state.choosenAbilities = [...state.choosenAbilities, ability];
                state.freeBonuceAbilities = [...state.freeBonuceAbilities, ability]
                state.anyAbilityCount = Number(state.anyAbilityCount) - 1;
                state.addedAbilities = [...state.addedAbilities, ability]
                return;
            }
            else if (addType === 'background') {
                if (abilExists && state.anyAbilityCount > 0) {
                    state.choosenAbilities = state.choosenAbilities.filter((item) => item.id !== ability.id)
                    state.freeBonuceAbilities = state.freeBonuceAbilities.filter((item) => item.id !== ability.id)
                    state.backgroundAbilityCount = state.backgroundAbilityCount  + 1;
                    return;
                }
                state.choosenAbilities = [...state.choosenAbilities, ability];
                state.freeBonuceAbilities = [...state.freeBonuceAbilities, ability];
                state.addedAbilities = [...state.addedAbilities, ability]
                state.backgroundAbilityCount = state.backgroundAbilityCount - 1;
            }
            if (state.currentAbilityPoints > 0 && addType === 'regular' && state.currentAbilityPoints <= state.maxAbilityPoints && !abilExists) {
                state.choosenAbilities = [...state.choosenAbilities, ability];
                state.currentAbilityPoints = Number(state.currentAbilityPoints) - 1;
                return;
            }
            else if (abilExists && addType === 'regular' && state.currentAbilityPoints + 1 <= state.maxAbilityPoints) {
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
            state.maxAnyAbilityCount = state.anyAbilityCount;
            state.bonuceAbilities = bonuceAbilitiesSum;
            state.maxBackgroundAbilityCount = state.backgroundBonuceAbilities.length;
            state.backgroundAbilityCount = state.maxBackgroundAbilityCount;
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
            state.currentAbilityPoints = state.maxAbilityPoints;
            state.anyAbilityCount = state.maxAnyAbilityCount;
            state.backgroundAbilityCount = state.maxBackgroundAbilityCount;
        },
        addAnyLanguagePoints(state, action) {
            const { backgroundLanguages } = action.payload;
            state.anyLanguagePoints = backgroundLanguages.filter((item) => item.id === 9).length;
        },
        chooseLanguage(state, action) {
            const {language, typeAdd } = action.payload;
          
            if (typeAdd === 'arr') {
                state.choosenLanguages = [
                    ...language,
                ].filter((item) => item.id !== 9);
                return;
            }
            state.choosenLanguages = [...state.choosenLanguages, language];
            state.anyLanguagePoints = Number(state.anyLanguagePoints) - 1;
        },
        activeLanguagePanel(state, action) {
            state.activeLanguagePanel = action.payload;
        }
    }
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
    activeLanguagePanel

} = calculateAbilitiesSlice.actions;

export default calculateAbilitiesSlice.reducer;