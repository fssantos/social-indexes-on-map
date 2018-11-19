import { listMarkers, listPnudDataByField } from '../../utils/api';

export const REQUEST_PNUD_DATA = "REQUEST_PNUD_DATA";
export const RECEIVE_PNUD_DATA_BY_FIELD = "RECEIVE_PNUD_DATA_BY_FIELD";



export const requestPnudData = () => ({
    type: REQUEST_PNUD_DATA,
})

export const receivePnudDataByField = (markers) => ({
    type: RECEIVE_PNUD_DATA_BY_FIELD,
    payload: { data: markers }
})

export const fetchPnudDataByField = (type) => dispatch => {
    dispatch(requestPnudData());

    return listPnudDataByField(type).then(data => {
        if (typeof data.error == "undefined") {
            dispatch(receivePnudDataByField(data));

        } else {
            console.error(data.error);
            dispatch(receivePnudDataByField([]));
        }
    })
        .catch(error => {
            console.error(error);
        });

}