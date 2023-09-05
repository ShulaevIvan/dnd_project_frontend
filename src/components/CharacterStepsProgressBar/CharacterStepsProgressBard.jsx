import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { setCharacterStep } from "../../redux/slices/characterStepsSlice";
import { useEffect } from "react";

const CharacterStepsProgressBar = () => {
    const characterStepNum = useSelector((state) => state.characterSteps.characterStepPage);
    const stepsNames = useSelector((state) => state.characterSteps.stepsNames);
    const maxPage = useSelector((state) => state.characterSteps.characterStepMaxPage);

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const nextPageHandler = () => {
        dispatch(setCharacterStep(1));
    };
    const prevPageHandler = () => {
        dispatch(setCharacterStep(-1));
    };

    useEffect(() => {
        if (characterStepNum <= maxPage) {
            navigate(`${location.pathname.substring(0, location.pathname.length - 1)}${characterStepNum}`)
        }
       
    }, [characterStepNum])

    return (
        <React.Fragment>
            <div className="porgerss-bar-row">
                <div className="progress-bar-container">
                    <ul className="timeline">
                        {stepsNames.map((item, i) => {
                            return (
                                <React.Fragment key={Math.random()}>
                                    <li data-step={item} className={i === characterStepNum -1 ? "progress-active-step" : null}></li>
                                </React.Fragment>
                            )
                        })}
                    </ul>
                </div>

                <div className="progress-bar-nav-wrap">
                    <div className="progress-bar-btn-block">
                        <div className="prev-btn-wrap">
                            <button className="prev-btn" onClick={prevPageHandler}>Prev</button>
                        </div>
                        <div className="next-btn-wrap">
                            <button className="next-btn" onClick={nextPageHandler}>next</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CharacterStepsProgressBar;