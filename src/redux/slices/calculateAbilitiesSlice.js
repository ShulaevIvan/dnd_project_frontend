import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentAbilityPoints: 0,
    maxAbilitiesPoints: 0,
    baseAbilityPoints: 0,
    masteryPoints: 2,
    choosenAbilities: [],
    bonuceAbilities: [],
    bonuceAbilitiyPoints: 0,

};

const calculateAbilitiesSlice = createSlice({
    name: 'calculateAbility',
    initialState,
    reducers: {
        addAbilityPoints(state, action) {
            state.choosenAbilities = [];
            const abilityPoints = Number(action.payload.abilityPoints);
            state.maxAbilitiesPoints = abilityPoints;
            state.currentAbilityPoints = abilityPoints;
        },
        chooseAbility(state, action) {
            const ability = action.payload;
            const abilExists = state.choosenAbilities.find((item) => item.id === ability.id);

            if (state.currentAbilityPoints > 0 && state.currentAbilityPoints <= state.maxAbilitiesPoints && !abilExists) {
                state.choosenAbilities = [...state.choosenAbilities, ability];
                state.currentAbilityPoints = Number(state.currentAbilityPoints) - 1;
                return;
            }
            else if (abilExists && state.currentAbilityPoints + 1 <= state.maxAbilitiesPoints) {
                state.choosenAbilities = [...state.choosenAbilities.filter((item) => item.id !== ability.id)];
                state.currentAbilityPoints = Number(state.currentAbilityPoints) + 1;
                return;
            }
           
        },
        addBonuceAbilities(state, action) {
            const { raceBonuceAbilities, backgroundBonuceAbilities } = action.payload;
            const bonuceAbilitiesSum = [];

            raceBonuceAbilities.map((item) => {
                let abilObj = {
                    name: item.skill_data,
                    value: 0,
                }
                const abilExists = state.bonuceAbilities.find((abil) => abil.name === item.skill_data);
                if (abilExists)  abilObj.value += 1;
                bonuceAbilitiesSum.push(abilObj);
            });

            backgroundBonuceAbilities.map((item) => {
                let abilObj = {
                    name: item.name,
                    value: 0,
                }
                const abilExists = state.bonuceAbilities.find((abil) => abil.name === item.name);
                if (abilExists) abilObj.value += 1;
                bonuceAbilitiesSum.push(abilObj);
            });
            state.bonuceAbilities = bonuceAbilitiesSum;
        },
        removeBonuceAbility(state, action) {
            const removeBonuce = action.payload;
            state.bonuceAbilities.filter((item) => item !== removeBonuce.name);
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

} = calculateAbilitiesSlice.actions;

export default calculateAbilitiesSlice.reducer;