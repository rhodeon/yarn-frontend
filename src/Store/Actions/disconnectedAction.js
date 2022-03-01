export const disconnectedAction = (status) => ({
    type: 'DISCONNECTED',
    status
});

export const connectedAction = (status) => ({
    type: 'CONNECTED',
    status
});
