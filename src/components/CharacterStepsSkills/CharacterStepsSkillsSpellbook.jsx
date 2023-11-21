import React from "react";
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";
import { showSpellsByLevel, selectSpell, unselectSpell, activeSpellHover, closeSpellHover } from "../../redux/slices/characterSkillsSlice";

const CharacterStepsSkillsSpellbook = (props) => {

    const dispatch = useDispatch();
    const classSpells = useSelector((state) => state.characterSkills.classSpells);
    const maxSpellLevel = useSelector((state) => state.characterSkills.maxSpellLevel);
    const minSpellLevel = useSelector((state) => state.characterSkills.minSpellLevel);
    const spellNavigate = useSelector((state) => state.characterSkills.spellLevelNavigate);
    const spellChuncks = useSelector((state) => state.characterSkills.classSpellsActiveChunck);
    const selectedSpells = useSelector((state) => state.characterSkills.selectedSpells);
    const currentSpellLevelNav = useSelector((state) => state.characterSkills.spellLevelNavigateActive);
    const spellHoverActive = useSelector((state) => state.characterSkills.activeSpellHover);
    const blockSpellHover = useSelector((state) => state.characterSkills.blockSpellHover);
    console.log(blockSpellHover)

    // const spellLevels = classSpells.reduce((res, i) => {
    //     const spellObj = {}
    //     if (res.hasOwnProperty(i.spellLevel)) {
    //         res[i.spellLevel] += 1;
    //     } 
    //     else {
    //         res[i.spellLevel] = 1;
    //     }
    //     return res;
    // }, {});

    const spellNavigateHandler = (spellNavObj) => {
        dispatch(showSpellsByLevel(spellNavObj.name));
    };

    const selectSpellHandler = (spellObj) => {
        dispatch(selectSpell({spell: spellObj}));
    };

    const unselectSpellHandler = (spellObj) => {
        dispatch(unselectSpell({spell: spellObj}));
    };

    const spellHoverHandler = (e, spellObj) => {
        const client = e.target.getBoundingClientRect();
        dispatch(activeSpellHover({
            spell: spellObj, 
            cordX: Number(client.x - client.left), 
            cordY: Number(client.y - client.top)
        }));
    };
    
    const spellHoverCloseHandler = () => {
        dispatch(closeSpellHover());
    };

    useEffect(() => {
        dispatch(showSpellsByLevel(minSpellLevel))
    }, [])


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
            </div>
            {selectedSpells.length > 0 ? 
                <div className="character-steps-selected-spells-wrap">
                <div className="character-steps-selected-spels-title">Выбранные заклинания</div>
 
                <div className="character-steps-selected-spells-row">
                    {selectedSpells.map((item) => {
                        return (
                            <React.Fragment>
                                <div className="character-steps-selected-spells-item-wrap">
                                    <div className="character-steps-selected-spells-item-title">{item.name}</div>
                                    <div className="character-steps-spellbook-image-wrap">
                                        <div className="character-steps-spellbook-item"></div>
                                    </div>
                                    <div className="remove-spell-btn">
                                        <button on onClick={() => unselectSpellHandler(item)}>remove</button>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>
             </div>
            : null}
           
            <div className="character-steps-spellbook-lvl-title">Заклинания уровнь : {currentSpellLevelNav} </div>
            <div className="character-steps-spellbook-row">
                {spellChuncks.map((spellObj) => {
                    return (
                        <React.Fragment key={Math.random()}>
                            <div className="character-steps-spellbook-item-wrap" onMouseLeave={spellHoverCloseHandler}>
                                <div className="character-steps-spellbook-item-title">{spellObj.name}</div>
                                <div className="character-steps-spellbook-image-wrap">
                                    <div className="character-steps-spellbook-item">
                                        
                                    </div>
                                    {spellHoverActive && spellHoverActive.id === spellObj.id && !blockSpellHover ? 
                                        <div className="character-steps-spellbook-item-hover">
                                            <span 
                                                className="character-steps-spellbook-item-close"
                                                onClick={spellHoverCloseHandler}
                                            ></span>
                                            <div className="character-steps-spellbook-item-content">
                                                <div className="character-steps-spellbook-item-descr-title">
                                                    <h3>{spellObj.name}</h3>
                                                </div>
                                                <div className="character-steps-spellbook-item-description">
                                                    {spellObj.description}
                                                </div>
                                            </div>
                                        </div>
                                    : null}
                                    
                                </div>
                                <div className="add-spell-btn-wrap">
                                    <button 
                                        onClick={() => selectSpellHandler(spellObj)}
                                        disabled={selectedSpells.find((item) => item.id === spellObj.id)}
                                    >add</button>
                                    <span 
                                        className="info-btn" 
                                        onMouseOver={(e) => spellHoverHandler(e, spellObj)}
                                        ></span>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                })}
            </div>

            <div className="spellbook-level-navigation-row">
                {spellNavigate.map((item) => {
                    console.log(item)
                    return (
                        <React.Fragment key={Math.random()}>
                            <div 
                                className={item.active ? 'spellbook-level-navigation-btn-level-active' : 'spellbook-level-navigation-btn-level'}
                                onClick={() => spellNavigateHandler(item)}
                            >
                                {item.name}
                            </div> 
                        </React.Fragment>
                    )
                })}
            </div>

        </React.Fragment>
    )
};

export default CharacterStepsSkillsSpellbook;