import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRaceBonuceStat } from "../../redux/slices/calculateStatsSlice";

const CharacterStepsPreiewStats = () => {
    const dispatch = useDispatch();
    const statMode = useSelector((state) => state.characterSteps.statModeSwitcher);
    const statRaceBonuce = useSelector((state) => state.characterSteps.characterSum.raceData.race_bonuces);
    const maxStatPoints = useSelector((state) => state.calculateCharStats.statBuyPoints);
    const spendedStatPoints = useSelector((state) => state.calculateCharStats.currentStatBuyPoints);
    const statBuyFreePoints = useSelector((state) => state.calculateCharStats.statBuyFreePoints);

    const spendCharBounceStatHandler = (e, bonuceObj) => {
        dispatch(addRaceBonuceStat(bonuceObj))
    };

    useEffect(() => {
        if (statBuyFreePoints === 0 && maxStatPoints-spendedStatPoints === 0) {

        }
    }, [spendedStatPoints, statBuyFreePoints]);

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
                                    <button 
                                        disabled={statBuyFreePoints === 0 && maxStatPoints-spendedStatPoints === 0 ? false : true}
                                        onClick={(e) => spendCharBounceStatHandler(e, {name: item[0].replace(/_\w+$/g, ''), value: item[1]})}
                                    >Spend</button>
                                </div>
                            </div>
                           
                        </React.Fragment>
                    )
                })}
            </div>

            <div className="character-bounce-stats-increase-wrap">
                

                <div className="character-bonuce-stat-increase-title-bottom-wrap">
                    <div className="character-bonuce-stat-remaining-points">
                        <span>{statMode ? `Remaining Points ${maxStatPoints-spendedStatPoints} / ${maxStatPoints}`: null }</span>
                    </div>
                    <div className="character-bonuce-stat-free-points">
                        <span>{statMode ? `Free bonuce Points ${statBuyFreePoints === 0 ? '0': statBuyFreePoints} / 6` : null}</span>
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