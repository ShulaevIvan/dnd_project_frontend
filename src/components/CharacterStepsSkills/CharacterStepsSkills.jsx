import React from "react";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAbilites, addBonuceAbility, addMastery, addLanguages } from "../../redux/slices/characterStepsSlice";
import { addAbilityPoints, chooseAbility, saveResultAbilities } from "../../redux/slices/calculateAbilitiesSlice";
import { addBonuceAbilities } from '../../redux/slices/calculateAbilitiesSlice';
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

    const chooseAbilityHandler = (abilObj) => {
        const checkBonuceAbil = abilityPoints.freeBonuceAbilities.find((item) => item.id === abilObj.id);
        if (checkBonuceAbil || abilityPoints.currentAbilityPoints === 0) return;
        dispatch(chooseAbility({ability: abilObj, addType: 'regular'}));
    };

    const addBonuceAbilityHandler = (abilObj) => {
        const checkAbil = abilityPoints.bonuceAbilities.find((abil) => abil.name === abilObj.name);
        const checkAbilClass = characterSum.classData.classAbilities.find((abil) => abil.name === abilObj.name);
        const checkAbilBackground = characterSum.backgroundActive[0].bounceAbilities.find((item) => checkAbil && item.name === checkAbil.name);

        if (abilityPoints.anyAbilitiesCount > 0 && !checkAbilClass && !checkAbilBackground && !checkAbil) {
            dispatch(addBonuceAbility(abilObj));
            dispatch(chooseAbility({ability: abilObj, addType: 'any'}));
            return;
        }
        if (checkAbilBackground) {
            dispatch(addBonuceAbility(abilObj));
            dispatch(chooseAbility({ability: abilObj, addType: 'background'}));
            return;
        }
        dispatch(addBonuceAbility(abilObj));
    };

    const checkAbilityBonuce = (abilObj) => {
        const checkAbil = abilityPoints.bonuceAbilities.find((abil) => abil.name === abilObj.name);
        const checkAbilClass = characterSum.classData.classAbilities.find((abil) => abil.name === abilObj.name);
        const checkAbilBackground = characterSum.backgroundActive[0].bounceAbilities.find((item) => checkAbil && item.name === checkAbil.name);

        if (checkAbil && checkAbilBackground && !checkAbilClass) return true;
        if (!checkAbil && !checkAbilClass && !checkAbilBackground && abilityPoints.anyAbilitiesCount > 0) return true
       
        return false;
    };

    const checkCharMastery = (mastery, masteryType) => {
        let masteryState;

        if (masteryType === 'instrument') {
            masteryState = characterSum.allCharInstrumentMastery;
        }
        else if (masteryType === 'weapon') {
            masteryState = characterSum.allCharWeaponMastery;
        }
        else if (masteryType === 'armor') {
            masteryState = characterSum.allCharArmorMastery;
        }
        else if (masteryType === 'lang') {
            masteryState = characterSum.raceData.languages;
        }
        return masteryState.find((item) => item.name === mastery.name && item.id === mastery.id);
        
    };

    useEffect(() => {
        if (allAbilitesChunks.part1 && abilityPoints.currentAbilityPoints === 0 && abilityPoints.anyAbilitiesCount === 0) {
            let allAbilities = allAbilitesChunks.part1.concat(allAbilitesChunks.part2);

            allAbilities = allAbilities.map((item) => {
                const abilModifer = resultCharStats.find((statObj) => statObj.statParam === item.abilityType).modifer;
                const abilChoosen = abilityPoints.choosenAbilities.find((chAbility) => chAbility.id === item.id);
                let resultModifer = Number(abilModifer);

                if (abilChoosen) {
                    return {
                        ...item,
                        value: resultModifer + Number(abilitesState.charOtherStats.prof),
                    };
    
                }
                return {
                    ...item,
                    value: resultModifer,
                }

            });
            dispatch(saveResultAbilities(allAbilities));
        }
    }, [abilityPoints.anyAbilitiesCount, abilityPoints.currentAbilityPoints]);
    
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
                dispatch(addAbilites({ 'abilities': data }));
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
                dispatch(addMastery({'data': JSON.stringify(data.instruments), param: 'instruments'}));
                dispatch(addMastery({'data': JSON.stringify(data.armor), param: 'armor'}));
                dispatch(addMastery({'data': JSON.stringify(data.weapons), param: 'weapons'}));
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
            });
        }

        fetchFunc();
    }, []);

    useEffect(() => {
        dispatch(addAbilityPoints({abilityPoints: characterSum.classData.classAbilityPoints}));
        dispatch(addBonuceAbilities({
            raceBonuceAbilities: characterSum.raceData.skills.filter((skill) => skill.skill_type === 'ability'),
            backgroundBonuceAbilities: characterSum.backgroundActive[0].bounceAbilities,
        }));
    }, []);

    return (
        <React.Fragment>
           <div className="character-steps-skills-column">
                
                <CharacterStepsSavingThrows />

                <div className="character-steps-skills-wrap">
                    <h3>Навыки</h3>
                    <div className="ability-points-wrap">Количество очков навыков: {abilityPoints.currentAbilityPoints} / {abilityPoints.maxAbilitiesPoints}</div>
                    <div className="ability-points-wrap">
                        { 
                            abilityPoints.anyAbilitiesCount > 0 ? 
                                <span>Очки любых навыков: {abilityPoints.anyAbilitiesCount}</span>
                            : null
                        }
                    </div>
                    <div className="character-steps-skills-row">
                        <div className="character-steps-skills-has-item-row">
                            {allAbilitesChunks.part2 ? allAbilitesChunks.part2.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <div className={`character-skills-item skills-item-modif-${item.abilityType}`}>
                                            {checkAbilityBonuce(item) ? 
                                                <span 
                                                    className="skill-plus-value-icon"
                                                    onClick={() => addBonuceAbilityHandler(item)}
                                                ></span> : null
                                            }
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
                            {allAbilitesChunks.part1 ? allAbilitesChunks.part1.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <div className={`character-skills-item skills-item-modif-${item.abilityType}`}>
                                            {checkAbilityBonuce(item) ? 
                                                <span 
                                                    className="skill-plus-value-icon"
                                                    onClick={() => addBonuceAbilityHandler(item)}
                                                ></span> : null
                                            }
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
                                    {checkCharMastery(instrument, 'instrument') ? 
                                        <div className='character-steps-skills-tools-item'>
                                            <div className="character-skill-tool-name">{instrument.name}</div>
                                            <div className="character-skill-tool-modif">
                                                {checkCharMastery(instrument, 'instrument') ? `+ ${Number(abilitesState.charOtherStats.prof)}` : `+ ${0}`}
                                            </div>
                                        </div>
                                    : null}
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
                                {checkCharMastery(weapon, 'weapon') ? 
                                    <div className='character-steps-skills-tools-item'>

                                        <div className="character-skill-tool-name">{weapon.name}</div>
                                        <div className="character-skill-tool-modif">{
                                            checkCharMastery(weapon, 'weapon')  ? `+ ${Number(abilitesState.charOtherStats.prof)}` : `+ ${0}`
                                        }
                                        </div>
                                    </div>
                                : null} 
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
                                    {checkCharMastery(armor, 'armor') ? 
                                        <div className='character-steps-weapon-item'>
                                            <span>{armor.name}</span>
                                        </div> 
                                    : null}
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
                                    {checkCharMastery(language, 'lang') ? 
                                        <div className='character-steps-language-item'>
                                            {language.name}
                                        </div>
                                    : null}
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