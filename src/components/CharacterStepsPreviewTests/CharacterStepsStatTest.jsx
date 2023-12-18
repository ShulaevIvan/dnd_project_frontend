import React from "react";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { statTestSelect,  setTargetStatValue, selectTestMode, resetTest, addStatTest, showStatResultPanel } from "../../redux/slices/characterTotalSlice";
import { rollDiceFunc } from "../../redux/slices/rollDiceSlice";

const CharacterStepsStatTest = () => {
    const dispatch = useDispatch();
    const resultCharStats = useSelector((state) => state.calculateCharStats.resultCharStats);
    const showResultPanel = useSelector((state) => state.characterTotal.characterStatTest.showStatResultPanel);
    const statTest = useSelector((state) => state.characterTotal.characterStatTest);
    const statTestsResultAll = useSelector((state) => state.characterTotal.characterStatTest.statTestsResultAll);
    const rollState = useSelector((state) => state.rolller);
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
        }));
    };

    const chooseStatHandler = () => {
        dispatch(statTestSelect({statName: currentStatRef.current.value}))
    };

    const checkSelectedStat = (checkStat, statModifer) => {
        if (statTest.currentStatName && statTest.currentStatName === checkStat.toUpperCase()) {
            currentValueRef.current.value = statModifer;
            return true;
        }
        return false;
    };

    const clearTargetInput = () => {
        currentTargetRef.current.value = '';
    };

    const targetInputHandler = () => {
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
    };

    useEffect(() => {
        currentResultRef.current.value = rollState.rollResult;
        const targetValue = Number(currentTargetRef.current.value);
        const resultValue = Number(currentResultRef.current.value);
        if (resultValue >= targetValue) {
            dispatch(addStatTest({
                statTest: {name: statTest.currentStatName, value: resultValue},
                type: 'pass',
            }));

            return;
        }
        dispatch(addStatTest({
            statTest: {name: statTest.currentStatName, value: resultValue},
            type: 'fail',
        }));
    }, [rollState.rollResult]);

    useEffect(() => {
        console.log(statTestsResultAll.length)
        if (statTestsResultAll && statTestsResultAll.length > 0) {
            dispatch(showStatResultPanel(true));
            return;
        }
        dispatch(showStatResultPanel(false));
    }, [statTestsResultAll]);
    
    useEffect(() => {
        if (!statTest.currentStatName) return;
        const selectedStat = statTest.currentStatName.toLowerCase();
        const targetStat = resultCharStats.find((item) => item.statParam === selectedStat);
        currentValueRef.current.value = targetStat.modifer;

    }, [statTest.currentStatName]);

    useEffect(() => {
        resetTestHandler();
    }, []);

    return (
        <React.Fragment>
            <div className="character-steps-total-stats-test-wrap">
                <div className="character-steps-total-stats-test-title">Stat Tests</div>
                <div className="character-steps-total-stats-select-wrap">
                    <label 
                        className="character-steps-total-stats-select-title" 
                        for="character-steps-total-stats-select">
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
                                    <option selected={checkSelectedStat(stat.statParam, stat.modifer)}>{stat.statParam.toUpperCase()}</option>
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
                                            <option
                                                selected={item.selected}
                                            >{item.name}</option>
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
                {console.log(showResultPanel)}
                {showResultPanel ? 
                    <div className="character-steps-total-stats-test-try-count-wrap">
                        <div className="character-steps-total-stats-test-try-pass-wrap">
                            <div className="character-steps-total-stats-test-try-pass-title">
                                {`Pass : (${statTestsResultAll.filter((item) => item.checkType === 'pass').length})`}
                            </div>
                            <div className="character-steps-total-stats-test-try-pass-row-wrap">
                                <div  className="character-steps-total-stats-test-try-pass-row">
                                    {statTestsResultAll.filter((item) => item.checkType === 'pass').map((testItem) => {
                                        return (
                                            <React.Fragment key={Math.random()}>
                                                <div className="character-steps-total-stats-test-try-pass-item">
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
                                                <div className="character-steps-total-stats-test-try-fail-item">
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