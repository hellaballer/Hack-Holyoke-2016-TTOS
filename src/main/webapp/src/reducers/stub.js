import {FETCH_STUB_REQUEST, FETCH_STUB_SUCCESS, FETCH_STUB_FAIL} from 'actions/stub';

const initialState = {
    videoURL: '',
    status: ''
};

// Reducer

export default function stubReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_STUB_REQUEST:
            return {
                ...state,
                status: 'REQUEST'
            };
        case FETCH_STUB_SUCCESS:
            return {
                ...state,
                videoURL: action.result.data,
                status: 'SUCCESS'
            };
        case FETCH_STUB_FAIL:
            return {
                ...state,
                status: 'FAIL'
            };
        default:
            return state;
    }
}

