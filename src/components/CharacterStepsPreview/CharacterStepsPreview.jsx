import React from "react";
import { useSelector, useDispatch } from 'react-redux';

const CharacterStepsPreiew = () => {
    const characterCreateState = useSelector((state) => state.characterSteps);

    return (
        <React.Fragment>
            <div className="character-steps-preview-column">
                {characterCreateState.characterSum.raceData ?
                    <React.Fragment>
                        <div className="character-race-preview-wrap">
                            <div className="character-race-preview-title">
                                {characterCreateState.characterSum.raceData ? characterCreateState.characterSum.raceData.name : null} 
                            </div>
                            <div className="character-race-previw-title-subrace">
                                {characterCreateState.characterSum.subraceData ? characterCreateState.characterSum.subraceData.subrace_name : null}
                            </div>
                            <div className="character-race-preview-subtitle">features</div>
                        </div>

                        <div className="character-race-stats-bonuce">
                            <div className="character-race-stat-value">
                                <span>Увеличение характеристик:</span>
                                {console.log(characterCreateState.characterSum.subraceData)} 
                                {!characterCreateState.characterSum.subraceData.subraceBonuces ? 
                                    <React.Fragment>
                                        <ul>
                                            <li>{`Dex: + ${characterCreateState.characterSum.raceData.race_bonuces.dex_bonuce}`}</li>
                                            <li>{`Con: + ${characterCreateState.characterSum.raceData.race_bonuces.con_bonuce}`}</li>
                                            <li>{`Int: + ${characterCreateState.characterSum.raceData.race_bonuces.int_bonuce}`}</li>
                                            <li>{`Wis: + ${characterCreateState.characterSum.raceData.race_bonuces.wis_bonuce}`}</li>
                                            <li>{`Cha: + ${characterCreateState.characterSum.raceData.race_bonuces.cha_bonuce}`}</li>
                                        </ul>
                                    </React.Fragment> : 
                                    <React.Fragment>
                                        <ul>
                                            <li>{`Dex: + ${characterCreateState.characterSum.subraceData.subraceBonuces.dex_bonuce}`}</li>
                                            <li>{`Con: + ${characterCreateState.characterSum.subraceData.subraceBonuces.con_bonuce}`}</li>
                                            <li>{`Int: + ${characterCreateState.characterSum.subraceData.subraceBonuces.int_bonuce}`}</li>
                                            <li>{`Wis: + ${characterCreateState.characterSum.subraceData.subraceBonuces.wis_bonuce}`}</li>
                                            <li>{`Cha: + ${characterCreateState.characterSum.subraceData.subraceBonuces.cha_bonuce}`}</li>
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
                            {characterCreateState.characterSum.raceData.skills ? 
                                characterCreateState.characterSum.raceData.skills.map((item) => {
                                    return (
                                        <React.Fragment key={Math.random()}>
                                            <div className="skill-item">
                                                <span>Skill Name:</span> <a href="#">{item.skillname}</a>
                                                <div className="skill-short-desc">{item.description}</div>
                                            </div>
                                        </React.Fragment>
                                    )
                                }) : null}
                        </div>

                        <div className="character-race-preview-speed">
                            <span className="character-race-preview-span-title">Speed:</span> Ваша базовая скорость ходьбы составляет {characterCreateState.characterSum.raceData.speed} футов.
                        </div>

                        <div className="character-race-preview-size">
                            <span className="character-race-preview-span-title">Size:</span> Рост {`${characterCreateState.characterSum.raceData.size}фт`}, 
                                Ваш размер — {characterCreateState.characterSum.raceData.weight}.
                        </div>

                        <div className="character-race-preview-age">
                            <span className="character-race-preview-span-title">Age:</span> {characterCreateState.characterSum.raceData.age}
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
                                <p>{characterCreateState.characterSum.raceData.description}</p>
                            </div>
                        </div>
                    </React.Fragment>
                
                : null}
                
            </div>
        </React.Fragment>
    );
};

export default CharacterStepsPreiew;