import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { instrumentsMenuSlice } from "../../redux/slices/instrumentsSlice";
import { Link } from "react-router-dom";



const Instruments = () => {
     const instrumentsMenu = useSelector((state) => state.instruments.menu);
     const dispatch = useDispatch();

     useEffect(() => {
          const fetchFunc = async () => {
               await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/instruments/`)
               .then((response) => response.json())
               .then((data) => {
                    dispatch(instrumentsMenuSlice(JSON.stringify(data.instruments)));
               });
          };
          fetchFunc();
     }, [])

     return  (
        <React.Fragment>
          <div className="container">
               <div className="instruments-wrap">
                    <div className="instruments-list">
                         {instrumentsMenu.map((item) => {
                              return (
                                   <React.Fragment key={item.id + Math.random()}>
                                        <div className="instrument-item-wrap">
                                             <h5>
                                                  <Link to={{pathname: `service/${item.name}/`}}>
                                                       {(item.name.charAt(0).toUpperCase() + item.name.slice(1)).replace(/-/g, ' ')}
                                                  </Link>
                                             </h5>
                                        </div>
                                        
                                   </React.Fragment>
                              );
                         })}
                    </div>
                    <div className="virtual-cube-wrap">
                        Virtual cube
                    </div>
               </div>
          </div>
        </React.Fragment>
     );
};

export default Instruments;