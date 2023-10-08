import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const CharacterStepsInfo = () => {
    const characterRaceInfo = useSelector((state) => state.characterSteps.characterSum.raceData);
    const subraceState = useSelector((state) => state.characterSteps.characterSum.subraceData);
    const classState = useSelector((state) => state.characterSteps.characterSum.classData);
    const subclassState = useSelector((state) => state.characterSteps.characterSum.subclassData);
    const backgroundState = useSelector((state) => state.characterSteps.characterSum.backgroundActive);
    const charStats = useSelector((state) => state.calculateCharStats.totalStats);
    const resultCharStats = useSelector((state) => state.calculateCharStats.resultCharStats);
    console.log(resultCharStats)

    return (
        <React.Fragment>
            <div className="character-steps-info-column">
                <div className="character-steps-info-title"><h4>Character-info</h4></div>
                <div className="character-steps-base-info-wrap">
                    <div className="character-face-image-wrap"><span className="character-face-level">1</span><img src={require('./img/demo.jpg')} alt="demo"  /></div>
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
                                { resultCharStats.find((stat) => stat.statParam === 'STR') ?
                                    resultCharStats.find((stat) => stat.statParam === 'STR').modifer : '-'  }
                            </div>
                        </div>
                        <div className="character-steps-stats-item">
                            <div className="character-stat-item-header char-stat-dex">DEX</div>
                            <div className="character-stat-item-body">{charStats ? charStats.dex : '0'}</div>
                            <div className="character-stat-item-modif">
                            { resultCharStats.find((stat) => stat.statParam === 'DEX') ?
                                    resultCharStats.find((stat) => stat.statParam === 'DEX').modifer : '-'  }
                            </div>
                        </div>
                        <div className="character-steps-stats-item">
                            <div className="character-stat-item-header char-stat-con">CON</div>
                            <div className="character-stat-item-body">{charStats ? charStats.con : '0'}</div>
                            <div className="character-stat-item-modif">
                            { resultCharStats.find((stat) => stat.statParam === 'CON') ?
                                    resultCharStats.find((stat) => stat.statParam === 'CON').modifer : '-'  }
                            </div>
                        </div>
                    </div>
                    <div className="character-steps-stats-row">
                        <div className="character-steps-stats-item">
                            <div className="character-stat-item-header char-stat-int">INT</div>
                            <div className="character-stat-item-body">{charStats ? charStats.int : '0'}</div>
                            <div className="character-stat-item-modif">
                                { resultCharStats.find((stat) => stat.statParam === 'INT') ?
                                    resultCharStats.find((stat) => stat.statParam === 'INT').modifer : '-'  }</div>
                        </div>
                        <div className="character-steps-stats-item">
                            <div className="character-stat-item-header char-stat-wis">WIS</div>
                            <div className="character-stat-item-body">{charStats ? charStats.wis : '0'}</div>
                            <div className="character-stat-item-modif">
                            { resultCharStats.find((stat) => stat.statParam === 'WIS') ?
                                    resultCharStats.find((stat) => stat.statParam === 'WIS').modifer : '-'  }
                            </div>
                        </div>
                        <div className="character-steps-stats-item">
                            <div className="character-stat-item-header char-stat-cha">CHA</div>
                            <div className="character-stat-item-body">{charStats ? charStats.cha : '0'}</div>
                            <div className="character-stat-item-modif">
                            { resultCharStats.find((stat) => stat.statParam === 'CHA') ?
                                    resultCharStats.find((stat) => stat.statParam === 'CHA').modifer : '-' }
                            </div>
                        </div>
                    </div>
                    
                    <div className="character-steps-basic-combat-stats-row">
                        <div className="character-basic-combat-item">
                            <div className="character-basic-combat-item-header char-stat-ac">AC</div>
                            <div className="character-basic-combat-item-body">-</div>
                        </div>
                        <div className="character-basic-combat-item">
                            <div className="character-basic-combat-item-header char-stat-init">INIT</div>
                            <div className="character-basic-combat-item-body">-</div>
                        </div>
                        <div className="character-basic-combat-item">
                            <div className="character-basic-combat-item-header char-stat-move">MOVE</div>
                            <div className="character-basic-combat-item-body">{characterRaceInfo ? characterRaceInfo.raceData.speed : null}</div>
                        </div>
                    </div>

                    <div className="character-steps-basic-combat-stats-row">
                        <div className="character-basic-combat-item">
                            <div className="character-basic-combat-item-header char-stat-prof">PROF</div>
                            <div className="character-basic-combat-item-body">-</div>
                        </div>
                        <div className="character-basic-combat-item">
                            <div className="character-basic-combat-item-header char-stat-hp">HP</div>
                            <div className="character-basic-combat-item-body">-</div>
                        </div>
                        <div className="character-basic-combat-item">
                            <div className="character-basic-combat-item-header char-stat-hit-dice">HIT DICE</div>
                            <div className="character-basic-combat-item-body">{'-'}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
};

export default CharacterStepsInfo;