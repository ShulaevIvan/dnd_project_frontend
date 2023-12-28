import React from "react";
import { useSelector, useDispatch } from "react-redux";

const CharacterStepsSaveCharacter = () => {
    const userAccountData = useSelector((state) => state.userData);
    
    return (
        <React.Fragment>
            <button className="save-btn" disabled={userAccountData.isAuthenticated ? false : true}>save</button> 
        </React.Fragment>
    )
};

export default CharacterStepsSaveCharacter;