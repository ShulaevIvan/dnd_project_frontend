import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const CharacterStepsPreiewStats = () => {
    const resultCharStatsRoll = useSelector((state) => state.calculateCharStats.resultCharStats);
    const statIncreaseCount = useSelector((state) => state.characterSteps.increaseStatsCount);
    const statMode = useSelector((state) => state.characterSteps.statModeSwitcher);
    const statRaceBonuce = useSelector((state) => state.characterSteps.characterSum.raceData.race_bonuces);
    const maxStatPoints = useSelector((state) => state.calculateCharStats.statBuyPoints);
    const spendedStatPoints = useSelector((state) => state.calculateCharStats.currentStatBuyPoints);
    const charStats = useSelector((state) => state.calculateCharStats.charStatsTotal);

    return (
        <React.Fragment>
            <div className="character-bonuce-stats-preview-wrap">
                <div className="character-bonuce-stats-preview-title">Stats increase</div>
            </div>
            <div className="character-bonuce-stats-preview-bonuces">
                <div className="character-bonuce-stat-title">Bonuce Stats:</div>
                {Object.entries(statRaceBonuce).filter((stat) => stat[1] !== 0).map((item) => {
                    return (
                        <React.Fragment key={Math.random()}>
                            <div className="character-bonuce-stat-row">
                                <div className="character-bonuce-stat">
                                    {item[0].replace(/\_\w+/, '').toUpperCase()}
                                </div>
                                <div className="character-bonuce-stat-value">
                                    +{item[1]}
                                </div>
                                <div className="character-bonuce-stat-spend-btn">
                                    <button>Spend</button>
                                </div>
                            </div>
                           
                        </React.Fragment>
                    )
                })}
            </div>

            <div className="character-bounce-stats-increase-wrap">
                

                <div className="character-bonuce-stat-increase-title-bottom-wrap">
                    <div className="character-bonuce-stat-increase-title-bottom">
                        {statMode ? `Remaining points ${maxStatPoints-spendedStatPoints}/${maxStatPoints}`: null }
                            
                    </div>
                </div>

                <div className="character-bonuce-stat-increase-recomendation-wrap">
                    <h4>Tip</h4>
                    <div className="character-bonuce-stat-increase-recomendation-content">
                        Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. 
                        Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CharacterStepsPreiewStats;