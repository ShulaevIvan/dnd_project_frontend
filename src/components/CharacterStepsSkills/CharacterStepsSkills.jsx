import React from "react";
import { useSelector } from "react-redux";
import CharacterStepsSavingThrows from "./CharacterStepsSavingThrows";

const CharacterStepsSkills = () => {
    const characterSum = useSelector((state) => state.characterSteps.characterSum);

    console.log(characterSum)
    return (
        <React.Fragment>
           <div className="character-steps-skills-column">
                
                <CharacterStepsSavingThrows />

                <div class="character-steps-skills-wrap">
                    <h3>Навыки</h3>
                    <div className="character-steps-skills-row">
                        <div className="character-steps-skills-has-item-row">
                            <div className="character-skills-item">
                                <span className="skill-plus-value-icon"></span>
                                <div className="character-skill-name">Атлетика</div>
                                <div className="character-skill-modif">+ 3</div>
                            </div>
                            <div className="character-skills-item">
                                <span className="skill-plus-value-icon"></span>
                                <div className="character-skill-name">Акробатика</div>
                                <div className="character-skill-modif">+ 2</div>
                            </div>
                            <div className="character-skills-item">
                                <span className="skill-plus-value-icon"></span>
                                <div className="character-skill-name">Скрытность</div>
                                <div className="character-skill-modif">+ 3</div>
                            </div>
                            <div className="character-skills-item">
                                <span className="skill-plus-value-icon"></span>
                                <div className="character-skill-name">Лов. рук</div>
                                <div className="character-skill-modif">+ 3</div>
                            </div>
                            <div className="character-skills-item">
                                <span className="skill-plus-value-icon"></span>
                                <div className="character-skill-name">Акробатика</div>
                                <div className="character-skill-modif">+ 3</div>
                            </div>
                            <div className="character-skills-item">
                                <span className="skill-plus-value-icon"></span>
                                <div className="character-skill-name">Акробатика</div>
                                <div className="character-skill-modif">+ 3</div>
                            </div>
                            <div className="character-skills-item">
                                <span className="skill-plus-value-icon"></span>
                                <div className="character-skill-name">Акробатика</div>
                                <div className="character-skill-modif">+ 3</div>
                            </div>
                            <div class="character-skills-item">
                                <span class="skill-plus-value-icon"></span>
                                <div className="character-skill-name">Акробатика</div>
                                <div className="character-skill-modif">+ 3</div>
                            </div>

                        </div>
                        <div className="character-steps-skills-new-item-row">
                            <div className="character-skills-item">
                                <span className="skill-plus-value-icon"></span>
                                <div className="character-skill-name">Атлетика</div>
                                <div className="character-skill-modif">+ 3</div>
                            </div>
                            <div className="character-skills-item">
                                <span className="skill-plus-value-icon"></span>
                                <div className="character-skill-name">Атлетика</div>
                                <div className="character-skill-modif">+ 3</div>
                            </div>
                            <div className="character-skills-item">
                                <span className="skill-plus-value-icon"></span>
                                <div className="character-skill-name">Атлетика</div>
                                <div className="character-skill-modif">+ 3</div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="character-steps-skills-tools-wrap">
                    <h3>Инструменты</h3>
                    <div className="character-steps-skills-tools-row">
                        <div className="character-steps-skills-tools-item">
                            <span className="skill-plus-value-icon"></span>
                            <div className="character-skill-tool-name">Набор 1</div>
                            <div className="character-skill-tool-modif">+ 3</div>
                        </div>
                        <div className="character-steps-skills-tools-item">
                            <span className="skill-plus-value-icon"></span>
                            <div className="character-skill-tool-name">Набор 2</div>
                            <div className="character-skill-tool-modif">+ 3</div>
                        </div>
                        <div className="character-steps-skills-tools-item">
                            <span className="skill-plus-value-icon"></span>
                            <div className="character-skill-tool-name">Набор 3</div>
                            <div className="character-skill-tool-modif">+ 3</div>
                        </div>
                        <div className="character-steps-skills-tools-item">
                            <span className="skill-plus-value-icon"></span>
                            <div className="character-skill-tool-name">Набор 4</div>
                            <div className="character-skill-tool-modif">+ 3</div>
                        </div>
                        <div className="character-steps-skills-tools-item">
                            <span className="skill-plus-value-icon"></span>
                            <div className="character-skill-tool-name">Набор 5</div>
                            <div className="character-skill-tool-modif">+ 3</div>
                        </div>
                        <div className="character-steps-skills-tools-item">
                            <span className="skill-plus-value-icon"></span>
                            <div className="character-skill-tool-name">Набор 6</div>
                            <div className="character-skill-tool-modif">+ 3</div>
                        </div>
                    </div>
                </div>

                <div className="character-steps-skills-weapon-wrap">
                    <h3>Оружие и Доспехи</h3>
                    <div className="character-steps-weapon-row">
                        <div className="character-steps-weapon-item">
                            <span>Простое оружие</span>
                        </div>
                        <div className="character-steps-weapon-item">
                            <span>Воинское оружие</span>
                        </div>
                        <div className="character-steps-weapon-item">
                            <span>Легкие доспехи</span>
                        </div>
                        <div className="character-steps-weapon-item">
                            <span>Средние доспехи</span>
                        </div>
                    </div>
                </div>

                <div className="character-steps-skills-language-wrap">
                    <h3>Языки</h3>
                    <div className="character-steps-language-row">
                        <div class="character-steps-language-item">Общий</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};


export default CharacterStepsSkills;