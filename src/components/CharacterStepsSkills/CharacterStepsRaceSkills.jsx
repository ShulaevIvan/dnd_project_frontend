import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { activeRaceSkillHover, deactivateRaceSkillHover } from "../../redux/slices/characterSkillsSlice";


const CharacterStepsRaceSkills = () => {
    const dispatch = useDispatch();
    const characterSum = useSelector((state) => state.characterSteps.characterSum);
    const raceSkills = useSelector((state) => state.characterSteps.characterSum.raceData.skills).filter((item) => item.skill_type === 'skill');
    const activeSkillHover = useSelector((state) => state.characterSkills.activeSkillHover);
    const mouseX = useSelector((state) => state.characterSkills.mousePositionX);
    const mouseY = useSelector((state) => state.characterSkills.mousePositionY);
    

    const selectRaceSkillHandler = (e, raceSkillObj) => {
        const client = e.target.getBoundingClientRect();
        dispatch(activeRaceSkillHover({
            skill: raceSkillObj, 
            cordX: Number(client.x - client.left), 
            cordY: Number(client.y - client.top)
        }));
    };

    const unselectRaceSkillHandler = (raceSkillObj) => {
        dispatch(deactivateRaceSkillHover(raceSkillObj));
    };

    useEffect(() => {
        console.log(mouseX)
    }, [activeSkillHover])

    return (
        <React.Fragment>
            <div className="character-steps-skills-wrap">
                <div className="character-steps-skills-title">
                    <h3>Race Skills</h3>
                </div>

                <div className="character-steps-skills-row">
                    {raceSkills.map((raceSkill) => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <div 
                                    className="character-steps-skills-item"
                                    onMouseEnter={(e) => selectRaceSkillHandler(e, raceSkill)}
                                    onMouseLeave={() => unselectRaceSkillHandler(raceSkill)}
                                >
                                    <div className="skill-item-title">{raceSkill.name}</div>
                                    <div className="skill-item-lvl-req">req 1 lvl</div>
                                    {activeSkillHover && activeSkillHover.id === raceSkill.id ?
                                        <div
                                            style={{left: `${mouseX}px`, top:`${mouseY}px` }} 
                                            className={'skill-item-description-popup-wrap'}
                                        >
                                            <div className="skill-item-popup-close-wrap">
                                                <span className="skill-item-popup-close" onClick={() => unselectRaceSkillHandler(raceSkill)}></span>
                                            </div>
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