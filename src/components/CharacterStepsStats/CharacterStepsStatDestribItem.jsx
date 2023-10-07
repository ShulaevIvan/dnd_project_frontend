import React from "react";
import { useRef, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { spendStatFormRoll } from "../../redux/slices/calculateStatsSlice";

const CharacterStepsStatsDestribItem = (props) => {
    const charResultStats = useSelector((state) => state.calculateCharStats.resultCharStats);
    const dispatch = useDispatch();
    const selectStatRef = useRef(null);

    const chooseStatHandler = (e, statObj) => {
        const statToStateObj = {
            ...statObj,
            statParam: selectStatRef.current.value
        }
        dispatch(spendStatFormRoll(statToStateObj));
    };
    
    useEffect(() => {
        const selectedParam = charResultStats.find((item) => item.id === props.id);
        if (selectedParam) selectStatRef.current.value = selectedParam.statParam;
    });

    return (
        <React.Fragment>
            <div className="character-steps-result-dice-item">   
                <select ref={selectStatRef} className="stat-select" onChange={(e) => chooseStatHandler(e, props)}>
                    <option>{selectStatRef.current ? selectStatRef.current.value : null}</option>
                    <option>STR</option>
                    <option>DEX</option>
                    <option>CON</option>
                    <option>INT</option>
                    <option>WIS</option>
                    <option>CHA</option>
                </select>
            </div>
        </React.Fragment>
    )
};

export default CharacterStepsStatsDestribItem;