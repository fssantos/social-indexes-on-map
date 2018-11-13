import { REQUEST_CHAT_MESSAGES, RECEIVE_CHAT_MESSAGES, CREATE_CHAT_MESSAGE } from "../actions/chatActions";

const initialState = {
    data: [
        {
            userName: "John Doe",
            portrait: "url",
            message: "Lorem ipsum",
            displayPortraitLeft: true,
            time: "32 mins ago",
        },
        {
            userName: "Filipe",
            portrait: "url",
            message: "Lorem ipsum tumbem",
            displayPortraitLeft: false,
            time: "29 mins ago",
        },
        {
            userName: "John Doe",
            portrait: "url",
            message: "Lorem ipsum tumbem tumbem",
            displayPortraitLeft: true,
            time: "10 mins ago",
        },
    ],
    isFetching: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_CHAT_MESSAGES:
            return {
                ...state,
                isFetching: true,

            }
        case RECEIVE_CHAT_MESSAGES:
            return {
                ...state,
                data: action.payload.data,
                isFetching: false,
            }
        case CREATE_CHAT_MESSAGE:
            return {
                ...state,
                data: [...state.data, action.payload.message]

            }
        default: return {
            ...state,
        }
    }
}

module.exports = reducer;