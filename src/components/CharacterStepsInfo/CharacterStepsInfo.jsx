import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { calculateOtherStats } from "../../redux/slices/calculateStatsSlice";

const CharacterStepsInfo = () => {
    const dispatch = useDispatch();
    const characterRaceInfo = useSelector((state) => state.characterSteps.characterSum.raceData);
    const subraceState = useSelector((state) => state.characterSteps.characterSum.subraceData);
    const classState = useSelector((state) => state.characterSteps.characterSum.classData);
    const subclassState = useSelector((state) => state.characterSteps.characterSum.subclassData);
    const backgroundState = useSelector((state) => state.characterSteps.characterSum.backgroundActive);
    const charStats = useSelector((state) => state.calculateCharStats.totalStats);
    const resultCharStats = useSelector((state) => state.calculateCharStats.resultCharStats);
    const otherCharStats = useSelector((state) => state.calculateCharStats.charOtherStats);
    const characterLevel = useSelector((state) => state.characterSteps.characterSum.charLevel);

    useEffect(() => {
        
        if ((characterRaceInfo && classState) || (characterRaceInfo && subclassState)) {
            const otherStats = {
                armorClass: 10,
                initiative: 0,
                speed: characterRaceInfo.raceData.speed,
                prof: 1,
                hp: 0,
                baseHits: classState.baseHits,
                minDiceHit: classState.minHitsLvl,
                maxDiceHit: classState.maxHitsLvl,
            }
            dispatch(calculateOtherStats(otherStats));
        }
    }, [resultCharStats, characterRaceInfo])
    
    
    return (
        <React.Fragment>
            <div className="character-steps-info-column">
                <div className="character-steps-info-title"><h4>Character-info</h4></div>
                <div className="character-steps-base-info-wrap">
                    <div className="character-face-image-wrap">
                        <span className="character-face-level">{characterLevel}</span><img src={require('./img/demo.jpg')} alt="demo"  />
                    </div>
                    <div className="character-race-class-wrap">
                        <span className="character-race-info">Race: 
                            <span className="character-race-content"> 
                                {characterRaceInfo ? ` ${characterRaceInfo.raceData.char_race_name}` : ''}
                            </span>
                            <span className="character-race-subrace">{subraceState ? `(${subraceState.subrace_name})` : ''}</span>
                        </span>
                        
                        <span className="character-class-info">
                            <span className="character-class-content">
                                Class: {classState ? classState.className : null}
                                {subclassState && subclassState.subraceActive ? `(${subclassState.subclassInfo.name})` : null}
                            </span>
                        </span>

                        <span className="character-background-info">
                            <span className="character-background-content">
                                Background: {backgroundState ? backgroundState[0].name : null}
                            </span>
                        </span>
                    </div>
                </div>

                <div className="character-steps-stats-info-wrap">
                    <div className="character-steps-stats-row">
                        <div className="character-steps-stats-item">
                            <div className="character-stat-item-header char-stat-str">STR</div>
                            <div className="character-stat-item-body">{charStats ? charStats.str : '0'}</div>
                            <div className="character-stat-item-modif">
                                { resultCharStats.find((stat) => stat.statParam === 'str') ?
                                    resultCharStats.find((stat) => stat.statParam === 'str').modifer : '-'  }
                            </div>
                        </div>
                        <div className="character-steps-stats-item">
                            <div className="character-stat-item-header char-stat-dex">DEX</div>
                            <div className="character-stat-item-body">{charStats ? charStats.dex : '0'}</div>
                            <div className="character-stat-item-modif">
                            { resultCharStats.find((stat) => stat.statParam === 'dex') ?
                                    resultCharStats.find((stat) => stat.statParam === 'dex').modifer : '-'  }
                            </div>
                        </div>
                        <div className="character-steps-stats-item">
                            <div className="character-stat-item-header char-stat-con">CON</div>
                            <div className="character-stat-item-body">{charStats ? charStats.con : '0'}</div>
                            <div className="character-stat-item-modif">
                            { resultCharStats.find((stat) => stat.statParam === 'con') ?
                                    resultCharStats.find((stat) => stat.statParam === 'con').modifer : '-'  }
                            </div>
                        </div>
                    </div>
                    <div className="character-steps-stats-row">
                        <div className="character-steps-stats-item">
                            <div className="character-stat-item-header char-stat-int">INT</div>
                            <div className="character-stat-item-body">{charStats ? charStats.int : '0'}</div>
                            <div className="character-stat-item-modif">
                                { resultCharStats.find((stat) => stat.statParam === 'int') ?
                                    resultCharStats.find((stat) => stat.statParam === 'int').modifer : '-'  }</div>
                        </div>
                        <div className="character-steps-stats-item">
                            <div className="character-stat-item-header char-stat-wis">WIS</div>
                            <div className="character-stat-item-body">{charStats ? charStats.wis : '0'}</div>
                            <div className="character-stat-item-modif">
                            { resultCharStats.find((stat) => stat.statParam === 'wis') ?
                                    resultCharStats.find((stat) => stat.statParam === 'wis').modifer : '-'  }
                            </div>
                        </div>
                        <div className="character-steps-stats-item">
                            <div className="character-stat-item-header char-stat-cha">CHA</div>
                            <div className="character-stat-item-body">{charStats ? charStats.cha : '0'}</div>
                            <div className="character-stat-item-modif">
                            { resultCharStats.find((stat) => stat.statParam === 'cha') ?
                                    resultCharStats.find((stat) => stat.statParam === 'cha').modifer : '-' }
                            </div>
                        </div>
                    </div>
                    
                    <div className="character-steps-basic-combat-stats-row">
                        <div className="character-basic-combat-item">
                            <div className="character-basic-combat-item-header char-stat-ac">AC</div>
                            <div className="character-basic-combat-item-body">{otherCharStats ? otherCharStats.ac : '-'}</div>
                        </div>
                        <div className="character-basic-combat-item">
                            <div className="character-basic-combat-item-header char-stat-init">INIT</div>
                            <div className="character-basic-combat-item-body">{otherCharStats ? otherCharStats.init : '-'}</div>
                        </div>
                        <div className="character-basic-combat-item">
                            <div className="character-basic-combat-item-header char-stat-move">MOVE</div>
                            <div className="character-basic-combat-item-body">{otherCharStats ? otherCharStats.move : '-'}</div>
                        </div>
                    </div>

                    <div className="character-steps-basic-combat-stats-row">
                        <div className="character-basic-combat-item">
                            <div className="character-basic-combat-item-header char-stat-prof">PROF</div>
                            <div className="character-basic-combat-item-body">{otherCharStats ? `+ ${otherCharStats.prof}` : '-'}</div>
                        </div>
                        <div className="character-basic-combat-item">
                            <div className="character-basic-combat-item-header char-stat-hp">HP</div>
                            <div className="character-basic-combat-item-body">{otherCharStats ? otherCharStats.hp : '-'}</div>
                        </div>
                        <div className="character-basic-combat-item">
                            <div className="character-basic-combat-item-header char-stat-hit-dice">HIT DICE</div>
                            <div className="character-basic-combat-item-body">{otherCharStats ? otherCharStats.hitDice : '-'}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
};

export default CharacterStepsInfo;