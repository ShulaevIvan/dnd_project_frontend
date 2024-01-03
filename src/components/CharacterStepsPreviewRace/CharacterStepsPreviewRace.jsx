import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectCharacterGender } from '../../redux/slices/characterTotalSlice';
import { activeNextBtn } from "../../redux/slices/characterStepsSlice";

const CharacterStepsPreiewRace = () => {
    const dispatch = useDispatch();
    const characterCreateState = useSelector((state) => state.characterSteps);
    const raceState = useSelector((state) => state.characterSteps.characterSum.raceData);
    const subraceState = useSelector((state) => state.characterSteps.characterSum.subraceData);
    const characterGender = useSelector((state) =>  state.characterTotal.characterTotalInfo.gender);
    const chooseGenderHandler = (gender) => {
        dispatch(selectCharacterGender({gender:gender}));
    };

    useEffect(() => {
        dispatch(activeNextBtn(true));
    }, []);

    return (
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
                                    <li>{`Str: + ${raceState.race_bonuces.str_bonuce}`}</li>
                                    <li>{`Dex: + ${raceState.race_bonuces.dex_bonuce}`}</li>
                                    <li>{`Con: + ${raceState.race_bonuces.con_bonuce}`}</li>
                                    <li>{`Int: + ${raceState.race_bonuces.int_bonuce}`}</li>
                                    <li>{`Wis: + ${raceState.race_bonuces.wis_bonuce}`}</li>
                                    <li>{`Cha: + ${raceState.race_bonuces.cha_bonuce}`}</li>
                                </ul>
                            </React.Fragment> : 
                        
                            <React.Fragment>
                                <ul>
                                    <li>{`Str: + ${subraceState.subraceBonuces.str_bonuce}`}</li>
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
                {!subraceState ? characterCreateState.characterSum.raceData.skills.map((item) => {
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
                    <div 
                        className={characterGender === 'female' ? "gender-block-female gender-selected" : "gender-block-female"}
                        onClick={() => chooseGenderHandler('female')}
                    >
                        <span className="gender-title-f">Female</span>
                    </div>
                    <div 
                        className={characterGender === 'male' ? "gender-block-male gender-selected" : "gender-block-male"}
                        onClick={() => chooseGenderHandler('male')}
                    >
                        <span className="gender-title-m">Male</span>
                    </div>
                </div>
            </div>

            <div className="race-description-wrap">
                <div className="race-description">
                    <p>{raceState.raceData.race_description}</p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CharacterStepsPreiewRace;