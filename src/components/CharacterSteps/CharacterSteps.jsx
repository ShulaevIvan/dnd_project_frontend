import React from "react";
import { useSelector } from 'react-redux'

import CharacterStepsInfo from "../CharacterStepsInfo/CharacterStepsInfo";
import CharacterStepsRace from "../CharacterStepsRace/CharacterStepsRace";
import CharacterStepsClass from "../CharacterStepsClass/CharacterStepsClass";
import CharacterStepsPreiew from "../CharacterStepsPreview/CharacterStepsPreview";
import CharacterStepsProgressBar from "../CharacterStepsProgressBar/CharacterStepsProgressBard";
import CharacterStepsBackground from "../CharacterStepsBackground/CharacterStepsBackground";
import CharacterStepsStats from "../CharacterStepsStats/CharacterStepsStats";

const CharacterSteps = () => {

    const stepNum = useSelector((state) => state.characterSteps.characterStepPage);
    let bodyElem;
    console.log(stepNum)

    switch(stepNum) {
        case 1:
            bodyElem = <CharacterStepsRace />;

            break;
        case 2: 
            bodyElem = <CharacterStepsClass />;

            break;

        case 3: 
            bodyElem = <CharacterStepsBackground />;

            break;
        
        case 4: 
            bodyElem = <CharacterStepsStats />;

            break;

        default:

            break
    }

    return (
        <React.Fragment>
            <div className="character-steps-main-row">
                <CharacterStepsInfo />
                {bodyElem}
                <CharacterStepsPreiew />
                <CharacterStepsProgressBar />
            </div>
        </React.Fragment>
    );
};

export default CharacterSteps;