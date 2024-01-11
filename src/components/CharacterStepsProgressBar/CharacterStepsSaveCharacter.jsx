import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { creationCompliteAction } from "../../redux/slices/characterTotalSlice";

const CharacterStepsSaveCharacter = () => {
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
    console.log(charStats)
    
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

    useEffect(() => {
        dispatch(creationCompliteAction({compliteStatus: false}));
    }, []);

    useEffect(() => {
        if (userAccountData.isAuthenticated && characterName) {
            dispatch(creationCompliteAction({compliteStatus: true}));
            return;
        }
        dispatch(creationCompliteAction({compliteStatus: false}));
    }, [creationComplite, characterName, userAccountData.isAuthenticated]);
    
    return (
        <React.Fragment>
            <button
                className="save-btn" 
                disabled={creationComplite ? false : true}
                onClick={saveCharacterDataHandler}
            >save</button> 
        </React.Fragment>
    )
};

export default CharacterStepsSaveCharacter;