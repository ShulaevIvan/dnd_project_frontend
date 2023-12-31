import React from "react";
import { addBackground, selectBackground, showMoreBackground, showPreviewPage, activeNextBtn } from "../../redux/slices/characterStepsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const CharacterStepsBackground = () => {
    const dispatch = useDispatch();
    const backgroundData = useSelector((state) => state.characterSteps.characterSum.backgroundData);
    const selectedBackground = useSelector((state) => state.characterSteps.characterSum.backgroundActive);
    const characterWorldView = useSelector((state) => state.characterSteps.characterSum.backgroundWorldViewActive);
    
    const loadMoreBackgroundHandler = () => {
        dispatch(showMoreBackground(5))
    };

    const backgroundHandler = (backgroundId) => {
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reference_book/background/${backgroundId}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(selectBackground(data));
                dispatch(showPreviewPage(true));
            });
        };

        fetchFunc();
    };

    useEffect(() => {
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reference_book/background/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((data) => {
                dispatch(addBackground(JSON.stringify(data)));
            })
        };
        dispatch(selectBackground(false));
        dispatch(showPreviewPage(false));
        fetchFunc();
    }, []);

    useEffect(() => {
        if (selectedBackground && characterWorldView) {
            dispatch(activeNextBtn(false));
            return;
        }
        dispatch(activeNextBtn(true));
    }, [selectedBackground, characterWorldView]);


    return (
        <React.Fragment>
            <div className="character-steps-background-column">
                <div className="character-background-row">

                    {backgroundData ? Array.from(backgroundData).map((item, i) => {
                        return (
                            <React.Fragment key={Math.random()}>
                                <div className="character-background-item" onClick={(e) => backgroundHandler(item.id)}>
                                    <div className="character-background-title">{item.name}</div>
                                </div>
                            </React.Fragment>
                        )
                    }) : null}
                    
                </div>
                    
                <div className="more-background-btn-wrap">
                    <button className="more-class-btn" onClick={loadMoreBackgroundHandler}>load more ...</button>
                </div>
                    
            </div>
        </React.Fragment>
    );
};

export default CharacterStepsBackground