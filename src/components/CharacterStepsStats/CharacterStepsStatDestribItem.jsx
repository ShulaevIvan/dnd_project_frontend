import React from "react";
import { useState, useRef, useEffect } from "react";

const CharacterStepsStatsDestribItem = () => {

    const [statSelect, setStatSelect] = useState({
        strRef: useRef(null),
        dexRef: useRef(null),
        conRef: useRef(null),
        intRef: useRef(null),
        wisRef: useRef(null),
        chaRef: useRef(null),
        currentStat: {stat: undefined,}
    });

    const selectToStatHandler = (e, stat) => {

    }

    useEffect(() => {
        console.log(statSelect.strRef.current.value)
    }, [statSelect])

    return (
        <React.Fragment>
            <div className="character-steps-result-dice-item">   
                <select className="stat-select" onChange={selectToStatHandler}>
                    <option value="">to ...</option>
                    <option ref={statSelect.strRef}>STR</option>
                    <option ref={statSelect.dexRef}>DEX</option>
                    <option ref={statSelect.conRef}>CON</option>
                    <option ref={statSelect.int}>INT</option>
                    <option ref={statSelect.wis}>WIS</option>
                    <option ref={statSelect.chaRef}>CHA</option>
                </select>
            </div>
        </React.Fragment>
    )
};

export default CharacterStepsStatsDestribItem;