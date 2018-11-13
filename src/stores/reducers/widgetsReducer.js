import { REQUEST_WIDGETS, RECEIVE_WIDGETS } from "../actions/widgetActions";

const initialState = {
    data: {
        newOrders: 120,
        comments: 52,
        newUsers: 24,
        pageViews: 25200,
    },
    isFetching: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_WIDGETS:
            return {
                ...state,
                isFetching: true,

            }
        case RECEIVE_WIDGETS:
            return {
                ...state,
                data: action.payload.data,
                isFetching: false,
            }
        default: return {
            ...state,
        }
    }
}

module.exports = reducer;