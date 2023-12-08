import React from "react";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
    descriptionPopup, 
    closeDescriptionPopUp, 
    saveDescription,
    imagePopupControl,
    uploadPopupFile,
    uploadStatus,
} from "../../redux/slices/characterTotalSlice";

const CharacterStepsAvatar = () => {
    const dispatch = useDispatch();
    const popupX = useSelector((state) => state.characterTotal.popupX);
    const popupY = useSelector((state) => state.characterTotal.popupY);
    const descPopupTextArea = useRef(null);
    const uploadImagePopupRef = useRef(null);
    const uploadFileStatus = useSelector((state) => state.characterTotal.uploadStatus);
    const characterTotalImageFile = useSelector((state) => state.characterTotal.uploadCharacterFile)
    const descriptionPopupActive = useSelector((state) => state.characterTotal.descriptionPopupActive);
    const imagePopupActive = useSelector((state) => state.characterTotal.imagePopupActive);
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
        if (descPopupTextArea) {
            dispatch(saveDescription({description: descPopupTextArea.current.value}));
            dispatch(closeDescriptionPopUp());
        }
    };

    const editDescriptionHander = (e, action) => {
        const client = e.target.getBoundingClientRect();
        dispatch(descriptionPopup({client: {x: client.left, y: client.top}, active: action}));
    };

    const imagePopupControlHandler = (e, action) => {
        const client = e.target.getBoundingClientRect();
        dispatch(imagePopupControl({client: {x: client.left, y: client.top}, actionType: action}));
        if (!action) dispatch(uploadStatus(false));
    };

    const uploadImageHandler = (e) => {
        dispatch(uploadStatus(true));
    };

    const saveCharacterImageHandler = (e) => {

    };

    useEffect(() => {
        if (uploadFileStatus && uploadImagePopupRef.current && uploadImagePopupRef.current.files) {
            const fileTypes = ['image/png','image/gif','image/jpeg'];
            const file = uploadImagePopupRef.current.files[0];
            if (!fileTypes.includes(file.type)){
                dispatch(uploadStatus(false));
                return;
            }
            const reader = new FileReader();
            const url = URL.createObjectURL(file);
            reader.readAsDataURL(file);
            reader.onloadend = (e) => {
                const fileData = {
                    type: file.type,
                    name: file.name,
                    url: url,
                    file: reader.result,
                    date: new Date().getTime(),
                };
                
                dispatch(uploadPopupFile(JSON.stringify({file: file, fileData: fileData, url: fileData.url})));
                dispatch(uploadStatus(false));
            };
        }
    }, [uploadFileStatus])
    

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
                            {characterDescription && characterDescription.description ?  
                                <div className="character-steps-total-char-description-result-wrap">
                                    <span 
                                        className="character-steps-total-edit-description-btn" 
                                        onClick={(e) => editDescriptionHander(e, true)}
                                    ></span>
                                    <div className="character-steps-total-char-description-content">
                                        <p>{characterDescription.description}</p>
                                    </div>
                                 </div>
                            :
                                <div className="character-steps-total-description-btn">
                                    <button onClick={(e) => popupDescriptionHandler(e, true)}>add description</button>
                                </div>
                            }
                        </div>
                        <div className="character-steps-total-avatar-add-image-form">
                            <div className="character-steps-total-avatar-btn">
                                <button onClick={(e) => imagePopupControlHandler(e, true)}>add image</button>
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
            
            {imagePopupActive ?
                <div 
                    className="character-steps-total-image-popup-wrap"
                    style={{'top': `${popupY / 2}px`, left: `${popupX / 2}px`}}
                >
                    <span className="character-steps-total-popup-close" onClick={(e) => imagePopupControlHandler(e, false)}></span>
                    <div className="character-steps-total-image-popup-title">Character Image</div>
                        <div className="character-steps-total-image-popup-upload-btn-wrap">
                            <input 
                                type="file" 
                                ref={uploadImagePopupRef}
                                onChange={(e) => uploadImageHandler(e)} />
                        </div>
                        <div className="character-steps-total-image-popup-preview">
                            <img src={characterTotalImageFile.uploadPopupFileUrl} alt="#" />
                        </div>
                        <div className="character-steps-total-image-popup-controls">
                            <div className="character-steps-total-image-btn">
                                <button onClick={saveCharacterImageHandler}>save</button>
                            </div>
                        <div className="character-steps-total-image-btn">
                            <button>cancel</button>
                        </div>
                    </div>
                </div> 
            : null}
            
            
        </React.Fragment>
    )
};


export default CharacterStepsAvatar;