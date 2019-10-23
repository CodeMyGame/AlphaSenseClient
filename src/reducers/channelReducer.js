const initialState = {
    channels: [],
    messages:[],
};

const channelReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_CHANNELS":
            return Object.assign({}, state, {
                ...state,
                channels: action.data,
            });
        case "FETCH_MESSAGES":
            return Object.assign({}, state, {
                ...state,
                messages:action.data
            });
        case "SENT_MESSAGE":
            return Object.assign({}, state, {
                ...state,
                messages: [...state.messages,action.data]
            });
        default:
            return state;
    }
};

export default channelReducer;