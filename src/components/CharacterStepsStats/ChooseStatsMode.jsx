import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { statSwitcherMode } from "../../redux/slices/characterStepsSlice";
import { resetCharStats } from "../../redux/slices/calculateStatsSlice";


const ChooseStatsMode = () => {
    const dispatch = useDispatch();
    const switcherState = useSelector((state) => state.characterSteps.statModeSwitcher);

    const switcherHandler = (param) => {
        if (switcherState) {
            dispatch(statSwitcherMode(-1));
            return;
        }

        dispatch(statSwitcherMode(1));
    };
    
    useEffect(() => {
        dispatch(resetCharStats());
    }, [switcherState])

    return (
        <React.Fragment>
            <div className="character-steps-choose-wrap">
                <h4>Выберите генерацию или покупку характеристик</h4>
                    <div className="character-steps-switcher-wrap">
                        <div className="character-steps-switcher-row">
                            <div className="character-steps-switcher-dice">Режим бросков</div>
                                <div className="character-steps-switcher">
                                    <div onClick={switcherHandler} className={switcherState ? 'switch-btn switch-on ' : 'switch-btn'}></div>
                                    {/* <div className="switch-btn switch-on"></div> */}
                            </div>
                            <div className="character-steps-switcher-buy">Режим покупки</div>
                        </div>
                            
                    </div>
            </div>
        </React.Fragment>
    )
};

export default ChooseStatsMode;