import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const CharacterChooseDice = () => {
    const dispatch = useDispatch();
    const startPoints = useSelector((state) => state.calculateCharStats.charStatsTotal);

    useEffect(() => {
        console.log(startPoints)
    }, [])
    return (
        <React.Fragment>
            <div className="character-steps-dice-wrap">
                <div className="character-steps-dice-title">
                    <h4>Доступные характеристики</h4>
                </div>
                            
                <div className="character-steps-dice-row">
                    <div className="character-steps-hand-dice-item">
                        <div className="character-steps-hand-dice-title">
                            <h5>STR</h5>
                        </div>

                        <div className="character-steps-dice-item">
                            <span className="dice-value">10</span>
                            <div className="dice-value-plus">+</div>
                            <div className="dice-value-min">-</div>
                            <div className="dice-value-modif">+0</div>
                        </div>

                        <div className="character-steps-dice-sum-wrap">
                            <div className="character-steps-dice-sum">
                                <span className="character-steps-dice-value">10 +</span>
                                <span className="character-steps-dice-value-bonuce">2</span>
                            </div>
                        </div>
                    </div>
                                
                    <div className="character-steps-hand-dice-item">
                        <div className="character-steps-hand-dice-title">
                            <h5>DEX</h5>
                        </div>

                        <div className="character-steps-dice-item">
                            <span className="dice-value">14</span>
                            <div className="dice-value-plus">+</div>
                            <div className="dice-value-min">-</div>
                            <div className="dice-value-modif">+2</div>
                        </div>

                        <div className="character-steps-dice-sum-wrap">
                            <div className="character-steps-dice-sum">
                                <span className="character-steps-dice-value">14 +</span>
                                <span className="character-steps-dice-value-bonuce">2</span>
                            </div>
                        </div>
                    </div>

                    <div className="character-steps-hand-dice-item">
                        <div className="character-steps-hand-dice-title">
                            <h5>CON</h5>
                        </div>

                        <div className="character-steps-dice-item">
                            <span className="dice-value">16</span>
                            <div className="dice-value-plus">+</div>
                            <div className="dice-value-min">-</div>
                            <div className="dice-value-modif">+3</div>
                        </div>

                        <div className="character-steps-dice-sum-wrap">
                            <div className="character-steps-dice-sum">
                                <span className="character-steps-dice-value">16 +</span>
                                <span className="character-steps-dice-value-bonuce">2</span>
                            </div>
                        </div>
  
                        </div>
                                
                    <div className="character-steps-hand-dice-item">
                        <div className="character-steps-hand-dice-title">
                            <h5>INT</h5>
                        </div>

                        <div className="character-steps-dice-item">
                            <span className="dice-value">0</span>
                            <div className="dice-value-plus">+</div>
                            <div className="dice-value-min">-</div>
                            <div className="dice-value-modif">+0</div>
                        </div>

                        <div className="character-steps-dice-sum-wrap">
                            <div className="character-steps-dice-sum">
                                <span className="character-steps-dice-value">0 +</span>
                                <span className="character-steps-dice-value-bonuce">2</span>
                            </div>
                        </div>
                    </div>

                    <div className="character-steps-hand-dice-item">
                        <div className="character-steps-hand-dice-title">
                            <h5>WIS</h5>
                        </div>

                        <div className="character-steps-dice-item">
                            <span className="dice-value">0</span>
                            <div className="dice-value-plus">+</div>
                            <div className="dice-value-min">-</div>
                            <div className="dice-value-modif">+0</div>
                        </div>
                                    
                        <div className="character-steps-dice-sum-wrap">
                            <div className="character-steps-dice-sum">
                                <span className="character-steps-dice-value">0 +</span>
                                <span className="character-steps-dice-value-bonuce">2</span>
                            </div>
                        </div>
                    </div>

                    <div className="character-steps-hand-dice-item">
                        <div className="character-steps-hand-dice-title">
                            <h5>CHA</h5>
                        </div>

                        <div className="character-steps-dice-item">
                            <span className="dice-value">0</span>
                            <div className="dice-value-plus">+</div>
                            <div className="dice-value-min">-</div>
                            <div className="dice-value-modif">+0</div>
                        </div>

                        <div className="character-steps-dice-sum-wrap">
                            <div className="character-steps-dice-sum">
                                <span className="character-steps-dice-value">0 +</span>
                                <span className="character-steps-dice-value-bonuce">2</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="character-steps-dice-apply-wrap">
                    <div className="character-steps-dice-apply-btn">
                        <button>Запомнить</button>
                    </div>
                </div>         
            </div>
        </React.Fragment>
    )
};


export default CharacterChooseDice;