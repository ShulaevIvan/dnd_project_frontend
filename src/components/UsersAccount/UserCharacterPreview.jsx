import React from "react";
import { useSelector } from "react-redux";

const UserCharacterPreview = () => {
    const selectedCharacter = useSelector((state) => state.userData.previewCharacter.previewCharacterSelected);
    console.log(selectedCharacter)
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

                        <div className="user-character-preview-abilities-wrap">
                            <div className="user-character-preview-abilities-row">
                                {selectedCharacter.abilities.map((item) => {
                                    return (
                                        <React.Fragment key={Math.random()}>
                                            <div className="user-character-preview-abilitiy-item">
                                                <div className="user-character-preview-abilitiy-item-name">
                                                    {item.name.length > 8 ? `${item.name.split('').slice(item.length, 9).join('')}...` : item.name}</div>
                                                <div className="user-character-preview-abilitiy-item-value">{item.value}</div>
                                            </div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>
        </React.Fragment>
    )
};

export default UserCharacterPreview;