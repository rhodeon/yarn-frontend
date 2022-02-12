import * as actionTypes from '../Actions/authActionTypes';

const initialState = {
    token: null,
    refreshToken: null,
    userID: null,
    profile: null,
    error: null,
    loading: false,
    authRedirectPath: '/'

};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START:
             return {
                ...state,
                error: null,
                loading: true

             }
        case actionTypes.AUTH_SUCCESS: 
            return {
                ...state,
                userID: action.userID,
                token: action.token,
                refreshToken: action.refreshToken,
                profile: action.profile,
                error: null,
                loading: false
            }
        case actionTypes.AUTH_FAIL: 
            return {
                loading: false,
                error: action.error
            }
        case actionTypes.AUTH_LOGOUT: 
            return {
                ...state,
                userID: null,
                token: null,
                refreshToken: null,
                profile: null
            }
        case actionTypes.SET_REDIRECT:
            return{
                ...state,
                authRedirectPath: action.path
            }
        case actionTypes.GET_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload
            }
        default:
            return state;
    }
};

export default reducer;