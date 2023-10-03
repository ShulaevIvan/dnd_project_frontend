import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CharacterStepsStatsDestribPanel from "./CharacterStepsStatsDestribPanel";

const CharacterRollStatsDice = () => {
    const totalStatsRoll = useSelector((state) => state.characterSteps.characterSum.statsModifers);
    const charStats = useSelector((state) => state.calculateCharStats.raceStats);
    

    return (
        <React.Fragment>
            <div className="character-steps-dice-wrap">
                <div className="character-steps-dice-title">
                    <h4>Доступные характеристики</h4>
                </div>
                        
                <div className="character-steps-dice-row">
                    {totalStatsRoll ? totalStatsRoll.map((item) => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <div className="character-steps-auto-dice-item">
                                    <div className="character-steps-dice-item">
                                        <span className="dice-value">{item.value}</span>
                                        <div className="dice-value-modif">
                                            {Math.sign(item.modifer) && item.value > 10 ? `+${item.modifer}` : item.modifer}
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    }) : null}
                </div>
            </div>

            <CharacterStepsStatsDestribPanel />

        </React.Fragment>
    )
};

export default CharacterRollStatsDice;