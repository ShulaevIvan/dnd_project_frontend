import React from "react";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
    addAllAbilitiesTest, 
    selectTestAbility, 
    showTestResultPanel, 
    addAbilityTest, 
    resetAbilityTest,
    showAbilityTestPopup,
    penaltyActive,
    advantageActive
} from "../../redux/slices/characterTotalSlice";
import { rollDiceAbility } from "../../redux/slices/rollDiceSlice";

const CharacterStepsAbilityTest = () => {
    const dispatch = useDispatch();
    const charAbilities = useSelector((state) => state.calculateAbilites.resultCharAbilities);
    const allAbilitiesSelected = useSelector((state) => state.characterTotal.allAbilitiesTest);
    const abilityTestState = useSelector((state) => state.characterTotal.characterAbilityTest);
    const abilityResultPanel = useSelector((state) => state.characterTotal.characterAbilityTest.showAbilityResultPanel);
    const rollState = useSelector((state) => state.rolller.abilityTestRoll);
    const abilityTestPopup = useSelector((state) => state.characterTotal.characterAbilityTest.showTestResutPopup);
    const abilityTestPopupData = useSelector((state) => state.characterTotal.characterAbilityTest.testAbilityPopup);
    const penaltyStatus = useSelector((state) => state.characterTotal.characterAbilityTest.penaltyActive);
    const advantageStatus = useSelector((state) => state.characterTotal.characterAbilityTest.advantageActive);
    
    const abilitySelectedRef = useRef(null);
    const abilityTestModifer = useRef(null);
    const abilityTestTarget = useRef(null);
    const abilityTestValue = useRef(null);

    const selectAbilityHandler = () => {
        if (!abilitySelectedRef.current) return;
        dispatch(selectTestAbility({abilityName: abilitySelectedRef.current.value, selected: true}));
    };

    const checkSelectedAbility = (abilityName) => {
        const selectedAbility = allAbilitiesSelected.find((item) => item.name === abilityName && item.selected);
        if (!selectedAbility) return false;

        abilityTestModifer.current.value = selectedAbility.value;
        return selectedAbility;
    };

    const clearTargetInput = () => {
        abilityTestTarget.current.value = '';
    };

    const targetAbilityHandler = () => {
        if (!abilityTestTarget.current || isNaN(Number(abilityTestTarget.current.value))) {
            abilityTestTarget.current.value = '';
            return;
        }
    };

    const resetAbilityTestHandler = () => {
        abilityTestTarget.current.value = 0;
        abilityTestValue.current.value = 0;
        dispatch(selectTestAbility({abilityName: 'Атлетика', selected: true}));
        dispatch(resetAbilityTest());
    };

    const startAbilityTestHandler = () => {
        console.log(penaltyStatus)
        console.log(advantageStatus)
        dispatch(rollDiceAbility({
            modifer: abilityTestModifer.current.value,
            penalty: penaltyStatus,
            advantage: advantageStatus
        }));
        dispatch(showTestResultPanel({panelName: 'ability', value: true}));

        const targetValue = abilityTestTarget.current.value;
        let testAbility = {
            name: abilitySelectedRef.current.value,
            rollValue: rollState.baseRoll,
            value: rollState.rollResult
        };

        if (rollState.criticalMax) {
            testAbility = {
                name: abilitySelectedRef.current.value,
                rollValue: rollState.baseRoll,
                value: 20
            }
            dispatch(addAbilityTest({abilityTest: testAbility, type: 'pass'}));
            return;
        }
        if (rollState.rollResult >= targetValue) {
            dispatch(addAbilityTest({abilityTest: testAbility, type: 'pass'}));
            return;
        }
        if (rollState.criticalMin) {
            testAbility = {
                name: abilitySelectedRef.current.value,
                rollValue: rollState.baseRoll,
                value: 1
            }
            dispatch(addAbilityTest({abilityTest: testAbility, type: 'fail'}));
            return;
        }
        dispatch(addAbilityTest({abilityTest: testAbility, type: 'fail'}));
    };

    const abilityTestResultHandler = (ability) => {
        dispatch(showAbilityTestPopup({abilityTest: ability, show: true}));
    };

    const abilityTestResultLeaveHandler = (ability) => {
        dispatch(showAbilityTestPopup({abilityTest: ability, show: false}));
    };

    const activePenaltyHandler = () => {
        if (penaltyStatus) {
            dispatch(penaltyActive({penaltyType: 'ability', penaltyValue: false}));
            return;
        }
        dispatch(advantageActive({advantageType : 'ability', advantageValue : false}));
        dispatch(penaltyActive({penaltyType: 'ability', penaltyValue: true})); 
    };

    const activeAdvantageHandler = () => {
        if (advantageStatus) {
            dispatch(advantageActive({advantageType : 'ability', advantageValue : false}));
            return;
        }
        dispatch(penaltyActive({penaltyType: 'ability', penaltyValue: false}));
        dispatch(advantageActive({advantageType : 'ability', advantageValue : true}));
    }

    useEffect(() => {
        dispatch(addAllAbilitiesTest({abilities: charAbilities}));
        dispatch(showTestResultPanel({panelName: 'ability', value: false}));
        resetAbilityTestHandler();

    }, []);

    useEffect(() => {
        abilityTestValue.current.value = rollState.rollResult;
    }, [rollState.rollResult]);

    return (
        <React.Fragment>
            <div className="character-steps-total-abilities-test-wrap">
                <div className="character-steps-total-abilities-test-title">Abilities Tests</div>
                <div className="character-steps-total-abilities-select-wrap">
                    <div className="character-steps-total-abilities-item-row">
                        <label className="character-steps-total-abilities-select-title" htmlFor="character-steps-total-abilities-select">Choose a ability test:</label>
                        <select
                            id="character-steps-total-abilities-select"
                            onChange={selectAbilityHandler}
                            ref={abilitySelectedRef}
                        >
                            {allAbilitiesSelected ? allAbilitiesSelected.map((ability) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <option selected={checkSelectedAbility(ability.name)}>{ability.name}</option>
                                    </React.Fragment>
                                )
                            }): null}
                        </select>
                    </div>
                    <div className="character-steps-total-ability-item-row">
                        <div className="character-steps-total-abilitiy-value">
                            <label htmlFor="character-steps-total-ability-value-base">Modifer</label>
                            <input ref={abilityTestModifer} id="character-steps-total-ability-value-base" type="text" disabled />
                        </div>
                        <div className="character-steps-total-abilitiy-target">
                            <label htmlFor="character-steps-total-ability-value-base">Target</label>
                            <input
                                onClick={clearTargetInput}
                                onChange={targetAbilityHandler} 
                                ref={abilityTestTarget} 
                                id="character-steps-total-ability-value-base" type="text" 
                            />
                        </div>
                        <div className="character-steps-total-abilitiy-value">
                            <label htmlFor="character-steps-total-ability-value-base">Value</label>
                            <input ref={abilityTestValue} id="character-steps-total-ability-value-base" type="text" disabled />
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
                        <div className="character-steps-total-abilities-btns-row">
                            <div className="character-steps-total-abilities-btn-item">
                                <button onClick={startAbilityTestHandler}>Start Test</button>
                            </div>
                            <div className="character-steps-total-abilities-btn-item">

                            </div>
                            <div className="character-steps-total-abilities-btn-item">
                                <button onClick={resetAbilityTestHandler}>Reset Test</button>
                            </div>
                            </div>
                        </div>
                </div>
                
                {abilityResultPanel ? 
                    <div className="character-steps-total-stats-test-try-count-wrap">
                        {
                            abilityTestPopup ? 
                                <div className="character-steps-total-stats-test-preview-total" style={{visibility: 'visible'}}> 
                                    {`
                                        ability: ${abilityTestPopupData.name}
                                        roll: ${abilityTestPopupData.rollValue} 
                                        result: ${abilityTestPopupData.value} 
                                    `}
                                </div> 
                            :   <div className="character-steps-total-stats-test-preview-total" style={{visibility: 'hidden'}}> 
                                    
                                </div> 
                        }
                        <div className="character-steps-total-stats-test-try-pass-wrap">
                            <div className="character-steps-total-stats-test-try-pass-title">
                                {`Pass : (${abilityTestState.allAbilityTests.filter((item) => item.checkType === 'pass').length})`}
                            </div>
                            <div className="character-steps-total-stats-test-try-pass-row-wrap">
                                <div  className="character-steps-total-stats-test-try-pass-row">
                                    {abilityTestState.allAbilityTests.filter((item) => item.checkType === 'pass').map((testItem) => {
                                        return (
                                            <React.Fragment key={Math.random()}>
                                                <div
                                                    onMouseOver={(e) => abilityTestResultHandler(testItem)}
                                                    onMouseLeave={(e) => abilityTestResultLeaveHandler(testItem)} 
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
                                {`Fail : (${abilityTestState.allAbilityTests.filter((item) => item.checkType === 'fail').length})`}
                            </div>
                            <div className="character-steps-total-stats-test-try-pass-row-wrap">
                                <div className="character-steps-total-stats-test-try-fail-row">
                                    {abilityTestState.allAbilityTests.filter((item) => item.checkType === 'fail').map((testItem) => {
                                        return (
                                            <React.Fragment key={Math.random()}>
                                                <div
                                                   onMouseOver={(e) => abilityTestResultHandler(testItem)}
                                                   onMouseLeave={(e) => abilityTestResultLeaveHandler(testItem)}
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

export default CharacterStepsAbilityTest;