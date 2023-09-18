import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addClasses, selectClass, selectSubclass, showPreviewPage, unsetClass } from "../../redux/slices/characterStepsSlice";

const CharacterStepsClass = () => {
    const dispatch = useDispatch();
    const allCharClasses = useSelector((state) => state.characterSteps.allClasses);
    const characterCreateState =  useSelector((state) => state.characterSteps);
    const classState = useSelector((state) => state.characterSteps.characterSum.classData);
    const subclassState = useSelector((state) => state.characterSteps.characterSum.subclassData);

    const selectClassHandler = (classId) => {
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reference_book/class/${classId}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(unsetClass());
                dispatch(selectClass(data));
            });
        };

        fetchFunc();
    };

    const selectSubclassHandler = (e, classId, subClassId) => {
        e.preventDefault();
        e.stopPropagation();

        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reference_book/class/${classId}/?subclass=${subClassId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(unsetClass());
                const main_class = data.id;
                selectClassHandler(main_class);
                setTimeout(() => {
                    dispatch(selectSubclass(data));
                }, 200);
                
            })
        };

        fetchFunc();
    };

    useEffect(() => {
        if (classState) {
            dispatch(showPreviewPage(true));
            return;
        }
        dispatch(showPreviewPage(false));
    });
   

    useEffect(() => {
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reference_book/class/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(addClasses(JSON.stringify(data)))
            });
        }
        dispatch(showPreviewPage(false));
        fetchFunc();
    }, []);


    return (
        <React.Fragment>
            <div className="character-steps-class-column">
                <div className="character-class-row">
                    {allCharClasses.map((item) => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <div className="character-class-item" onClick={() => selectClassHandler(item.class_data.id)}>
                                    <div className="character-class-title">{item.class_data ? item.class_data.name : null}</div>

                                        <div className="character-class-features-wrap">
                                            <ul className="character-class-features-btn-wrap">
                                                {item.subclases ? item.subclases.map((subclass) => {
                                                    return (
                                                        <React.Fragment key={Math.random()}>
                                                            <li className="character-class-features-btn" 
                                                                onClick={(e) => selectSubclassHandler(e, item.class_data.id, subclass.id)}
                                                            ></li>
                                                        </React.Fragment>
                                                    )
                                                }) : null}
                                            </ul>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>
                <div className="more-class-btn-wrap">
                    <button className="more-class-btn">load more ...</button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CharacterStepsClass;