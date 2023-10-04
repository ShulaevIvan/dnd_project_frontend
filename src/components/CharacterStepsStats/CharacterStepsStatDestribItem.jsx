import React from "react";
import { useDispatch } from "react-redux";
import { spendStatFormRoll } from "../../redux/slices/characterStepsSlice";
const CharacterStepsStatsDestribItem = (props) => {
    const dispatch = useDispatch();

    const selectToStatHandler = (e, statObj) => {
        const statToStateObj = {
            ...statObj,
            statParam: e.target.value
        }
        dispatch(spendStatFormRoll(statToStateObj));
    };

    return (
        <React.Fragment>
            <div className="character-steps-result-dice-item">   
                <select className="stat-select" onChange={(e) => selectToStatHandler(e, props)}>
                    <option value="">to ...</option>
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