import React from "react";

const CharacterStepsSkillsSpellbook = () => {
    return (
        <React.Fragment>
            <div className="character-steps-spellbook-wrap">
                <div className="character-stps-spells-row">
                    <div className="character-steps-charm-lvl">
                        <h4>Доступные заговоры:</h4>
                            <ul className="character-steps-charm-lvl-list">
                                <li>1 уровень : 0 / 1</li>
                                <li>2 уровень : 0 / 2 </li>
                                <li>3 уровень : 0 / 3 </li>
                                <li>4 уровень : 0 / 4 </li>
                                <li>5 уровень : 0 / 1 </li>
                            </ul>
                    </div>

                    <div className="character-steps-rituals-lvl">
                        <h4>Доступные ритуалы:</h4>
                            <ul className="character-steps-rituals-lvl-list">
                                <li>1 уровень : 0 / 1</li>
                                <li>2 уровень : 0 / 2 </li>
                                <li>3 уровень : 0 / 3 </li>
                                <li>4 уровень : 0 / 4 </li>
                                <li>5 уровень : 0 / 1 </li>
                            </ul>
                    </div>

                    <div className="character-steps-spellbook-lvl">
                        <h4>Ячейки заклинаний:</h4>
                        <ul className="character-steps-spellbook-lvl-list">
                            <li>1 уровень : 0 / 9</li>
                            <li>2 уровень : 0 / 8 </li>
                            <li>3 уровень : 0 / 5 </li>
                            <li>4 уровень : 0 / 3 </li>
                            <li>5 уровень : 0 / 1 </li>
                        </ul>
                    </div>
            </div>
                
                

            <div className="character-steps-spellbook-row">
                <div className="character-steps-spellbook-item">
                    <div className="character-steps-spellbook-item-title">test</div>
                </div>

                <div className="character-steps-spellbook-item">
                    <div className="character-steps-spellbook-item-title">test</div>
                </div>

                <div className="character-steps-spellbook-item">
                    <div className="character-steps-spellbook-item-title">test</div>
                </div>

                <div className="character-steps-spellbook-item">
                    <div className="character-steps-spellbook-item-title">test</div>
                </div>

                <div className="character-steps-spellbook-item">
                    <div className="character-steps-spellbook-item-title">test</div>
                </div>

                <div className="character-steps-spellbook-item">
                    <div className="character-steps-spellbook-item-title">test</div>
                </div>

                <div className="character-steps-spellbook-item">
                    <div className="character-steps-spellbook-item-title">test</div>
                </div>

                <div className="character-steps-spellbook-item">
                    <div className="character-steps-spellbook-item-title">test</div>
                </div>

                <div className="character-steps-spellbook-item">
                    <div className="character-steps-spellbook-item-title">test</div>
                </div>

                <div className="character-steps-spellbook-item">
                    <div className="character-steps-spellbook-item-title">test</div>
                 </div>
            </div>

            <div className="spellbook-navigation-row">
                <div className="spellbook-navigation-btn-level">0</div>
                <div className="spellbook-navigation-btn-level">1</div>
                <div className="spellbook-navigation-btn-level">2</div>
                <div className="spellbook-navigation-btn-level">3</div>
                <div className="spellbook-navigation-btn-level">4</div>
                <div className="spellbook-navigation-btn-level">5</div>
                <div className="spellbook-navigation-btn-level">6</div>
                <div className="spellbook-navigation-btn-level">7</div>
                <div className="spellbook-navigation-btn-level">8</div>
                <div className="spellbook-navigation-btn-level-disabled ">9</div>
            </div>
        </div>
        </React.Fragment>
    )
};

export default CharacterStepsSkillsSpellbook;