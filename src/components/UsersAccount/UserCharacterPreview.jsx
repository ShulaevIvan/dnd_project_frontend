import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { abilityPopup, abilityPopupAddDescription } from "../../redux/slices/userSlice";

const UserCharacterPreview = () => {
    const dispatch = useDispatch();
    const selectedCharacter = useSelector((state) => state.userData.previewCharacter.previewCharacterSelected);
    const popupAbil = useSelector((state) => state.userData.previewCharacter.previewAbilityPopup);

    console.log(selectedCharacter);

    const abilityDescriptionHandler = (e, abilityObj, action) => {

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
                            <div className="user-character-preview-image">
                                <img src={selectedCharacter.avatarBlob ? selectedCharacter.avatarBlob : ''} alt="" />
                            </div>
                            <div className="user-character-description-wrap">
                                <div className="user-character-description-content">
                                    {/* <p>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. 
                                        В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. 
                                        Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. 
                                        Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, 
                                        в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
                                    </p> */}
                                    <span className="user-character-description-show-more"><a href="#">show more ...</a></span>
                                </div>
                            </div>
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
                                                <span className="user-character-max-hits-value-block">222</span>
                                            </div>
                                            <div className="user-character-health-icon-wrap">
                                                <div className="user-character-health-icon"></div>
                                            </div>
                                        </div>
                                        
                                        <div className="user-character-armorclass-title">Armor Class</div>
                                        <div className="user-character-armor-icon-wrap">
                                            <div className="user-character-armor-icon">
                                                <div className="user-character-armor-class-value">
                                                <span className="user-character-armor-class-value-block">222</span>
                                                </div>
                                            </div>
                                        </div>
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
                            <div className="user-character-preview-skills-title">
                                <h3>Умения</h3>
                            </div>
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
                            <div className="user-character-preview-skills-title">
                                <h3>Заклинания</h3>
                            </div>
                           
                        </div>
                    </div>

                    <div className="user-character-preview-abilities-title">
                        <h3>Мастерство</h3>
                    </div>
                    <div className="user-character-mastery-wrap">
                        
                        <div className="user-character-armor-mastery-wrap">
                            <div className="user-character-armor-mastery-item">
                                <div className="mastery-info-icon-wrap">
                                    <span className="mastery-info-icon"></span>
                                </div>
                                <div className="user-character-mastery-name">
                                    Легкие доспехи
                                </div>
                                <div className="mastery-type-icon-wrap">
                                    <span className="mastery-type-icon-armor"></span>
                                </div>
                            </div>
                            <div className="user-character-armor-mastery-item">
                                <div className="mastery-info-icon-wrap">
                                    <span className="mastery-info-icon"></span>
                                </div>
                                <div className="user-character-mastery-name">
                                    Легкие доспехи
                                </div>
                                <div className="mastery-type-icon-wrap">
                                    <span className="mastery-type-icon-armor"></span>
                                </div>
                            </div>
                            <div className="user-character-armor-mastery-item">
                                <div className="mastery-info-icon-wrap">
                                    <span className="mastery-info-icon"></span>
                                </div>
                                <div className="user-character-mastery-name">
                                    Легкие доспехи
                                </div>
                                <div className="mastery-type-icon-wrap">
                                    <span className="mastery-type-icon-armor"></span>
                                </div>
                            </div>
                        </div>
                        <div className="user-character-weapon-mastery-wrap">
                            <div className="user-character-weapon-mastery-item">
                                <div className="mastery-info-icon-wrap">
                                    <span className="mastery-info-icon"></span>
                                </div>
                                <div className="user-character-mastery-name">
                                    Оружие test test
                                </div>
                                <div className="mastery-type-icon-wrap">
                                    <span className="mastery-type-icon-weapon"></span>
                                </div>
                            </div>
                        </div>
                        <div className="user-character-instrument-mastery-wrap">
                            <div className="user-character-instrument-mastery-item">
                                <div className="mastery-info-icon-wrap">
                                    <span className="mastery-info-icon"></span>
                                </div>
                                <div className="user-character-mastery-name">
                                    instrument test
                                </div>
                                <div className="mastery-type-icon-wrap">
                                    <span className="mastery-type-icon-instrument"></span>
                                </div>
                            </div>
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