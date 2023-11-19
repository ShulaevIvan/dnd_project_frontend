import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mousePositionX: 0,
    mousePositionY: 0,
    activeSkillHover: undefined,
    classSpells: [],
    maxSpellLevel: -1,
    spellLevelNavigate: [],
};

const characterSkillsSlice = createSlice({
    name: 'characterSkills',
    initialState,
    reducers: {
        activeRaceSkillHover(state, action) {
            const { skill, cordX, cordY } = action.payload;
            state.activeSkillHover = skill;
            state.mousePositionX = cordX;
            state.mousePositionY = cordY;
        },
        deactivateRaceSkillHover(state) {
            state.activeSkillHover = null;
        },
        addClassSpells(state, action) {
            state.classSpells = [...action.payload];
            const maxSpellLevelValue = state.classSpells.reduce((prev, current) => prev.spellLevel > current.spellLevel ? prev : current, {});
            if (maxSpellLevelValue && maxSpellLevelValue.spellLevel >= 0) state.maxSpellLevel = maxSpellLevelValue.spellLevel;
            for (let i = 0; i < state.maxSpellLevel; i += 1) {
                state.spellLevelNavigate.push({name: `${i}`, active: false})
            }
            // const spellLevels = state.classSpells.reduce((res, i) => {
            //     if (res.hasOwnProperty(i.spellLevel)) {
            //         res[i.spellLevel] += 1;
            //     } 
            //     else {
            //         res[i.spellLevel] = 1;
            //     }
            //     return res;
            // }, {});
            // state.maxSpellLevel = spellLevels.reduce((prev, current) => prev.b > current.b ? prev : current, {});

        },
        unsetClassSpells(state) {
            state.classSpells = [];
            state.spellLevelNavigate = [];
            state.maxSpellLevel = -1;
        }
    }
});

export const {
    activeRaceSkillHover,
    deactivateRaceSkillHover,
    addClassSpells,
    unsetClassSpells,

} = characterSkillsSlice.actions;

export default characterSkillsSlice.reducer;