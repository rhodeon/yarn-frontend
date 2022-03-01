const initialState = {
    friends: [],
    loading: false,
    error: null
}

const calculateUnread = (friends) =>{
    friends.forEach(friend => {
        let unread = 0
        friend.messages?.forEach(message => {
            if (!message.read && message.recipientID === localStorage.getItem("userID")) {
                unread += 1
            }
        });
        friend.unreadMessages = unread
    });
    return friends
}

const friendReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_FRIENDS_SUCCESS':
            return {
                ...state,
                friends: calculateUnread(action.payload),
                loading: false,
                error: null
            };
        case "GET_FRIENDS_START":
            return {
                ...state,
                loading: true,
            }
        case "GET_FRIENDS_FAIL":
            return {
                ...state,
                loading: false,
                friends: null,
                error: action.payload
            }
        case "NEW_MESSAGE":
            const friends = state.friends
            const index = friends.findIndex(el=> el.ID === action.payload.sender || el.ID === action.payload.recipientID)
            if (index !== -1){
                if (action.payload.messageType === "info"){
                        switch (action.payload.updateType) {
                            case "delivered":
                                friends[index].messages.forEach((_, i) => {
                                    friends[index].messages[i].delivered = true
                                });
                                return{
                                    ...state,
                                    friends: calculateUnread(friends)
                                };
                            case "read":
                                friends[index].messages.forEach((_, i) => {
                                    friends[index].messages[i].delivered = true
                                    friends[index].messages[i].read = true
                                });
                                return{
                                    ...state,
                                    friends: calculateUnread(friends)
                                };
                                
                            default:
                                return state;
                    }
                    
                } else {
                    if (!action.payload) {
                        return{
                            ...state,
                            friends: []
                        }
                    }
                    const friends = state.friends
                    const index = friends.findIndex(el=> el.ID === action.payload.sender)
                    if (index !== -1) {
                        if (!friends[index].messages) {
                            friends[index].messages = []
                        }
                        friends[index].messages.push(action.payload)
                    } else {
                        const index = friends.findIndex(el=> el.ID === action.payload.recipientID)
                        if (!friends[index].messages) {
                            friends[index].messages = []
                        }
                        friends[index].messages.push(action.payload)
                    }
                    
                    return{
                        ...state,
                        friends: calculateUnread(friends)
                    }
                }
            }
            break
        default:
            return state
    }
};

export default friendReducer;