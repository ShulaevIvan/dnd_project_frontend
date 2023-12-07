import React from "react";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { descriptionPopup, closeDescriptionPopUp, saveDescription } from "../../redux/slices/characterTotalSlice";

const CharacterStepsAvatar = () => {
    const dispatch = useDispatch();
    const popupX = useSelector((state) => state.characterTotal.popupX);
    const popupY = useSelector((state) => state.characterTotal.popupY);
    const descPopupTextArea = useRef(null);
    const descriptionPopupActive = useSelector((state) => state.characterTotal.descriptionPopupActive);
    const characterDescription = useSelector((state) => state.characterTotal.characterTotalInfo.charDescription);


    const popupDescriptionHandler = (e, action) => {
        const client = e.target.getBoundingClientRect();
        if (!action && descPopupTextArea.current && descPopupTextArea.current.value === '') {
            dispatch(saveDescription({description: ''}));
            dispatch(closeDescriptionPopUp());
        }
        dispatch(descriptionPopup({client: {x: client.left, y: client.top}, active: action}));
    };

    const saveDescriptionHandler = () => {
        if (descPopupTextArea && descPopupTextArea.current.value) {
            dispatch(saveDescription({description: descPopupTextArea.current.value}));
            dispatch(closeDescriptionPopUp());
        }
    };
    

    useEffect(() => {
        if (descPopupTextArea.current && descPopupTextArea.current.value !== null) {
            descPopupTextArea.current.value = characterDescription.description;
        }
        return;
    }, [descPopupTextArea.current]);


    return (
        <React.Fragment>
            <div className="character-steps-total-avatar-wrap">
                <div className="character-total-avatar-title">Avatar and Description</div>
                    <div className="character-steps-total-avatar-row">
                        <div className="character-steps-total-char-description-form">
                            <div className="character-steps-total-description-btn">
                                <button onClick={(e) => popupDescriptionHandler(e, true)}>add description</button>
                            </div>
                        </div>
                        <div className="character-steps-total-avatar-add-image-form">
                            <div className="character-steps-total-avatar-btn">
                                <button>add image</button>
                            </div>
                        </div>
                    </div>
            </div>


            {descriptionPopupActive ?
                <div 
                    className="character-steps-total-popup-wrap"
                    style={{'top': `${popupY / 2}px`, left: `${popupX / 2}px`}}
                >
                    <span className="character-steps-total-popup-close" onClick={(e) => popupDescriptionHandler(e, false)}></span>
                    <div className="character-steps-total-popup-title">Character Description</div>
                    <div className="character-steps-total-popup-body">
                        <textarea 
                            className="character-steps-total-description"
                            ref={descPopupTextArea}
                        ></textarea>
                    </div>
                    <div className="character-steps-total-popup-footer">
                        <div className="character-steps-total-popup-controls">
                            <div className="character-steps-total-popup-btn-wrap">
                                <button className="character-steps-total-btn" onClick={saveDescriptionHandler}>save</button>
                            </div>
                            <div className="character-steps-total-popup-btn-wrap">
                                <button className="character-steps-total-btn" onClick={(e) => popupDescriptionHandler(e, false)}>cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            : null}
            
        </React.Fragment>
    )
};


export default CharacterStepsAvatar;