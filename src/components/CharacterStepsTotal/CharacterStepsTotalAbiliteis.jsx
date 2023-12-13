import React from "react";
import { useSelector } from "react-redux";

const CharacterStepsTotalAbilities = () => {
    const charAbilities  = useSelector((state) => state.calculateAbilites.resultCharAbilities);
    const allStats = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

    const getAbilitiesByType = (statParam) => {
        const targetAbilites = charAbilities.filter((item) => item.abilityType === statParam.toLowerCase())
        return targetAbilites;
    };

    return (
        <React.Fragment>
            <div className="character-total-abilities-wrap">
                    <div className="character-total-abilities-title">Abilities</div>
                    <div className="character-total-abilities-row">
                            {allStats.map((stat) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <div className="character-total-abilites-stat-wrap">
                                            <div className="character-total-base-stat-ability">{stat}</div>
                                            {getAbilitiesByType(stat).map((item) => {
                                                return (
                                                    <React.Fragment key={Math.random()}>
                                                        <div className="character-total-stat-ability">
                                                            <div className="character-total-stat-ability-name">{item.name} :</div>
                                                        <   div className="character-total-stat-ability-value">{item.value}</div>
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                    </div>
                </div>
        </React.Fragment>
    )
};

export default CharacterStepsTotalAbilities;