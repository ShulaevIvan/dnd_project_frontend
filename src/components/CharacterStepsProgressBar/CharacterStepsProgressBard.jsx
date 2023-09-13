import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { setCharacterStep, activeNextBtn, activePrevBtn, unsetClass} from "../../redux/slices/characterStepsSlice";

const CharacterStepsProgressBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const characterStepNum = useSelector((state) => state.characterSteps.characterStepPage);
    const stepsNames = useSelector((state) => state.characterSteps.stepsNames);
    const maxPage = useSelector((state) => state.characterSteps.characterStepMaxPage);
    const nextBtnActiveState = useSelector((state) => state.characterSteps.navNextBtnDisable);
    const prevBtnActiveState = useSelector((state) => state.characterSteps.navPrevBtnDisable);
    const createCharSum = useSelector((state) => state.characterSteps.characterSum.raceData);
    const classCharSum = useSelector((state) => state.characterSteps.characterSum.classData);
    const currentPage =  useSelector((state) => state.characterSteps.characterStepPage);
    

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
        if (characterStepNum === 1) {
            dispatch(activePrevBtn(true));
            dispatch(unsetClass());
        }
        dispatch(activePrevBtn(false));
       
    }, [characterStepNum]);

    useEffect(() => {
        if (!createCharSum) {
            dispatch(activeNextBtn(true));
            dispatch(activePrevBtn(true));
            return;
        }
        if (!classCharSum && currentPage === 2) {
            dispatch(activeNextBtn(true));
            dispatch(activePrevBtn(false));
            return;
        }
        dispatch(activeNextBtn(false));
    }, [createCharSum, currentPage])

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
                            <button className="prev-btn" disabled={prevBtnActiveState} onClick={prevPageHandler}>Prev</button>
                        </div>
                        <div className="next-btn-wrap">
                            <button className="next-btn" disabled={nextBtnActiveState} onClick={nextPageHandler}>next</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CharacterStepsProgressBar;