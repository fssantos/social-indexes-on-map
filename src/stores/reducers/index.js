import { combineReducers } from "redux";

import markersReducer from './markersReducer';
import pnudReducer from './pnudReducer';
import toolBarReducer from './toolBarReducer';




const reducers = {

    markersReducer,
    pnudReducer,
    toolBarReducer,
}

const combined = combineReducers(reducers);

export default combined;
