import React from "react";

const CharacterStepsAbilityTest = () => {
    return (
        <React.Fragment>
            <div className="character-steps-total-abilities-test-wrap">
                <div className="character-steps-total-abilities-test-title">Abilities Tests</div>
                <div className="character-steps-total-abilities-select-wrap">
                    <div className="character-steps-total-abilities-item-row">
                        <label className="character-steps-total-abilities-select-title" for="character-steps-total-abilities-select">Choose a ability test:</label>
                        <select id="character-steps-total-abilities-select">
                            <option>Ability</option>
                            <option>Ability</option>
                            <option>Ability</option>
                            <option>Ability</option>
                            <option>Ability</option>
                            <option>Ability</option>
                            <option>Ability</option>
                            <option>Ability</option>
                            <option>Ability</option>
                        </select>
                    </div>
                    <div className="character-steps-total-ability-item-row">
                        <div className="character-steps-total-abilitiy-value">
                            <label htmlFor="character-steps-total-ability-value-base">Modifer</label>
                            <input id="character-steps-total-ability-value-base" type="text" />
                        </div>
                        <div className="character-steps-total-abilitiy-target">
                            <label htmlFor="character-steps-total-ability-value-base">Target</label>
                            <input id="character-steps-total-ability-value-base" type="text" />
                        </div>
                        <div className="character-steps-total-abilitiy-value">
                            <label htmlFor="character-steps-total-ability-value-base">Value</label>
                            <input id="character-steps-total-ability-value-base" type="text" />
                        </div>
                    </div>

                    <div className="character-steps-total-stats-test-btns-wrap">
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
            </div>
        </React.Fragment>
    )
};

export default CharacterStepsAbilityTest;