import React from "react";
import { useSelector } from "react-redux";

const CharacterStepsSpellsPreview = () => {
    const characterLevel = useSelector((state) => state.characterSteps.characterSum.charLevel);
    const classSkills = useSelector((state) => state.characterSteps.characterSum.classData.classSkills).filter((item) => item.levelRequired === characterLevel);
    const backgroundSkills = useSelector((state) => state.characterSteps.characterSum.backgroundActive[0].instrumentMastery);
    const raceSkills = useSelector((state) => state.characterSteps.characterSum.raceData.skills);
    const selectedSpells = useSelector((state) => state.characterSkills.selectedSpells);


    return (
        <React.Fragment>
            <div className="total-skills-choosen-wrap">
                <h3>Avalible skills lvl {characterLevel}</h3>
                <ul className="result-skills-preview-list">
                    {classSkills.map((skill) => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <li>{skill.name}</li>
                            </React.Fragment>
                        )
                    })}
                    {backgroundSkills.map((skill) => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <li>{skill.name}</li>
                            </React.Fragment>
                        )
                    })}
                    {raceSkills.map((skill) => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <li>{skill.name}</li>
                            </React.Fragment>
                        )
                    })}
                </ul>
                {selectedSpells && selectedSpells.length > 0 ? 
                    <React.Fragment>
                        <h3>Selected spells lvl {characterLevel}</h3>
                        <ul className="selected-spells-preview-list">
                            {selectedSpells.map((spell) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <li>{spell.name}</li>
                                    </React.Fragment>
                                )
                            })}
                        </ul>
                    </React.Fragment>
                : null}
            </div>
        </React.Fragment>
    )
};

export default CharacterStepsSpellsPreview;