import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sortResultCharStats } from "../../redux/slices/calculateStatsSlice";

const CharacterStepsSavingThrows = () => {
    const dispatch = useDispatch();
    const resultCharStats = useSelector((state) => state.calculateCharStats.resultCharStats);
    const classData = useSelector((state) => state.characterSteps.characterSum.classData);
    
    useEffect(() => {
        dispatch(sortResultCharStats());
       
    }, [])
    useEffect(() => { console.log(resultCharStats)}, [resultCharStats])

    return (
        <React.Fragment>
            <div className="character-steps-saving-throws-wrap">
                <h3>Спасброски</h3>
                <div className="character-steps-saving-throws-row">
                    {resultCharStats.map((item) => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <div className="character-steps-saving-throws-item">
                                    {classData.classSaveThrows.map((savethrow) => {
                                        if (savethrow.name === item.statParam) {
                                            return (
                                                <React.Fragment key={Math.random()}>
                                                    <span className="main-char-param"></span>
                                                </React.Fragment>
                                            )
                                        }
                                    })}
                                    <div className={`character-steps-saving-throws-item-header`}>
                                    {/* <div className={`character-steps-saving-throws-item-header character-steps-saving-throws-title-${item.statParam}`}> */}
                                        {item.statParam.toUpperCase()}
                                    </div>
                                    <div className="character-steps-saving-throws-item-body">{item.value}</div>
                                    <div className="character-steps-saving-throws-item-footer">
                                        {item.modifer}
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
                    {/* <div className="character-steps-saving-throws-item">
                        <span className="main-char-param"></span>
                        <div className="character-steps-saving-throws-item-header">
                            CHA
                        </div>
                        <div className="character-steps-saving-throws-item-body">10</div>
                        <div className="character-steps-saving-throws-item-footer">
                            +0
                        </div>
                    </div> */}
                </div>
            </div>
        </React.Fragment>
    )
};

export default CharacterStepsSavingThrows;