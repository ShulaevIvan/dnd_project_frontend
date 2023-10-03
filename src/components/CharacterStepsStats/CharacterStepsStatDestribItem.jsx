import React from "react";


const CharacterStepsStatsDestribItem = () => {
    return (
        <React.Fragment>
            <div className="character-steps-result-dice-item">   
                <select className="stat-select">
                    <option value="">to ...</option>
                    <option value="">STR</option>
                    <option value="">DEX</option>
                    <option value="">CON</option>
                    <option value="">INT</option>
                    <option value="">WIS</option>
                    <option value="">CHA</option>
                </select>
            </div>
        </React.Fragment>
    )
};

export default CharacterStepsStatsDestribItem;