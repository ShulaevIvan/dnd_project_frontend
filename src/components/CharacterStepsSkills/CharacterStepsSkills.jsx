import React from "react";
import CharacterStepsSkillsSpellbook from "./CharacterStepsSkillsSpellbook";
import CharacterStepsClassSkills from "./CharacterStepsClassSkills";
import CharacterStepsRaceSkills from "./CharacterStepsRaceSkills";
import CharacterStepsBackgroundSkills from "./CharacterStepsBackgroundSkills";

const CharacterStepsSkills = () => {
    return (
        <React.Fragment>
            <div className="character-steps-spells-column">
                <CharacterStepsRaceSkills />
                <CharacterStepsClassSkills />
                <CharacterStepsBackgroundSkills />
                <CharacterStepsSkillsSpellbook />
            </div>
        </React.Fragment>
    )
};

export default CharacterStepsSkills;