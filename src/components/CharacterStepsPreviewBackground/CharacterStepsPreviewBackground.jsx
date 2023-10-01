import React from "react";
import { useSelector } from 'react-redux';

const CharacterStepsPreiewBackground = () => {
    const activeBackground = useSelector((state) => state.characterSteps.characterSum.backgroundActive[0]);

    return (
        <React.Fragment>
            <div className="character-background-preview-wrap">
                <div className="character-background-preview-title">{activeBackground.name}</div>  
                    <div className="character-background-attrs">
                        <span className="background-view-title">Навыки</span>
                        <div className="character-background-attrs-row">
                            {activeBackground.bounceAbilities ? activeBackground.bounceAbilities.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <div className="character-background-attr-item">{item.name}</div>
                                    </React.Fragment>
                                )
                            }) : null}
                            </div>
                    </div>

                    <div className="character-background-skills">
                        <span className="background-view-title">Умения</span>
                        <div className="character-background-skills-row">
                            {activeBackground.instrumentMastery ? activeBackground.instrumentMastery.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <div className="character-background-skill-item">{item.name}</div>
                                    </React.Fragment>
                                )
                            }) : null}
                            {activeBackground.weaponMastery ? activeBackground.weaponMastery.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <div className="character-background-skill-item">{item.name}</div>
                                    </React.Fragment>
                                )
                            }) : null}
                            {activeBackground.armorMastery ? activeBackground.armorMastery.map((item) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <div className="character-background-skill-item">{item.name}</div>
                                    </React.Fragment>
                                )
                            }) : null}
                        </div>
                        
                    </div>

                    <div className="character-background-equipment">
                        <h4 className="background-equip-title">Экипировка происхождения</h4>
                            <div className="character-background-equipment-content">
                                <div className="background-equipment-row">
                                    <div className="background-equipment-item">
                                        <ul className="background-equipment-list">
                                            <li className="weapon">background-equipment</li>
                                            <li className="item">background-equipment</li>
                                            <li className="item">background-equipment</li>
                                        </ul>
                                    </div>
                                    <div className="background-equipment-item">
                                        <ul className="background-equipment-list">
                                            <li className="item">background-equipment</li>
                                            <li className="item">background-equipment</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="character-background-other">
                            <span className="background-view-title">Прочее</span>
                            <div className="background-other-content">Вы владеете дополнительным языком: Воровской жаргон</div>
                        </div>

                        <div className="character-worldview-wrap">
                            <span className="background-view-title">Мировозрение</span>

                            <div className="worldview-params-wrap">

                                <div className="worldview-row">
                                    <div className="worldview-item lg">Lawfull good</div>
                                    <div className="worldview-item ng">Neutral good</div>
                                    <div className="worldview-item chg">Chaotic good</div>
                                </div>
                                <div className="worldview-row">
                                    <div className="worldview-item ln">Lawfull netural</div>
                                    <div className="worldview-item tn">True netural</div>
                                    <div className="worldview-item chn">Chaotic netural</div>
                                </div>

                                <div className="worldview-row">
                                    <div className="worldview-item le">Lawfull evil</div>
                                    <div className="worldview-item ne">Neutral evil</div>
                                    <div className="worldview-item che">Chaotic evil</div>
                                </div>
                            </div>
                        </div>
                        <div className="background-description-wrap">
                            <span className="background-view-title">Описание происхождения</span>
                            <div className="background-description-content">
                                {activeBackground.description}
                            </div>
                        </div>
                    </div>
        </React.Fragment>
    )
};

export default CharacterStepsPreiewBackground;