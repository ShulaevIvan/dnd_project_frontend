import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { setCharacterStep } from "../../redux/slices/characterStepsSlice";
import { useEffect } from "react";

const CharacterStepsProgressBar = () => {
    const characterStepNum = useSelector((state) => state.characterSteps.characterStepPage);
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