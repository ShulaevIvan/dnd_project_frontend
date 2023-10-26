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
                bonuceAbilitiesSum.push(item.skill_data);
            });

            backgroundBonuceAbilities.map((item) => {
                bonuceAbilitiesSum.push(item.name);
            });
            state.bonuceAbilities = bonuceAbilitiesSum;
        },
        removeBonuceAbility(state, action) {
            state.bonuceAbilities.filter((item) => item !== action.payload.name);
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