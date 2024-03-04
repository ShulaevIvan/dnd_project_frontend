import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserCharacterSpellbook from "./UserCharacterSpellbook";
import UserCharacterPreviewInventory from "./UserCharacterInventory";
import { 
    abilityPopup, 
    abilityPopupAddDescription, 
    showSpellbookPopup, 
    showFullDescription,
    addUserCharacterSpells,
    showPopupSkill,
    addPopupSkillActive,
    showCharacterMasteryPopup
} from "../../redux/slices/userSlice";

const UserCharacterPreview = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData.userData);
    const selectedCharacter = useSelector((state) => state.userData.previewCharacter.previewCharacterSelected);
    const popupAbil = useSelector((state) => state.userData.previewCharacter.previewAbilityPopup);
    const charFullDescr = useSelector((state) => state.userData.previewCharacter.fullDescrShow);
    const spellbookPopupStatus = useSelector((state) => state.userData.previewCharacter.spellbook.spellbookPopupShow);
    const skillPopupStatus = useSelector((state) => state.userData.previewCharacter.skills.skillPopupShow);
    const skillPopupActive = useSelector((state) => state.userData.previewCharacter.skills.skillPopupActive);
    const skillPopupInfo = useSelector((state) => state.userData.previewCharacter.skills.skillPopupActiveInfo);
    const masteryPopupActive = useSelector((state) => state.userData.previewCharacter.mastery.popupShow);
    const masteryPopupInfoSelected = useSelector((state) => state.userData.previewCharacter.mastery.masteryInfoSelected);

    const abilityDescriptionHandler = (e, abilityObj, action) => {

        if (abilityObj && popupAbil.previewAbilitySelected && abilityObj.name === popupAbil.previewAbilitySelected.name) return;

        const left = e.pageX + e.target.scrollLeft - e.target.offsetLeft;
        const top = e.pageY + e.target.scrollTop - e.target.offsetTop;
        
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
                dispatch(abilityPopup({popupStatus: popupStatus, ability: abilityObj,  x: left, y: top}));
                dispatch(abilityPopupAddDescription({description: data[0].description}))
            })
        };
        fetchFunc();
    };

    const closePopupAbilHandler = () => {
        dispatch(abilityPopup({popupStatus: false}));
        dispatch(addPopupSkillActive({skill: {}}));
    };

    const sliceContentString = (contentString, maxLength) => {
        const stringLen = contentString.split('').length;
        if (stringLen > maxLength) {
            const resultString = `${contentString.split('').splice(0, maxLength).join('')}...`;
            return resultString;
        }
        return contentString
    };
    const isCharSpellcaster = () => {
        const characterSpells = Object.keys(selectedCharacter.spells).length;
        if (characterSpells > 0) return true
        return false;
    }

    const charDescriptionHandler = (descrStatus) => {
        dispatch(showFullDescription({status: descrStatus}));
    };

    const spellBookPopupHandler = (status) => {
        dispatch(showSpellbookPopup({status: status}));
    };

    const skillDescriptionPopupHandler = (skillObj, popupStatus) => {
        dispatch(showPopupSkill({skill: skillObj, status: popupStatus}));
    };

    const skillDescriptionPopupCloseHandler = () => {
        dispatch(showPopupSkill({skill: {}, status: false}));
    };

    const masteryPopupHandler = (masteryObj, status, masteryType) => { 
        dispatch(showCharacterMasteryPopup({status: status, mastery: masteryObj}));
    };

    useEffect(() => {
        if (skillPopupStatus) {
            const fetchFunc = async () => {
                await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reference_book/skills/?skill=${skillPopupActive.name}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.length > 0) {
                        dispatch(addPopupSkillActive({skill: data[0]}));
                    }
                })
            }
            fetchFunc();
        }
    }, [skillPopupStatus])

    useEffect(() => {
        if (spellbookPopupStatus) {
            const fetchFunc = async() => {
                await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userData.userId}/characters/${selectedCharacter.id}/spells/?spell=all`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data && data.spells.length > 0) {
                        dispatch(addUserCharacterSpells({charSpells: data.spells}));
                    }
                })
            }
            fetchFunc();
        }
        return;
    }, [spellbookPopupStatus]);

    return (
        <React.Fragment>
            <div className="user-character-preview-wrap">
                <div className="user-character-preview">
                    <div className="user-character-preview-avatar-row">
                        <div className="user-character-preview-image-wrap">
                            <div className="user-character-preview-image">
                                <img src={selectedCharacter.avatarBlob ? selectedCharacter.avatarBlob : ''} alt="" />
                            </div>
                            {selectedCharacter.description ? 
                                <div className="user-character-description-wrap">
                                    <div className="user-character-description-content">
                                        <p>{
                                            charFullDescr ? 
                                                selectedCharacter.description : 
                                                sliceContentString(selectedCharacter.description, 100)
                                            }
                                        </p>
                                        {selectedCharacter.description && selectedCharacter.description.length > 100 ?
                                            <span className="user-character-description-show-more">
                                                <a 
                                                    href="#" 
                                                    onClick={() => charDescriptionHandler(charFullDescr ? false : true)}
                                                >
                                                    {charFullDescr ? `hide` : `show more...`}
                                                </a>
                                            </span>
                                        : null}
                                    </div>
                                </div>
                            : null}
                            
                        </div>
            
                        <div className="user-character-preview-stats-wrap">
                            <div className="user-character-preview-name-wrap">
                                <div className="user-character-preview-name">Name: {selectedCharacter.name}</div>
                                <div className="user-character-preview-worldview">Worldview: {selectedCharacter.worldview}</div>
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
                            <div className="user-character-preview-stats-row">
                                <div className="user-character-preview-stats-wrap">
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

                                <div className="user-character-preview-health-wrap">
                                    <div className="user-character-hp-title">Max HP</div>
                                    <div className="user-character-health-row">
                                        <div className="user-character-health-wrap">
                                            <div className="user-character-max-hits-value">
                                                <span className="user-character-max-hits-value-block">{selectedCharacter.maxHits}</span>
                                            </div>
                                            <div className="user-character-health-icon-wrap">
                                                <div className="user-character-health-icon"></div>
                                            </div>
                                        </div>
                                        
                                        <div className="user-character-armorclass-title">Armor Class</div>
                                        <div className="user-character-armor-icon-wrap">
                                            <div className="user-character-armor-icon">
                                                <div className="user-character-armor-class-value">
                                                <span className="user-character-armor-class-value-block">{selectedCharacter.baseArmor}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="user-character-preview-other-stats-wrap">
                                <div className="user-character-preview-other-stats-row">
                                    <div className="user-character-size-wrap">
                                        <div className="user-character-size-title"><h4>Size and Width</h4></div>
                                        <div className="user-character-size-value">S: {selectedCharacter.charWeight}</div>
                                        <div className="user-character-height-value">W: {selectedCharacter.charSize} футов</div>
                                    </div>
                                    <div className="user-character-preseption-wrap">
                                    <div className="user-character-preseption-title"><h4>Passive Preseption</h4></div>
                                        <div className="user-character-preseption-value">{selectedCharacter.passivePresep}</div>
                                    </div>
                                    <div className="user-character-speed-wrap">
                                    <div className="user-character-speed-title"><h4>Movement speed</h4></div>
                                        <div className="user-character-speed-value">{selectedCharacter.moveSpeed}</div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div className="user-character-preview-abilities-wrap">
                        <div className="user-character-preview-abilities-title">
                            <h3>Навыки</h3>
                        </div>
                        <div className="user-character-preview-abilities-row">
                            {selectedCharacter.abilities.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <div
                                           
                                            className="user-character-preview-abilitiy-item" 
                                            onMouseLeave={(e) => abilityDescriptionHandler(e, item, 'hide')}
                                        >
                                            <span 
                                                className="ability-info-icon"
                                                onMouseEnter={(e) => abilityDescriptionHandler(e, item, 'show')}
                                                
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
                            <div className="user-character-preview-skills-title">
                                <h3>Умения</h3>
                            </div>
                            <div className="user-character-skills-row">
                                {selectedCharacter.skills.map((skill) => {
                                    return (
                                        <React.Fragment key={Math.random()}>
                                            <div className="user-character-skill-item">
                                                <div className="user-character-skill-img-wrap">
                                                    <img src="http://localhost:3000/static/media/demo.630922c5cb9e25da873b.jpg" alt="" />
                                                </div>
                                                <div className="user-character-skill-item-title">{sliceContentString(skill.name, 12)}</div>
                                                <div className="user-character-skill-item-info-btn-wrap">
                                                    <span 
                                                        className="user-character-skill-item-info-btn"
                                                        onMouseEnter={() => skillDescriptionPopupHandler(skill, true)}
                                                    ></span>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>

                            {skillPopupStatus ?
                                <div 
                                    className="user-character-skill-popup-wrap" 
                                    onMouseLeave={skillDescriptionPopupCloseHandler}
                                >
                                    <span 
                                        className="user-character-skill-popup-close-btn"
                                        onClick={skillDescriptionPopupCloseHandler}
                                    ></span>
                                    <div className="user-character-skill-popup-body">
                                        <div className="user-character-skill-popup-title">{skillPopupInfo.name}</div>
                                        <div className="user-character-skill-popup-description">
                                            <p>{skillPopupInfo.skill_description}</p>
                                        </div>
                                    </div>
                                </div>
                            : null}
                            
                        </div>
                        {isCharSpellcaster() ?
                            <React.Fragment>
                                <div className="user-character-spells-avalible-wrap">
                                    <div className="user-character-preview-skills-title">
                                        <h3>Заклинания</h3>
                                    </div>
                                    <div className="user-character-preview-spellbook-wrap">
                                        <span 
                                            className="user-character-preview-spellbook-icon"
                                            onClick={() => spellBookPopupHandler(spellbookPopupStatus ? false : true)}
                                        ></span>
                                    </div>
                                </div>
                                {spellbookPopupStatus ? <UserCharacterSpellbook /> : null}
                            </React.Fragment>
                        : null}
                        
                    </div>

                    <div className="user-character-preview-abilities-title">
                        <h3>Мастерство</h3>
                    </div>
                    <div className="user-character-mastery-wrap">
                        
                        <div className="user-character-armor-mastery-wrap">
                            {selectedCharacter.armorMastery.map((mastery) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <div className="user-character-armor-mastery-item">
                                            <div className="mastery-info-icon-wrap">
                                                <span 
                                                    className="mastery-info-icon"
                                                    onClick={() => masteryPopupHandler(true, mastery, 'armor')}
                                                ></span>
                                            </div>
                                            <div className="user-character-mastery-name">
                                                {sliceContentString(mastery.name, 12)}
                                            </div>
                                            <div className="mastery-type-icon-wrap">
                                                <span className="mastery-type-icon-armor"></span>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                        <div className="user-character-weapon-mastery-wrap">
                            {selectedCharacter.weaponMastery.map((mastery) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <div className="user-character-weapon-mastery-item">
                                            <div className="mastery-info-icon-wrap">
                                                <span 
                                                    className="mastery-info-icon"
                                                    onClick={() => masteryPopupHandler(true, mastery, 'weapon')}
                                                ></span>
                                            </div>
                                            <div className="user-character-mastery-name">
                                                {sliceContentString(mastery.name, 12)}
                                            </div>
                                            <div className="mastery-type-icon-wrap">
                                                <span className="mastery-type-icon-weapon"></span>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                            
                        </div>
                        <div className="user-character-instrument-mastery-wrap">
                            {selectedCharacter.instrumentMastery.map((mastery) => {
                                console.log(mastery)
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <div className="user-character-instrument-mastery-item">
                                            <div className="mastery-info-icon-wrap">
                                                <span 
                                                    className="mastery-info-icon"
                                                    onClick={() => masteryPopupHandler(true, mastery, 'instrument')}
                                                ></span>
                                            </div>
                                            <div className="user-character-mastery-name">
                                                {sliceContentString(mastery.name, 12)}
                                            </div>
                                            <div className="mastery-type-icon-wrap">
                                                <span className="mastery-type-icon-instrument"></span>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                        {masteryPopupActive ?
                            <React.Fragment>
                                <div className="user-character-mastery-popup-wrap">
                                    <div className="user-character-mastery-popup-close-btn-wrap">
                                        <span 
                                            className="user-character-mastery-popup-close"
                                            onClick={() => masteryPopupHandler(false)}
                                        ></span>
                                    </div>
                                    <div className="user-character-mastery-popup-title">{masteryPopupInfoSelected ? masteryPopupInfoSelected.name : null}</div>
                                    <div className="user-character-mastery-popup-body">
                                        <div className="user-character-mastery-popup-description-wrap">
                                            <p>lorem sadasdasd</p>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        : null}
                        
                    </div>

                    <UserCharacterPreviewInventory />
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