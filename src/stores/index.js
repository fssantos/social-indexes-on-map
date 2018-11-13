import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import logger from "redux-logger"
import thunk from "redux-thunk";;

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function reduxStore(initialState) {
    const middleware = [thunk, logger];
    const store = createStore(reducers,
        compose(
            composeEnhancer(applyMiddleware(thunk, logger)),
        )
    )
    return store;
}

export default reduxStore;

