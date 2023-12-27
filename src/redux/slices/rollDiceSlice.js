import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rollResult: 0,
    baseRoll: 0,
    criticalMin: false,
    criticalMax: false,
    currentMode: 0,
    mods: [4,6,8,10,12,20,100],
    abilityTestRoll: {
        rollResult: 0,
        baseRoll: 0,
        criticalMin: false,
        criticalMax: false,
    }

}
const rollDice = createSlice({
    name: 'rollDiceSlice',
    initialState,
    reducers: {
        rollDiceFunc(state, action) {
            const { mode, modifer, penalty, advantage } = action.payload;
            const targetMode = state.mods.includes(Number(mode));
            if (targetMode) {
                let resultValue = 0;
                state.currentMode = `d${mode}`;
                state.baseRoll = Math.floor(Math.random() * (Number(mode) - 1 + 1)) + 1;
                state.baseRoll === 1 ? state.criticalMin = true : state.criticalMin = false;
                state.baseRoll === Number(mode) ? state.criticalMax = true : state.criticalMax = false;

                if (penalty) {
                    const additionalRoll = Math.floor(Math.random() * (Number(mode) - 1 + 1)) + 1;
                    const additionalCriticalMin = additionalRoll === 1 ? true : false;
                    const additionalCriticalMax = additionalRoll === Number(mode) ? true : false;

                    if ((Number(additionalRoll) < Number(state.baseRoll)) || additionalCriticalMin) state.baseRoll = additionalRoll;
                    if (additionalCriticalMin) state.criticalMin = true;
                    if (state.criticalMax && !additionalCriticalMax && penalty) state.criticalMax = false;
                }
                else if (advantage) {
                    const additionalRoll = Math.floor(Math.random() * (Number(mode) - 1 + 1)) + 1;
                    const additionalCriticalMin = additionalRoll === 1 ? true : false;
                    const additionalCriticalMax = additionalRoll === Number(mode) ? true : false;

                    if ((Number(additionalRoll) > Number(state.baseRoll)) || additionalCriticalMax) state.baseRoll = additionalRoll;
                    if (!additionalCriticalMin && state.criticalMin) state.criticalMin = false;
                    if (additionalCriticalMax && !state.criticalMax && advantage) state.criticalMax = true;
                }
                
                if (Math.sign(Number(modifer)) === 1 || Math.sign(Number(modifer)) === 0) {
                    resultValue = state.baseRoll + Number(modifer);
                }
                else if (Math.sign(Number(modifer)) === -1) {
                    resultValue = state.baseRoll - Number(modifer);
                }
                state.rollResult = resultValue;
            }

        },
        rollDiceAbility(state, action) {
            const { modifer, penalty, advantage } = action.payload;
            let resultValue = 0;

            state.abilityTestRoll.baseRoll = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
            state.abilityTestRoll.baseRoll === 1 ? state.abilityTestRoll.criticalMin = true : state.abilityTestRoll.criticalMin = false;
            state.abilityTestRoll.baseRoll === 20 ? state.abilityTestRoll.criticalMax = true : state.abilityTestRoll.criticalMax = false;

            if (penalty) {
                const additionalRoll = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
                const additionalCriticalMin = additionalRoll === 1 ? true : false;
                console.log(additionalRoll)
                console.log(state.abilityTestRoll.baseRoll)

                if (Number(additionalRoll) < Number(state.abilityTestRoll.baseRoll)) state.abilityTestRoll.baseRoll = additionalRoll;
                if (additionalCriticalMin) {
                    state.abilityTestRoll.criticalMin = true;
                    state.abilityTestRoll.criticalMax = false;
                }
                
            }
            else if (advantage) {
                const additionalRoll = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
                const additionalCriticalMax = additionalRoll === 20 ? true : false;
                if (Number(additionalRoll > Number(state.abilityTestRoll.baseRoll))) state.abilityTestRoll.baseRoll = additionalRoll;
                if (additionalCriticalMax) {
                    state.abilityTestRoll.criticalMin = false;
                    state.abilityTestRoll.criticalMax = true;
                }

            }

            if (Math.sign(Number(modifer)) === 1 || Math.sign(Number(modifer)) === 0) {
                resultValue = state.abilityTestRoll.baseRoll + Number(modifer);
            }
            else if (Math.sign(Number(modifer)) === -1) {
                resultValue = state.abilityTestRoll.baseRoll - Number(modifer);
            }
            state.abilityTestRoll.rollResult = resultValue;

        }
    }
});

export const {
    rollDiceFunc,
    rollDiceAbility
} = rollDice.actions;

export default rollDice.reducer;