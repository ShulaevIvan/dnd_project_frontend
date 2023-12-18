import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rollResult: 0,
    baseRoll: 0,
    criticalMin: false,
    criticalMax: false,
    currentMode: 0,
    mods: [4,6,8,10,12,20,100],

}
const rollDice = createSlice({
    name: 'rollDiceSlice',
    initialState,
    reducers: {
        rollDiceFunc(state, action) {
            const { mode, modifer } = action.payload;
            const targetMode = state.mods.includes(Number(mode));
            if (targetMode) {
                let resultValue = 0;
                state.currentMode = `d${mode}`;
                state.baseRoll = Math.floor(Math.random() * (Number(mode) - 1 + 1)) + 1;
                state.baseRoll === 1 ? state.criticalMin = true : state.criticalMin = false;
                state.baseRoll === Number(mode) ? state.criticalMax = true : state.criticalMax = false;
                
                if (Math.sign(modifer)) {
                    resultValue = state.baseRoll + Number(modifer);
                }
                else {
                    resultValue = state.baseRoll - Number(modifer);
                }
                state.rollResult = resultValue;
            }

        }
    }
});

export const {
    rollDiceFunc,
} = rollDice.actions;

export default rollDice.reducer;