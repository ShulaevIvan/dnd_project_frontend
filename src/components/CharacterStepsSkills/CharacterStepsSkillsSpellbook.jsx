import React from "react";
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";

const CharacterStepsSkillsSpellbook = (props) => {

    const dispatch = useDispatch();
    const classSpells = useSelector((state) => state.characterSkills.classSpells);
    const maxSpellLevel = useSelector((state) => state.characterSkills.maxSpellLevel);
    const spellNavigate = useSelector((state) => state.characterSkills.spellLevelNavigate);
    const spellLevels = classSpells.reduce((res, i) => {
        const spellObj = {}
        if (res.hasOwnProperty(i.spellLevel)) {
            res[i.spellLevel] += 1;
        } 
        else {
            res[i.spellLevel] = 1;
        }
        return res;
    }, {});
   

    console.log(spellLevels)

    // const changeSpellLvlHandler = () => {

    // };


    return (
        <React.Fragment>
            <div className="character-steps-spellbook-wrap">
                <div className="character-stps-spells-row">
                    <div className="character-steps-charm-lvl">
                        <h4>Доступные заговоры:</h4>
                            <ul className="character-steps-charm-lvl-list">
                                <li>1 уровень : 0 / 1</li>
                                <li>2 уровень : 0 / 2 </li>
                                <li>3 уровень : 0 / 3 </li>
                                <li>4 уровень : 0 / 4 </li>
                                <li>5 уровень : 0 / 1 </li>
                            </ul>
                    </div>

                    <div className="character-steps-rituals-lvl">
                        <h4>Доступные ритуалы:</h4>
                            <ul className="character-steps-rituals-lvl-list">
                                <li>1 уровень : 0 / 1</li>
                                <li>2 уровень : 0 / 2 </li>
                                <li>3 уровень : 0 / 3 </li>
                                <li>4 уровень : 0 / 4 </li>
                                <li>5 уровень : 0 / 1 </li>
                            </ul>
                    </div>

                    <div className="character-steps-spellbook-lvl">
                        <h4>Ячейки заклинаний:</h4>
                        <ul className="character-steps-spellbook-lvl-list">
                            <li>1 уровень : 0 / 9</li>
                            <li>2 уровень : 0 / 8 </li>
                            <li>3 уровень : 0 / 5 </li>
                            <li>4 уровень : 0 / 3 </li>
                            <li>5 уровень : 0 / 1 </li>
                        </ul>
                    </div>
            </div>

            <div className="spellbook-level-navigation-row">
                {spellNavigate.map((item) => {
                    return (
                        <React.Fragment>
                           <div className="spellbook-level-navigation-btn-level">{item.name}</div> 
                        </React.Fragment>
                    )
                })}
            </div>
                
                

            <div className="character-steps-spellbook-row">
                <div className="character-steps-spellbook-item">
                    <div className="character-steps-spellbook-item-title">test</div>
                </div>

                <div className="character-steps-spellbook-item">
                    <div className="character-steps-spellbook-item-title">test</div>
                </div>

                <div className="character-steps-spellbook-item">
                    <div className="character-steps-spellbook-item-title">test</div>
                </div>

                <div className="character-steps-spellbook-item">
                    <div className="character-steps-spellbook-item-title">test</div>
                </div>

                <div className="character-steps-spellbook-item">
                    <div className="character-steps-spellbook-item-title">test</div>
                </div>

                <div className="character-steps-spellbook-item">
                    <div className="character-steps-spellbook-item-title">test</div>
                </div>

                <div className="character-steps-spellbook-item">
                    <div className="character-steps-spellbook-item-title">test</div>
                </div>

                <div className="character-steps-spellbook-item">
                    <div className="character-steps-spellbook-item-title">test</div>
                </div>

                <div className="character-steps-spellbook-item">
                    <div className="character-steps-spellbook-item-title">test</div>
                </div>

                <div className="character-steps-spellbook-item">
                    <div className="character-steps-spellbook-item-title">test</div>
                 </div>
            </div>

            {/* <div className="spellbook-navigation-row">
                <div className="spellbook-navigation-btn-level">0</div>
                <div className="spellbook-navigation-btn-level">1</div>
                <div className="spellbook-navigation-btn-level">2</div>
                <div className="spellbook-navigation-btn-level">3</div>
                <div className="spellbook-navigation-btn-level">4</div>
                <div className="spellbook-navigation-btn-level">5</div>
                <div className="spellbook-navigation-btn-level">6</div>
                <div className="spellbook-navigation-btn-level">7</div>
                <div className="spellbook-navigation-btn-level">8</div>
                <div className="spellbook-navigation-btn-level-disabled ">9</div>
            </div> */}
        </div>
        </React.Fragment>
    )
};

export default CharacterStepsSkillsSpellbook;