const initialState = {
    open: false,
    selectedProfile: null,
};

const profileSidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PROFILE':
            return {
                ...state,
                open: !state.open
            };

        case 'SET_PROFILE':
            return {
                ...state,
                selectedProfile: action.profile
            };

        default:
            return state
    }
};

export default profileSidebarReducer;
