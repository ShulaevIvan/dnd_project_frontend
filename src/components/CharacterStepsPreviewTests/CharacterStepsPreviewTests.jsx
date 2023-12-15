import React from "react";


const CharacterStepsPreviewTests = () => {
    return (
        <React.Fragment>
            <div className="character-steps-total-stats-test-wrap">
                <div className="character-steps-total-stats-test-title">Stat Tests</div>
                <div className="character-steps-total-stats-select-wrap">
                    <label 
                        className="character-steps-total-stats-select-title" 
                        for="character-steps-total-stats-select">
                            Choose a stat test:
                    </label>
                    <select id="character-steps-total-stats-select">
                        <option selected>STR</option>
                        <option>DEX</option>
                        <option>CON</option>
                        <option>INT</option>
                        <option>WIS</option>
                        <option>CHA</option>
                    </select>
                </div>
                <div className="character-steps-total-stat-item-row">
                   <div className="character-steps-total-stat-value">
                        <label htmlFor="character-steps-total-stat-value-base">Current</label>
                        <input id="character-steps-total-stat-value-base" type="text" />
                   </div>
                   <div className="character-steps-total-stat-target">
                        <label htmlFor="character-steps-total-stat-value-target">Target</label>
                        <input id="character-steps-total-stat-value-target" type="text" />
                    </div>  
                   <div className="character-steps-total-stat-result">
                        <label htmlFor="character-steps-total-stat-value-result">Result</label>
                        <input id="character-steps-total-stat-value-result" type="text" />
                    </div>
                </div>
                <div className="character-steps-total-stats-test-btns-wrap">
                    <div className="character-steps-total-stats-test-btns-row">
                        <div className="character-steps-total-stats-test-btn-item">
                            <button>Start Test</button>
                        </div>
                        <div className="character-steps-total-stats-test-btn-item">
                            <select>
                                <option>Mode 1</option>
                                <option>Mode 2</option>
                                <option>Mode 3</option>
                                <option>Mode 4</option>
                                <option>Mode 5</option>
                            </select>
                        </div>
                        <div className="character-steps-total-stats-test-btn-item">
                            <button>Reset Test</button>
                        </div>
                    </div>
                </div>
                <div className="character-steps-total-stats-test-try-count-wrap">
                    <div className="character-steps-total-stats-test-try-pass-wrap">
                        <div className="character-steps-total-stats-test-try-pass-title">
                            Pass
                        </div>
                        <div className="character-steps-total-stats-test-try-pass-row-wrap">
                            <div  className="character-steps-total-stats-test-try-pass-row">
                                <div className="character-steps-total-stats-test-try-pass-item">
                                    <span className="character-steps-total-stats-test-try-pass-icon"></span>
                                </div>
                                <div className="character-steps-total-stats-test-try-pass-item">
                                    <span className="character-steps-total-stats-test-try-pass-icon"></span>
                                </div>
                                <div className="character-steps-total-stats-test-try-pass-item">
                                    <span className="character-steps-total-stats-test-try-pass-icon"></span>
                                </div>
                                <div className="character-steps-total-stats-test-try-pass-item">
                                    <span className="character-steps-total-stats-test-try-pass-icon"></span>
                                </div>
                                <div className="character-steps-total-stats-test-try-pass-item">
                                    <span className="character-steps-total-stats-test-try-pass-icon"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="character-steps-total-stats-test-try-fail-wrap">
                        <div className="character-steps-total-stats-test-try-fail-title">
                            Fail
                        </div>
                        <div className="character-steps-total-stats-test-try-pass-row-wrap">
                            <div className="character-steps-total-stats-test-try-fail-row">
                                <div className="character-steps-total-stats-test-try-fail-item">
                                    <span className="character-steps-total-stats-test-try-fail-icon"></span>
                                </div>
                                <div className="character-steps-total-stats-test-try-fail-item">
                                    <span className="character-steps-total-stats-test-try-fail-icon"></span>
                                </div>
                                <div className="character-steps-total-stats-test-try-fail-item">
                                    <span className="character-steps-total-stats-test-try-fail-icon"></span>
                                </div>
                                <div className="character-steps-total-stats-test-try-fail-item">
                                    <span className="character-steps-total-stats-test-try-fail-icon"></span>
                                </div>
                                <div className="character-steps-total-stats-test-try-fail-item">
                                    <span className="character-steps-total-stats-test-try-fail-icon"></span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </React.Fragment>
    )
};


export default CharacterStepsPreviewTests;