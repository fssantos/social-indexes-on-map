import { REQUEST_MARKERS, RECEIVE_MARKERS, RECEIVE_MARKERS_BY_NEIGHBORHOOD } from "../actions/markersActions";

const initialState = {
    data: [],
    markersByNeighborhood: [],
    isFetching: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_MARKERS:
            return {
                ...state,
                isFetching: true,

            }
        case RECEIVE_MARKERS:
            return {
                ...state,
                data: action.payload.data,
                isFetching: false,
            }
        case RECEIVE_MARKERS_BY_NEIGHBORHOOD:
            return {
                ...state,
                markersByNeighborhood: action.payload.data,
                isFetching: false,
            }
        default: return {
            ...state,
        }
    }
}

export default reducer;