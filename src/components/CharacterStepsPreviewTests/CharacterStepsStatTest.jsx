import React from "react";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { 
    statTestSelect,
    setTargetStatValue,
    selectTestMode,
    resetTest,
    addStatTest,
    showTestResultPanel,
    showStatTestPopupWindow,
    penaltyActive,
    advantageActive
} from "../../redux/slices/characterTotalSlice";
import { rollDiceFunc } from "../../redux/slices/rollDiceSlice";

const CharacterStepsStatTest = () => {
    const dispatch = useDispatch();
    const resultCharStats = useSelector((state) => state.calculateCharStats.resultCharStats);
    const showResultPanel = useSelector((state) => state.characterTotal.characterStatTest.showStatResultPanel);
    const showStatTestPopup = useSelector((state) => state.characterTotal.showStatTestPopup);
    const statTestPopupData = useSelector((state) => state.characterTotal.statTestPopupData);
    const statTest = useSelector((state) => state.characterTotal.characterStatTest);
    const statTestsResultAll = useSelector((state) => state.characterTotal.characterStatTest.statTestsResultAll);
    const rollState = useSelector((state) => state.rolller);
    const penaltyStatus = useSelector((state) => state.characterTotal.characterStatTest.penaltyActive);
    const advantageStatus = useSelector((state) => state.characterTotal.characterStatTest.advantageActive);
    const selectedStat = useSelector((state) => state.characterTotal.characterStatTest.currentStatName);
    
    const currentValueRef = useRef();
    const currentTargetRef = useRef();
    const currentResultRef = useRef();
    const currentStatRef = useRef();
    const testModeRef = useRef();


    const rollStartHandler = () => {
        const targetMode = statTest.testMods.find((item) => item.selected);
        if (!targetMode.name || !currentValueRef.current) return;
        dispatch(rollDiceFunc({
            mode: targetMode.name.replace(/d/, ''),
            modifer: currentValueRef.current.value,
            penalty: penaltyStatus,
            advantage: advantageStatus,
        }));
    };

    const chooseStatHandler = () => {
        dispatch(statTestSelect({statName: currentStatRef.current.value}));
    };

    const clearTargetInput = () => {
        currentTargetRef.current.value = '';
    };

    const targetInputHandler = () => {
        if (!currentTargetRef.current || isNaN(Number(currentTargetRef.current.value))) {
            currentTargetRef.current.value = '';
            return;
        }
        dispatch(setTargetStatValue({targetValue: currentTargetRef.current.value}));
    };

    const chooseTestMode = () => {
        if (testModeRef.current) {
            dispatch(selectTestMode({testMode: testModeRef.current.value}));
        }
    };

    const resetTestHandler = () => {
        dispatch(resetTest());
        currentTargetRef.current.value = 0;
        currentResultRef.current.value = 0;
        const targetStat = resultCharStats.find((item) => item.statParam === 'str');
        currentValueRef.current.value = targetStat.modifer;
        dispatch(statTestSelect({statName: currentStatRef.current.value}));
    };

    const showStatTestPopupHandler = (e, statTest) => {
        const client = e.target.getBoundingClientRect();
        dispatch(showStatTestPopupWindow({statTest: statTest, show: true, client: {x: client.left / 2 - 300, y: 50}}));
    };

    const hideStatTestPopupHandler = (e) => {
        const client = e.target.getBoundingClientRect();
        dispatch(showStatTestPopupWindow({statTest: '', show: false, client: {x: client.left / 2 - 300, y: 50}}));
    };

    const activePenaltyHandler = () => {
        if (!penaltyStatus) {
            dispatch(advantageActive({advantageType: 'stat', advantageValue: false}));
            dispatch(penaltyActive({penaltyType: 'stat', penaltyValue: true}));
            return;
        }
        dispatch(penaltyActive({penaltyType: 'stat', penaltyValue: false}));
    };

    const activeAdvantageHandler = () => {
        if (!advantageStatus) {
            dispatch(penaltyActive({penaltyType: 'stat', penaltyValue: false}));
            dispatch(advantageActive({advantageType: 'stat', advantageValue: true}));
            return;
        }
        dispatch(advantageActive({advantageType: 'stat', advantageValue: false}));
    };

    useEffect(() => {
        currentResultRef.current.value = rollState.rollResult;
        const targetValue = Number(currentTargetRef.current.value);
        const resultValue = Number(currentResultRef.current.value);
        
        if (rollState.criticalMin) {
            dispatch(addStatTest({
                statTest: {
                    name: statTest.currentStatName,
                    rollValue: rollState.baseRoll,
                    value: 1
                },
                type: 'fail',
            }));
            return;
        }
        if (rollState.criticalMax) {
            dispatch(addStatTest({
                statTest: {
                    name: statTest.currentStatName,
                    rollValue: rollState.baseRoll,
                    value: 20
                },
                type: 'pass',
            }));
            return;
        }
        if ((resultValue >= targetValue)) {
            dispatch(addStatTest({
                statTest: {
                    name: statTest.currentStatName,
                    rollValue: rollState.baseRoll,
                    value: resultValue
                },
                type: 'pass',
            }));

            return;
        }

        dispatch(addStatTest({
            statTest: {
                name: statTest.currentStatName,
                rollValue: rollState.baseRoll,
                value: resultValue
            },
            type: 'fail',
        }));

    }, [rollState.rollResult]);

    useEffect(() => {
        if (statTestsResultAll && statTestsResultAll.length > 0) {
            dispatch(showTestResultPanel({panelName: 'stat', value: true}));
            return;
        }
        dispatch(showTestResultPanel({panelName: 'stat', value: false}));
    }, [statTestsResultAll]);
    
    useEffect(() => {
        if (!statTest.currentStatName) return;
        const selectedStat = statTest.currentStatName.toLowerCase();
        const targetStat = resultCharStats.find((item) => item.statParam === selectedStat);
        currentValueRef.current.value = targetStat.modifer;

    }, [statTest.currentStatName]);

    useEffect(() => {
        resetTestHandler();
        dispatch(statTestSelect({statName: currentStatRef.current.value}));
    }, []);
    
    useEffect(() => {
        if (currentStatRef.current) {
            currentStatRef.current.value = selectedStat;
        }
    }, [selectedStat]);

    return (
        <React.Fragment>
            <div className="character-steps-total-stats-test-wrap">
                <div className="character-steps-total-stats-test-title">Stat Tests</div>
                <div className="character-steps-total-stats-select-wrap">
                    <label 
                        className="character-steps-total-stats-select-title" 
                        htmlFor="character-steps-total-stats-select">
                            Choose a stat test:
                    </label>
                    <select
                        ref={currentStatRef} 
                        onChange={chooseStatHandler} 
                        id="character-steps-total-stats-select"
                    >
                        {resultCharStats.map((stat) => {
                            return (
                                <React.Fragment key={Math.random()}>
                                    <option>{stat.statParam.toUpperCase()}</option>
                                </React.Fragment>
                            )
                        })}
                    </select>
                </div>
                <div className="character-steps-total-stat-item-row">
                   <div className="character-steps-total-stat-value">
                        <label htmlFor="character-steps-total-stat-value-base">Modifer</label>
                        <input id="character-steps-total-stat-value-base" type="text" ref={currentValueRef} disabled />
                   </div>
                   <div className="character-steps-total-stat-target">
                        <label htmlFor="character-steps-total-stat-value-target" ref={currentTargetRef}>Target</label>
                        <input 
                            onClick={clearTargetInput}
                            onChange={targetInputHandler}
                            id="character-steps-total-stat-value-target" 
                            type="text" ref={currentTargetRef} 
                        />
                    </div>  
                   <div className="character-steps-total-stat-result">
                        <label htmlFor="character-steps-total-stat-value-result">Result</label>
                        <input
                            disabled
                            id="character-steps-total-stat-value-result" 
                            type="text" 
                            ref={currentResultRef} 
                        />
                    </div>
                </div>
                <div className="character-steps-total-attack-penalty-wrap">
                    <div className="character-steps-total-attack-penalty-item">
                        <span className="attack-penalty-title">Penalty</span>
                        <span 
                            className={
                                penaltyStatus ? 'attack-penalty-chexkbox-checked' : 'attack-penalty-chexkbox'
                            } 
                            onClick={activePenaltyHandler}
                        >
                        </span>
                    </div>

                    <div className="character-steps-total-attack-advantage-item">
                        <span className="attack-penalty-title">Advantage</span>
                        <span
                            className={
                                advantageStatus ? 'attack-advantage-chexkbox-checked' : 'attack-advantage-chexkbox'
                            }
                            onClick={activeAdvantageHandler} 
                        >
                        </span>
                    </div>
                </div>
                <div className="character-steps-total-stats-test-btns-wrap">
                    <div className="character-steps-total-stats-test-btns-row">
                        <div className="character-steps-total-stats-test-btn-item">
                            <button onClick={rollStartHandler}>Start Test</button>
                        </div>
                        <div className="character-steps-total-stats-test-btn-item">
                            <select 
                                onChange={chooseTestMode}  
                                ref={testModeRef}
                            >
                                {statTest.testMods.map((item) => {
                                    return (
                                        <React.Fragment key={Math.random()}>
                                            <option>{item.name}</option>
                                        </React.Fragment>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="character-steps-total-stats-test-btn-item">
                            <button onClick={resetTestHandler}>Reset Test</button>
                        </div>
                    </div>
                </div>
                {showResultPanel ? 
                    <div className="character-steps-total-stats-test-try-count-wrap">
                        {
                            showStatTestPopup ? 
                                <div className="character-steps-total-stats-test-preview-total" style={{visibility: 'visible'}}> 
                                    {`
                                        stat: ${statTestPopupData.stat}
                                        roll: ${statTestPopupData.baseRoll} 
                                        result: ${statTestPopupData.value}
                                    `}
                                </div> 
                            :   <div className="character-steps-total-stats-test-preview-total" style={{visibility: 'hidden'}}> 
                                    
                                </div> 
                        }
                        <div className="character-steps-total-stats-test-try-pass-wrap">
                            <div className="character-steps-total-stats-test-try-pass-title">
                                {`Pass : (${statTestsResultAll.filter((item) => item.checkType === 'pass').length})`}
                            </div>
                            <div className="character-steps-total-stats-test-try-pass-row-wrap">
                                <div  className="character-steps-total-stats-test-try-pass-row">
                                    {statTestsResultAll.filter((item) => item.checkType === 'pass').map((testItem) => {
                                        return (
                                            <React.Fragment key={Math.random()}>
                                                <div
                                                    onMouseOver={(e) => showStatTestPopupHandler(e, testItem)}
                                                    onMouseLeave={(e) => hideStatTestPopupHandler(e)} 
                                                    className="character-steps-total-stats-test-try-pass-item"
                                                >
                                                    <span className="character-steps-total-stats-test-try-pass-icon"></span>
                                                </div>
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="character-steps-total-stats-test-try-fail-wrap">
                            <div className="character-steps-total-stats-test-try-fail-title">
                                {`Fail : (${statTestsResultAll.filter((item) => item.checkType === 'fail').length})`}
                            </div>
                            <div className="character-steps-total-stats-test-try-pass-row-wrap">
                                <div className="character-steps-total-stats-test-try-fail-row">
                                    {statTestsResultAll.filter((item) => item.checkType === 'fail').map((testItem) => {
                                        return (
                                            <React.Fragment key={Math.random()}>
                                                <div
                                                    onMouseOver={(e) => showStatTestPopupHandler(e, testItem)}
                                                    onMouseLeave={(e) => hideStatTestPopupHandler(e)}
                                                    className="character-steps-total-stats-test-try-fail-item"
                                                >
                                                    <span className="character-steps-total-stats-test-try-fail-icon"></span>
                                                </div>
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                            </div>
                        
                        </div>        
                    </div>
                : null}
                
            </div>
        </React.Fragment>
    )
};

export default CharacterStepsStatTest;