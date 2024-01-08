import { createSlice } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";

const initialState = {
    mousePositionX: 0,
    mousePositionY: 0,
    charLevel: 0,
    activeSkillHover: undefined,
    activeSpellHover: undefined,
    classSpells: [],
    classSpellCells: [],
    maxSpellLevel: -1,
    minSpellLevel: -1,
    maxAvalibleSpellLevel: 0,
    avalibleCellsLevel: [],
    spellPoints: {
        maxSpellsCount: undefined,
        spellInvocation: undefined,
        sorceryPoints: undefined,
        spellLevel0: 0,
        spellLevel1: 0,
        spellLevel2: 0,
        spellLevel3: 0,
        spellLevel4: 0,
        spellLevel5: 0,
        spellLevel6: 0,
        spellLevel7: 0,
        spellLevel8: 0,
        spellLevel9: 0,
        total: [],
    },
    spellLevelNavigate: [],
    spellLevelNavigateActive: 0,
    classSpellsActiveChunck: [],
    selectedSpells: [],
    showSpellbook: true,
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
        addClassSpellCells(state, action) {
            const {spellCells, charLevel } = action.payload;
            state.classSpellCells = [...spellCells];
            state.charLevel = charLevel;

            const avalibleCells =  state.classSpellCells.filter((item) => item.levelRequired === state.charLevel);
            
            if (avalibleCells.length > 0) {
                const cellArr = [];
                Object.entries(...avalibleCells).forEach((item, i) => {
                    if (item[1] > 0 && item[0].match(/^cellsLevel\d$/)) {
                        const cellObj = {};
                        const spellLevel = item[0].match(/\d$/)[0];
                        cellObj['level'] = `level ${item[0].match(/\d$/)}`;
                        cellObj['value'] = item[1];
                        cellArr.push(cellObj);
                        state.spellPoints[`spellLevel${spellLevel}`] = item[1];
                    }
                });
                state.spellPoints.maxSpellsCount = avalibleCells[0].maxSpells ? avalibleCells[0].maxSpells : null;
                state.spellPoints.spellInvocation = avalibleCells[0].spellInvocation ? avalibleCells[0].spellInvocation : null;
                state.spellPoints.sorceryPoints = avalibleCells[0].sorceryPoints ? avalibleCells[0].sorceryPoints : null;
                state.avalibleCellsLevel = cellArr;
                state.maxAvalibleSpellLevel = cellArr.length > 0 ? Number(cellArr[cellArr.length - 1].level.match(/\d$/)) : [];     
            }
            
        },
        spendSpellPoints(state, action) {
            const { spellLevel, operation } = action.payload;
            if (operation === 'add') {
                state.spellPoints[`spellLevel${spellLevel}`] -= 1;
                return;
            }
            if (operation === 'remove') {
                state.spellPoints[`spellLevel${spellLevel}`] += 1;
                return;
            }
        },
        unsetClassSpellCells(state) {
            state.classSpellCells = [];
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
        resetSelectedSpells(state) {
            state.selectedSpells = [];
        },
        activeSpellHover(state, action) {
            const { spell, cordX, cordY } = action.payload;
            state.activeSpellHover = spell;
            state.mousePositionX = cordX;
            state.mousePositionY = cordY;
        },
        closeSpellHover(state) {
            state.activeSpellHover = undefined;
        },
        showHideSpellbook(state, action) {
            state.showSpellbook = action.payload;
        },
        resetCharacterSkillsState(state) {
            state = initialState;
        }
    },
    extraReducers: (builder) => builder.addCase(resetSkillsState, () => initialState),
});

export const {
    activeRaceSkillHover,
    deactivateRaceSkillHover,
    addClassSpells,
    unsetClassSpells,
    showSpellsByLevel,
    selectSpell,
    unselectSpell,
    resetSelectedSpells,
    spendSpellPoints,
    activeSpellHover,
    closeSpellHover,
    addClassSpellCells,
    unsetClassSpellCells,
    showHideSpellbook,
    resetCharacterSkillsState

} = characterSkillsSlice.actions;

export const resetSkillsState = createAction('RESET_SKILLS_STATE');
export default characterSkillsSlice.reducer;