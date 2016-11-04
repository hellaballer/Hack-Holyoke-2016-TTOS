export const FETCH_STUB_REQUEST = 'stub/FETCH_STUB_REQUEST';
export const FETCH_STUB_SUCCESS = 'stub/FETCH_STUB_SUCCESS';
export const FETCH_STUB_FAIL = 'stub/FETCH_STUB_FAIL';

/**
 * Async GET request
 * @param paramValue - value to send in the parameters
 * @param onSuccess - callback function to execute onSuccess of the call
 * @returns {{types: *[], promise: (function(*): *)}}
 */
export function fetchStub(paramValue, onSuccess) {
    return  {
        types: [FETCH_STUB_REQUEST, FETCH_STUB_SUCCESS, FETCH_STUB_FAIL],
        promise: client => client.get('/api/stub', {params:{paramValue: paramValue},
            onSuccess: onSuccess()})
    };
}