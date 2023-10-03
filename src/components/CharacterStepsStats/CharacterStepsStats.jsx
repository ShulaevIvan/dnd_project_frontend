import React from "react";
import { useSelector } from "react-redux";

import ChooseStatsMode from "./ChooseStatsMode";
import CharacterRollStatsDice from "./CharacterRollStatsDice";
import CharacterChooseDice from "./CharacterChooseDice";
import DiceRollModule from "./DiceRollModule";

const CharacterStepsStats = () => {
    const switcherState = useSelector((state) => state.characterSteps.statModeSwitcher);

    return (
        <React.Fragment>
            <div className="character-steps-roll-column">
                <ChooseStatsMode />

                {switcherState ? <CharacterChooseDice /> : <CharacterRollStatsDice />}
                {!switcherState ? <DiceRollModule /> : null}
                
            </div>
        </React.Fragment>
    )
};

export default CharacterStepsStats;