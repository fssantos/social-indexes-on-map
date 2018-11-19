import { REQUEST_PNUD_DATA, RECEIVE_PNUD_DATA_BY_FIELD } from "../actions/pnudActions";

const initialState = {
    data: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_PNUD_DATA:
            return {
                ...state,
                isFetching: true,

            }
        case RECEIVE_PNUD_DATA_BY_FIELD:
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

export default reducer;