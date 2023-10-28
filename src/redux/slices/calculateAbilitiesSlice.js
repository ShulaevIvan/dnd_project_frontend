import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentAbilityPoints: 0,
    maxAbilitiesPoints: 0,
    baseAbilityPoints: 0,
    masteryPoints: 2,
    choosenAbilities: [],
    bonuceAbilities: [],
    freeBonuceAbilities: [],
    anyAbilitiesCount: 0,

};

const calculateAbilitiesSlice = createSlice({
    name: 'calculateAbility',
    initialState,
    reducers: {
        addAbilityPoints(state, action) {
            state.choosenAbilities = [];
            state.freeBonuceAbilities = [];
            state.bonuceAbilities = [];
            
            const abilityPoints = Number(action.payload.abilityPoints);
            state.maxAbilitiesPoints = abilityPoints;
            state.currentAbilityPoints = abilityPoints;
        },
        chooseAbility(state, action) {
            const ability = action.payload.ability;
            const addType = action.payload.addType;
            const abilExists = state.choosenAbilities.find((item) => item.id === ability.id);

            if (!abilExists && addType === 'any' && state.anyAbilitiesCount > 0) {
                state.choosenAbilities = [...state.choosenAbilities, ability];
                state.freeBonuceAbilities = [...state.freeBonuceAbilities, ability]
                state.anyAbilitiesCount = Number(state.anyAbilitiesCount) - 1;
                return;
            }
            else if (!abilExists && addType === 'background') {
                state.choosenAbilities = [...state.choosenAbilities, ability];
                state.freeBonuceAbilities = [...state.freeBonuceAbilities, ability]
                return;
            }
            if (state.currentAbilityPoints > 0 && addType === 'regular' && state.currentAbilityPoints <= state.maxAbilitiesPoints && !abilExists) {
                state.choosenAbilities = [...state.choosenAbilities, ability];
                state.currentAbilityPoints = Number(state.currentAbilityPoints) - 1;
                return;
            }
            else if (abilExists && addType === 'regular' && state.currentAbilityPoints + 1 <= state.maxAbilitiesPoints) {
                state.choosenAbilities = [...state.choosenAbilities.filter((item) => item.id !== ability.id)];
                state.currentAbilityPoints = Number(state.currentAbilityPoints) + 1;
                return;
            }
           
        },
        addBonuceAbilities(state, action) {
            const { raceBonuceAbilities, backgroundBonuceAbilities } = action.payload;
            const bonuceAbilitiesSum = [];
            state.anyAbilitiesCount = 0;
            let abilObj;

            raceBonuceAbilities.map((item) => {
                abilObj = {
                    name: item.skill_data,
                    value: 0,
                }
                const abilExists = state.bonuceAbilities.find((abil) => abil.name === item.skill_data);
                if (abilExists) abilObj.value += 1;
                bonuceAbilitiesSum.push(abilObj);
                return item;
            });

            backgroundBonuceAbilities.map((item) => {
                abilObj = {
                    name: item.name,
                    value: 0,
                }
                const abilExists = state.bonuceAbilities.find((abil) => abil.name === item.name);
                if (abilExists) abilObj.value += 1;
                bonuceAbilitiesSum.push(abilObj);
            });
            const anyAbilitiesCount = bonuceAbilitiesSum.filter((item) => item.name.replace(/\s\w+$/, '') === 'any').reduce((sum, item) => sum + item.value, 0);
            state.anyAbilitiesCount = anyAbilitiesCount;
            state.bonuceAbilities = bonuceAbilitiesSum;
        },
        removeBonuceAbility(state, action) {
            const removeBonuce = action.payload;
            state.bonuceAbilities.filter((item) => item !== removeBonuce.name);
        },
        spendAnyAbilityBonuce(state, action) {
            state.anyAbilitiesCount = state.anyAbilitiesCount - Number(action.payload);
        },
        addAdditionalAbilityPoints(state, action) {
            
        }
    }
});

export const {
    addAbilityPoints,
    chooseAbility,
    addBonuceAbilities,
    addAdditionalAbilityPoints,
    removeBonuceAbility,
    spendAnyAbilityBonuce,

} = calculateAbilitiesSlice.actions;

export default calculateAbilitiesSlice.reducer;