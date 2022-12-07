import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    data: null,
    access_token: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}
const staffSearchStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const staffSearchSuccess = (state, action) => {
    return updateObject(state, {
        data: action.data,
        error: null,
        loading: false
    });
};

const staffSearchFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STAFF_SEARCH_START: return staffSearchStart(state, action)
        case actionTypes.STAFF_SEARCH_SUCCESS: return staffSearchSuccess(state, action)
        case actionTypes.STAFF_SEARCH_FAIL: return staffSearchFail(state, action)
        default:
            return state
    }
}
export default reducer;
