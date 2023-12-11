import React from "react";
import { useSelector } from "react-redux";


const CharacterStepsTotalRace = () => {
    const characterLevel = useSelector((state) => state.characterSteps.characterSum.charLevel);
    const raceBonuces = useSelector((state) => state.characterSteps.characterSum.raceData.race_bonuces);
    const raceSkills = useSelector((state) => state.characterSteps.characterSum.raceData.skills);
    const languages = useSelector((state) => state.calculateAbilites.choosenLanguages);
    const classSkills = useSelector((state) => state.characterSteps.characterSum.classData.classSkills);
    const activeBackground = useSelector((state) => state.characterSteps.characterSum.backgroundActive[0]);
    console.log(activeBackground)

    return (
        <React.Fragment>
            <div className="character-total-race-title">Race and Background</div>
            <div className="character-steps-total-info-row">
                <div className="character-steps-total-info-item">
                    <div className="character-total-race-wrap">
                        <div className="character-total-race-title">Race bonuces</div>
                        <div className="character-total-race-stats">
                            <ul className="character-total-race-stats-list">
                                {raceBonuces.str_bonuce ? <li>STR + {raceBonuces.str_bonuce}</li> : null}
                                {raceBonuces.dex_bonuce ? <li>DEX + {raceBonuces.dex_bonuce}</li> : null}
                                {raceBonuces.con_bonuce ? <li>CON + {raceBonuces.con_bonuce}</li> : null}
                                {raceBonuces.int_bonuce ? <li>INT + {raceBonuces.int_bonuce}</li> : null}
                                {raceBonuces.wis_bonuce ? <li>WIS + {raceBonuces.wis_bonuce}</li> : null}
                                {raceBonuces.cha_bonuce ? <li>CHA + {raceBonuces.cha_bonuce}</li> : null}
                            </ul>
                        </div>
                        {raceSkills && raceSkills.length > 0 ?
                            <div className="character-total-race-skills-wrap">
                                <ul className="character-total-skills-list">
                                    <li className="character-total-skills-list-title">Skills</li>
                                    {raceSkills ? raceSkills.map((item) => {
                                        return (
                                           <React.Fragment key={Math.random()}>
                                                <li><a href="#">{item.name}</a></li>
                                           </React.Fragment>
                                        )
                                    }) : null}
                                </ul>

                                <ul className="character-total-skills-list">
                                    <li className="character-total-skills-list-title">Languages</li>
                                    {languages.map((item) => {
                                        return (
                                            <React.Fragment key={Math.random()}>
                                                <li>{item.name}</li>
                                            </React.Fragment>
                                        )
                                    })}
                                </ul>
                            </div>
                        : null}
                    </div>
                </div>

                <div className="character-steps-total-info-item">
                    <div className="character-total-class-wrap">
                        <div className="character-total-class-title">Class lvl 1</div>
                        <ul className="character-total-skills-list">
                            <li className="character-total-skills-list-title">Skills</li>
                            {classSkills.filter((item) => item.levelRequired <= characterLevel).map((skill) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                         <li><a href="#">{skill.name}</a></li>
                                    </React.Fragment>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <div className="character-steps-total-info-item">
                    <div className="character-total-background-wrap">
                        <div className="character-total-background-title">Background</div>
                        <div className="character-total-background-name">{activeBackground.name}</div>
                        <div className="character-total-background-description">
                            <div className="character-total-background-description-content">
                                {activeBackground.description.length <= 100 ? 
                                    activeBackground.description 
                                :
                                   `${ activeBackground.description.slice(0, 100)} ...`}
                            </div>
                            <div className="character-total-background-show-more">
                                <button>show more</button>
                            </div>
                        </div>
                        <ul className="character-total-skills-list">
                            <li className="character-total-skills-list-title">Skills</li>
                                {activeBackground.armor.length > 0 ? activeBackground.armor.map((item) => {
                                    return (
                                        <React.Fragment key={Math.random()}><li>{item.name}</li></React.Fragment>
                                    )
                                }) : null}
                                {activeBackground.armorMastery.length > 0 ? activeBackground.armorMastery.map((item) => {
                                    return (
                                        <React.Fragment key={Math.random()}><li>{item.name}</li></React.Fragment>
                                    )
                                }) : null}
                                {activeBackground.instrumentMastery.length > 0 ? activeBackground.instrumentMastery.map((item) => {
                                    return (
                                        <React.Fragment key={Math.random()}><li>{item.name}</li></React.Fragment>
                                    )
                                }) : null}
                                {activeBackground.weaponMastery.length > 0 ? activeBackground.weaponMastery.map((item) => {
                                    return (
                                        <React.Fragment key={Math.random()}><li>{item.name}</li></React.Fragment>
                                    )
                                }) : null}
                                {activeBackground.weapons.length > 0 ? activeBackground.weapons.map((item) => {
                                    return (
                                        <React.Fragment key={Math.random()}><li>{item.name}</li></React.Fragment>
                                    )
                                }) : null}
                        </ul>

                        <ul className="character-total-skills-list">
                        <li className="character-total-skills-list-title">Bonuce Abilites</li>
                            {activeBackground.bounceAbilities.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <li>{item.name}</li>
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


export default CharacterStepsTotalRace;