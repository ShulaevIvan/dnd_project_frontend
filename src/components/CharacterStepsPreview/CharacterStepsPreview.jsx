import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";


const CharacterStepsPreiew = () => {
    const characterCreateState = useSelector((state) => state.characterSteps);
    const raceState = useSelector((state) => state.characterSteps.characterSum.raceData);
    const subraceState = useSelector((state) => state.characterSteps.characterSum.subraceData);
    const classState = useSelector((state) => state.characterSteps.characterSum.classData);
    const subclassState = useSelector((state) => state.characterSteps.characterSum.subclassData);
    const stepNum = useSelector((state) => state.characterSteps.characterStepPage);
    const previewActive = useSelector((state) => state.characterSteps.showPreviewPage);


    return (
        <React.Fragment>
            <div className="character-steps-preview-column">
                {previewActive && raceState && stepNum === 1 ?
                    <React.Fragment>
                        <div className="character-race-preview-wrap">
                            <div className="character-race-preview-title">
                                {raceState ? raceState.raceData.char_race_name : null} 
                            </div>
                            <div className="character-race-previw-title-subrace">
                                {subraceState ? `${subraceState.subrace_name}` : null}
                            </div>
                            <div className="character-race-preview-subtitle">features</div>
                        </div>

                        <div className="character-race-stats-bonuce">
                            <div className="character-race-stat-value">
                                <span>Увеличение характеристик:</span>
                                {!characterCreateState.characterSum.subraceData ? 
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
                            <span className="character-race-preview-span-title">Worldview:</span> {raceState.raceData.preferred_worldview}
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
                
                : stepNum === 2 && classState && previewActive ? 
                    <React.Fragment>
                        <div className="character-class-preview-wrap">
                        <div className="character-class-preview-title">
                            {classState.className} 
                            {subclassState && subclassState.subraceActive ? `(${subclassState.subclassInfo.name})` : null}
                        </div>
                        <div className="character-class-preview-subtitle">features</div>

                        <div className="сlass-features">
                            <span className="class-view-title-span">Способности</span>
                            <div className="class-features-description">
                                <ul className="class-skills-list">
                                    { 
                                        subclassState ? subclassState.subclassInfo.subclassSkills.map((item) => {
                                            return (
                                                <React.Fragment key={Math.random()}>
                                                    <li className="class-skills-item">{item.name}</li>
                                                </React.Fragment>
                                            )
                                        }) : null
                                    }
                                    {
                                        classState.classSkills ? classState.classSkills.map((item) => {
                                           
                                            return (
                                                <React.Fragment key={Math.random()}>
                                                    <li className="class-skills-item">{item.name}</li>
                                                </React.Fragment>
                                            )
                                        }) : null
                                    }
                                </ul>
                            </div>
                            <div>
                                <button className="class-info-btn-full">Полная информация</button>
                            </div>
                        </div>
                        <div className="class-saving-throws">
                            <span className="class-view-title-span">Мастерство спасбросков</span>
                            <div className="class-saving-throws-description">
                                <p>Ловкость, Интелект</p>
                            </div>
                        </div>
                        <div className="class-weapon-mastery-wrap">
                            <span className="class-view-title-span">Мастерство оружия</span>
                            <div className="weapon-mastery-row">
                                {classState.classWeaponMastery.map((item) => {
                                    return (
                                        <React.Fragment key={Math.random()}>
                                            <div className="weapon-mastery-item">{item.name}</div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>

                        </div>

                        <div className="class-armor-weapon-mastery-wrap">
                            <span className="class-view-title-span">Мастерство доспехов</span>
                            <div className="armor-mastery-row">
                                {classState.classArmorMastery.map((item) => {
                                    return (
                                        <React.Fragment key={Math.random()}>
                                            <div className="armor-mastery-item">{item.name}</div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        </div>
       

                        {/* <div className="class-equipment-wrap">
                            <span className="class-view-title-span">Снаряжение класса</span>
                            <div className="class-equipment">
                                <div className="equipment-item"><a href="#">test item</a></div>
                                <div className="equipment-item"><a href="#">test item</a></div>
                                <div className="equipment-item"><a href="#">test item</a></div>
                                <div className="equipment-item"><a href="#">test item</a></div>
                                <div className="equipment-item"><a href="#">test item</a></div>
                            </div>
                        </div> */}
                    

                        <div className="class-skills-wrap">
                            <div className="class-skills">
                                <span className="class-view-title-span">Навыки класса</span>
                                <div className="class-abilities-count">{`Выберите ${classState.classAbilityPoints} навыка(ов) из списка:`}</div>
                                <ul className="class-abilities-items-wrap">
                                    {classState.classAbilities ? classState.classAbilities.map((item, i) => {
                                        return (
                                            <React.Fragment key={Math.random()}>
                                                <li className="class-abilities-item">
                                                    <Link>{item.name}</Link>{classState.classAbilities.length -1 === i ? '; ' : ', '}
                                                </li>
                                            </React.Fragment>
                                        )
                                    }): null}
                                </ul>
                            </div>
                        </div>

                        <div className="class-start-equipment-wrap">
                        <span className="class-view-title-span">Стартовое снаряжение</span>
                            <div className="start-equipment-row">
                                <div className="start-equipment-item">
                                    <ul className="start-equipment-list">
                                        {classState.startEqip.weapons ? classState.startEqip.weapons.map((item) => {
                                            return (
                                                <li key={Math.random()} className="weapon">{item.name}</li>
                                            )
                                        }) : null}

                                        {classState.startEqip.weapons ? classState.startEqip.armor.map((item) => {
                                            return (
                                                <li key={Math.random()} className="armor">{item.name}</li>
                                            )
                                        }) : null}

                                        {classState.startEqip.instruments ? classState.startEqip.instruments.map((item) => {
                                            return (
                                                <li key={Math.random()} className="item">{item.name}</li>
                                            )
                                        }) : null}
                                    </ul>
                                </div>
                            </div>
                            <div className="start-equipment-edit-wrap">
                                <button className="start-equipment-edit-btn">Изменить снаряжение</button>
                            </div>
                        </div>

                        <div className="class-description-wrap">
                        <span className="class-view-title-span">Описание класса</span>
                            <div className="class-description-content">
                                {subclassState ? subclassState.subclassInfo.description : classState.description}
                            </div>
                        </div>

                    </div>
                </React.Fragment> 
                
                : null}
                
            </div>
        </React.Fragment>
    );
};

export default CharacterStepsPreiew;