import React from "react";
import { useSelector, useDispatch } from 'react-redux';

const CharacterStepsPreiew = () => {
    const characterCreateState = useSelector((state) => state.characterSteps);
    const raceState = useSelector((state) => state.characterSteps.characterSum.raceData);
    const subraceState = useSelector((state) => state.characterSteps.characterSum.subraceData);


    return (
        <React.Fragment>
            <div className="character-steps-preview-column">
                {raceState ?
                    <React.Fragment>
                        <div className="character-race-preview-wrap">
                            <div className="character-race-preview-title">
                                {raceState ? raceState.raceData.char_race_name : null} 
                            </div>
                            <div className="character-race-previw-title-subrace">
                                {characterCreateState.characterSum.subraceData ? subraceState.subrace_name : null}
                            </div>
                            <div className="character-race-preview-subtitle">features</div>
                        </div>

                        <div className="character-race-stats-bonuce">
                            <div className="character-race-stat-value">
                                <span>Увеличение характеристик:</span>
                                {!characterCreateState.characterSum.subraceData.subraceBonuces ? 
                                    <React.Fragment>
                                        <ul>
                                            <li>{`Dex: + ${raceState.race_bonuces.dex_bonuce}`}</li>
                                            <li>{`Con: + ${raceState.race_bonuces.con_bonuce}`}</li>
                                            <li>{`Int: + ${raceState.race_bonuces.int_bonuce}`}</li>
                                            <li>{`Wis: + ${raceState.race_bonuces.wis_bonuce}`}</li>
                                            <li>{`Cha: + ${raceState.race_bonuces.cha_bonuce}`}</li>
                                        </ul>
                                    </React.Fragment> : 
                                    <React.Fragment>
                                        <ul>
                                            <li>{`Dex: + ${subraceState.subraceBonuces.dex_bonuce}`}</li>
                                            <li>{`Con: + ${subraceState.subraceBonuces.con_bonuce}`}</li>
                                            <li>{`Int: + ${subraceState.subraceBonuces.int_bonuce}`}</li>
                                            <li>{`Wis: + ${subraceState.subraceBonuces.wis_bonuce}`}</li>
                                            <li>{`Cha: + ${subraceState.subraceBonuces.cha_bonuce}`}</li>
                                        </ul>
                                    </React.Fragment>
                                }
                            </div>
                        </div>

                        {/* <div className="character-race-ability-bonuce">
                            <div className="character-race-ability-bonuce"><span>Test skill:</span> Вы владеете навыком test skill</div>
                            <div className="character-race-ability-bonuce"><span>Test skill:</span> Вы владеете навыком test skill</div>
                        </div> */}

                        <div className="character-race-preview-bonuce-skills-wrap">
                            {!subraceState ? 
                                characterCreateState.characterSum.raceData.skills.map((item) => {
                                    return (
                                        <React.Fragment key={Math.random()}>
                                            <div className="skill-item">
                                                <span className="skill-item-title">Skill Name:</span> <a className="skill-item-link" href="#">{item.name}</a>
                                                <div className="skill-short-desc">{item.description}</div>
                                            </div>
                                        </React.Fragment>
                                    )
                                }) : subraceState.subraceSkills.map((item) => {
                                    return (
                                        <React.Fragment key={Math.random()}>
                                            <div className="skill-item">
                                                <span>Skill Name:</span> <a href="#">{item.name}</a>
                                                <div className="skill-short-desc">{item.description}</div>
                                            </div>
                                        </React.Fragment>
                                    )
                                })}
                        </div>

                        <div className="character-race-preview-speed">
                            <span className="character-race-preview-span-title">Speed:</span> Ваша базовая скорость ходьбы составляет {raceState.raceData.speed} футов.
                        </div>
                      
                        <div className="character-race-preview-size">
                            <span className="character-race-preview-span-title">Size:</span> Рост {`${raceState.raceData.size}фт`}, 
                                Ваш размер — {raceState.raceData.weight}.
                        </div>

                        <div className="character-race-preview-age">
                            <span className="character-race-preview-span-title">Age:</span> {raceState.raceData.age}
                        </div>

                        <div className="character-race-preview-worldview">
                            <span className="character-race-preview-span-title">Worldview:</span> любое
                        </div>

                        <div className="character-race-gender-wrap">
                            <div className="gender-block-wrap">
                            <div className="gender-block-female gender-selected"><span className="gender-title-f">Female</span></div>
                            <div className="gender-block-male"><span className="gender-title-m">Male</span></div>
                        </div>
                        </div>

                        <div className="race-description-wrap">
                            <div className="race-description">
                                <p>{raceState.raceData.race_description}</p>
                            </div>
                        </div>
                    </React.Fragment>
                
                : null}
                
            </div>
        </React.Fragment>
    );
};

export default CharacterStepsPreiew;