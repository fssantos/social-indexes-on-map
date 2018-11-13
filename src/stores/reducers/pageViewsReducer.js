import { REQUEST_PAGE_VIEWS, RECEIVE_PAGE_VIEWS } from "../actions/pageViewsActions";

const initialState = {
    data: [
        {
            month: "January",
            views: 800,
        },
        {
            month: "February",
            views: 400,
        },
        {
            month: "March",
            views: 200,
        },
        {
            month: "April",
            views: 500,
        }
    ],
    isFetching: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_PAGE_VIEWS:
            return {
                ...state,
                isFetching: true,

            }
        case RECEIVE_PAGE_VIEWS:
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