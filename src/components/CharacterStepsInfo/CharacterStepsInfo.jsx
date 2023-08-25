import React from "react";
import { useSelector, useDispatch } from "react-redux";

const CharacterStepsInfo = () => {
    const characterCreateState =  useSelector((state) => state.characterSteps);
    
    return (
        <React.Fragment>
            <div className="character-steps-info-column">
                <div className="character-steps-info-title"><h4>Character-info</h4></div>
                <div className="character-steps-base-info-wrap">
                    <div className="character-face-image-wrap"><span className="character-face-level">1</span><img src={require('./img/demo.jpg')} alt="demo"  /></div>
                    <div className="character-race-class-wrap">
                        <span className="character-race-info">Race: 
                            <span className="character-race-content"> 
                                {characterCreateState.characterSum.raceData ? 
                            ` ${characterCreateState.characterSum.raceData.name}` : null }
                            </span>
                        </span>
                        
                        <span className="character-class-info"><span className="character-class-content">Class: Test-Class</span></span>
                    </div>
                </div>

                <div className="character-steps-stats-info-wrap">
                    <div className="character-steps-stats-row">
                        <div className="character-steps-stats-item">
                            <div className="character-stat-item-header char-stat-str">STR</div>
                            <div className="character-stat-item-body">1</div>
                            <div className="character-stat-item-modif">+0</div>
                        </div>
                        <div className="character-steps-stats-item">
                            <div className="character-stat-item-header char-stat-dex">DEX</div>
                            <div className="character-stat-item-body">-</div>
                            <div className="character-stat-item-modif">+0</div>
                        </div>
                        <div className="character-steps-stats-item">
                            <div className="character-stat-item-header char-stat-con">CON</div>
                            <div className="character-stat-item-body">-</div>
                            <div className="character-stat-item-modif">+0</div>
                        </div>
                    </div>
                    <div className="character-steps-stats-row">
                        <div className="character-steps-stats-item">
                            <div className="character-stat-item-header char-stat-int">INT</div>
                            <div className="character-stat-item-body">+5</div>
                            <div className="character-stat-item-modif">+0</div>
                        </div>
                        <div className="character-steps-stats-item">
                            <div className="character-stat-item-header char-stat-wis">WIS</div>
                            <div className="character-stat-item-body">-</div>
                            <div className="character-stat-item-modif">+0</div>
                        </div>
                        <div className="character-steps-stats-item">
                            <div className="character-stat-item-header char-stat-cha">CHA</div>
                            <div className="character-stat-item-body">-</div>
                            <div className="character-stat-item-modif">+0</div>
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
                            <div className="character-basic-combat-item-body">-</div>
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
                            <div className="character-basic-combat-item-body">-</div>
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
};

export default CharacterStepsInfo;