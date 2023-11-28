import React from "react";
import { useSelector, useDispatch } from 'react-redux';

const CharacterStepsClassSkills = (props) => {
    const activeSkillHover = useSelector((state) => state.characterSkills.activeSkillHover);
    const mouseX = useSelector((state) => state.characterSkills.mousePositionX);
    const mouseY = useSelector((state) => state.characterSkills.mousePositionY);

    const sortSkillsByLvl = (arr) => {
        return Array.from(arr).sort((a, b) => a.levelRequired - b.levelRequired);
    };

    return (
        <React.Fragment>
            <div className="character-steps-skills-wrap">
                <div className="character-steps-skills-title">
                    <h3>ClassSkills</h3>
                </div>

                <div className="character-steps-skills-row">
                    {props.subclassData ? sortSkillsByLvl(props.subclassData.subclassInfo.subclassSkills).map((skill) => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <div className="character-steps-skills-item"
                                    onMouseEnter={(e) => props.skillHoverHandler(e, skill)}
                                    onMouseLeave={() => props.unselectSkillHandler(skill)}
                                >
                                    <div className="skill-item-title">{skill.name}</div>
                                    <div className="skill-item-lvl-req">{skill.levelRequired}</div>
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
                    }) :
                    sortSkillsByLvl(props.classData.classSkills).map((skill) => {
                        return (
                            <React.Fragment key={Math.random()}>
                            <div className="character-steps-skills-item"
                                onMouseEnter={(e) => props.skillHoverHandler(e, skill)}
                                onMouseLeave={() => props.unselectSkillHandler(skill)}
                            >
                                <div className="skill-item-title">{skill.name}</div>
                                <div className="skill-item-lvl-req">{`level req ${skill.levelRequired}`}</div>
                                {activeSkillHover && activeSkillHover.id === skill.id ?
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
                <div className="character-steps-skills-by-lvl-wrap">
                    <div className="character-steps-skills-load-more-btn">
                        <button>All Class Skills</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default CharacterStepsClassSkills;