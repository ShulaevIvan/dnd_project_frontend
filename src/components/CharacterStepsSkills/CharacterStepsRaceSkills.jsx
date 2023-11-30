import React from "react";
import { useSelector } from "react-redux";


const CharacterStepsRaceSkills = (props) => {
    const activeSkillHover = useSelector((state) => state.characterSkills.activeSkillHover);
    const mouseX = useSelector((state) => state.characterSkills.mousePositionX);
    const mouseY = useSelector((state) => state.characterSkills.mousePositionY);


    return (
        <React.Fragment>
            <div className="character-steps-skills-wrap">
                {props.raceSkills.length > 0  ?
                    <div className="character-steps-skills-title">
                        <h3>Race Skills</h3>
                    </div> 
                : null }
                
                <div className="character-steps-skills-row">
                    {props.raceSkills.map((raceSkill) => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <div 
                                    className="character-steps-skills-item"
                                    onMouseEnter={(e) => props.skillHoverHandler(e, raceSkill)}
                                    onMouseLeave={() => props.unselectSkillHandler(raceSkill)}
                                >
                                    <div className="skill-item-title">{raceSkill.name}</div>
                                    {activeSkillHover && activeSkillHover.id === raceSkill.id && activeSkillHover.name === raceSkill.name ?
                                        <div
                                            style={{left: `${mouseX}px`, top:`${mouseY}px` }} 
                                            className={'skill-item-description-popup-wrap'}
                                        >
                                            <div className="skill-item-popup-title">{raceSkill.name}</div>
                                            <div className="skill-item-description-popup">
                                                {raceSkill.description}
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

export default CharacterStepsRaceSkills;