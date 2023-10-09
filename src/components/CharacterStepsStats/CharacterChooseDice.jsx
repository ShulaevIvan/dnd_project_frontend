import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { buyStats, resetCharStats } from "../../redux/slices/calculateStatsSlice";

const CharacterChooseDice = () => {
    const dispatch = useDispatch();
    const charStats = useSelector((state) => state.calculateCharStats.charStatsTotal);
    const maxStatPoints = useSelector((state) => state.calculateCharStats.statBuyPoints);
    const spendedStatPoints = useSelector((state) => state.calculateCharStats.currentStatBuyPoints);

    const plusHandler = (e, statObj) => {
        dispatch(buyStats({data: statObj, plus: true}));
    };

    const minHandler = (e, statObj) => {
        dispatch(buyStats({data: statObj, plus: false}));
    }

    useEffect(() => {
        dispatch(resetCharStats());
    }, [])

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
                                        <div className="dice-value-modif">+0</div>
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