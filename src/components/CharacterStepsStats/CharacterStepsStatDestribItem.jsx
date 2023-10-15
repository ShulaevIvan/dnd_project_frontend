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
        if (statObj.value === 0) return;

        const convertStats = {
            'str_bonuce': 'str',
            'dex_bonuce': 'dex',
            'con_bonuce': 'con',
            'int_bonuce': 'int',
            'wis_bonuce': 'wis',
            'cha_bonuce': 'cha',
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

    const checkDisableSelect = (select) => {
        return disabledSelectors.find((item) => item.stat === select);
    };
    
    useEffect(() => {
        const selectedParam = charResultStats.find((item) => item.id === props.id);
        if (selectedParam) {
            selectStatRef.current.value = selectedParam.statParam.toUpperCase();
        }
    }, [selectStatRef]);

    return (
        <React.Fragment>
            <div className="character-steps-result-dice-item">   
                <select disabled={
                    disabledSelectors.find((item) => item.id === props.id)} 
                    ref={selectStatRef} 
                    className="stat-select" 
                    onChange={(e) => chooseStatHandler(e, props)
                }>
                    <option>{selectStatRef.current ? selectStatRef.current.value : null}</option>
                    <option disabled={checkDisableSelect('str')}>STR</option>
                    <option disabled={checkDisableSelect('dex')}>DEX</option>
                    <option disabled={checkDisableSelect('con')}>CON</option>
                    <option disabled={checkDisableSelect('int')}>INT</option>
                    <option disabled={checkDisableSelect('wis')}>WIS</option>
                    <option disabled={checkDisableSelect('cha')}>CHA</option>
                </select>
            </div>
        </React.Fragment>
    )
};

export default CharacterStepsStatsDestribItem;