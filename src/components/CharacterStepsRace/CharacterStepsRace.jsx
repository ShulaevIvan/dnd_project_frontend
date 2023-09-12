import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRaces, selectRace, selectSubrace, showPreviewPage } from "../../redux/slices/characterStepsSlice";

const  CharacterStepsRace = () => {
    const characterCreateState =  useSelector((state) => state.characterSteps);
    const allRaces = useSelector((state) => state.characterSteps.allRaces);
    const [selectedRaceState, setSelectedRaceState] = useState({raceData: undefined})
    const dispatch = useDispatch();

    const selectRaceHandler = (raceId) => {
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reference_book/race/${raceId}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((data) => {
                
                const raceData = {
                    raceData: data.data[0],
                    skills: data.skills,
                    race_bonuces: data.race_bonuces,
                    languages: data.languages
                };
                
                setSelectedRaceState(prevState => ({
                    ...prevState,
                    raceData: prevState.raceData = raceData,
                }));

                if (!data.data[0].subrace_avalible) dispatch(selectSubrace(null));
                dispatch(showPreviewPage(true))
            })
        }
        fetchFunc();
    };

    const subraceHandler = (e, raceId, subraceObj) => {
        e.preventDefault();
        e.stopPropagation();
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reference_book/race/${raceId}/?subrace=${subraceObj.subrace_name}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((data) => {
                const subraceData = {
                    baseRace: data.data[0],
                    subrace_name: data.subrace_bonuce_data[0].subrace_active_name,
                    subraceSkills: data.subrace_bonuce_data[0].skills,
                    subraceBonuces: data.subrace_bonuce_data[0].subrace_bonuces,
                    languges: data.languages,
                };
                
                if (!selectedRaceState.raceData || subraceData.baseRace.id === raceId) selectRaceHandler(subraceData.baseRace.id);

                setTimeout(() => {
                    dispatch(selectSubrace(JSON.stringify(subraceData)));
                }, 200);
                dispatch(showPreviewPage(true));
            });
        }
        fetchFunc();
    }

    useEffect(() => {
        dispatch(selectRace(JSON.stringify({raceData: selectedRaceState.raceData})));
        dispatch(selectSubrace(false));
        // eslint-disable-next-line
    }, [selectedRaceState])

    useEffect(() => {
        dispatch(showPreviewPage(false))
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
        // eslint-disable-next-line
    }, [])

    return (
        <React.Fragment>
            
            <div className="character-steps-race-column">
                <div className="character-race-row">
                    {allRaces.map((item) => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <div 
                                    className={`character-race-item 
                                        ${characterCreateState.characterSum.raceData ? 
                                            characterCreateState.characterSum.raceData.id === item.id ? 'race-selected' : null : null}
                                    `} 
                                    onClick={() => selectRaceHandler(item.id)}
                                >
                                    <div className="character-race-title">{item.name}</div>
                                    <div className="character-race-features-wrap">
                                        <ul className="character-race-features-btn-wrap">
                                            {item.subrace_avalible ? item.subraces.map((subrace) => {
                                                return (
                                                    <React.Fragment key={Math.random()}>
                                                        <li className="character-race-features-btn" onClick={(e) => subraceHandler(e, item.id, subrace)}></li>
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