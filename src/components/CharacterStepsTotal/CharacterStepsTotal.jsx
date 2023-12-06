import React from "react";


const CharacterStepsTotal = () => {
    return (
        <React.Fragment>
            <div className="character-steps-total-wrap">
                <div className="character-steps-total-avatar-wrap">
                <div className="character-total-avatar-title">Avatar and Description</div>
                    <div className="character-steps-total-avatar-row">
                        <div className="character-steps-total-char-description-form">
                            <div className="character-steps-total-description-btn">
                                <button>add description</button>
                            </div>
                        </div>
                        <div className="character-steps-total-avatar-add-image-form">
                            <div className="character-steps-total-avatar-btn">
                                <button>add image</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="character-total-race-title">Race and Background</div>
                <div className="character-steps-total-info-row">
                    <div className="character-steps-total-info-item">
                        <div className="character-total-race-wrap">
                            <div className="character-total-race-title">Race bonuces</div>
                            <div className="character-total-race-stats">
                                <ul className="character-total-race-stats-list">
                                    <li>STR + 1</li>
                                    <li>DEX + 1</li>
                                    <li>CON + 1</li>
                                    <li>INT + 1</li>
                                    <li>WIS + 1</li>
                                    <li>CHA + 1</li>
                                </ul>
                            </div>
                            <div className="character-total-race-skills-wrap">
                                <ul className="character-total-skills-list">
                                    <li className="character-total-skills-list-title">Skills</li>
                                    <li><a href="#">skill 1 name tetst 1</a></li>
                                    <li><a href="#">skill 1 name tetst 1</a></li>
                                    <li><a href="#">skill 1 name tetst 1</a></li>
                                    <li><a href="#">skill 1 name tetst 1</a></li>
                                    <li><a href="#">skill 1 name tetst 1</a></li>
                                    <li><a href="#">skill 1 name tetst 1</a></li>
                                </ul>
                                <ul className="character-total-skills-list">
                                    <li className="character-total-skills-list-title">Languages</li>
                                    <li><a href="#">language  1 name</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="character-steps-total-info-item">
                        <div className="character-total-class-wrap">
                            <div className="character-total-class-title">Class lvl 1</div>
                            <ul className="character-total-skills-list">
                                <li className="character-total-skills-list-title">Skills</li>
                                <li><a href="#">skill 1 name tetst 1</a></li>
                                <li><a href="#">skill 1 name tetst 1</a></li>
                                <li><a href="#">skill 1 name tetst 1</a></li>
                                <li><a href="#">skill 1 name tetst 1</a></li>
                                <li><a href="#">skill 1 name tetst 1</a></li>
                                <li><a href="#">skill 1 name tetst 1</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="character-steps-total-info-item">
                        <div className="character-total-background-wrap">
                            <div className="character-total-background-title">Background</div>
                            <ul className="character-total-skills-list">
                                <li className="character-total-skills-list-title">Skills</li>
                                <li><a href="#">skill 1 name tetst 1</a></li>
                                <li><a href="#">skill 1 name tetst 1</a></li>
                                <li><a href="#">skill 1 name tetst 1</a></li>
                                <li><a href="#">skill 1 name tetst 1</a></li>
                                <li><a href="#">skill 1 name tetst 1</a></li>
                                <li><a href="#">skill 1 name tetst 1</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="character-total-abilities-wrap">
                    <div className="character-total-abilities-title">Abilities</div>
                    <div className="character-total-abilities-row">
                        <div className="character-total-abilites-stat-wrap">
                            <div className="character-total-base-stat-ability">STR</div>
                            <div className="character-total-stat-ability">
                                <div className="character-total-stat-ability-name">Athletics :</div>
                                <div className="character-total-stat-ability-value">9</div>
                            </div>
                        </div>
                        <div className="character-total-abilites-stat-wrap">
                            <div className="character-total-base-stat-ability">DEX</div>
                            <div className="character-total-stat-ability">
                                <div className="character-total-stat-ability-name">Acrobatics :</div>
                                <div className="character-total-stat-ability-value">9</div>
                            </div>
                            <div className="character-total-stat-ability">
                                <div className="character-total-stat-ability-name">Sleight of Hand :</div>
                                <div className="character-total-stat-ability-value">9</div>
                            </div>
                            <div className="character-total-stat-ability">
                                <div className="character-total-stat-ability-name">Stealth :</div>
                                <div className="character-total-stat-ability-value">9</div>
                            </div>
                        </div>
                        <div className="character-total-abilites-stat-wrap">
                            <div className="character-total-base-stat-ability">CON</div>
                            <div className="character-total-stat-ability">
                                <div className="character-total-stat-ability-name">Suffocation :</div>
                                <div className="character-total-stat-ability-value">9</div>
                            </div>
                            <div className="character-total-stat-ability">
                                <div className="character-total-stat-ability-name">Hold Breath :</div>
                                <div className="character-total-stat-ability-value">9</div>
                            </div>
                        </div>
                        <div className="character-total-abilites-stat-wrap">
                            <div className="character-total-base-stat-ability">INT</div>
                            <div className="character-total-stat-ability">
                                <div className="character-total-stat-ability-name">Arcana :</div>
                                <div className="character-total-stat-ability-value">9</div>
                            </div>
                            <div className="character-total-stat-ability">
                                <div className="character-total-stat-ability-name">History :</div>
                                <div className="character-total-stat-ability-value">9</div>
                            </div>
                            <div className="character-total-stat-ability">
                                <div className="character-total-stat-ability-name">investigration :</div>
                                <div className="character-total-stat-ability-value">9</div>
                            </div>
                            <div className="character-total-stat-ability">
                                <div className="character-total-stat-ability-name">Nature :</div>
                                <div className="character-total-stat-ability-value">9</div>
                            </div>
                            <div className="character-total-stat-ability">
                                <div className="character-total-stat-ability-name">Religion :</div>
                                <div className="character-total-stat-ability-value">9</div>
                            </div>
                        </div>
                        <div className="character-total-abilites-stat-wrap">
                            <div className="character-total-base-stat-ability">WIS</div>
                            <div className="character-total-stat-ability">
                                <div className="character-total-stat-ability-name">Arcana :</div>
                                <div className="character-total-stat-ability-value">9</div>
                            </div>
                            <div className="character-total-stat-ability">
                                <div className="character-total-stat-ability-name">Animal Handling :</div>
                                <div className="character-total-stat-ability-value">9</div>
                            </div>
                            <div className="character-total-stat-ability">
                                <div className="character-total-stat-ability-name">Insight :</div>
                                <div className="character-total-stat-ability-value">9</div>
                            </div>
                            <div className="character-total-stat-ability">
                                <div className="character-total-stat-ability-name">Medicine :</div>
                                <div className="character-total-stat-ability-value">9</div>
                            </div>
                            <div className="character-total-stat-ability">
                                <div className="character-total-stat-ability-name">Preception :</div>
                                <div className="character-total-stat-ability-value">9</div>
                            </div>
                            <div className="character-total-stat-ability">
                                <div className="character-total-stat-ability-name">Survivale :</div>
                                <div className="character-total-stat-ability-value">9</div>
                            </div>
                        </div>
                        <div className="character-total-abilites-stat-wrap">
                            <div className="character-total-base-stat-ability">CHA</div>
                            <div className="character-total-stat-ability">
                                <div className="character-total-stat-ability-name">Deseption :</div>
                                <div className="character-total-stat-ability-value">9</div>
                            </div>
                            <div className="character-total-stat-ability">
                                <div className="character-total-stat-ability-name">Infimidation :</div>
                                <div className="character-total-stat-ability-value">9</div>
                            </div>
                            <div className="character-total-stat-ability">
                                <div className="character-total-stat-ability-name">Perfomance :</div>
                                <div className="character-total-stat-ability-value">9</div>
                            </div>
                            <div className="character-total-stat-ability">
                                <div className="character-total-stat-ability-name">Presuasion :</div>
                                <div className="character-total-stat-ability-value">9</div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="character-total-savethrows-wrap">
                    <div className="character-total-savethrow-title">Savethrows</div>
                    <div className="character-total-savethrows-row">
                        <div className="character-total-savethrow-item">savethrow-item</div>
                        <div className="character-total-savethrow-item">savethrow-item</div>
                        <div className="character-total-savethrow-item">savethrow-item</div>
                        <div className="character-total-savethrow-item">savethrow-item</div>
                        <div className="character-total-savethrow-item">savethrow-item</div>
                        <div className="character-total-savethrow-item">savethrow-item</div>
                    </div>
                </div>

                <div className="character-total-attack-wrap">
                    <div className="character-total-attack-title">Attacks</div>
                    <div className="character-total-attack-row">
                        <div className="character-total-physical-attack-wrap">
                            <div className="physical-attack-param-row">
                                <div className="physical-attack-param-item">
                                    <span className="magical-attack-param-title">5 + 5 (melee normal) : </span>
                                </div>
                                <div className="physical-attack-param-item">
                                    <span className="physical-attack-param-value">0</span>
                                </div>
                            </div>
                            <div className="physical-attack-param-row">
                                <div className="physical-attack-param-item">
                                    <span className="magical-attack-param-title">2 + 3 (melee unarmored) : </span>
                                </div>
                                <div className="physical-attack-param-item">
                                    <span className="physical-attack-param-value">0</span>
                                </div>
                            </div>
                            <div className="physical-attack-param-row">
                                <div className="physical-attack-param-item">
                                    <span className="physical-attack-param-title">2 + 2 (melee light) : </span>
                                </div>
                                <div className="physical-attack-param-item">
                                    <span className="physical-attack-param-value">0</span>
                                </div>
                            </div>
                            <div className="physical-attack-param-row">
                                <div className="physical-attack-param-item">
                                    <span className="physical-attack-param-title">5 + 5 (range light) : </span>
                                </div>
                                <div className="physical-attack-param-item">
                                    <span className="physical-attack-param-value">0</span>
                                </div>
                            </div>
                        </div>
                        <div className="character-total-magical-attack-wrap">
                           <div className="magical-attack-param-row">
                                <div className="magical-attack-param-item">
                                    <span className="magical-attack-param-title">Main stat spell (CHA) : </span>
                                </div>
                                <div className="magical-attack-param-item">
                                   <span className="magical-attack-param-value">0</span>
                                </div>
                           </div>
                           <div className="magical-attack-param-row">
                                <div className="magical-attack-param-item">
                                    <span className="magical-attack-param-title">str savethrow :</span>
                                </div>
                                <div className="magical-attack-param-item">
                                    <span className="magical-attack-param-value">0 + 9 + 9</span>
                                </div>
                           </div>

                           <div className="magical-attack-param-row">
                                <div className="magical-attack-param-item">
                                    <span className="magical-attack-param-title">bonuce attack :</span>
                                </div>
                                <div className="magical-attack-param-item">
                                    <span className="magical-attack-param-value">mastery + modif</span>
                                </div>
                           </div>
                        </div>
                    </div>

                </div>

                <div className="character-total-mastery-wrap">
                    <div className="character-total-mastery-title">Mastery</div>
                    <div className="character-total-mastery-row">
                        <div className="character-total-mastery-weapons">
                            <div className="character-total-mastery-weapons-title">weapons</div>
                            <ul className="character-total-weapon-mastery-list">
                                <li><a href="#">weapon mastery skill</a></li>
                                <li><a href="#">weapon mastery skill</a></li>
                                <li><a href="#">weapon mastery skill</a></li>
                                <li><a href="#">weapon mastery skill</a></li>
                                <li><a href="#">weapon mastery skill</a></li>
                                <li><a href="#">weapon mastery skill</a></li>
                                <li><a href="#">weapon mastery skill</a></li>
                                <li><a href="#">weapon mastery skill</a></li>
                            </ul>
                        </div>
                        <div className="character-total-mastery-armor">
                            <div className="character-total-mastery-armor-title">armor</div>
                            <ul className="character-total-armor-mastery-list">
                                <li><a href="#">armor mastery skill</a></li>
                                <li><a href="#">armor mastery skill</a></li>
                                <li><a href="#">armor mastery skill</a></li>
                            </ul>
                        </div>
                        <div className="character-total-mastery-instruments">
                            <div className="character-total-mastery-instrument-title">instruments</div>
                            <ul className="character-total-instruments-mastery-list">
                                <li><a href="#">armor mastery skill</a></li>
                                <li><a href="#">armor mastery skill</a></li>
                                <li><a href="#">armor mastery skill</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="character-total-inventory-title">Race and Background</div>
                <div className="character-total-inventory-wrap">
                    <div className="character-total-inventory-row">
                        <div className="character-inventory-item-wrap">
                            <div className="character-inventory-gold-title">Char gold: </div>
                            <div className="character-inventory-gold-row">
                                <div className="character-inventory-gold-item">
                                    <div className="mm">
                                        <span className="coin-icon"></span>
                                        <span className="coin-value">0</span>
                                    </div>
                                </div>
                                <div className="character-inventory-gold-item">
                                    <div className="sm">
                                        <span className="coin-icon"></span>
                                        <span className="coin-value">0</span>
                                    </div>
                                </div>
                                <div className="character-inventory-gold-item">
                                    <div className="zm">
                                        <span className="coin-icon"></span>
                                        <span className="coin-value">0</span>
                                    </div>
                                </div>
                                <div className="character-inventory-gold-item">
                                    <div className="em">
                                        <span className="coin-icon"></span>
                                        <span className="coin-value">0</span>
                                    </div>
                                </div>
                                <div className="character-inventory-gold-item">
                                    <div className="pm">
                                        <span className="coin-icon"></span>
                                        <span className="coin-value">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="character-inventory-item-wrap">inventory item</div>
                        <div className="character-inventory-item-wrap">inventory item</div>
                        <div className="character-inventory-item-wrap">inventory item</div>
                        <div className="character-inventory-item-wrap">inventory item</div>
                        <div className="character-inventory-item-wrap">inventory item</div>
                        <div className="character-inventory-item-wrap">inventory item</div>
                        <div className="character-inventory-item-wrap">inventory item</div>
                        <div className="character-inventory-item-wrap">inventory item</div>
                    </div>

                    <div className="character-stranges-weakness-row">
                        <div className="character-stranges-wrap">
                            <div className="character-stranges-item">stranges item</div>
                            <div className="character-stranges-item">stranges item</div>
                            <div className="character-stranges-item">stranges item</div>
                            <div className="character-stranges-item">stranges item</div>
                            <div className="character-stranges-item">stranges item</div>
                        </div>
                        <div className="character-weakness-wrap">
                            <div className="character-weakness-item">weakness item</div>
                            <div className="character-weakness-item">weakness item</div>
                            <div className="character-weakness-item">weakness item</div>
                            <div className="character-weakness-item">weakness item</div>
                            <div className="character-weakness-item">weakness item</div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};


export default CharacterStepsTotal;