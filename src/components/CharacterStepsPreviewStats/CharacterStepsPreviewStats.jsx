import React from "react";


const CharacterStepsPreiewStats = () => {
    return (
        <React.Fragment>
            <div className="character-bonuce-stats-preview-wrap">
                <div className="character-bonuce-stats-preview-title">Stats increase</div>
                <div className="character-bonuce-stats-preview-subtitle">increase stats str + 2 and other stats +1</div>
            </div>

            <div className="character-bounce-stats-increase-wrap">
                <div className="character-bonuce-stat-increase-row">
                    <div className="character-bonuce-stat-increase-item">
                        <div className="character-bonuce-stat-increase-title">STR</div>
                            <div className="character-bonuce-stat-increase-str-input-wrap"><input type="text" /></div>
                            <div className="character-bonuce-stat-increase-btns-wrap">
                                <span className="character-bonuce-stat-increase-plus">+</span>
                                <span className="character-bonuce-stat-increase-min">-</span>
                            </div>
                        </div>

                    </div>

                    <div className="character-bonuce-stat-increase-row">
                        <div className="character-bonuce-stat-increase-item">
                            <div className="character-bonuce-stat-increase-title">DEX</div>
                            <div className="character-bonuce-stat-increase-str-input-wrap">
                                <input type="text" />
                            </div>
                            <div className="character-bonuce-stat-increase-btns-wrap">
                                <span className="character-bonuce-stat-increase-plus">+</span>
                                <span className="character-bonuce-stat-increase-min">-</span>
                            </div>
                        </div>
                            
                </div>

                
                <div className="character-bonuce-stat-increase-row">
                    <div className="character-bonuce-stat-increase-item">
                        <div className="character-bonuce-stat-increase-title">CON</div>
                            <div className="character-bonuce-stat-increase-str-input-wrap">
                                <input type="text" />
                            </div>
                            <div className="character-bonuce-stat-increase-btns-wrap">
                                <span className="character-bonuce-stat-increase-plus">+</span>
                                <span className="character-bonuce-stat-increase-min">-</span>
                            </div>
                        </div>
                            
                    </div>

                    <div className="character-bonuce-stat-increase-row">
                        <div className="character-bonuce-stat-increase-item">
                            <div className="character-bonuce-stat-increase-title">INT</div>
                            <div className="character-bonuce-stat-increase-str-input-wrap">
                                <input type="text" />
                            </div>
                            <div className="character-bonuce-stat-increase-btns-wrap">
                                <span className="character-bonuce-stat-increase-plus">+</span>
                                <span className="character-bonuce-stat-increase-min">-</span>
                            </div>
                        </div>
                        
                    </div>

                    <div className="character-bonuce-stat-increase-row">
                        <div className="character-bonuce-stat-increase-item">
                            <div className="character-bonuce-stat-increase-title">WIS</div>
                            <div className="character-bonuce-stat-increase-str-input-wrap">
                                <input type="text" />
                            </div>
                            <div className="character-bonuce-stat-increase-btns-wrap">
                                <span className="character-bonuce-stat-increase-plus">+</span>
                                <span className="character-bonuce-stat-increase-min">-</span>
                            </div>
                        </div>
                        
                    </div>

                    <div className="character-bonuce-stat-increase-row">
                        <div className="character-bonuce-stat-increase-item">
                            <div className="character-bonuce-stat-increase-title">CHA</div>
                            <div className="character-bonuce-stat-increase-str-input-wrap">
                                <input className="text" />
                            </div>
                            <div className="character-bonuce-stat-increase-btns-wrap">
                                <span className="character-bonuce-stat-increase-plus">+</span>
                                <span className="character-bonuce-stat-increase-min">-</span>
                            </div>
                        </div>
                    </div>

                    <div className="character-bonuce-stat-increase-title-bottom-wrap">
                        <div className="character-bonuce-stat-increase-title-bottom">
                            Remaining points 0/2
                        </div>
                    </div>

                    <div className="character-bonuce-stat-increase-recomendation-wrap">
                        <h4>Tip</h4>
                        <div className="character-bonuce-stat-increase-recomendation-content">
                            Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. 
                            Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                        </div>
                    </div>
                </div>
        </React.Fragment>
    );
};

export default CharacterStepsPreiewStats;