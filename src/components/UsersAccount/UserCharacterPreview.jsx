import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { abilityPopup } from "../../redux/slices/userSlice";

const UserCharacterPreview = () => {
    const dispatch = useDispatch();
    const selectedCharacter = useSelector((state) => state.userData.previewCharacter.previewCharacterSelected);
    const previewAbilityPopup = useSelector((state) => state.userData.previewCharacter.previewAbilityPopup);

    const abilityDescriptionHandler = (e, abilityObj, action) => {
        const rect = e.target.getBoundingClientRect();
        console.log(rect.top)
        if (action === 'show') {
            console.log(abilityObj)
            dispatch(abilityPopup({popupStatus: true, ability: abilityObj,  x: rect.left, y: rect.top}));
            return;
        }
        dispatch(abilityPopup({popupStatus: false, ability: abilityObj,  x: rect.left, y: rect.top}));
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
                                    <span className="user-character-preview-class-lvl">1</span>
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
                                            <div className="user-character-preview-stat-name">{item.name.toUpperCase()}</div>
                                            <div className="user-character-preview-stat-value">{item.modifer}</div>
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
                                        <div className="user-character-preview-abilitiy-item">
                                            <div
                                                onMouseOver={(e) => abilityDescriptionHandler(e, item, 'show')}
                                                onMouseLeave={(e) => abilityDescriptionHandler(e, item, 'hide')}
                                                className="user-character-preview-abilitiy-item-name">
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
                style={{left: previewAbilityPopup.x, top: previewAbilityPopup.y}}
                className={previewAbilityPopup.previewAbilityPopupActive ? "ability-popup-wrap" : "ability-popup-wrap ability-popup-hidden"}
            >
                <div className="ability-popup-title">
                    {previewAbilityPopup.previewAbilitySelected.name}
                </div>
                    <div className="ability-popup-body">
                        <div className="ability-popup-description">
                        <p> Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. 
                            Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. 
                            В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов,
                            используя Lorem Ipsum для распечатки образцов. 
                            Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. 
                            Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, 
                            в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, 
                            в шаблонах которых используется Lorem Ipsum.
                        </p>
                    </div>
                </div>
            </div>
            
        </React.Fragment>
    )
};

export default UserCharacterPreview;