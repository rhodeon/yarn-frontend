export const selectedChatAction = (chat) => ({
    type: 'SELECTED_CHAT',
    chat
});

export const closeSelectedChat = () => ({
    type: 'SELECTED_CHAT_CLOSE'
})
