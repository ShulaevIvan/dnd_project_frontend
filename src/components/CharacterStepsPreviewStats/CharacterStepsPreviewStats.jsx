import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


const CharacterStepsPreiewStats = () => {
    const dispatch = useDispatch();
    const [bonuceStatState, setBonuceStatState] = useState({
        bonuces: [],
        bonuceCount: 0,
        convertStats: {
            'str_bonuce': 'STR',
            'dex_bonuce': 'DEX',
            'con_bonuce': 'CON',
            'int_bonuce': 'STR',
            'wis_bonuce': 'WIS',
            'cha_bonuce': 'CHA',
        }
    })
    const resultCharStatsRoll = useSelector((state) => state.calculateCharStats.resultCharStats);
    const raceBonuceStat = useSelector((state) => state.characterSteps.characterSum.raceData.race_bonuces);
    const statIncreaseCount = useSelector((state) => state.characterSteps.increaseStatsCount);
    const statMode = useSelector((state) => state.characterSteps.statModeSwitcher);


    const bonuceSpendHandler = (e, param, stat) => {
        let statIncrease = undefined;
        if (param === 1) {
            statIncrease = bonuceStatState.bonuces.find((item) => item.stat === stat.statParam);
            return;   
        }
        console.log('min');
    };

    useEffect(() => {
        Object.entries(raceBonuceStat).forEach((key) => {
            if (key[1] !== 0) {
                const statObj = {};
                statObj.stat = bonuceStatState.convertStats[key[0]];
                statObj.value = key[1];
                setBonuceStatState(prevState => ({
                    ...prevState,
                    bonuces: prevState.bonuces.find((item) => item.stat === statObj.stat) ? 
                        [...prevState.bonuces] : [...prevState.bonuces, statObj]
                }));
            }
        });
        
    }, [resultCharStatsRoll]);

    return (
        <React.Fragment>
            <div className="character-bonuce-stats-preview-wrap">
                <div className="character-bonuce-stats-preview-title">Stats increase</div>
            </div>

            <div className="character-bounce-stats-increase-wrap">
                {resultCharStatsRoll.map((item) => {
                    if (item.statParam) {
                        return (
                            <React.Fragment key={Math.random()}>
                                <div className="character-bonuce-stat-increase-row">
                                    <div className="character-bonuce-stat-increase-item">
                                        <div className="character-bonuce-stat-increase-title">{item.statParam}</div>
                                        <div className="character-bonuce-stat-increase-str-input-wrap">
                                            <span className="character-bonuce-stat-increase-value">
                                                {item.value}                          
                                            </span>
                                        </div>
                                        {statMode ?  
                                            <React.Fragment key={Math.random()}>
                                                <div className="character-bonuce-stat-increase-btns-wrap">
                                                    <span 
                                                        className="character-bonuce-stat-increase-plus" 
                                                        onClick={((e) => bonuceSpendHandler(e, 1, item))}
                                                    >+</span>
                                                    <span 
                                                        className="character-bonuce-stat-increase-min" 
                                                        onClick={((e) => bonuceSpendHandler(e, 0, item))}
                                                    >-</span>
                                                </div>
                                            </React.Fragment>
                                        :  
                                            <React.Fragment key={Math.random()}>
                                                {bonuceStatState.bonuces.map((bonuce) => {
                                                    if (bonuce.stat === item.statParam) {
                                                        return (
                                                            <React.Fragment key={Math.random()}>
                                                                <div className="character-bonuce-stat-increase-btns-wrap">
                                                                <span className="character-bonuce-stat-auto-increase">bonuce: + ({bonuce.value})</span>
                                                            </div>
                                                            </React.Fragment>
                                                        )
                                                    }
                                                })}
                                            </React.Fragment>
                                        }
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    }
                })}

                    <div className="character-bonuce-stat-increase-title-bottom-wrap">
                        <div className="character-bonuce-stat-increase-title-bottom">
                            Remaining points 0/{statIncreaseCount}
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