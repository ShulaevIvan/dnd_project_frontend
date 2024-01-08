import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setCharacterStep } from "../../redux/slices/characterStepsSlice";
import { resetCharSteps } from "../../redux/slices/characterStepsSlice";
import { resetStatsState } from "../../redux/slices/calculateStatsSlice";
import { resetAbilitiesState } from "../../redux/slices/calculateAbilitiesSlice";
import { resetSkillsState } from "../../redux/slices/characterSkillsSlice";
import { resetCharTotal } from "../../redux/slices/characterTotalSlice";
import { resetRollDice } from "../../redux/slices/rollDiceSlice";


const CharacterBuilder = () => {
    const dispatch = useDispatch();
    const stepPage =  useSelector((state) => state.characterSteps.characterStepPage);

    const createCharacterHandler = () => {
        dispatch(resetCharSteps());
        dispatch(resetStatsState());
        dispatch(resetAbilitiesState());
        dispatch(resetSkillsState());
        dispatch(resetRollDice());
        dispatch(resetCharTotal());
    };

    useEffect(() => {
        if (stepPage && stepPage <= 1) {
            dispatch(setCharacterStep('reset'));
        }
    }, [stepPage]);

    return (
        <React.Fragment>
            <div className="character-builder-wrap">
                <div className="player-character-wrap">
                    <div className="player-character-create-btn-wrap">
                        <Link
                            onClick={createCharacterHandler}
                            to={{pathname:`/character-builder/character-steps/1`}}>
                            Create Player Character
                        </Link>
                    </div>
                </div>
                <div className="npc-character-wrap">
                    <div className="npc-character-create-btn-wrap">
                        <Link>Create NPC Character</Link>
                    </div>
                </div>
                <div className="services-wrap">
                        services
                </div>
            </div>
        </React.Fragment>
    );
};

export default CharacterBuilder;