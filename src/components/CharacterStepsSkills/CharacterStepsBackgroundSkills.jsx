import React from "react";
import { useSelector, useDispatch } from "react-redux";

const CharacterStepsBackgroundSkills = (props) => {
    const activeSkillHover = useSelector((state) => state.characterSkills.activeSkillHover);
    const mouseX = useSelector((state) => state.characterSkills.mousePositionX);
    const mouseY = useSelector((state) => state.characterSkills.mousePositionY);

    const instrumentMastery = useSelector((state) => state.characterSteps.characterSum.backgroundActive[0].instrumentMastery);

    return (
        <React.Fragment>
            <div className="character-steps-skills-wrap">
                <div className="character-steps-skills-title">
                    <h3>Background Instrument Skills</h3>
                </div>

                <div className="character-steps-instrument-mastery-row">
                    {instrumentMastery.map((skill) => {
                        return (
                            <React.Fragment>
                                <div 
                                    className="character-steps-skills-item"
                                    onMouseEnter={(e) => props.skillHoverHandler(e, skill)}
                                    onMouseLeave={() => props.unselectSkillHandler(skill)}
                                >
                                    <div className="skill-item-title">{skill.name}</div>
                                    {activeSkillHover && activeSkillHover.id === skill.id && activeSkillHover.name === skill.name ?
                                        <div
                                            style={{left: `${mouseX}px`, top:`${mouseY}px` }} 
                                            className={'skill-item-description-popup-wrap'}
                                        >
                                            <div className="skill-item-popup-title">{skill.name}</div>
                                            <div className="skill-item-description-popup">
                                                {skill.description}
                                            </div> 
                                        </div> 
                                    : null}
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </React.Fragment>
    )
};

export default CharacterStepsBackgroundSkills;