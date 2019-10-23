export const fetch_channels = channels => {
    return {
        type: "FETCH_CHANNELS",
        data: channels
    };
};

export const fetch_messages = msg => {
    return {
        type: "FETCH_MESSAGES",
        data: msg
    };
};

export const sent_message = (msg) => {
    return {
        type: "SENT_MESSAGE",
        data: msg
    };
};

export const thunk_action_fetch_channels = () => {
    return async function(dispatch, getState) {
        const response = await fetch(`http://localhost:8080/channels`);
        dispatch(fetch_channels(await response.json()))
    };
};
export const thunk_action_fetch_messages = (channel) => {
    return async function(dispatch, getState) {
        const response = await fetch(`http://localhost:8080/messages/${channel}`);
        dispatch(fetch_messages(await response.json()))
    };
};
export const thunk_action_sent_message = (msg) => {
    return async function(dispatch, getState) {
        await fetch(`http://localhost:8080/sent`, {
            method: 'POST',
            body: JSON.stringify(msg),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch(sent_message(msg.message))
    };
};