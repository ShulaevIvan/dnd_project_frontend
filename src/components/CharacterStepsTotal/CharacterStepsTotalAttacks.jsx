import React from "react";
import { useSelector } from "react-redux";

const CharacterStepsAttacks = () => {
    const savethrows = useSelector((state) => state.characterSteps.characterSum.classData.classSaveThrows);

    return (
        <React.Fragment>
            <div className="character-total-savethrows-wrap">
                    <div className="character-total-savethrow-title">Savethrows</div>
                    <div className="character-total-savethrows-row">
                        {savethrows.map((item) => {
                            return (
                                <React.Fragment key={Math.random()}>
                                    <div className="character-total-savethrow-item">{item.name}</div>
                                </React.Fragment>
                            )
                        })}
                    </div>
            </div>

            <div className="character-total-attack-wrap">
                <div className="character-total-attack-title">Attacks</div>
                    <div className="character-total-attack-row">
                        <div className="character-total-physical-attack-wrap">
                            <div className="physical-attack-param-row">
                                <div className="physical-attack-param-item">
                                    <span className="magical-attack-param-title">5 + 5 (melee normal) : </span>
                                </div>
                                <div className="physical-attack-param-item">
                                    <span className="physical-attack-param-value">0</span>
                                </div>
                            </div>
                            <div className="physical-attack-param-row">
                                <div className="physical-attack-param-item">
                                    <span className="magical-attack-param-title">2 + 3 (melee unarmored) : </span>
                                </div>
                                <div className="physical-attack-param-item">
                                    <span className="physical-attack-param-value">0</span>
                                </div>
                            </div>
                            <div className="physical-attack-param-row">
                                <div className="physical-attack-param-item">
                                    <span className="physical-attack-param-title">2 + 2 (melee light) : </span>
                                </div>
                                <div className="physical-attack-param-item">
                                    <span className="physical-attack-param-value">0</span>
                                </div>
                            </div>
                            <div className="physical-attack-param-row">
                                <div className="physical-attack-param-item">
                                    <span className="physical-attack-param-title">5 + 5 (range light) : </span>
                                </div>
                                <div className="physical-attack-param-item">
                                    <span className="physical-attack-param-value">0</span>
                                </div>
                            </div>
                        </div>
                        <div className="character-total-magical-attack-wrap">
                           <div className="magical-attack-param-row">
                                <div className="magical-attack-param-item">
                                    <span className="magical-attack-param-title">Main stat spell (CHA) : </span>
                                </div>
                                <div className="magical-attack-param-item">
                                   <span className="magical-attack-param-value">0</span>
                                </div>
                           </div>
                           <div className="magical-attack-param-row">
                                <div className="magical-attack-param-item">
                                    <span className="magical-attack-param-title">str savethrow :</span>
                                </div>
                                <div className="magical-attack-param-item">
                                    <span className="magical-attack-param-value">0 + 9 + 9</span>
                                </div>
                           </div>

                           <div className="magical-attack-param-row">
                                <div className="magical-attack-param-item">
                                    <span className="magical-attack-param-title">bonuce attack :</span>
                                </div>
                                <div className="magical-attack-param-item">
                                    <span className="magical-attack-param-value">mastery + modif</span>
                                </div>
                           </div>
                        </div>
                    </div>
                </div>
        </React.Fragment>
    )
};


export default CharacterStepsAttacks;