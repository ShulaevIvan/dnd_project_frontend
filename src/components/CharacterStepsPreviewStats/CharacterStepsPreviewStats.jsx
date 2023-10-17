import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRaceBonuceStat, blockIncreaseBtns, resetCharStats } from "../../redux/slices/calculateStatsSlice";
import { activeNextBtn } from "../../redux/slices/characterStepsSlice";

const CharacterStepsPreiewStats = () => {
    const dispatch = useDispatch();
    const statMode = useSelector((state) => state.characterSteps.statModeSwitcher);
    const statRaceBonuce = useSelector((state) => state.characterSteps.characterSum.raceData.race_bonuces);
    const subraceBonuce = useSelector((state) => state.characterSteps.characterSum.subraceData);
    const recomendedStats = useSelector((state) => state.characterSteps.characterSum.classData);
    const maxStatPoints = useSelector((state) => state.calculateCharStats.statBuyPoints);
    const spendedStatPoints = useSelector((state) => state.calculateCharStats.currentStatBuyPoints);
    const statBuyFreePoints = useSelector((state) => state.calculateCharStats.statBuyFreePoints);
    const btnsBlock = useSelector((state) => state.calculateCharStats.minMaxBtnsBlock);
    const spendedRaceStats = useSelector((state) => state.calculateCharStats.allRaceBonuceStats);

    const spendCharBounceStatHandler = (e, bonuceObj) => {
        dispatch(addRaceBonuceStat(bonuceObj));
    };

    useEffect(() => {
        if ((statBuyFreePoints === 0 && maxStatPoints-spendedStatPoints === 0)) {
            dispatch(blockIncreaseBtns(true));
        }
    }, [spendedStatPoints, statBuyFreePoints,]);

    useEffect(() => {
        const raceBonuceLength = Object.entries(subraceBonuce ? subraceBonuce.subraceBonuces : statRaceBonuce).filter((arr) => arr[1] !== 0).length;
        if (spendedRaceStats.length === raceBonuceLength) {
            dispatch(activeNextBtn(false));
        }
    }, [spendedRaceStats]);

    useEffect(() => {
        dispatch(resetCharStats());
        dispatch(activeNextBtn(true));
    }, []);


    return (
        <React.Fragment>
            <div className="character-bonuce-stats-preview-wrap">
                <div className="character-bonuce-stats-preview-title">Stats increase</div>
            </div>
            <div className="character-bonuce-stats-preview-bonuces">
                <div className="character-bonuce-stat-title">Bonuce Stats:</div>
                {Object.entries(subraceBonuce ? subraceBonuce.subraceBonuces : statRaceBonuce)
                    .filter((stat) => stat[1] !== 0).map((item) => {
                    return (
                        <React.Fragment key={Math.random()}>
                            <div className="character-bonuce-stat-row">
                                <div className="character-bonuce-stat">
                                    {item[0].replace(/\_\w+/, '').toUpperCase()}
                                </div>
                                <div className="character-bonuce-stat-value">
                                    +{item[1]}
                                </div>
                                {statMode ?  
                                    <div className="character-bonuce-stat-spend-btn">
                                        <button 
                                            disabled={!btnsBlock || spendedRaceStats.find((stat) => stat.name === item[0].replace(/_\w+$/g, ''))}
                                            onClick={(e) => spendCharBounceStatHandler(e, {name: item[0].replace(/_\w+$/g, ''), value: item[1]})}
                                        >Spend</button>
                                    </div> : null
                                }
                               
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
                    <h4>Recomended stats {recomendedStats.className} : </h4>
                    <div className="character-bonuce-stat-increase-recomendation-content">
                        <p>
                            {
                                recomendedStats.classMainStats.map((item) => <span key={Math.random()} className="character-recomended-stat">{item.name}</span>)
                            }
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CharacterStepsPreiewStats;