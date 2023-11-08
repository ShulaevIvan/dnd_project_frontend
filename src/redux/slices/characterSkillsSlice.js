import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mousePositionX: 0,
    mousePositionY: 0,
    raceSkills: {
        activeSkillHover: undefined,
    }
};

const characterSkillsSlice = createSlice({
    name: 'characterSkills',
    initialState,
    reducers: {
        activeRaceSkillHover(state, action) {
            const { skill, cordX, cordY } = action.payload
            state.activeSkillHover = skill;
            state.mousePositionX = cordX;
            state.mousePositionY = cordY;
        },
        deactivateRaceSkillHover(state) {
            state.activeSkillHover = null;
        },
    }
});

export const {
    activeRaceSkillHover,
    deactivateRaceSkillHover,

} = characterSkillsSlice.actions;

export default characterSkillsSlice.reducer;