import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { generateStatsRoll, generateStatModif, backupCharStats, restoreCharStats } from "../../redux/slices/characterStepsSlice";

const DiceRollModule = () => {
    const dispatch = useDispatch();
    const rollCounter = useSelector((state) => state.characterSteps.statsRollCount);
    const totalStatsRoll = useSelector((state) => state.characterSteps.statsTotalRoll);
    const rollBackCharStats = useSelector((state) => state.characterSteps.resultCharStatsBackup);

    const rollHandler = (e, count, dice) => {
        dispatch(generateStatsRoll({count: count, dice: dice}));
    };
    
    const saveStatsHandler = () => {
        if (rollBackCharStats.length === 0) {
            dispatch(backupCharStats());
            return;
        }
        dispatch(restoreCharStats());
        
    };

    useEffect(() => {
        dispatch(generateStatModif(totalStatsRoll));
    }, [totalStatsRoll]);

    return (
        <React.Fragment>
            <div className="character-steps-dice-btns-wrap">
                <div className="character-steps-dice-btn-roll"><button onClick={(e, count, dice) => rollHandler(e, count=4, dice=6)}>Бросить</button></div>
                <div className="character-steps-dice-counter">Всего бросков: {rollCounter}</div>
                <div className="character-steps-dice-btn-roll-save">
                    <button onClick={saveStatsHandler}>{rollBackCharStats.length === 0 ? 'backup' : 'restore'}</button>
                </div>
            </div>
        </React.Fragment>
    )
};


export default DiceRollModule;