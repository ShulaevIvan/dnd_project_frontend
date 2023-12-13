import React from "react";
import { useSelector } from "react-redux";

const CharacterStepsSkillsPreview = () => {
    const classAbilities = useSelector((state) => state.characterSteps.characterSum.classData.classAbilities);
    const raceBonuceAbilities = useSelector((state) => state.calculateAbilites.raceBonuceAbilities);
    const backgroundBonuceAbilities = useSelector((state) => state.calculateAbilites.backgroundBonuceAbilities);
    const abilityPoints = useSelector((state) => state.calculateAbilites);
    const characterSum = useSelector((state) => state.characterSteps.characterSum);
    

    return (
        <React.Fragment>
                <div className="character-steps-preview-abilities-wrap">
                    <h3>Total bonuce abilities</h3>
                    <div className="total-bonuce-race-abilities">
                        <h4>Race boncue Abilities</h4>
                        {raceBonuceAbilities && raceBonuceAbilities.length > 0 ? 
                            <ul className="total-bonuce-abilities-list">
                            {
                                raceBonuceAbilities.map((item) => {
                                    return (
                                        <React.Fragment key={Math.random()}>
                                            <li>
                                                {`${item.name} (free)`}
                                            </li>
                                        </React.Fragment>
                                    )
                                })
                            }
                        </ul> : null}

                    </div>
                    <div className="total-bonuce-class-abilities">
                        <h4>Выбранные навыки</h4>
                        <ul className="total-bonuce-abilities-list">
                            {abilityPoints ? abilityPoints.choosenAbilities.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <li className={'test'}>
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
                                        <li>{`${item.name} (free)`}</li>
                                    </React.Fragment>
                                )
                            }) : null} 
                        </ul>
                    </div>

                    <div className="total-bonuce-language-abilities">
                        <h4>Total Languages</h4>
                        <ul className="total-bonuce-abilities-list">
                            {characterSum.raceData.languages.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <li>{`${item.name} (race)`}</li>
                                    </React.Fragment>
                                )
                            })}
                            {characterSum.backgroundActive[0].languages.map((item) => {
                                return (
                                    <React.Fragment>
                                        <li>{`${item.name} (background)`}</li>
                                    </React.Fragment>
                                )
                            })}

                        </ul>
                    </div>
                    
                </div>
        </React.Fragment>
    )
};


export default CharacterStepsSkillsPreview;