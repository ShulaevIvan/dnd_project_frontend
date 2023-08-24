import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRaces, selectRace } from "../../redux/slices/characterStepsSlice";

const  CharacterStepsRace = () => {
    const allRaces = useSelector((state) => state.characterSteps.allRaces);
    const characterSum = useSelector((state) => state.characterSteps);
    const dispatch = useDispatch();

    const selectRaceHandler = (raceId) => {
        dispatch(selectRace(raceId));
    };

    useEffect(() => {
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reference_book/race/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(addRaces(JSON.stringify(data.races)))
            });
        };

        fetchFunc();
    }, [])

    return (
        <React.Fragment>
            
            <div className="character-steps-race-column">
                <div className="character-race-row">
                    {allRaces.map((item) => {
                        console.log(item.subrace)
                        return (
                            <React.Fragment key={Math.random()}>
                                <div className="character-race-item" onClick={() => selectRaceHandler(item.id)}>
                                    <div className="character-race-title">{item.name}</div>
                                    <div className="character-race-features-wrap">
                                        <ul className="character-race-features-btn-wrap">
                                            {item.subrace ? item.subrace.map((subrace) => {
                                                return (
                                                    <React.Fragment>
                                                        <li className="character-race-features-btn"></li>
                                                    </React.Fragment>
                                                )
                                            }) : null}
                                        </ul>
                                    </div>
                                    <div className="character-features-values">
                                        {item.subrace && item.subrace.length ? `0 of ${item.subrace.length}` : null}
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>

                <div className="more-race-btn-wrap">
                    <button className="more-race-btn">load more ...</button>
                </div>

            </div>
        </React.Fragment>
    );
};

export default CharacterStepsRace;