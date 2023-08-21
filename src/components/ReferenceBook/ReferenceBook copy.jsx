import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { referenceBookCharClasses } from "../../redux/slices/referenceBookSlice";

const ReferenceBook = () => {
    const charClasses = useSelector((state) => state.referenceBook.referenceBookCharClasses);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/reference_book/class/`)
            .then((response) => response.json())
            .then((data) => {
                dispatch(referenceBookCharClasses(JSON.stringify(data)))
            });
        }
        fetchFunc();
    }, [])
    console.log(charClasses)

    return (

        <React.Fragment>
            <div className="container">
                <div className="box-items-wrap">
                    <div className="box-item">
                        <h4>Title</h4>
                    </div>
                    <div className="box-item">
                        <h4>Title</h4>
                    </div>
                    <div className="box-item">
                        <h4>Title</h4>
                    </div>
                    <div className="box-item">
                        <h4>Title</h4>
                    </div>
                    <div className="box-item">
                        <h4>Title</h4>
                    </div>
                    <div className="box-item">
                        <h4>Title</h4>
                    </div>
                    <div className="box-item">
                        <h4>Title</h4>
                    </div>
                    <div className="box-item">
                        <h4>Title</h4>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ReferenceBook;