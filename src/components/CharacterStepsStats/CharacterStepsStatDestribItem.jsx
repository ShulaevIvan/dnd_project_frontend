import React from "react";
import { useRef, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { spendStatFormRoll, recalcModifers } from "../../redux/slices/calculateStatsSlice";

const CharacterStepsStatsDestribItem = (props) => {
    const charResultStats = useSelector((state) => state.calculateCharStats.resultCharStats);
    const statRaceBonuce = useSelector((state) => state.characterSteps.characterSum.raceData.race_bonuces);
    const dispatch = useDispatch();
    const selectStatRef = useRef(null);

    const chooseStatHandler = (e, statObj) => {
        const convertStats = {
            'str_bonuce': 'STR',
            'dex_bonuce': 'DEX',
            'con_bonuce': 'CON',
            'int_bonuce': 'INT',
            'wis_bonuce': 'WIS',
            'cha_bonuce': 'CHA',
        };
        
        const statToStateObj = {
            ...statObj,
            statParam: selectStatRef.current.value
        };
        Object.entries(statRaceBonuce).forEach((statArr) => {
            if (convertStats[statArr[0]] === statToStateObj.statParam && statArr[1] > 0) statToStateObj.value += statArr[1];
        });

        dispatch(spendStatFormRoll(statToStateObj));
        dispatch(recalcModifers());
    };
    
    useEffect(() => {
        const selectedParam = charResultStats.find((item) => item.id === props.id);
        if (selectedParam) selectStatRef.current.value = selectedParam.statParam;
    });

    useEffect(() => {
        console.log(charResultStats)
    }, [charResultStats]);

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