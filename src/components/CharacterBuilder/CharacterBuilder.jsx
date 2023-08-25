import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { setCharacterStep } from "../../redux/slices/characterStepsSlice";
import CharacterSteps from "../CharacterSteps/CharacterSteps";

const CharacterBuilder = () => {
    const dispatch = useDispatch();

    const buildCharacterHandler = () => {
        dispatch(setCharacterStep(1));
    };

    return (
        <React.Fragment>
            <div className="character-builder-wrap">
                <div className="player-character-wrap">
                    <div className="player-character-create-btn-wrap">
                        <Link
                            onClick={buildCharacterHandler}
                            to={{pathname:'/character-builder/character-steps/'}}>
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