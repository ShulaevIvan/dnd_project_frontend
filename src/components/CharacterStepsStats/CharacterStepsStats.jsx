import React from "react";
import { useSelector, useDispatch } from "react-redux";

import ChooseStatsMode from "./ChooseStatsMode";
import CharacterBuyDice from "./CharacterBuyDice";

const CharacterStepsStats = () => {
    const switcherState = useSelector((state) => state.characterSteps.statModeSwitcher);

    return (
        <React.Fragment>
            <div className="character-steps-roll-column">
                <ChooseStatsMode />

                <CharacterBuyDice />

        
                <div className="character-steps-dice-btns-wrap">
                    <div className="character-steps-dice-btn-roll"><button>Бросить</button></div>
                    <div className="character-steps-dice-counter">Всего бросков: 0</div>
                    <div className="character-steps-dice-btn-roll-save"><button>Запомнить</button></div>
                </div>

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
                            
                </div>

            </div>
        </React.Fragment>
    )
};

export default CharacterStepsStats;