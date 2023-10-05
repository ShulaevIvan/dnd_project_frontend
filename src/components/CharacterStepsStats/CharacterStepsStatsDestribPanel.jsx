import React from "react";
import { useSelector } from "react-redux";
import CharacterStepsStatsDestribItem from "./CharacterStepsStatDestribItem";

const CharacterStepsStatsDestribPanel = () => {
    const totalStatsRoll = useSelector((state) => state.characterSteps.characterSum.statsModifers);
    
    return (
        <React.Fragment>
            <div className="character-steps-result-dice-row">
                {totalStatsRoll ? totalStatsRoll.map((item) => {
                    return (
                        <CharacterStepsStatsDestribItem {...item} key={Math.random()} />
                    )  
                }) : null}
            </div>
        </React.Fragment>
    )  
};


export default CharacterStepsStatsDestribPanel;