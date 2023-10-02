import React from "react";


const CharacterStepsStats = () => {
    return (
        <React.Fragment>
            <div className="character-steps-roll-column">
                <div className="character-steps-choose-wrap">
                    <h4>Выберите генерацию или покупку характеристик</h4>
                        <div className="character-steps-switcher-wrap">
                            <div className="character-steps-switcher-row">
                                <div className="character-steps-switcher-dice">Режим бросков</div>
                                <div className="character-steps-switcher">
                                    <div className="switch-btn"></div>
                                    {/* <div className="switch-btn switch-on"></div> */}
                                </div>
                                <div className="character-steps-switcher-buy">Режим покупки</div>
                            </div>
                            
                        </div>
                </div>

                <div className="character-steps-dice-wrap">
                    <div className="character-steps-dice-title">
                        <h4>Доступные характеристики</h4>
                    </div>
                        
                    <div className="character-steps-dice-row">
                        <div className="character-steps-auto-dice-item">
                            <div className="character-steps-dice-item">
                                <span className="dice-value">15</span>
                                <div className="dice-value-modif">+2</div>
                            </div>
                        </div>

                        <div className="character-steps-auto-dice-item">
                            <div className="character-steps-dice-item">
                                <span className="dice-value">7</span>
                                <div className="dice-value-modif">-2</div>
                            </div>
                        </div>
                        
                        <div className="character-steps-auto-dice-item">
                            <div className="character-steps-dice-item">
                                <span className="dice-value">20</span>
                                <div className="dice-value-modif">+5</div>
                            </div>
                        </div>

                        <div className="character-steps-auto-dice-item">
                            <div className="character-steps-dice-item">
                                <span className="dice-value">13</span>
                                <div className="dice-value-modif">+1</div>
                            </div>
                        </div>

                        <div className="character-steps-auto-dice-item">
                            <div className="character-steps-dice-item">
                                <span className="dice-value">15</span>
                                <div className="dice-value-modif">+2</div>
                            </div>
                        </div>

                        <div className="character-steps-auto-dice-item">
                            <div className="character-steps-dice-item">
                                <span className="dice-value">9</span>
                                <div className="dice-value-modif">-1</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="character-steps-result-dice-row">
                    <div className="character-steps-result-dice-item">
                    
                        <select className="stat-select">
                            <option value="">to ...</option>
                            <option value="">STR</option>
                            <option value="">DEX</option>
                            <option value="">CON</option>
                            <option value="">INT</option>
                            <option value="">WIS</option>
                            <option value="">CHA</option>
                        </select>
                    </div>

                    <div className="character-steps-result-dice-item">

                        <select className="stat-select">
                            <option value="">to ...</option>
                            <option value="">STR</option>
                            <option value="">DEX</option>
                            <option value="">CON</option>
                            <option value="">INT</option>
                            <option value="">WIS</option>
                            <option value="">CHA</option>
                        </select>
                    </div>

                    <div className="character-steps-result-dice-item">
                        <select className="stat-select">
                            <option value="">to ...</option>
                            <option value="">STR</option>
                            <option value="">DEX</option>
                            <option value="">CON</option>
                            <option value="">INT</option>
                            <option value="">WIS</option>
                            <option value="">CHA</option>
                        </select>
                    </div>

                    <div className="character-steps-result-dice-item">
                        <select className="stat-select">
                            <option className="">to ...</option>
                            <option className="dog">STR</option>
                            <option className="cat">DEX</option>
                            <option className="hamster">CON</option>
                            <option className="cat">INT</option>
                            <option className="parrot">WIS</option>
                            <option className="spider">CHA</option>
                        </select>
                    </div>

                    <div className="character-steps-result-dice-item">
                        <select className="stat-select">
                            <option value="">to ...</option>
                            <option value="">STR</option>
                            <option value="">DEX</option>
                            <option value="">CON</option>
                            <option value="">INT</option>
                            <option value="">WIS</option>
                            <option value="">CHA</option>
                        </select>
                    </div>

                    <div className="character-steps-result-dice-item">
                        <select className="stat-select">
                            <option value="">to ...</option>
                            <option value="">STR</option>
                            <option value="">DEX</option>
                            <option value="">CON</option>
                            <option value="">INT</option>
                            <option value="">WIS</option>
                            <option value="">CHA</option>
                        </select>
                    </div>
                </div>

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