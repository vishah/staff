import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (accessToken, refreshToken, expiresIn, expiresInSeconds,
                            userRoleAdmin, userRoleModerator, userRoleStandard) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: expiresIn,
        expires_in_seconds: expiresInSeconds,
        user_role_admin: userRoleAdmin,
        user_role_moderator: userRoleModerator,
        user_role_standard: userRoleStandard
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};
export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

export const login = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
        };

        let url = 'https://housing-api.stag.mpao.mv/auth/signin';

        axios.post(url,
            authData)
            .then(response => {
                dispatch(authSuccess(response.data.access_token
                                    ));
            })
            .catch(err => {
                console.log("err",err);
                //dispatch(authFail(err.response.data.error))
                dispatch(authFail("Error logging in"));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = (accessToken) => {
    return dispatch => {
        if (!accessToken) {
            dispatch(logout());
        }

    };
};
