import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const CharacterStepsSaveCharacter = () => {
    const dispatch = useDispatch();
    const userAccountData = useSelector((state) => state.userData);
    const characterData = useSelector((state) => state.characterSteps.characterSum);
    const sendDataValid = useSelector((state) => state.characterTotal.allSendDataValid);
    const saveCharacterData = useSelector((state) => state.characterTotal.characterSendData);
    
    const saveCharacterDataHandler = () => {
        const data = {
            name: 'test',
            value: 'test2',
            descr: 'test3'
        }
        console.log(data)

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
     
    };

    
    return (
        <React.Fragment>
            <button
                className="save-btn" 
                disabled={userAccountData.isAuthenticated ? false : true}
                onClick={saveCharacterDataHandler}
            >save</button> 
        </React.Fragment>
    )
};

export default CharacterStepsSaveCharacter;