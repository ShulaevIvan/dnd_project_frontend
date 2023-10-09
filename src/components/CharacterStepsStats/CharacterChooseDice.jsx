import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { buyStats } from "../../redux/slices/calculateStatsSlice";

const CharacterChooseDice = () => {
    const dispatch = useDispatch();
    const charStats = useSelector((state) => state.calculateCharStats.charStatsTotal);
    const currentPoints = useSelector((state) => state.calculateCharStats.currentStatBuyPoints);

    useEffect(() => {
        // console.log(currentPoints)
    }, [currentPoints]);

    const plusHandler = (e, statObj) => {
        dispatch(buyStats({data: statObj, plus: true}));
    };

    const minHandler = (e, statObj) => {
        dispatch(buyStats({data: statObj, plus: false}));
    }

    return (
        <React.Fragment>
            <div className="character-steps-dice-wrap">
                <div className="character-steps-dice-title">
                    <h4>Доступные характеристики</h4>
                </div>
                            
                <div className="character-steps-dice-row">
                    {charStats ? charStats.map((item) => {
                        return (
                            <React.Fragment>
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
                                            <span className="character-steps-dice-value">{item.value} +</span>
                                            <span className="character-steps-dice-value-bonuce">{item.spend}</span>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    }) : null}
                </div>

                <div className="character-steps-dice-apply-wrap">
                    <div className="character-steps-dice-apply-btn">
                        {/* <button>Запомнить</button> */}
                        {27 - currentPoints}
                    </div>
                </div>         
            </div>
        </React.Fragment>
    )
};


export default CharacterChooseDice;