import React from "react";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAllAbilitiesTest, selectTestAbility } from "../../redux/slices/characterTotalSlice";
import { rollDiceAbility } from "../../redux/slices/rollDiceSlice";

const CharacterStepsAbilityTest = () => {
    const dispatch = useDispatch();
    const charAbilities = useSelector((state) => state.calculateAbilites.resultCharAbilities);
    const allAbilitiesSelected = useSelector((state) => state.characterTotal.allAbilitiesTest);
    const abilityTestState = useSelector((state) => state.characterTotal.characterAbilityTest);
    const rollState = useSelector((state) => state.rolller.abilityTestRoll);
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
        dispatch(selectTestAbility({abilityName: 'Атлетика', selected: true}))
    };

    const startAbilityTestHandler = () => {
        dispatch(rollDiceAbility({
            modifer: abilityTestModifer.current.value,
        }));
    };

    useEffect(() => {
        dispatch(addAllAbilitiesTest({abilities: charAbilities}));
        resetAbilityTestHandler();

    }, []);

    useEffect(() => {
        abilityTestValue.current.value = rollState.rollResult;
    }, [rollState.rollResult])

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
                            }) : null}
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
            </div>
        </React.Fragment>
    )
};

export default CharacterStepsAbilityTest;