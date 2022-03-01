const disconnectedReducer = (state = false, action) => {
    switch (action.type) {
        case 'DISCONNECTED':
            return action.status;
        case 'CONNECTED':
            return action.status;
        default:
            return state
    }
};

export default disconnectedReducer;