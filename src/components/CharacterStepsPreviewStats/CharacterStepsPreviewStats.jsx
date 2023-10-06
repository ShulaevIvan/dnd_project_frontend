import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const CharacterStepsPreiewStats = () => {
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
    const resultCharStatsRoll = useSelector((state) => state.characterSteps.characterSum.resultCharStats);
    const raceBonuceStat = useSelector((state) => state.characterSteps.characterSum.raceData.race_bonuces);

    useEffect(() => {
        Object.entries(raceBonuceStat).forEach((key, i) => {
            if (key[1] !== 0) {
                const statObj = {};
                statObj.stat = bonuceStatState.convertStats[key[0]];
                statObj.value = key[1]

                setBonuceStatState(prevState => ({
                    ...prevState,
                    bonuces: prevState.bonuces.find((item) => key[0] !== item.stat) ? [...prevState.bonuces] : [...prevState.bonuces, statObj],
                    bonuceCount: prevState.bonuces.length
                }));
            }
        });
        console.log(bonuceStatState)
    }, [resultCharStatsRoll])

    return (
        <React.Fragment>
            <div className="character-bonuce-stats-preview-wrap">
                <div className="character-bonuce-stats-preview-title">Stats increase</div>
                <div className="character-bonuce-stats-preview-subtitle">
                    {/* increase stats str + 2 and other stats +1 */}
                    {bonuceStatState.bonuces.map((item) => {
                        return (
                            <React.Fragment>
                                {item.stat}
                                {item.value}
                            </React.Fragment>
                        )
                    })}
                    </div>
            </div>

            <div className="character-bounce-stats-increase-wrap">
                {resultCharStatsRoll.map((item) => {
                    
                    return (
                        <React.Fragment key={Math.random()}>
                            <div className="character-bonuce-stat-increase-row">
                                <div className="character-bonuce-stat-increase-item">
                                    <div className="character-bonuce-stat-increase-title">{item.statParam}</div>
                                    <div className="character-bonuce-stat-increase-str-input-wrap">
                                        <span className="character-bonuce-stat-increase-value">{item.value}</span>
                                    </div> 
                                    <div className="character-bonuce-stat-increase-btns-wrap">
                                        <span className="character-bonuce-stat-increase-plus">+</span>
                                        <span className="character-bonuce-stat-increase-min">-</span>
                                    </div>
                                </div>

                            </div>
                        </React.Fragment>
                    )
                })}
                {/* <div className="character-bonuce-stat-increase-row">
                    <div className="character-bonuce-stat-increase-item">
                        <div className="character-bonuce-stat-increase-title">STR</div>
                            <div className="character-bonuce-stat-increase-str-input-wrap"><input type="text" /></div>
                            <div className="character-bonuce-stat-increase-btns-wrap">
                                <span className="character-bonuce-stat-increase-plus">+</span>
                                <span className="character-bonuce-stat-increase-min">-</span>
                            </div>
                        </div>

                    </div>

                    <div className="character-bonuce-stat-increase-row">
                        <div className="character-bonuce-stat-increase-item">
                            <div className="character-bonuce-stat-increase-title">DEX</div>
                            <div className="character-bonuce-stat-increase-str-input-wrap">
                                <input type="text" />
                            </div>
                            <div className="character-bonuce-stat-increase-btns-wrap">
                                <span className="character-bonuce-stat-increase-plus">+</span>
                                <span className="character-bonuce-stat-increase-min">-</span>
                            </div>
                        </div>
                            
                </div>

                
                <div className="character-bonuce-stat-increase-row">
                    <div className="character-bonuce-stat-increase-item">
                        <div className="character-bonuce-stat-increase-title">CON</div>
                            <div className="character-bonuce-stat-increase-str-input-wrap">
                                <input type="text" />
                            </div>
                            <div className="character-bonuce-stat-increase-btns-wrap">
                                <span className="character-bonuce-stat-increase-plus">+</span>
                                <span className="character-bonuce-stat-increase-min">-</span>
                            </div>
                        </div>
                            
                    </div>

                    <div className="character-bonuce-stat-increase-row">
                        <div className="character-bonuce-stat-increase-item">
                            <div className="character-bonuce-stat-increase-title">INT</div>
                            <div className="character-bonuce-stat-increase-str-input-wrap">
                                <input type="text" />
                            </div>
                            <div className="character-bonuce-stat-increase-btns-wrap">
                                <span className="character-bonuce-stat-increase-plus">+</span>
                                <span className="character-bonuce-stat-increase-min">-</span>
                            </div>
                        </div>
                        
                    </div>

                    <div className="character-bonuce-stat-increase-row">
                        <div className="character-bonuce-stat-increase-item">
                            <div className="character-bonuce-stat-increase-title">WIS</div>
                            <div className="character-bonuce-stat-increase-str-input-wrap">
                                <input type="text" />
                            </div>
                            <div className="character-bonuce-stat-increase-btns-wrap">
                                <span className="character-bonuce-stat-increase-plus">+</span>
                                <span className="character-bonuce-stat-increase-min">-</span>
                            </div>
                        </div>
                        
                    </div>

                    <div className="character-bonuce-stat-increase-row">
                        <div className="character-bonuce-stat-increase-item">
                            <div className="character-bonuce-stat-increase-title">CHA</div>
                            <div className="character-bonuce-stat-increase-str-input-wrap">
                                <input className="text" />
                            </div>
                            <div className="character-bonuce-stat-increase-btns-wrap">
                                <span className="character-bonuce-stat-increase-plus">+</span>
                                <span className="character-bonuce-stat-increase-min">-</span>
                            </div>
                        </div>
                    </div> */}

                    <div className="character-bonuce-stat-increase-title-bottom-wrap">
                        <div className="character-bonuce-stat-increase-title-bottom">
                            Remaining points 0/{bonuceStatState.bonuceCount}
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