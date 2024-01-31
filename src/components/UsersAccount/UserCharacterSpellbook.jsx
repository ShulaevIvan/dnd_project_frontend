import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSpellbookPopup, showSpellbookItemPopup, selectSpellbookSpellLevel } from "../../redux/slices/userSlice";


const UserCharacterSpellbook = () => {
    const dispatch = useDispatch();
    const characterSpells = useSelector((state) => state.userData.previewCharacter.previewCharacterSelected);
    const spellbookPopupStatus = useSelector((state) => state.userData.previewCharacter.spellbook.spellbookItemPopupShow);
    const spellLevels = useSelector((state) => state.userData.previewCharacter.spellbook.spellLevels);
    
    const spellBookPopupCloseHandler = () => {
        dispatch(showSpellbookPopup({status: false}));
    };
    const spellbookItemPopupHandler = (status) => {
        dispatch(showSpellbookItemPopup({status: status}))
    };

    const selectSpellLevelHandler = (lvl, status) => {
        const spellLevelChecked = spellLevels.find((item) => item.level === lvl && item.active);
        if (spellLevelChecked) {
            dispatch(selectSpellbookSpellLevel({spellLevel: lvl, status: false}));
            return;
        }
        dispatch(selectSpellbookSpellLevel({spellLevel: lvl, status: status}));
    };

    console.log(characterSpells)
    return (
        <React.Fragment>
            <div className="user-character-spellbook-popup-wrap">
                <div className="user-character-spellbook-popup-close">
                    <span 
                        className="user-character-spellbook-popup-close-icon"
                        onClick={spellBookPopupCloseHandler}
                    ></span>
                </div>
                <div className="user-character-spellbook-popup-header">
                    <div className="user-character-spellbook-title">
                        <h3>Character Spellbook</h3>
                    </div>

                    <div className="user-character-spellbook-spelllevels-title">
                        <h3>Spell Levels</h3>
                    </div>

                    <div className="user-character-spellbook-spelllevels-row">
                        {spellLevels.map((item) => {
                            return (
                                <React.Fragment key={Math.random()}>
                                    <div
                                        onClick={() => selectSpellLevelHandler(item.level, true)}
                                        className={item.active ? 
                                            "user-character-spellbook-spelllevels-item-selected" : 
                                                "user-character-spellbook-spelllevels-item"
                                        }
                                    >
                                        {item.level}
                                    </div>
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>
                            
                <div className="user-character-spellbook-popup-body">
                    <div className="user-character-spellbook-spells-wrap">
                        <div className="user-character-spellbook-spells-row">
                            <div className="user-character-spellbook-spell-item">
                                <div className="user-character-spell-item-title">Spell-Title</div>
                                    <img 
                                        className="user-character-spell-item-image" src="#"
                                        onClick={() => spellbookItemPopupHandler(true)}
                                    />
                                {spellbookPopupStatus ?
                                    <div className="user-character-spell-description-popup">
                                    <div className="user-character-spellbook-popup-close">
                                        <span 
                                            className="user-character-spellbook-popup-close-icon"
                                            onClick={() => spellbookItemPopupHandler(false)}
                                        ></span>
                                    </div>
                                    <div className="user-character-spell-description-popup-body">
                                        <div className="user-character-spell-description-popup-body-title">Spell Title</div>
                                        <div className="user-character-spell-description-popup-body-content">
                                            <p>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. 
                                                Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. 
                                                В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, 
                                                используя Lorem Ipsum для распечатки образцов. 
                                                Lorem Ipsum не только успешно пережил без заметных изменений пять веков, 
                                                но и перешагнул в электронный дизайн. 
                                                Его популяризации в новое время послужили публикация листов 
                                                Letraset с образцами Lorem Ipsum в 60-х годах и, 
                                                в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, 
                                                в шаблонах которых используется Lorem Ipsum
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                : null}
                                
                            </div>

                            <div className="user-character-spellbook-spell-item">
                                <div className="user-character-spell-item-title">Spell-Title</div>
                            </div>
                            <div className="user-character-spellbook-spell-item">
                                <div className="user-character-spell-item-title">Spell-Title</div>
                            </div>
                            <div className="user-character-spellbook-spell-item">
                                <div className="user-character-spell-item-title">Spell-Title</div>
                            </div>
                            <div className="user-character-spellbook-spell-item">
                                <div className="user-character-spell-item-title">Spell-Title</div>
                            </div>
                            <div className="user-character-spellbook-spell-item">
                                <div className="user-character-spell-item-title">Spell-Title</div>
                            </div>
                            <div className="user-character-spellbook-spell-item">
                                <div className="user-character-spell-item-title">Spell-Title</div>
                            </div>
                            <div className="user-character-spellbook-spell-item">
                                <div className="user-character-spell-item-title">Spell-Title</div>
                            </div>
                            <div className="user-character-spellbook-spell-item">
                                <div className="user-character-spell-item-title">Spell-Title</div>
                            </div>
                            <div className="user-character-spellbook-spell-item">
                                <div className="user-character-spell-item-title">Spell-Title</div>
                            </div>
                            <div className="user-character-spellbook-spell-item">
                                <div className="user-character-spell-item-title">Spell-Title</div>
                            </div>         
                        </div>
                                    
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default UserCharacterSpellbook;