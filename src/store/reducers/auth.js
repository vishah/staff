import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    access_token: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}
const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        access_token: action.access_token,
        error: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        access_token: null
    });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path });
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)
        default:
            return state
    }
}
export default reducer;
