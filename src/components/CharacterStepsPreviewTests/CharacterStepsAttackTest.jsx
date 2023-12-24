import React from "react";


const CharacterStepsAttackTest = () => {
    return (
        <React.Fragment>
            <div className="character-steps-total-attack-test-wrap">
                <div className="character-steps-total-attack-test-title">Attack Test</div>
                <div className="character-steps-total-attack-select-wrap">
                    <div className="character-steps-total-attack-select-row">
                        <label className="character-steps-total-attack-select-title" htmlFor="character-steps-total-attack-select">
                            Choose a attack test:
                        </label>
                        <select>
                            <option>melee</option>
                            <option>range</option>
                            <option>spell</option>
                            <option>special</option>
                        </select>
                    </div>
                    <div className="character-steps-total-attack-modifers">
                        <div className="character-steps-total-attack-mastery">Mastery + 5</div>
                        <div className="character-steps-total-attack-statmodifers">
                            <div className="character-steps-total-attack-statmodifer-item">STR + 2</div>
                            <div className="character-steps-total-attack-statmodifer-item">DEX + 1</div>
                            <div className="character-steps-total-attack-statmodifer-item">INT + 9</div>
                        </div>
                    </div>
                    <div className="character-steps-total-attack-penalty-wrap">
                        <span className="attack-penalty-title">Penalty</span>
                        <span className="attack-penalty-chexkbox-checked"></span>
                    </div>
                    <div className="character-steps-total-attack-melee-row">
                        <div className="character-steps-total-attack-item">
                            <select>
                                <option>normal (str)</option>
                                <option>light (dex)</option>
                                <option>dual</option>
                                <option>unarmored (str)</option>
                            </select>
                        </div>
                        <div className="character-steps-total-attack-item">
                            <label htmlFor="character-steps-total-attack-target-armor-value">AC</label>
                            <input id="character-steps-total-attack-target-armor-value" type="text" />
                        </div>
                        <div className="character-steps-total-attack-item">
                            <label htmlFor="character-steps-total-attack-result">Result</label>
                            <input id="character-steps-total-attack-result" type="text" />
                        </div> 
                    </div>
                    <div className="character-steps-total-attack-range-row">
                        <div className="character-steps-total-attack-item">
                            <label htmlFor="character-steps-total-distance-attack-result">Distance</label>
                            <input id="haracter-steps-total-distance-attack-result" type="text" />
                        </div>
                        <div className="character-steps-total-attack-item">
                            <label htmlFor="character-steps-total-range-attack-target-armor-value">AC</label>
                            <input id="character-steps-total-range-attack-target-armor-value" type="text" />
                        </div>
                        <div className="character-steps-total-attack-item">
                            <label htmlFor="character-steps-total-range-attack-result">Result</label>
                            <input id="character-steps-total-range-attack-result" type="text" />
                        </div> 
                    </div>

                    <div className="character-steps-total-attack-spell-row">
                        <div className="character-steps-total-attack-item">
                            <label htmlFor="character-steps-total-spell-distance-attack-result">Distance</label>
                            <input id="haracter-steps-total-spell-distance-attack-result" type="text" />
                        </div>
                        <div className="character-steps-total-attack-item">
                            <select>
                                <option>stat defence</option>
                                <option>stat defence</option>
                                <option>stat defence</option>
                                <option>stat defence</option>
                                <option>stat defence</option>
                            </select>
                        </div>
                        <div className="character-steps-total-attack-item">
                            <label htmlFor="character-steps-total-spell-attack-result">Result</label>
                            <input id="character-steps-total-spell-attack-result" type="text" />
                        </div> 
                    </div>
                    <div className="character-steps-total-abilities-btns-row">
                        <div className="character-steps-total-abilities-btn-item">
                            <button>Start Test</button>
                        </div>
                        <div className="character-steps-total-abilities-btn-item">

                        </div>
                        <div className="character-steps-total-abilities-btn-item">
                            <button>Reset Test</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default CharacterStepsAttackTest;