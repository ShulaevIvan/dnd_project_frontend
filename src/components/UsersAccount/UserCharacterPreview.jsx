import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { abilityPopup, abilityPopupAddDescription } from "../../redux/slices/userSlice";

const UserCharacterPreview = () => {
    const dispatch = useDispatch();
    const selectedCharacter = useSelector((state) => state.userData.previewCharacter.previewCharacterSelected);
    const popupAbil = useSelector((state) => state.userData.previewCharacter.previewAbilityPopup);

    const abilityDescriptionHandler = (e, abilityObj, action) => {
        e.stopPropagation();
        if (abilityObj && popupAbil.previewAbilitySelected && abilityObj.name === popupAbil.previewAbilitySelected.name) return;

        const rect = e.target.getBoundingClientRect();
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reference_book/abilites/?ability=${abilityObj.name}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((data) => {
                let popupStatus = false;
                if (action === 'show') popupStatus = true;
                dispatch(abilityPopup({popupStatus: popupStatus, ability: abilityObj,  x: rect.left, y: rect.top}));
                dispatch(abilityPopupAddDescription({description: data[0].description}))
            })
        };
        fetchFunc();
    };
    console.log(selectedCharacter)
    const closePopupAbilHandler = () => {
        dispatch(abilityPopup({popupStatus: false}));
    };

    return (
        <React.Fragment>
            <div className="user-character-preview-wrap">
                <div className="user-character-preview">
                    <div className="user-character-preview-avatar-row">
                        <div className="user-character-preview-image-wrap">
                            <img src={selectedCharacter.avatarBlob ? selectedCharacter.avatarBlob : ''} alt="" />
                        </div>
            
                        <div className="user-character-preview-stats-wrap">
                            <div className="user-character-preview-name-wrap">
                                <div className="user-character-preview-name">Name: {selectedCharacter.name}</div>
                                <div className="user-character-preview-race">Race: {selectedCharacter.race}</div>
                                <div className="user-character-preview-background">Background: {selectedCharacter.background}</div>
                                <div className="user-character-preview-class">
                                    Class: {selectedCharacter.class}
                                    <span className="user-character-preview-class-lvl">{`lvl ${selectedCharacter.lvl}`}</span>
                                </div>
                                {selectedCharacter.subclass ?
                                    <div className="user-character-preview-class">
                                        Subclass: 
                                    <span className="user-character-preview-class-lvl">1</span>
                                 </div>
                                : null}
                               
                                <div className="user-character-preview-exp">
                                <span className="user-character-exp-base">Exp: 0 /</span>
                                    <span className="user-character-exp-total">100</span>
                                </div>
                            </div>
                            {selectedCharacter.stats.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <div className="user-character-preview-stat-item-row">
                                            <div className="user-character-preview-stat-name">{`${item.name.toUpperCase()}:`}</div>
                                            <div className="user-character-preview-stat-value">{`${item.value} (${item.modifer})`}</div>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    </div>

                    <div className="user-character-preview-abilities-wrap">
                        <div className="user-character-preview-abilities-row">
                            {selectedCharacter.abilities.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <div
                                           
                                            className="user-character-preview-abilitiy-item">
                                            <span 
                                                className="ability-info-icon"
                                                onMouseEnter={(e) => abilityDescriptionHandler(e, item, 'show')}
                                                onMouseLeave={(e) => abilityDescriptionHandler(e, item, 'hide')}
                                            ></span>
                                            <div className="user-character-preview-abilitiy-item-name">
                                                {item.name.length > 8 ? `${item.name.split('').slice(item.length, 9).join('')}...` : item.name}</div>
                                            <div className="user-character-preview-abilitiy-item-value">{item.value}</div>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    </div>

                    <div className="user-character-preview-skills-row">
                        <div className="user-character-skills-avalible-wrap">
                           <div className="user-character-skills-row">
                                <div className="user-character-skill-item">
                                    <div className="user-character-skill-item-title">Skill Name</div>
                                    <div className="user-character-skill-item-controls-row">
                                        <div className="user-character-skill-item-control">
                                            <span className="user-character-skill-item-control-preview"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-character-skill-item">
                                    <div className="user-character-skill-item-title">Skill Name</div>
                                    <div className="user-character-skill-item-controls-row">
                                        <div className="user-character-skill-item-control">
                                            <span className="user-character-skill-item-control-preview"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-character-skill-item">
                                    <div className="user-character-skill-item-title">Skill Name</div>
                                    <div className="user-character-skill-item-controls-row">
                                        <div className="user-character-skill-item-control">
                                            <span className="user-character-skill-item-control-preview"></span>
                                        </div>
                                    </div>
                                </div>
                           </div>
                        </div>
                        <div className="user-character-spells-avalible-wrap">
                           2
                        </div>
                    </div>
                </div>
            </div>

            <div
                style={{left: popupAbil.x, top: popupAbil.y}}
                className={popupAbil.previewAbilityPopupActive ? "ability-popup-wrap" : "ability-popup-wrap ability-popup-hidden"}
            >
                <div className="ability-popup-title">
                    {popupAbil.previewAbilitySelected ? 
                        popupAbil.previewAbilitySelected.name : null
                    }
                </div>
                    <div className="ability-popup-body" onMouseMove={closePopupAbilHandler}>
                        <div className="ability-popup-description">
                        <p>{popupAbil.previewAbilitySelected ? popupAbil.previewAbilitySelected.description : null}</p>
                    </div>
                </div>
            </div>
            
        </React.Fragment>
    )
};

export default UserCharacterPreview;