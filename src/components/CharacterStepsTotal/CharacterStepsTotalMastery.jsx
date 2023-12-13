import React from "react";
import { useSelector } from "react-redux";

const CharacterStepsTotalMastery = () => {
    const choosenAbilitiesSkills = useSelector((state) => state.calculateAbilites.choosenSkills);

    return (
        <React.Fragment>
            <div className="character-total-mastery-wrap">
                <div className="character-total-mastery-title">Mastery</div>
                <div className="character-total-mastery-row">
                    <div className="character-total-mastery-weapons">
                        <div className="character-total-mastery-weapons-title">weapons</div>
                        <ul className="character-total-weapon-mastery-list">
                            {choosenAbilitiesSkills.filter((item) => item.type === 'weapon').map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <li><a href="#">{item.name}</a></li>
                                    </React.Fragment>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="character-total-mastery-armor">
                        <div className="character-total-mastery-armor-title">armor</div>
                        <ul className="character-total-armor-mastery-list">
                            {choosenAbilitiesSkills.filter((item) => item.type === 'armor').map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <li><a href="#">{item.name}</a></li>
                                    </React.Fragment>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="character-total-mastery-instruments">
                        <div className="character-total-mastery-instrument-title">instruments</div>
                        <ul className="character-total-instruments-mastery-list">
                            {choosenAbilitiesSkills.filter((item) => item.type === 'instrument').map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <li><a href="#">{item.name}</a></li>
                                    </React.Fragment>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default CharacterStepsTotalMastery;