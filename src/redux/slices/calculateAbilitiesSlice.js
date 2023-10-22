import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    currentAbilityPoints: 0,
    maxAbilitiesPoints: 0,
    masteryPoints: 2,
    choosenAbilities: [],

};

const calculateAbilitiesSlice = createSlice({
    name: 'calculateAbility',
    initialState,
    reducers: {
        addAbilityPoins(state, action) {
            const abilityPoints = action.payload.abilityPoints;
            const intBonuce = action.payload.intBonuce;
            state.choosenAbilities = [];
            state.maxAbilitiesPoints = Number(abilityPoints) + Number(intBonuce);
            state.currentAbilityPoints = state.maxAbilitiesPoints;
        },
        chooseAbility(state, action) {
            const ability = action.payload;
            const abilExists = state.choosenAbilities.find((item) => item.id === ability.id);
            if (state.currentAbilityPoints <= state.maxAbilitiesPoints && !abilExists && state.currentAbilityPoints > 0) {
                state.choosenAbilities = [...state.choosenAbilities, ability];
                state.currentAbilityPoints = Number(state.currentAbilityPoints) - 1;
                return;
            }
            else if (abilExists) {
                state.choosenAbilities = [...state.choosenAbilities.filter((item) => item.id !== ability.id)];
                state.currentAbilityPoints = Number(state.currentAbilityPoints) + 1;
            }
           
        }
    }
});

export const {
    addAbilityPoins,
    chooseAbility,

} = calculateAbilitiesSlice.actions;

export default calculateAbilitiesSlice.reducer;