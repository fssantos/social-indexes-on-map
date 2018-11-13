import { listMarkers, listMarkersByNeighborhood } from '../../utils/api';

export const REQUEST_MARKERS = "REQUEST_MARKERS";
export const RECEIVE_MARKERS = "RECEIVE_MARKERS";
export const RECEIVE_MARKERS_BY_NEIGHBORHOOD = "RECEIVE_MARKERS_BY_NEIGHBORHOOD";



export const requestMarkers = () => ({
    type: REQUEST_MARKERS,
})

export const receiveMarkers = (markers) => ({
    type: RECEIVE_MARKERS,
    payload: { data: markers }
})

export const receiveMarkersByNeighborhood = (markers) => ({
    type: RECEIVE_MARKERS_BY_NEIGHBORHOOD,
    payload: { data: markers }
})

export const fetchMarkersByNeighborhood = (type) => dispatch => {
    dispatch(requestMarkers());

    return listMarkersByNeighborhood(type).then(data => {
        if (typeof data.error == "undefined") {
            dispatch(receiveMarkersByNeighborhood(data));

        } else {
            console.error(data.error);
            dispatch(receiveMarkersByNeighborhood([]));
        }
    })
        .catch(error => {
            console.error(error);
        });

}

export const fetchMarkers = () => dispatch => {
    dispatch(requestMarkers());

    return listMarkers()
        .then(data => {
            if (typeof data.error == "undefined") {
                dispatch(receiveMarkers(data));

            } else {
                console.error(data.error);
                dispatch(receiveMarkers([]));
            }
        })
        .catch(error => {
            console.error(error);
        });
}

