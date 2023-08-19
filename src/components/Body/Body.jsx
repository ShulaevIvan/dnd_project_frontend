import React from "react";
import SeachPanel from "../SearchPanel/SearchPanel";
import Manuals from "../Manuals/Manuals";
import Instruments from "../Instruments/Instruments";

const Body = () => {
    return (
        <React.Fragment>
            <div className="main-container">
                <section>
                    <SeachPanel />
                </section>

                <section>
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
                </section>

                <section>
                    <Instruments />
                </section>

                <section>
                    <Manuals />
                </section>

            </div>
        </React.Fragment>
    );
};

export default Body;