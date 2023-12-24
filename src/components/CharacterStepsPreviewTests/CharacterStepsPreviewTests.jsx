import React from "react";
import CharacterStepsStatTest from "./CharacterStepsStatTest";
import CharacterStepsAbilityTest from "./CharacterStepsAbilityTest";
import CharacterStepsAttackTest from "./CharacterStepsAttackTest";

const CharacterStepsPreviewTests = () => {
    return (
        <React.Fragment>
            <CharacterStepsStatTest />
            <CharacterStepsAbilityTest />
            <CharacterStepsAttackTest />
            
        </React.Fragment>
    )
};


export default CharacterStepsPreviewTests;