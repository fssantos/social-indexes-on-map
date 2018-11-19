//import { listMarkers, listMarkersByNeighborhood } from '../../utils/api';


export const CHANGE_TYPE_SELECTION = "CHANGE_TYPE_SELECTION";
export const CHANGE_VARIABLE_SELECTION = "CHANGE_VARIABLE_SELECTION";





export const changeTypeSelection = (type) => ({
    type: CHANGE_TYPE_SELECTION,
    payload: { type },
})

export const changeVariableSelection = (variable) => ({
    type: CHANGE_VARIABLE_SELECTION,
    payload: { variable }
})
