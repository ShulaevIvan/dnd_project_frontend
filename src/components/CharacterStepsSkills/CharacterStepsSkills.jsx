import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAbilites, addMastery, addLanguages, chooseCharAbility} from "../../redux/slices/characterStepsSlice";
import { addAbilityPoins, chooseAbility } from "../../redux/slices/calculateAbilitiesSlice";
import CharacterStepsSavingThrows from "./CharacterStepsSavingThrows";

const CharacterStepsSkills = () => {
    const dispatch = useDispatch();
    const characterSum = useSelector((state) => state.characterSteps.characterSum);
    const allAbilitesChunks = useSelector((state) => state.characterSteps.allAbilitesChunks);
    const allInstrumentMastery = useSelector((state) => state.characterSteps.allInstruments);
    const allWeaponMastery = useSelector((state) => state.characterSteps.allWeapons);
    const allArmorMastery = useSelector((state) => state.characterSteps.allArmor);
    const allLanguages = useSelector((state) => state.characterSteps.allLanguages);
    const resultCharStats = useSelector((state) => state.calculateCharStats.resultCharStats);
    const abilityPoints = useSelector((state) => state.calculateAbilites);
    const abilitesState = useSelector((state) => state.calculateCharStats);

    const calcAblilModif = (abilObj) => {
        const abilExists = abilityPoints.choosenAbilities.find((chAbility) => chAbility.id === abilObj.id);
        const abilModifer = resultCharStats.find((statObj) => statObj.statParam === abilObj.abilityType).modifer;

        if (abilExists) {
            return Number(abilModifer) + Number(abilitesState.charOtherStats.prof);
        }
        return Number(abilModifer);
    };
    
    useEffect(() => {
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reference_book/abilites/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(addAbilites(JSON.stringify(data)));
            });
        }
        fetchFunc();
    }, []);

    useEffect(() => {
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reference_book/mastery/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(addMastery({'data': JSON.stringify(data.instruments), param: 'instruments'}))
                dispatch(addMastery({'data': JSON.stringify(data.armor), param: 'armor'}))
                dispatch(addMastery({'data': JSON.stringify(data.weapons), param: 'weapons'}))
            });
        }
        fetchFunc();

    }, []);

    useEffect(() => {
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reference_book/languages/`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(addLanguages(JSON.stringify(data)));
            })
        }

        fetchFunc();
    }, []);

    useEffect(() => {
        dispatch(addAbilityPoins({
            abilityPoints: characterSum.classData.classAbilityPoints,
            intBonuce: resultCharStats.find((item) => item.statParam === 'int').modifer,
        }));
    }, []);

    const chooseAbilityHandler = (abilObj) => {
        dispatch(chooseAbility(abilObj));
    };

    useEffect(() => {
        console.log(abilityPoints.choosenAbilities)
    }, [abilityPoints]);

    return (
        <React.Fragment>
           <div className="character-steps-skills-column">
                
                <CharacterStepsSavingThrows />

                <div className="character-steps-skills-wrap">
                    <h3>Навыки</h3>
                    <div className="ability-points-wrap">Количество очков навыков: {abilityPoints.currentAbilityPoints} / {abilityPoints.maxAbilitiesPoints}</div>
                    <div className="character-steps-skills-row">
                        <div className="character-steps-skills-has-item-row">
                            {allAbilitesChunks.part1 ? allAbilitesChunks.part2.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <div className={`character-skills-item skills-item-modif-${item.abilityType}`}>
                                            <span className="skill-plus-value-icon"></span>
                                            <div className="character-skill-name">{item.name}</div>
                                            {characterSum.classData.classAbilities.find((abil) => abil.name === item.name) ?  
                                                <span 
                                                    className={
                                                        abilityPoints.choosenAbilities.find((abil) => abil.id === item.id) ? 
                                                            'main-ability-param-active' : 'main-ability-param'
                                                    } 
                                                    onClick={() => chooseAbilityHandler(item)}>
                                                    
                                                </span> : null
                                            }
                                           
                                            <div className="character-skill-modif">
                                                {calcAblilModif(item)}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            }) : null}
                        </div>
                        <div className="character-steps-skills-new-item-row">
                            {allAbilitesChunks.part2 ? allAbilitesChunks.part1.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <div className={`character-skills-item skills-item-modif-${item.abilityType}`}>
                                            <span className="skill-plus-value-icon"></span>
                                            <div className="character-skill-name">{item.name}</div>
                                            {characterSum.classData.classAbilities.find((abil) => abil.name === item.name) ?  
                                                <span 
                                                className={
                                                    abilityPoints.choosenAbilities.find((abil) => abil.id === item.id) ? 
                                                        'main-ability-param-active' : 'main-ability-param'
                                                } 
                                                onClick={() => chooseAbilityHandler(item)}>
                                                
                                                </span> : null
                                            }
                                            <div className="character-skill-modif">
                                                {calcAblilModif(item)}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            }) : null}
                        </div>
                    </div>
                </div>
                

                <div className="character-steps-skills-tools-wrap">
                    <h3>Инструменты</h3>
                    <div className="character-steps-skills-tools-row">
                        {allInstrumentMastery.map((instrument) => {
                            return (
                                <React.Fragment key={Math.random()}>
                                    <div className={
                                        characterSum.allCharInstrumentMastery.find((item) => item.name === instrument.name && item.id === instrument.id) ? 
                                            'character-steps-skills-tools-item skillExists' : 'character-steps-skills-tools-item skillnotExists' 
                                    }>
                                        <span className="skill-plus-value-icon"></span>
                                        <div className="character-skill-tool-name">{instrument.name}</div>
                                        <div className="character-skill-tool-modif"></div>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                        
                    </div>
                </div>

                <div className="character-steps-skills-armor-wrap">
                    <h3>Оружие</h3>
                    <div className="character-steps-armor-row">
                    {allWeaponMastery.map((weapon) => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <div className={characterSum.allCharWeaponMastery.find((item) => item.id === weapon.id && item.name === item.name) ?
                                'character-steps-skills-tools-item skillExists' : 'character-steps-skills-tools-item skillnotExists'}>
                                    <span className="skill-plus-value-icon"></span>
                                    <div className="character-skill-tool-name">{weapon.name}</div>
                                    <div className="character-skill-tool-modif">+3</div>
                                </div>
                            </React.Fragment>
                            )
                        })
                    }
                    </div>
                </div>

                <div className="character-steps-skills-weapon-wrap">
                    <h3>Доспехи</h3>
                    <div className="character-steps-weapon-row">
                        {allArmorMastery.map((armor) => {
                            return (
                                <React.Fragment key={Math.random()}>
                                    <div className={characterSum.allCharArmorMastery.find((item) => item.id === armor.id && item.name === armor.name) ?
                                    'character-steps-weapon-item skillExists' : 'character-steps-weapon-item skillnotExists'}>
                                        <span>{armor.name}</span>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>

                <div className="character-steps-skills-language-wrap">
                    <h3>Языки</h3>
                    <div className="character-steps-language-row">
                        {allLanguages.map((language) => {
                            return (
                                <React.Fragment key={Math.random()}>
                                    <div className={characterSum.raceData.languages.find((item) => item.name === language.name && item.id === language.id) ? 
                                            "character-steps-language-item skillExists" : "character-steps-language-item skillnotExists"}>
                                        {language.name}
                                    </div>
                                </React.Fragment>
                            )
                        })}
                        
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};


export default CharacterStepsSkills;