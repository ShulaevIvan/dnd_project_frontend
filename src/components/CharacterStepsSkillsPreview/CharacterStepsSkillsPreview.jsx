import React from "react";
import { useSelector, useDispatch } from "react-redux";

const CharacterStepsSkillsPreview = () => {
    const classAbilities = useSelector((state) => state.characterSteps.characterSum.classData.classAbilities);
    const raceBonuceAbilities = useSelector((state) => state.calculateAbilites.raceBonuceAbilities);
    const backgroundBonuceAbilities = useSelector((state) => state.calculateAbilites.backgroundBonuceAbilities);
    const abilityPoints = useSelector((state) => state.calculateAbilites);
    

    return (
        <React.Fragment>
                <div className="character-steps-preview-abilities-wrap">
                    <h3>Total bonuce abilities</h3>
                    <div className="total-bonuce-race-abilities">
                        <h4>Race boncue Abilities</h4>
                        <ul className="total-bonuce-abilities-list">
                            {raceBonuceAbilities ? raceBonuceAbilities.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <li className={'ability-chosen'}>
                                            {`${item.name} (free)`}
                                        </li>
                                    </React.Fragment>
                                )
                            }) : null}
                        </ul>
                    </div>
                    <div className="total-bonuce-class-abilities">
                        <h4>Class Abilities</h4>
                        <p>Max ability points: {abilityPoints.maxAbilitiesPoints}</p>
                        <ul className="total-bonuce-abilities-list">
                            {classAbilities ? classAbilities.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <li className={abilityPoints.choosenAbilities.some((abil) => abil.name === item.name) ? 
                                                'ability-chosen': 'ability-not-chosen'
                                            }>
                                            {item.name}
                                        </li>
                                    </React.Fragment>
                                )
                            }) : null} 
                        </ul>
                    </div>

                    <div className="total-bonuce-background-abilities">
                        <h4>Background Abilities</h4>
                        <ul className="total-bonuce-abilities-list">
                            {backgroundBonuceAbilities ? backgroundBonuceAbilities.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <li className={abilityPoints.choosenAbilities.some((abil) => abil.name === item.name) ? 
                                                'ability-chosen': 'ability-not-chosen'
                                            }>
                                            {`${item.name} (free)`}
                                        </li>
                                    </React.Fragment>
                                )
                            }) : null} 
                        </ul>
                    </div>

                    <div className="total-bonuce-language-abilities">
                        <h4>Total Languages</h4>
                        <ul className="total-bonuce-abilities-list">

                        </ul>
                    </div>
                    
                </div>
        </React.Fragment>
    )
};


export default CharacterStepsSkillsPreview;