import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setStatsTotalRoll, resetStatsTotalRoll } from "../../redux/slices/characterStepsSlice";

const DiceRollModule = () => {
    const dispatch = useDispatch();
    const totalRoll = useSelector((state) => state.characterSteps.characterSum.statsTotalRoll);
    const rollCounter = useSelector((state) => state.characterSteps.statsRollCount);

    const rollHandler = (e, count, dice) => {
        dispatch(setStatsTotalRoll({count: count, dice: dice}));
    };
    

    const reset = () => {
        dispatch(resetStatsTotalRoll());
    }

    return (
        <React.Fragment>
            <div className="character-steps-dice-btns-wrap">
                <div className="character-steps-dice-btn-roll"><button onClick={(e, count, dice) => rollHandler(e, count=4, dice=6)}>Бросить</button></div>
                <div className="character-steps-dice-counter">Всего бросков: {rollCounter}</div>
                <div className="character-steps-dice-btn-roll-save"><button onClick={reset}>Запомнить</button></div>
            </div>
        </React.Fragment>
    )
};


export default DiceRollModule;