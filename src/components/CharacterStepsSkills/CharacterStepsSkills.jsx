import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAbilites } from "../../redux/slices/characterStepsSlice";
import CharacterStepsSavingThrows from "./CharacterStepsSavingThrows";

const CharacterStepsSkills = () => {
    const dispatch = useDispatch();
    const characterSum = useSelector((state) => state.characterSteps.characterSum);
    const allAbilitesChunks = useSelector((state) => state.characterSteps.allAbilitesChunks);

    useEffect(() => {
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reference_book/abilites/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(addAbilites(JSON.stringify(data)));
            });
        }
        fetchFunc();
        console.log(allAbilitesChunks)
    }, [])
    return (
        <React.Fragment>
           <div className="character-steps-skills-column">
                
                <CharacterStepsSavingThrows />

                <div className="character-steps-skills-wrap">
                    <h3>Навыки</h3>
                    <div className="character-steps-skills-row">
                        <div className="character-steps-skills-has-item-row">
                            {allAbilitesChunks.part1 ? allAbilitesChunks.part2.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <div className={`character-skills-item skills-item-modif-${item.abilityType}`}>
                                            <span className="skill-plus-value-icon"></span>
                                            <div className="character-skill-name">{item.name}</div>
                                            <div className="character-skill-modif">+ 3</div>
                                        </div>
                                    </React.Fragment>
                                )
                            }) : null}
                        </div>
                        <div className="character-steps-skills-new-item-row">
                            {allAbilitesChunks.part2 ? allAbilitesChunks.part1.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <div className={`character-skills-item skills-item-modif-${item.abilityType}`}>
                                            <span className="skill-plus-value-icon"></span>
                                            <div className="character-skill-name">{item.name}</div>
                                            <div className="character-skill-modif">+ 3</div>
                                        </div>
                                    </React.Fragment>
                                )
                            }) : null}
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