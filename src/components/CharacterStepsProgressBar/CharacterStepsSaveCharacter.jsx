import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { creationCompliteAction } from "../../redux/slices/characterTotalSlice";
import { resetCharSteps } from "../../redux/slices/characterStepsSlice";
import { resetStatsState } from "../../redux/slices/calculateStatsSlice";
import { resetAbilitiesState } from "../../redux/slices/calculateAbilitiesSlice";
import { resetSkillsState } from "../../redux/slices/characterSkillsSlice";
import { resetCharTotal } from "../../redux/slices/characterTotalSlice";
import { resetRollDice } from "../../redux/slices/rollDiceSlice";

const CharacterStepsSaveCharacter = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userAccountData = useSelector((state) => state.userData);
    const characterData = useSelector((state) => state.characterSteps.characterSum);
    const sendDataValid = useSelector((state) => state.characterTotal.allSendDataValid);
    const characterDescription = useSelector((state) => state.characterTotal.characterTotalInfo.charDescription);
    const characterName = useSelector((state) => state.characterTotal.characterTotalInfo.charName);
    const characterAvatar = useSelector((state) => state.characterTotal.uploadCharacterFile);
    const charStats = useSelector((state) => state.calculateCharStats.resultCharStats);
    const charAbilities  = useSelector((state) => state.calculateAbilites.resultCharAbilities);
    const characterWorldView = useSelector((state) => state.characterSteps.characterSum.backgroundWorldViewActive);
    const creationComplite = useSelector((state) => state.characterTotal.creationComplite);
    
    const saveCharacterDataHandler = () => {
        const data = {
            charName: characterName,
            charRace: characterData.raceData.raceData.char_race_name,
            charClass: characterData.classData.className,
            charSubClass: !characterData.subclassData ? false : characterData.subclassData,
            charBackground: characterData.backgroundActive[0].name,
            charLvl: characterData.charLevel,
            charStats: charStats,
            charAbilities: charAbilities,
            charDescription: characterDescription ? characterDescription.description : '',
            charWorldView: characterWorldView.name,
            charAvatar: characterAvatar.uploadPopupFileData ? characterAvatar.uploadPopupFileData.file : '',
        }

        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userAccountData.userData.userId}/characters/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), 
            })
        };

        fetchFunc();
        dispatch(creationCompliteAction({compliteStatus: true}));
    };

    const checkCharacterData = () => {
        if (userAccountData.isAuthenticated && characterName) {
            return false;
        }
        dispatch(creationCompliteAction({compliteStatus: false}));
        return true;
    };

    useEffect(() => {
        if (creationComplite) {
            dispatch(resetCharSteps());
            dispatch(resetStatsState());
            dispatch(resetAbilitiesState());
            dispatch(resetSkillsState());
            dispatch(resetRollDice());
            dispatch(resetCharTotal());
            setTimeout(() => {
                navigate('/profile/characters/');
            }, 200)
        }
    }, [creationComplite])
    
    return (
        <React.Fragment>
            <button
                className="save-btn" 
                disabled={checkCharacterData()}
                onClick={saveCharacterDataHandler}
            >save</button> 
        </React.Fragment>
    )
};

export default CharacterStepsSaveCharacter;