import {configureStore} from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';
import subMenuSlice from '../slices/subMenuSlice';
import headerLoginFormSlice from '../slices/headerLoginFormSlice';

export const store = configureStore({
    reducer: {
        userData: userSlice,
        subMenu: subMenuSlice,
        headerLoginForm: headerLoginFormSlice,
    },
    middleware: (getDefaultMiddleware)  => getDefaultMiddleware(),
});