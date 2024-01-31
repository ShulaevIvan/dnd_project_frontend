import React from "react";
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";
import { 
    showSpellsByLevel, 
    selectSpell, 
    unselectSpell, 
    activeSpellHover, 
    closeSpellHover, 
    spendSpellPoints, 
    showHideSpellbook
} from "../../redux/slices/characterSkillsSlice";
import { activeNextBtn } from "../../redux/slices/characterStepsSlice";

const CharacterStepsSkillsSpellbook = (props) => {

    const dispatch = useDispatch();
    // const characterLevel = useSelector((state) => state.characterSteps.characterSum.charLevel);
    const resultCharStats = useSelector((state) => state.calculateCharStats.resultCharStats);
    const otherCharStats = useSelector((state) => state.calculateCharStats.charOtherStats);
    const avalibleCells = useSelector((state) => state.characterSkills.avalibleCellsLevel);
    const charMainSpellStat = useSelector((state) => state.characterSteps.characterSum.classData.spellcasterMainStat);
    const maxAvalibleSpellLevel = useSelector((state) => state.characterSkills.maxAvalibleSpellLevel);
    // const maxSpellLevel = useSelector((state) => state.characterSkills.maxSpellLevel);
    const minSpellLevel = useSelector((state) => state.characterSkills.minSpellLevel);
    const spellPoints = useSelector((state) => state.characterSkills.spellPoints);
    const spellNavigate = useSelector((state) => state.characterSkills.spellLevelNavigate);
    const spellChuncks = useSelector((state) => state.characterSkills.classSpellsActiveChunck);
    const selectedSpells = useSelector((state) => state.characterSkills.selectedSpells);
    const currentSpellLevelNav = useSelector((state) => state.characterSkills.spellLevelNavigateActive);
    const spellHoverActive = useSelector((state) => state.characterSkills.activeSpellHover);
    const blockSpellHover = useSelector((state) => state.characterSkills.blockSpellHover);
    const hideSpellbook = useSelector((state) => state.characterSkills.showSpellbook)
    
    const spellNavigateHandler = (spellNavObj) => {
        dispatch(showSpellsByLevel(spellNavObj.name));
    };

    const selectSpellHandler = (spellObj) => {
        dispatch(selectSpell({spell: spellObj}));
        dispatch(spendSpellPoints(
            {
                spellLevel: spellObj.spellLevel,
                operation: 'add',
            }
        ));
    };

    const unselectSpellHandler = (spellObj) => {
        dispatch(unselectSpell({spell: spellObj}));
        dispatch(spendSpellPoints(
            {
                spellLevel: spellObj.spellLevel,
                operation: 'remove',
            }
        ));
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

    const calculateSpellThrow = () => {
        const casterModifer = resultCharStats.find((item) => item.statParam === charMainSpellStat.toLowerCase()).modifer;
        const mastery = otherCharStats.prof;
        const checkZero = casterModifer > 0  || casterModifer < 0 ? casterModifer : 0
        return `${checkZero ? casterModifer : `+ 0`} + ${mastery} = ${8 + Number(casterModifer) + Number(mastery)}`;

    };

    useEffect(() => {
        dispatch(showSpellsByLevel(minSpellLevel));
    }, []);

    useEffect(() => {
        const checkSelectedSpells = Object.entries(spellPoints).filter((item) => item[0].match(/spellLevel\d$/)).every((spell) => spell[1] === 0);

        if (checkSelectedSpells) {
            dispatch(activeNextBtn(false));
            dispatch(showHideSpellbook(true));
            return;
        }
        dispatch(showHideSpellbook(false));
        dispatch(activeNextBtn(true));
       
    }, [spellPoints]);

    useEffect(() => {
        const checkSelectedSpells = Object.entries(spellPoints).filter((item) => item[0].match(/spellLevel\d$/)).every((spell) => spell[1] === 0);
        if (checkSelectedSpells) {
            dispatch(activeNextBtn(false));
            dispatch(showHideSpellbook(true));
            return;
        }
        dispatch(activeNextBtn(true));
    }, []);

    

    return (
        <React.Fragment>
            <div className="character-steps-spellbook-wrap">
                <div className="character-stps-spells-row">
                    <div className="character-steps-spellbook-main-stat">
                        <p>{`Характеристика заклинаний: ${charMainSpellStat}`}</p>
                        <p>{`Сложность спасброска от заклинания: 8  
                            ${calculateSpellThrow()}`}
                        </p>
                    </div>

                    <div className="character-steps-spellbook-lvl">
                        <h4>Ячейки заклинаний:</h4>
                        <ul className="character-steps-spellbook-lvl-list">
                            {avalibleCells.map((item) => {
                                const currentSpellPoints = spellPoints[`spellLevel${Number(item.level.replace('level', ''))}`];
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <li>уровень {item.level.replace('level', '')} : {currentSpellPoints} / {item.value}</li>
                                    </React.Fragment>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            {selectedSpells.length > 0  ? 
                <div className="character-steps-selected-spells-wrap">
                <div className="character-steps-selected-spels-title">Выбранные заклинания</div>
 
                <div className="character-steps-selected-spells-row">
                    {selectedSpells.map((item) => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <div className="character-steps-selected-spells-item-wrap">
                                    <div className="character-steps-selected-spells-item-title">
                                    <span className="character-steps-selected-spells-spell-level">spellLevel ({item.spellLevel})</span>
                                        {item.name}
                                    </div>
                                    <div className="character-steps-spellbook-image-wrap">
                                        <div className="character-steps-spellbook-item"></div>
                                    </div>
                                    <div className="remove-spell-btn">
                                        <button onClick={() => unselectSpellHandler(item)}>remove</button>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>
             </div>
            : null}
            {!hideSpellbook ?
                <React.Fragment>
                    <div className="character-steps-spellbook-lvl-title">Заклинания уровнь : {currentSpellLevelNav} </div>
                    <div className="character-steps-spellbook-row">
                    {spellChuncks.map((spellObj) => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <div className="character-steps-spellbook-item-wrap">
                                    <div 
                                        className="character-steps-spellbook-item-title" 
                                        onMouseOver={(e) => spellHoverHandler(e, spellObj)}
                                    >
                                        {spellObj.name}
                                    </div>
                                    <div className="character-steps-spellbook-image-wrap">
                                        <div className="character-steps-spellbook-item">
                                        
                                        </div>
                                        {spellHoverActive && spellHoverActive.id === spellObj.id && !blockSpellHover ? 
                                            <div className="character-steps-spellbook-item-hover" onMouseLeave={spellHoverCloseHandler}>
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
                                            disabled={
                                                selectedSpells.find((item) => item.id === spellObj.id) ||
                                                spellPoints[`spellLevel${spellObj.spellLevel}`] === 0
                                            }
                                        >add</button>
                                        {/* <span 
                                            className="info-btn" 
                                            onMouseOver={(e) => spellHoverHandler(e, spellObj)}
                                        ></span> */}
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
                    </div>

                    <div className="spellbook-level-navigation-row">
                        {spellNavigate.filter((navObj) => Number(navObj.name) <= maxAvalibleSpellLevel).map((item) => {
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
            : null}
        </React.Fragment>
    )
};

export default CharacterStepsSkillsSpellbook;