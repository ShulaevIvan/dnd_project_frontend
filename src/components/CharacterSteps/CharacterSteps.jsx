import React from "react";
import { useSelector } from 'react-redux'

import CharacterStepsInfo from "../CharacterStepsInfo/CharacterStepsInfo";
import CharacterStepsRace from "../CharacterStepsRace/CharacterStepsRace";
import CharacterStepsClass from "../CharacterStepsClass/CharacterStepsClass";
import CharacterStepsPreiew from "../CharacterStepsPreview/CharacterStepsPreview";
import CharacterStepsProgressBar from "../CharacterStepsProgressBar/CharacterStepsProgressBard";
import CharacterStepsBackground from "../CharacterStepsBackground/CharacterStepsBackground";
import CharacterStepsStats from "../CharacterStepsStats/CharacterStepsStats";
import CharacterStepsAbilites from "../CharacterStepsAbilites/CharacterStepsAbilites";
import CharacterStepsSkills from "../CharacterStepsSkills/CharacterStepsSkills";
import CharacterStepsTotal from "../CharacterStepsTotal/CharacterStepsTotal";

const CharacterSteps = () => {

    const stepNum = useSelector((state) => state.characterSteps.characterStepPage);
    let bodyElem;

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

        case 5:
            bodyElem = <CharacterStepsAbilites />
            
            break;
        case 6:
            bodyElem = <CharacterStepsSkills />

            break;
        case 7:
            bodyElem = <CharacterStepsTotal />
    
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