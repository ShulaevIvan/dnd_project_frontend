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
    saveCaracterName,
    selectCharacterGender,
    charNameValid
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
    const characterTotalInfo = useSelector((state) =>  state.characterTotal.characterTotalInfo);
    const characterNameRef = useRef(null);
    const charNameValidStatus = useSelector((state) => state.characterTotal.characterTotalInfo.charNameValid);

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

    const saveCharacterImageHandler = (e) => {
        if (uploadImagePopupRef.current && uploadImagePopupRef.current.files) {
            dispatch(uploadStatus(true));
        }
    };

    const characterNameHandler = (param) => {
        if (characterNameRef.current && param === 'save' && characterNameRef.current.value) {
            dispatch(saveCaracterName({charName: characterNameRef.current.value}));
        }
        else if (characterNameRef.current && param === 'clear') {
            characterNameRef.current.value = '';
            dispatch(saveCaracterName({charName: ''}));
            dispatch(charNameValid({validStatus: false}));
        }
    };

    const characterRandomNameHandler = () => {
        const fetchFunc = async () => {
            const gender = characterTotalInfo.gender ? characterTotalInfo.gender : 'all'
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/services/namegen/${gender}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((responce) => responce.json())
            .then((data) => {
                if (data && data.length > 0) {
                    characterNameRef.current.value = data[0].name;
                    dispatch(charNameValid({validStatus: true}));
                }
            });
        }
        fetchFunc();
    };

    const selectCharacterGenderHandler = (charGender) => {
        dispatch(selectCharacterGender({gender: charGender}));
    };

    const charNameInputHandler = () => {
        if (characterNameRef.current.value.length >= 3) {
            dispatch(charNameValid({validStatus: true}));
            return;
        }
        dispatch(charNameValid({validStatus: false}));
    };

    useEffect(() => {
        if (uploadFileStatus && uploadImagePopupRef.current && uploadImagePopupRef.current.files) {
            const fileTypes = ['image/png','image/gif','image/jpeg'];
            const file = uploadImagePopupRef.current.files[0];

            if (!file || !fileTypes.includes(file.type)){
                dispatch(uploadStatus(false));
                return;
            }
            const reader = new FileReader();
            const url = URL.createObjectURL(file);
            reader.readAsDataURL(file);
            reader.onloadend = (e) => {
                let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
                if ((encoded.length % 4) > 0) {
                    encoded += '='.repeat(4 - (encoded.length % 4));
                }
                const fileData = {
                    type: file.type,
                    name: file.name,
                    url: url,
                    file: encoded,
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

    useEffect(() => {
        if (characterNameRef.current) characterNameRef.current.value = '';
    }, []);


    return (
        <React.Fragment>
            <div className="character-steps-total-name-wrap">
                <div className="character-steps-total-name-input-wrap">
                    <label htmlFor="character-steps-total-name-input">Character Name</label>
                    <input 
                        id="character-steps-total-name-input" 
                        type="text"
                        ref={characterNameRef}
                        onKeyUp={charNameInputHandler}
                    />
                    <div className="character-steps-total-gender-block">
                        <div 
                            className={
                                characterTotalInfo && characterTotalInfo.gender === 'female' ? 
                                    "gender-block-female gender-selected" : "gender-block-female"
                            } 
                            onClick={() => selectCharacterGenderHandler('female')}
                        ></div>
                        <div
                            className={
                                characterTotalInfo && characterTotalInfo.gender === 'male' ? 
                                    "gender-block-male gender-selected" : "gender-block-male"
                            } 
                            onClick={() => selectCharacterGenderHandler('male')}
                        ></div>
                    </div>
                </div>
                <div className="character-steps-total-name-controls-row">
                    <div className="character-steps-total-name-btn">
                        <button
                            disabled={charNameValidStatus && characterTotalInfo.gender ? false : true}
                            onClick={() => characterNameHandler('save')}
                        >Save</button>
                    </div>
                    <div className="character-steps-total-name-btn">
                        <button onClick={characterRandomNameHandler}>Random</button>
                    </div>
                    <div className="character-steps-total-name-btn">
                        <button onClick={() => characterNameHandler('clear')}>Clear</button>
                    </div>
                </div>
            </div>
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
                            {characterTotalImageFile.uploadPopupFileUrl ?
                                <span 
                                    className="character-steps-total-edit-image-btn" 
                                    onClick={(e) => imagePopupControlHandler(e, true)}
                                ></span>
                            : null}
                            <div className="character-steps-total-avatar-result-wrap">
                                {characterTotalImageFile.uploadPopupFileUrl ?  
                                    <img src={characterTotalImageFile.uploadPopupFileUrl} alt="#" /> 
                                : null}
                            </div>
                            <div className="character-steps-total-avatar-btn">
                                {!characterTotalImageFile.uploadPopupFileUrl ? 
                                    <button onClick={(e) => imagePopupControlHandler(e, true)}>add image</button> : null
                                }
                                
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
                            />
                        </div>
                        <div className="character-steps-total-image-popup-preview">
                            <img src={characterTotalImageFile.uploadPopupFileUrl} alt="#" />
                        </div>
                        <div className="character-steps-total-image-popup-controls">
                            <div className="character-steps-total-image-btn">
                                <button onClick={saveCharacterImageHandler}>save</button>
                            </div>
                        <div className="character-steps-total-image-btn">
                            <button onClick={(e) => imagePopupControlHandler(e, false)}>cancel</button>
                        </div>
                    </div>
                </div> 
            : null}
            
            
        </React.Fragment>
    )
};


export default CharacterStepsAvatar;