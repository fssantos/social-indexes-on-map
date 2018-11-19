import { CHANGE_TYPE_SELECTION, CHANGE_VARIABLE_SELECTION } from "../actions/toolBarActions";


const initialState = {
    type: 'NONE',
    variable: 'NONE',
};


function reducer(state = initialState, action) {
    console.log(action.type);
    switch (action.type) {
        case CHANGE_TYPE_SELECTION:
            return {
                ...state,
                type: action.payload.type,
            }
        case CHANGE_VARIABLE_SELECTION:
            return {
                ...state,
                variable: action.payload.variable,
            }

        default:
            return {
                ...state,
            }

    }
}

export default reducer;