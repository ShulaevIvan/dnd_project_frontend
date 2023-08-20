import React from "react";
import SeachPanel from "../SearchPanel/SearchPanel";
import Manuals from "../Manuals/Manuals";
import Instruments from "../Instruments/Instruments";
import ReferenceBook from "../ReferenceBook/ReferenceBook";

const Body = () => {
    return (
        <React.Fragment>
            <div className="main-container">
                <section>
                    <SeachPanel />
                </section>

                <section>
                    <ReferenceBook />
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