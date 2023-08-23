import React from "react";
import { Outlet } from "react-router-dom";
import CharacterStepsInfo from "../CharacterStepsInfo/CharacterStepsInfo";
import CharacterStepsRace from "../CharacterStepsRace/CharacterStepsRace";
import CharacterStepsPreiew from "../CharacterStepsPreview/CharacterStepsPreview";
import CharacterStepsProgressBar from "../CharacterStepsProgressBar/CharacterStepsProgressBard";

const CharacterSteps = () => {
    return (
        <React.Fragment>
            <div class="character-steps-main-row">
                <CharacterStepsInfo />
                <CharacterStepsRace />
                <CharacterStepsPreiew />
                <CharacterStepsProgressBar />
            </div>
        </React.Fragment>
    );
};

export default CharacterSteps;