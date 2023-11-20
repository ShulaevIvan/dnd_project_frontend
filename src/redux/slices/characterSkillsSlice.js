import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mousePositionX: 0,
    mousePositionY: 0,
    activeSkillHover: undefined,
    activeSpellHover: undefined,
    classSpells: [],
    maxSpellLevel: -1,
    minSpellLevel: -1,
    spellLevelNavigate: [],
    spellLevelNavigateActive: 0,
    classSpellsActiveChunck: [],
    selectedSpells: [],
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
            const minSpellLevelValue = state.classSpells.reduce((prev, current) => prev.spellLevel < current.spellLevel ? prev : current, {});

            if (maxSpellLevelValue && maxSpellLevelValue.spellLevel >= 0) state.maxSpellLevel = maxSpellLevelValue.spellLevel;
            if (minSpellLevelValue && minSpellLevelValue.spellLevel >= 0) state.minSpellLevel = minSpellLevelValue.spellLevel;

            for (let i = 0; i < state.maxSpellLevel; i += 1) {
                state.spellLevelNavigate.push({name: `${i}`, active: i === state.minSpellLevel ? true : false})
            }
        },
        unsetClassSpells(state) {
            state.classSpells = [];
            state.spellLevelNavigate = [];
            state.maxSpellLevel = -1;
        },
        showSpellsByLevel(state, action) {
            const spellLevel = Number(action.payload);
            state.spellLevelNavigateActive = spellLevel;
            state.spellLevelNavigate = state.spellLevelNavigate.map((item) => {
                item.active = false;
                if (Number(item.name) === spellLevel) {
                    return {
                        ...item,
                        active: true
                    }
                }
                return item;
            })
            state.classSpellsActiveChunck = [...state.classSpells.filter((item) => item.spellLevel === spellLevel)];
        },
        selectSpell(state, action) {
            const { spell } = action.payload;
            state.selectedSpells = [...state.selectedSpells.filter((item) => item.id !== spell.id), spell].reverse();
        },
        unselectSpell(state, action) {
            const { spell } = action.payload;
            state.selectedSpells = state.selectedSpells.filter((item) => item.id !== spell.id).reverse();
        },
        activeSpellHover(state, action) {
            const { spell, cordX, cordY } = action.payload;
            state.activeSpellHover = spell;
            state.mousePositionX = cordX;
            state.mousePositionY = cordY;
        },
        closeSpellHover(state) {
            state.activeSpellHover = undefined;
        }
    }
});

export const {
    activeRaceSkillHover,
    deactivateRaceSkillHover,
    addClassSpells,
    unsetClassSpells,
    showSpellsByLevel,
    selectSpell,
    unselectSpell,
    activeSpellHover,
    closeSpellHover

} = characterSkillsSlice.actions;

export default characterSkillsSlice.reducer;