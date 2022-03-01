const initialState = {
    selectedChat: [],
    inView: false
}

const selectedChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SELECTED_CHAT':
            if (!action.chat?.messages){
                action.chat.messages = []
            }
            return {
                selectedChat: action.chat,
                inView: true
            };
        case 'SELECTED_CHAT_CLOSE':
            return {
                ...state,
                inView: false
            }
        default:
            return state
    }
};

export default selectedChatReducer;
