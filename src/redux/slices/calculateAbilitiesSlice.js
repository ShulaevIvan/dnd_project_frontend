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
            const abilityPoints = Number(action.payload.abilityPoints);
            const intBonuce = Number(action.payload.intBonuce);
            state.choosenAbilities = [];
            state.baseAbilityPoints = abilityPoints;

            if (abilityPoints + intBonuce <= abilityPoints) {
                state.maxAbilitiesPoints = abilityPoints;
                state.currentAbilityPoints = abilityPoints;
                return;
            }
            state.maxAbilitiesPoints = abilityPoints;
            state.currentAbilityPoints = state.maxAbilitiesPoints;
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
                if (item.skill_data === 'any' || item.skill_data === 'any ability') {
                    console.log(item)
                    state.currentAbilityPoints = state.currentAbilityPoints + Number(item.skill_value);
                    state.maxAbilitiesPoints = state.maxAbilitiesPoints + Number(item.skill_value);
                }
                bonuceAbilitiesSum.push(item.skill_data);
            })
            backgroundBonuceAbilities.map((item) => {
                bonuceAbilitiesSum.push(item.name);
            })
            console.log(bonuceAbilitiesSum)
        }
    }
});

export const {
    addAbilityPoints,
    chooseAbility,
    addBonuceAbilities,

} = calculateAbilitiesSlice.actions;

export default calculateAbilitiesSlice.reducer;