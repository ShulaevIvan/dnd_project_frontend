import React from "react";


const CharacterStepsProgressBar = () => {
    return (
        <React.Fragment>
            <div className="porgerss-bar-row">
                <div className="progress-bar-container">
                    <ul className="timeline">
                        <li data-step="race" className="progress-active-step"></li>
                        <li data-step="class"></li>
                        <li data-step="background"></li>
                        <li data-step="stats"></li>
                        <li data-step="skills"></li>
                        <li data-step="total"></li>
                    </ul>
                </div>

                <div className="progress-bar-nav-wrap">
                    <div className="progress-bar-btn-block">
                        <div className="prev-btn-wrap">
                            <button className="prev-btn">Prev</button>
                        </div>
                        <div className="next-btn-wrap">
                            <button className="next-btn">next</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CharacterStepsProgressBar;