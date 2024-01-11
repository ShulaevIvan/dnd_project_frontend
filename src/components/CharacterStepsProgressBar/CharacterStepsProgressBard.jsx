import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

import CharacterStepsSaveCharacter from "./CharacterStepsSaveCharacter";
import { 
    setCharacterStep, 
    activeNextBtn, 
    activePrevBtn, 
    stepOneReset, 
    stepTwoReset,
    stepThreeReset,
} from "../../redux/slices/characterStepsSlice";
import { resetGender } from "../../redux/slices/characterTotalSlice";
import { resetRaceStats, stepFourReset } from "../../redux/slices/calculateStatsSlice";
import { resetAbilityPoints, resetAbilitiesState } from "../../redux/slices/calculateAbilitiesSlice";
import { removeBonuceAbility } from "../../redux/slices/characterStepsSlice";
import { resetCharacterSkillsState } from "../../redux/slices/characterSkillsSlice";
import { resetCharTotal } from "../../redux/slices/characterTotalSlice";


const CharacterStepsProgressBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const characterStepNum = useSelector((state) => state.characterSteps.characterStepPage);
    const stepsNames = useSelector((state) => state.characterSteps.stepsNames);
    const maxPage = useSelector((state) => state.characterSteps.characterStepMaxPage);
    const nextBtnActiveState = useSelector((state) => state.characterSteps.navNextBtnDisable);
    const prevBtnActiveState = useSelector((state) => state.characterSteps.navPrevBtnDisable);
    const createCharSum = useSelector((state) => state.characterSteps.characterSum.raceData);
    const classCharSum = useSelector((state) => state.characterSteps.characterSum.classData);
    const backgroundCharSum = useSelector((state) => state.characterSteps.characterSum.backgroundData);
    const currentPage =  useSelector((state) => state.characterSteps.characterStepPage);
    const changeStatState = useSelector((state) => state.calculateCharStats.disableStatSelectors);
    const setupStatsComplete =  useSelector((state) => state.calculateCharStats.setupStatsComplete);
    const characterGender = useSelector((state) =>  state.characterTotal.characterTotalInfo.gender);
    const abilityPoints = useSelector((state) => state.calculateAbilites);

    const nextPageHandler = () => {
        dispatch(setCharacterStep(1));
    };
    const prevPageHandler = () => {
        dispatch(setCharacterStep(-1));
    };

    const resetAbilitiesStep = () => {
        dispatch(resetAbilityPoints());
            abilityPoints.addedAbilities.map((ability) => {
                if (!abilityPoints.initialClassAbilities.find((item) => item.id === ability.id)) {
                    dispatch(removeBonuceAbility(ability));
                }
            });
        dispatch(resetAbilitiesState());
    };

    useEffect(() => {
        if (characterStepNum <= maxPage) navigate(`${location.pathname.substring(0, location.pathname.length - 1)}${characterStepNum}`);

        switch(characterStepNum) {
            case 1:
                dispatch(stepOneReset());
                dispatch(resetGender());
                dispatch(resetRaceStats());
                dispatch(activePrevBtn(true));
                dispatch(activeNextBtn(true));

                break
            case 2:
                dispatch(stepTwoReset());
                dispatch(activePrevBtn(false));

                break;
            
            case 3:
                dispatch(stepThreeReset());
                dispatch(activePrevBtn(false));
                dispatch(activeNextBtn(true));

                break
            case 4:
                dispatch(stepFourReset());
                dispatch(activePrevBtn(false));
                dispatch(activeNextBtn(true));

                break;
            case 5:
                resetAbilitiesStep();
                dispatch(activePrevBtn(false));
                dispatch(activeNextBtn(true));
                break;
            case 6:
                dispatch(resetCharacterSkillsState());
                dispatch(activePrevBtn(false));
                dispatch(activeNextBtn(true));
                break;
            
            case 7:
                dispatch(resetCharTotal());
                dispatch(activePrevBtn(false));
                break;


            default:
                dispatch(activeNextBtn(false));
                break;
        }

    }, [characterStepNum]);

    useEffect(() => {
        if ((!createCharSum || !characterGender) && currentPage === 1) {
            dispatch(activePrevBtn(true));
            dispatch(activeNextBtn(true));
            return;
        }
        if (!classCharSum && currentPage === 2) {
            dispatch(activeNextBtn(true));
            dispatch(activePrevBtn(false));
            return;
        }
        if (!backgroundCharSum && currentPage === 3) {
            dispatch(activeNextBtn(true));
            dispatch(activePrevBtn(false));
            return;
        }
        if (((changeStatState.length !== 6 || !setupStatsComplete) && currentPage === 4)) {
            dispatch(activeNextBtn(true));
            dispatch(activePrevBtn(false));
            return;
        }
        dispatch(activeNextBtn(false));
    }, [createCharSum, currentPage, changeStatState, characterGender]);

    return (
        <React.Fragment>
            <div className="porgerss-bar-row">
                <div className="progress-bar-container">
                    <ul className="timeline">
                        {stepsNames.map((item, i) => {
                            return (
                                <React.Fragment key={Math.random()}>
                                    <li data-step={item} className={i === characterStepNum -1 ? "progress-active-step" : null}></li>
                                </React.Fragment>
                            )
                        })}
                    </ul>
                </div>

                <div className="progress-bar-nav-wrap">
                    <div className="progress-bar-btn-block">
                        <div className="prev-btn-wrap">
                            <button className="prev-btn" disabled={prevBtnActiveState} onClick={prevPageHandler}>Prev</button>
                        </div>
                        <div className="next-btn-wrap">
                            {
                                Number(currentPage) === Number(maxPage) ? 
                                    <CharacterStepsSaveCharacter />
                                : 
                                    <button className="next-btn" disabled={nextBtnActiveState} onClick={nextPageHandler}>next</button> 
                            }
                           
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CharacterStepsProgressBar;