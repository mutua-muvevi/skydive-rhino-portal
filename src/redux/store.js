import { configureStore } from "@reduxjs/toolkit";
import {
	useDispatch as useAppDispatch,
	useSelector as useAppSelector,
} from "react-redux";
import { persistStore } from "redux-persist";
import persistedReducer from "./root-reducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

// ----------------------------------------------------------------------

const middlewares = [thunk, logger];
const environment = import.meta.env.VITE_ENVIRONMENT

if (environment === `development`) {
	middlewares.push(logger);
}

const store = configureStore({
	reducer: persistedReducer,
	middleware: middlewares,
});

const persistor = persistStore(store);

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, persistor, dispatch, useSelector, useDispatch };
