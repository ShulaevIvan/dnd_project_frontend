import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { setCharacterStep } from "../../redux/slices/characterStepsSlice";

const CharacterBuilder = () => {

    return (
        <React.Fragment>
            <div className="character-builder-wrap">
                <div className="player-character-wrap">
                    <div className="player-character-create-btn-wrap">
                        <Link
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