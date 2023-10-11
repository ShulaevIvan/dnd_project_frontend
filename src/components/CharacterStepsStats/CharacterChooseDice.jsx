import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { buyStats, recalcModifers, addCharStats, spendStatFormRoll, addRaceBonuces} from "../../redux/slices/calculateStatsSlice";

const CharacterChooseDice = () => {
    const [minMaxState, setMinMaxState] = useState({
        value: 0,
        modifer: 0, 
        statParam: ''
    });
    const dispatch = useDispatch();
    const charStats = useSelector((state) => state.calculateCharStats.charStatsTotal);
    const maxStatPoints = useSelector((state) => state.calculateCharStats.statBuyPoints);
    const spendedStatPoints = useSelector((state) => state.calculateCharStats.currentStatBuyPoints);
    const statRaceBonuce = useSelector((state) => state.characterSteps.characterSum.raceData.race_bonuces);
   

    const plusHandler = (e, statObj) => {
        e.stopPropagation();
        setMinMaxState(prevState => ({
            ...prevState,
            ...statObj,
            value: prevState.value = statObj.value,
            statParam: prevState.statParam = statObj.name,
            opType: prevState.opType = true,
            raceBonuces: prevState.raceBonuces = statRaceBonuce,
        }));
    };

    const minHandler = (e, statObj) => {
        e.stopPropagation();

        setMinMaxState(prevState => ({
            ...prevState,
            ...statObj,
            statParam: prevState.statParam = statObj.name,
            opType: prevState.opType = false,
        }));
    };

    useEffect(() => {
        if (minMaxState.statParam ) {
            dispatch(spendStatFormRoll({...minMaxState}))
            dispatch(buyStats({data: minMaxState, plus: minMaxState.opType}));
            dispatch(addCharStats(minMaxState));
            dispatch(recalcModifers());
        }
      
    }, [minMaxState]);

    // useEffect(() => {
    //     console.log(spendedStatPoints)
    //     const convertStats = [
    //         {name: 'str', value: statRaceBonuce.str_bonuce,},
    //         {name: 'dex', value: statRaceBonuce.dex_bonuce,},
    //         {name: 'con', value: statRaceBonuce.con_bonuce,},
    //         {name: 'int', value: statRaceBonuce.int_bonuce,},
    //         {name: 'wis', value: statRaceBonuce.wis_bonuce,},
    //         {name: 'cha', value: statRaceBonuce.cha_bonuce,},
    //     ]
    //     dispatch(addRaceBonuces(convertStats))

    // }, [spendedStatPoints])

    return (
        <React.Fragment>
            <div className="character-steps-dice-wrap">
                <div className="character-steps-dice-title">
                    <h4>Доступные характеристики</h4>
                </div>
                            
                <div className="character-steps-dice-row">
                    {charStats ? charStats.map((item) => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <div className="character-steps-hand-dice-item">
                                    <div className="character-steps-hand-dice-title">
                                        <h5>{item.name.toUpperCase()}</h5>
                                    </div>

                                    <div className="character-steps-dice-item">
                                        <span className="dice-value">{item.value}</span>
                                        <div className="dice-value-plus" onClick={(e) => plusHandler(e, item)}>+</div>
                                        <div className="dice-value-min" onClick={(e) => minHandler(e, item)}>-</div>
                                        <div className="dice-value-modif">{item.modifer}</div>
                                    </div>

                                    <div className="character-steps-dice-sum-wrap">
                                        <div className="character-steps-dice-sum">
                                            <span className="character-steps-dice-value-bonuce">{item.spend > 0 ? `-${item.spend}` : 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    }) : null}
                </div>

                <div className="character-steps-dice-max-points-wrap">
                        <span className="character-steps-dice-max-points-title">Всего очков:</span>
                        <span className="character-steps-dice-max-points-value">{maxStatPoints - spendedStatPoints}</span>
                </div>

                <div className="character-steps-dice-apply-wrap">
                    <div className="character-steps-dice-apply-btn">
                        <button>Запомнить</button>
                    </div>
                </div>         
            </div>
        </React.Fragment>
    )
};


export default CharacterChooseDice;