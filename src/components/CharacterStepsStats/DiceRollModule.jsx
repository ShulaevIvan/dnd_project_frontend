import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    generateStatsRoll, 
    generateStatsModif, 
    backupCharStats, 
    restoreCharStats,
    resetCharStats,
    blockIncreaseBtns,
} from '../../redux/slices/calculateStatsSlice';

const DiceRollModule = () => {
    const dispatch = useDispatch();
    const rollCounter = useSelector((state) => state.calculateCharStats.statsRollCount);
    const totalStatsRoll = useSelector((state) => state.calculateCharStats.statsTotalRoll);
    const rollBackCharStats = useSelector((state) => state.calculateCharStats.resultCharStatsBackup);
    const blockBackupResotre = useSelector((state) => state.calculateCharStats.minMaxBtnsBlock);
    const resultCharStats = useSelector((state) => state.calculateCharStats.resultCharStats);
    

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
        dispatch(generateStatsModif(totalStatsRoll));
    }, [totalStatsRoll]);

    useEffect(() => {
        if (resultCharStats.length === 6) {
            dispatch(blockIncreaseBtns(true))
        }
    }, [resultCharStats])

    useEffect(() => {
        dispatch(resetCharStats());
    }, []);

    return (
        <React.Fragment>
            <div className="character-steps-dice-btns-wrap">
                <div className="character-steps-dice-btn-roll"><button onClick={(e, count, dice) => rollHandler(e, count=4, dice=6)}>Бросить</button></div>
                <div className="character-steps-dice-counter">Всего бросков: {rollCounter}</div>
                <div className="character-steps-dice-btn-roll-save">
                    <button disabled={blockBackupResotre} onClick={saveStatsHandler}>{rollBackCharStats.length === 0 ? 'backup' : 'restore'}</button>
                </div>
            </div>
        </React.Fragment>
    )
};


export default DiceRollModule;