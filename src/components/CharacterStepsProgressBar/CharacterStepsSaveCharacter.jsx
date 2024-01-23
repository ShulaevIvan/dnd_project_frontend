import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { creationCompliteAction } from "../../redux/slices/characterTotalSlice";

const CharacterStepsSaveCharacter = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userAccountData = useSelector((state) => state.userData);
    const characterData = useSelector((state) => state.characterSteps.characterSum);
    // const sendDataValid = useSelector((state) => state.characterTotal.allSendDataValid);
    const characterDescription = useSelector((state) => state.characterTotal.characterTotalInfo.charDescription);
    const characterName = useSelector((state) => state.characterTotal.characterTotalInfo.charName);
    const characterAvatar = useSelector((state) => state.characterTotal.uploadCharacterFile);
    const charStats = useSelector((state) => state.calculateCharStats.resultCharStats);
    const charAbilities  = useSelector((state) => state.calculateAbilites.resultCharAbilities);
    const characterWorldView = useSelector((state) => state.characterSteps.characterSum.backgroundWorldViewActive);
    const creationComplite = useSelector((state) => state.characterTotal.creationComplite);
    const charSavethrows = useSelector((state) => state.characterSteps.characterSum.classData.classSaveThrows);
    const otherCharStats = useSelector((state) => state.calculateCharStats.charOtherStats);

    const raceSkills = useSelector((state) => state.characterSteps.characterSum.raceData.skills).filter((item) => item.skill_type === 'skill');
    
    const prepCharacterSkills = () => {
        const classSkills = characterData.classData.classSkills.filter((skill) => skill.levelRequired === Number(characterData.charLevel));
        const raceSkills = characterData.raceData.skills;
        const subraceSkills = characterData.subraceData ? characterData.subraceData.subraceSkills : [];
        const bckgArmorMastery = characterData.backgroundActive[0].armorMastery;
        const bckgInstrumentMastery = characterData.backgroundActive[0].instrumentMastery;
        const bckgWeaponMastery = characterData.backgroundActive[0].weaponMastery;
        const charLang = characterData.raceData.languages;
        const resultSkills = [...classSkills, ...raceSkills, ...subraceSkills]
        console.log(otherCharStats)
    };
    prepCharacterSkills()

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
            charSkills: [
                ...characterData.classData.classSkills.filter((skill) => skill.levelRequired === Number(characterData.charLevel)),
                ...raceSkills,
                ...characterData.subraceData ? characterData.subraceData.subraceSkills : [],
            ],
            charSavethrows: charSavethrows,
            charArmorMastery: characterData.backgroundActive[0].armorMastery,
            charWeaponMastery: characterData.backgroundActive[0].weaponMastery,
            charInstrumentMastery: characterData.backgroundActive[0].instrumentMastery,
            charLanguages: characterData.raceData.languages,
            charDescription: characterDescription ? characterDescription.description : '',
            charWorldView: characterWorldView.name,
            charAvatar: characterAvatar.uploadPopupFileData ? {
                name: characterAvatar.uploadPopupFileData.name, 
                data: characterAvatar.uploadPopupFileData.file,
                ext: characterAvatar.uploadPopupFileData.name.match(/.\w+$/)[0],
            } : '',
        }

        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userAccountData.userData.userId}/characters/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), 
            })
            .then((response) => {
                if (response.status === 201) {
                    // navigate(`/profile/characters/`)
                }
                return response.json()
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