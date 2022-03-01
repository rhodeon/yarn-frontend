export const profileAction = (status) => ({
    type: 'PROFILE',
    status
});

export const selectedProfile = (profile) => ({
    type: 'SET_PROFILE',
    profile
});