import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeRaceSkillHover, deactivateRaceSkillHover } from "../../redux/slices/characterSkillsSlice";
import CharacterStepsSkillsSpellbook from "./CharacterStepsSkillsSpellbook";
import CharacterStepsClassSkills from "./CharacterStepsClassSkills";
import CharacterStepsRaceSkills from "./CharacterStepsRaceSkills";
import CharacterStepsBackgroundSkills from "./CharacterStepsBackgroundSkills";

const CharacterStepsSkills = () => {
    const dispatch = useDispatch();
    const raceSkills = useSelector((state) => state.characterSteps.characterSum.raceData.skills).filter((item) => item.skill_type === 'skill');
    const classData = useSelector((state) => state.characterSteps.characterSum.classData);
    const subclassData = useSelector((state) => state.characterSteps.characterSum.subclassData);
    const backgroundSkills = useSelector((state) => state.characterSteps.characterSum.backgroundActive[0].skills);

    const selectSkillHandler = (e, skillObj) => {
        const client = e.target.getBoundingClientRect();
        dispatch(activeRaceSkillHover({
            skill: skillObj, 
            cordX: Number(client.x - client.left), 
            cordY: Number(client.y - client.top)
        }));

    };

    const unselectSkillHandler = (skillObj) => {
        dispatch(deactivateRaceSkillHover(skillObj));
    };

    return (
        <React.Fragment>
            <div className="character-steps-spells-column">
                <CharacterStepsRaceSkills
                    raceSkills = {raceSkills}
                    skillHoverHandler = {selectSkillHandler} 
                    unselectSkillHandler = {unselectSkillHandler} 
                />
                <CharacterStepsClassSkills
                    classData = {classData}
                    subclassData = {subclassData}
                    skillHoverHandler={selectSkillHandler} 
                    unselectSkillHandler={unselectSkillHandler} 
                />
                <CharacterStepsBackgroundSkills />
                <CharacterStepsSkillsSpellbook />
            </div>
        </React.Fragment>
    )
};

export default CharacterStepsSkills;