import { combineReducers } from "redux";

import markersReducer from './markersReducer';



const reducers = {

    markersReducer,
}

const combined = combineReducers(reducers);

export default combined;
