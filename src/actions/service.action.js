export const INITIATE_FETCH_LIST = 'INITIATE_FETCH_LIST';
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';
export const FETCH_LIST_FAILURE = 'FETCH_LIST_FAILURE';
export const INITIATE_START_SERVICE = 'INITIATE_START_SERVICE';
export const START_SERVICE_SUCCESS = 'START_SERVICE_SUCCESS';
export const START_SERVICE_FAILURE = 'START_SERVICE_FAILURE';
export const SET_START_SERVICE_INFO = 'SET_START_SERVICE_INFO';
export const INITIATE_END_SERVICE = 'INITIATE_END_SERVICE';
export const END_SERVICE_SUCCESS = 'END_SERVICE_SUCCESS';
export const END_SERVICE_FAILURE = 'END_SERVICE_FAILURE';
export const SHOW_TOASTER = 'SHOW_TOASTER';
export const HIDE_TOASTER = 'HIDE_TOASTER';
export const GET_FROM_STORAGE = 'GET_FROM_STORAGE';
export const SERVICE_DONE = 'SERVICE_DONE';
export const STARTED_NEW_SERVICE = 'STARTED_NEW_SERVICE';
export const IS_SENSITIVE = 'IS_SENSITIVE';
export const SERVICE_READY = 'SERVICE_READY';

export function initiateFetchServiceList() {
    return {
        type: INITIATE_FETCH_LIST
    }
}

export function fetchServiceListSuccess(list) {
    return {
        type: FETCH_LIST_SUCCESS,
        list
    }
}

export function fetchServiceListFailure(error) {
    return {
        type: FETCH_LIST_FAILURE,
        error
    }
}

export function initiateStartService() {
    return {
        type: INITIATE_START_SERVICE
    }
}

export function startServiceSuccess(response) {
    return {
        type: START_SERVICE_SUCCESS,
        response
    }
}

export function startServiceFailure(error) {
    return {
        type: START_SERVICE_FAILURE,
        error
    }
}

export function setStartServiceInfo(firstservice,  serviceName) {
    return {
        type: SET_START_SERVICE_INFO,
        firstservice,
        serviceName,
    }
}

export function initiateEndService() {
    return {
        type: INITIATE_END_SERVICE
    }
}

export function endServiceSuccess(response) {
    return {
        type: END_SERVICE_SUCCESS,
        response
    }
}

export function endServiceFailure(error) {
    return {
        type: END_SERVICE_FAILURE,
        error
    }
}


export function showToaster(toaster){
    return {
        type:SHOW_TOASTER,
        toaster
    }
}

export function hideToaster(){
    return {
        type:HIDE_TOASTER
    }
}

export function getServiceSatesFromStorage(serviceSates) {
    return {
        type: GET_FROM_STORAGE,
        serviceSates
    }
}

export function nextServiceReady(next) {
    return {
        type: SERVICE_DONE,
        next
    }
}

export function setServiceReady(counter) {
    return {
        type: SERVICE_READY,
        counter
    }
}

export function setIsSensitive(isSensitive){
    return{
        type: IS_SENSITIVE,
        isSensitive
    }
}

