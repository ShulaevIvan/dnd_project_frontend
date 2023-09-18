import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRaces, selectRace, selectSubrace, showPreviewPage } from "../../redux/slices/characterStepsSlice";
import { addBaseStats } from "../../redux/slices/calculateStatsSlice";

const  CharacterStepsRace = () => {
    const characterCreateState =  useSelector((state) => state.characterSteps);
    const allRaces = useSelector((state) => state.characterSteps.allRaces);
    const subraceState = useSelector((state) => state.characterSteps.characterSum.subraceData);

    const [selectedRaceState, setSelectedRaceState] = useState({
        raceData: undefined, 
        subraceData: undefined,
        subraceActiveBtn: undefined,
    });
    const dispatch = useDispatch();

    const selectRaceHandler = (raceId, autoSelect=false) => {
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reference_book/race/${raceId}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((data) => {
                if (!autoSelect) {
                    dispatch(selectSubrace(null));
                    dispatch(addBaseStats(data.race_bonuces));
                }

                const raceData = {
                    raceData: data.data[0],
                    skills: data.skills,
                    race_bonuces: data.race_bonuces,
                    languages: data.languages
                };
                
                setSelectedRaceState(prevState => ({
                    ...prevState,
                    raceData: prevState.raceData = raceData,
                    subraceData: prevState.subraceData = undefined,
                    subraceActiveBtn: undefined
                }));

                dispatch(showPreviewPage(true));
            });
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
                const baseRaceId = data.data[0].id;
                selectRaceHandler(baseRaceId, true);

                const subraceData = {
                    subraceId: data.subrace_bonuce_data[0].id,
                    baseRace: data.data[0],
                    subrace_name: data.subrace_bonuce_data[0].subrace_active_name,
                    subraceSkills: data.subrace_bonuce_data[0].skills,
                    subraceBonuces: data.subrace_bonuce_data[0].subrace_bonuces,
                    languges: data.languages,
                };
                
                if (subraceData.baseRace.id === raceId) dispatch(selectSubrace(JSON.stringify(subraceData)));
                    
                dispatch(addBaseStats(subraceData.subraceBonuces));
                dispatch(showPreviewPage(true));

                setTimeout(() => {
                    setSelectedRaceState(prevState => ({
                        ...prevState,
                        subraceData: prevState.subraceData = subraceData,
                        subraceActiveBtn: prevState.subraceActiveBtn = subraceObj.id,
                    }));
                }, 100);
                
            });
        }
        fetchFunc();
    }

    useEffect(() => {
        if (!selectedRaceState.subraceData) {
            const raceStats = selectedRaceState.raceData
            dispatch(selectRace(JSON.stringify({raceData: selectedRaceState.raceData})));
            return;
        }
        dispatch(selectSubrace(JSON.stringify(selectedRaceState.subraceData)));

        // eslint-disable-next-line
    }, [selectedRaceState, characterCreateState.characterSum.subraceActive]);

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
                        // {console.log(subraceState)}
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
                                                        <li 
                                                            className = {
                                                                selectedRaceState.subraceActiveBtn === subrace.id ? 
                                                                    `character-race-features-btn-active` : `character-race-features-btn`
                                                            } 
                                                            onClick={(e) => subraceHandler(e, item.id, subrace)}
                                                        >
                                                        </li>
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