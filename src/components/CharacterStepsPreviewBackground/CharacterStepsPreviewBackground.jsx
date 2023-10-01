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
                    {
                        activeBackground.instrumentMastery.length > 0 || activeBackground.weaponMastery.length > 0 || 
                                activeBackground.armorMastery.length > 0 ? 
                                    <span className="background-view-title">Умения</span> : null}
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

                        {activeBackground.items ? <h4 className="background-equip-title">Экипировка происхождения</h4> : null}
                            <div className="background-non-combat-eqip">
                                <p>{activeBackground.items}</p>
                            </div>
                        </div>

                        {activeBackground.languages.length > 0 ? 
                            <React.Fragment>
                                <span className="background-view-title">Дополнительные языки</span>
                                    <div className="character-background-other">
                                        {activeBackground.languages.length > 0 ? <span className="background-view-title">Дополнительные языки</span>: null}
                                        <div className="background-other-content">
                                            <ul>
                                                {activeBackground.languages ? activeBackground.languages.map((item) => {
                                                    return (
                                                        <React.Fragment key={Math.random()}>
                                                            <li>{item.name}</li>
                                                        </React.Fragment>
                                                    )
                                                }) : null}
                                            </ul>
                                        </div>
                                    </div>
                            </React.Fragment>
                        : null}
                        

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