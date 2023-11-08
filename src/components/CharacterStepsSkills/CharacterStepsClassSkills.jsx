import React from "react";
import { useSelector, useDispatch } from 'react-redux';

const CharacterStepsClassSkills = () => {
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <div className="character-steps-skills-wrap">
                <div className="character-steps-skills-title">
                    <h3>ClassSkills</h3>
                </div>

                <div className="character-steps-skills-row">
                    <div className="character-steps-skills-item">
                        <div className="skill-item-title">Test Title</div>
                        <div className="skill-item-lvl-req">req 1 lvl</div>
                    </div>

                    <div className="character-steps-skills-item">
                        <div className="skill-item-title">Test Title</div>
                        <div className="skill-item-lvl-req">req 1 lvl</div>
                    </div>

                    <div className="character-steps-skills-item">
                        <div className="skill-item-title">Test Title</div>
                        <div className="skill-item-lvl-req">req 1 lvl</div>
                    </div>

                    <div className="character-steps-skills-item">
                        <div className="skill-item-title">Test Title</div>
                        <div className="skill-item-lvl-req">req 1 lvl</div>
                    </div>

                    <div className="character-steps-skills-item">
                        <div className="skill-item-title">Test Title</div>
                        <div className="skill-item-lvl-req">req 1 lvl</div>
                    </div>

                    <div className="character-steps-skills-item">
                        <div className="skill-item-title">Test Title</div>
                        <div className="skill-item-lvl-req">req 1 lvl</div>
                    </div>   
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