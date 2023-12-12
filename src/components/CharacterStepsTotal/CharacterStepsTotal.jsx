import React from "react";
import CharacterStepsAvatar from "./CharacterStepsAvatar";
import CharacterStepsTotalRace from "./CharacterStepsToalRace";
import CharacterStepsTotalAbilities from "./CharacterStepsTotalAbiliteis";
import CharacterStepsAttacks from "./CharacterStepsTotalAttacks";
import CharacterStepsTotalMastery from "./CharacterStepsTotalMastery";
import CharacterStepsInventory from "./CharacterStepsTotalInventory";

const CharacterStepsTotal = () => {
    return (
        <React.Fragment>
            <div className="character-steps-total-wrap">
                <CharacterStepsAvatar />
                <CharacterStepsTotalRace />
                <CharacterStepsTotalAbilities />
                <CharacterStepsAttacks />
                <CharacterStepsTotalMastery />
                <CharacterStepsInventory />
            </div>
        </React.Fragment>
    )
};


export default CharacterStepsTotal;