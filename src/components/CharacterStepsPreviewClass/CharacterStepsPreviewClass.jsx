import React from "react";
import { useSelector} from 'react-redux';
import { Link } from "react-router-dom";

const CharacterStepsPreviewClass = () => {

    const classState = useSelector((state) => state.characterSteps.characterSum.classData);
    const subclassState = useSelector((state) => state.characterSteps.characterSum.subclassData);

    return (
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
                        {/* <div>
                            <button className="class-info-btn-full">Полная информация</button>
                        </div> */}
                </div>

                <div className="class-saving-throws">
                    <span className="class-view-title-span">Мастерство спасбросков</span>
                        <div className="class-saving-throws-description">
                            
                            {console.log(classState)}
                            <p>{classState.classSaveThrows ? classState.classSaveThrows.map((item) =>{
                                return `${item.name.charAt(0).toUpperCase() + item.name.slice(1)}, `
                            }): null}</p>
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
    )
};

export default CharacterStepsPreviewClass;