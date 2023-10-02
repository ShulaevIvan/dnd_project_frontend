import React from "react";


const CharacterBuyDice = () => {
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
};

export default CharacterBuyDice;