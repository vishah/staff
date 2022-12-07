import * as actionTypes from './actionTypes';
import axios from 'axios';

export const staffSearchStart = () => {
    return {
        type: actionTypes.STAFF_SEARCH_START
    };
};

export const staffSearchSuccess = (data) => {
    return {
        type: actionTypes.STAFF_SEARCH_SUCCESS,
        data: data,
    };
};

export const staffSearchFail = (error) => {
    return {
        type: actionTypes.STAFF_SEARCH_FAIL,
        error: error
    };
};

export const searchStaff = (id_card_no, token) => {
    return dispatch => {
        dispatch(staffSearchStart());
        console.log(token)

        let url = 'https://housing-api.stag.mpao.mv/employments/' + id_card_no + '/1';
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        axios.get(url,
            config)
            .then(response => {
                dispatch(staffSearchSuccess(response.data
                ));
            })
            .catch(err => {
                //dispatch(authFail(err.response.data.error))
                dispatch(staffSearchFail("Error searching staff"));
            });
    };
};

