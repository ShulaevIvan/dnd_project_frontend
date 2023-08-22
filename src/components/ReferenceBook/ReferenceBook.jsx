import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { referenceBookMenu, referenceBookCharClasses } from "../../redux/slices/referenceBookSlice";
import { Link } from "react-router-dom";

const ReferenceBook = () => {
    const charClasses = useSelector((state) => state.referenceBook.referenceBookCharClasses);
    const referenceBookMenuState = useSelector((state) => state.referenceBook.menu)
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reference_book/`)
            .then((response) => response.json())
            .then((data) => {
                dispatch(referenceBookMenu(JSON.stringify(data.menu)))
            });
        }
        fetchFunc();
    }, []);

    return (
        <React.Fragment>
            <div className="container">
                <div className="box-items-wrap">
                    {referenceBookMenuState.map((item) => {
                        return (
                            <div className="box-item"  key={Math.random() + item.id}>
                                <Link to={{pathname: `library/${item.name}/`}}>
                                    <h4>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h4>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </React.Fragment>
    );
};

export default ReferenceBook;