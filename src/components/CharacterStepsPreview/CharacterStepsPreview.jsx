import React from "react";
import { useSelector} from 'react-redux';

import CharacterStepsPreiewRace from "../CharacterStepsPreviewRace/CharacterStepsPreviewRace";
import CharacterStepsPreviewClass from "../CharacterStepsPreviewClass/CharacterStepsPreviewClass";
import CharacterStepsPreiewBackground from "../CharacterStepsPreviewBackground/CharacterStepsPreviewBackground";


const CharacterStepsPreiew = () => {
    const raceState = useSelector((state) => state.characterSteps.characterSum.raceData);
    const classState = useSelector((state) => state.characterSteps.characterSum.classData);
    const backgroundState = useSelector((state) => state.characterSteps.characterSum.backgroundActive);
    const stepNum = useSelector((state) => state.characterSteps.characterStepPage);
    const previewActive = useSelector((state) => state.characterSteps.showPreviewPage);
    

    return (
        <React.Fragment>
            <div className="character-steps-preview-column">
                {previewActive && raceState && stepNum === 1 ?
                    <CharacterStepsPreiewRace />
                
                : stepNum === 2 && classState && previewActive ?
                   <CharacterStepsPreviewClass />
                
                : stepNum === 3 && backgroundState && previewActive ? 
                    <CharacterStepsPreiewBackground />
                : null}
                
            </div>
        </React.Fragment>
    );
};

export default CharacterStepsPreiew;