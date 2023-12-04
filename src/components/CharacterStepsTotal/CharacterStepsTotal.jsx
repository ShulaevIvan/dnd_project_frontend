import React from "react";


const CharacterStepsTotal = () => {
    return (
        <React.Fragment>
            <div className="character-steps-total-wrap">
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
                        item
                    </div>
                    <div className="character-steps-total-info-item">
                        item
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};


export default CharacterStepsTotal;