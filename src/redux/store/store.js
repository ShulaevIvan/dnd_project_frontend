import {configureStore} from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';
import subMenuSlice from '../slices/subMenuSlice';
import headerLoginFormSlice from '../slices/headerLoginFormSlice';
import referenceBookSlice from '../slices/referenceBookSlice';
import characterStepsSlice from '../slices/characterStepsSlice';
import calculateStatsSlice from '../slices/calculateStatsSlice';
import instrumentsSlice from '../slices/instrumentsSlice';


export const store = configureStore({
    reducer: {
        userData: userSlice,
        subMenu: subMenuSlice,
        headerLoginForm: headerLoginFormSlice,
        referenceBook: referenceBookSlice,
        characterSteps: characterStepsSlice,
        calculateCharStats: calculateStatsSlice,
        instruments: instrumentsSlice,
    },
    middleware: (getDefaultMiddleware)  => getDefaultMiddleware(),
});