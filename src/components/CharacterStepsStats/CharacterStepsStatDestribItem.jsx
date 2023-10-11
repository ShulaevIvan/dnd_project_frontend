import React from "react";
import { useRef, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { spendStatFormRoll, recalcModifers, addCharStats, disableSelectStat } from "../../redux/slices/calculateStatsSlice";

const CharacterStepsStatsDestribItem = (props) => {
    const charResultStats = useSelector((state) => state.calculateCharStats.resultCharStats);
    const statRaceBonuce = useSelector((state) => state.characterSteps.characterSum.raceData.race_bonuces);
    const disabledSelectors = useSelector((state) => state.calculateCharStats.disableStatSelectors);

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
            statParam: selectStatRef.current.value.toLowerCase(),
        };

        Object.entries(statRaceBonuce).forEach((statArr) => {
            if (convertStats[statArr[0]] === statToStateObj.statParam && statArr[1] > 0) statToStateObj.value += statArr[1];
        });

        dispatch(spendStatFormRoll(statToStateObj));
        dispatch(recalcModifers());
        dispatch(addCharStats(statToStateObj));
        dispatch(disableSelectStat({id: props.id, stat: statToStateObj.statParam}))
    };
    
    useEffect(() => {
        const selectedParam = charResultStats.find((item) => item.id === props.id);
        if (selectedParam) {
            selectStatRef.current.value = selectedParam.statParam;
        }
    });

    return (
        <React.Fragment>
            <div className="character-steps-result-dice-item">   
                <select disabled={disabledSelectors.find((item) => item.id === props.id)} ref={selectStatRef} className="stat-select" onChange={(e) => chooseStatHandler(e, props)}>
                    <option>{selectStatRef.current ? selectStatRef.current.value : null}</option>
                    <option disabled={disabledSelectors.find((item) => item.stat === 'STR')}>STR</option>
                    <option disabled={disabledSelectors.find((item) => item.stat === 'DEX')}>DEX</option>
                    <option disabled={disabledSelectors.find((item) => item.stat === 'CON')}>CON</option>
                    <option disabled={disabledSelectors.find((item) => item.stat === 'INT')}>INT</option>
                    <option disabled={disabledSelectors.find((item) => item.stat === 'WIS')}>WIS</option>
                    <option disabled={disabledSelectors.find((item) => item.stat === 'CHA')}>CHA</option>
                </select>
            </div>
        </React.Fragment>
    )
};

export default CharacterStepsStatsDestribItem;