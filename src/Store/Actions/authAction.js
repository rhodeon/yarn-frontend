import * as actionTypes from "./authActionTypes"
import axios from "axios"

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userID, refreshToken, profile) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userID: userID,
        profile: profile,
        refreshToken: refreshToken
    };
};

export const authFail = (error) => {
    let err = new Error(error);
    if (error.response) {
        err = error.response.data
    }
    return {
        type: actionTypes.AUTH_FAIL,
        error: err.message
    };
};


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('profile')
    localStorage.removeItem('userID');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            const refreshToken = localStorage.getItem('refreshToken')
            if (refreshToken == "undefined") {
                dispatch(logout())
            } else {
                dispatch(refreshUserToken(refreshToken)); 
            }
            
        }, expirationTime);
    };
};

export const refreshUserToken = (refreshToken) =>{
    console.log(refreshToken);
    return async dispatch => {
        try {
            const payload = {
                refreshToken: refreshToken
            }
            const response = await axios.post("http://localhost:8000/users/refresh-token", payload)
            const expirationTime = Date.now() + Number(response.data.expirationTime);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('expirationTime', expirationTime);
            localStorage.setItem('profile', JSON.stringify(response.data.profile))
            localStorage.setItem('userID', response.data.userID);
            dispatch(authSuccess(response.data.token, response.data.userID, response.data.refreshToken, response.data.profile));
            dispatch(checkAuthTimeout(response.data.expirationTime))
        } catch (error) {
            dispatch(authFail(error));
            
        }
    }
} 

export const auth =  (email, password) => {
    return async dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
        };
       try {
            const response = await axios.post("http://localhost:8000/users/login", authData)
            const expirationTime = Date.now() + Number(response.data.expirationTime);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('expirationTime', expirationTime);
            localStorage.setItem('profile', JSON.stringify(response.data.profile))
            localStorage.setItem('userID', response.data.userID);
            dispatch(authSuccess(response.data.token, response.data.userID, response.data.refreshToken, response.data.profile));
            dispatch(checkAuthTimeout(response.data.expirationTime));
            
       } catch (error) {
           dispatch(authFail(error))
       }
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken')
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = Number(localStorage.getItem('expirationTime'));
            if (expirationDate <= Date.now()) {
                dispatch(refreshUserToken(refreshToken));
            } else {
                const userID = localStorage.getItem('userID');
                const profile = JSON.parse(localStorage.getItem('profile'))
                dispatch(authSuccess(token, userID, refreshToken, profile));
                dispatch(checkAuthTimeout(expirationDate - Date.now(), refreshToken));
            }   
        }
    };
};

export const getProfile = () =>{
    return async dispatch => {
        const options = {
            headers:{
                Authorization: localStorage.getItem("token")
            }
        }
        try {
            const response = await axios.get("http://localhost:8000/users/profile", options)
            dispatch({type:actionTypes.GET_PROFILE_SUCCESS, payload:response.data})
            localStorage.setItem("profile", JSON.stringify(response.data))
        } catch (error) {
            dispatch({type:actionTypes.GET_PROFILE_FAIL})
        }
    }
}
