import * as types from '../actions/service.action'

const initialState = {
  serviceList: [],
  nextService: 0,
  isStarted: false,
  startedEvent: {},
  showToaster: false,
  toasterMessage: null,
  toasterColor: null,
  toasterType: null,
  serviceName: '',
  isSensitive: false
};

const serviceReducer = function (state = initialState, action) {
  switch (action.type) {
    case types.INITIATE_FETCH_LIST: {
      return state;
    }
    case types.FETCH_LIST_SUCCESS: {
      return Object.assign({}, state, { serviceList: action.list });
    }
    case types.FETCH_LIST_FAILURE: {
      return Object.assign({}, state, { serviceList: [] });
    }
    case types.INITIATE_START_SERVICE: {
      return state;
    }
    case types.START_SERVICE_SUCCESS: {

      let elementPos = state.serviceList.map(function(x) {return x.id; }).indexOf(state.startedEvent.id);
      let objectFound = state.serviceList[elementPos];
      objectFound['started-at'] = action.response.data.attributes['started-at'];
      let newServiceList = state.serviceList;
      newServiceList[elementPos] = objectFound;
      return Object.assign({}, state, { isStarted: true , startedEvent:objectFound, serviceList: newServiceList});
    }
    case types.START_SERVICE_FAILURE: {
      return Object.assign({}, state, { isStarted: false });
    }
    case types.SET_START_SERVICE_INFO: {
      return Object.assign({}, state, { startedEvent: action.firstservice , serviceName: action.serviceName});
    }
    case types.INITIATE_END_SERVICE: {
      return state;
    }
    case types.SERVICE_DONE: {
      return Object.assign({}, state, { isStarted: false, nextService: action.next+1 });
    }
    case types.END_SERVICE_SUCCESS: {
      let nextService = state.nextService + 1;
      return Object.assign({}, state, { isStarted: false, nextService: nextService});
    }
    case types.END_SERVICE_FAILURE: {
      return Object.assign({}, state, {});
    }
    case types.STARTED_NEW_SERVICE: {
      return Object.assign({}, state, {nextService: action.next + 1});
    }
    case types.GET_FROM_STORAGE: {
      if(action.serviceSates.isStarted){
        var elementPos = state.serviceList.map(function(x) {return x.id; }).indexOf(action.serviceSates.startedEvent);
        var objectFound = state.serviceList[elementPos];
        if(state.serviceList.length>0){
          objectFound['started-at'] = action.serviceSates.startedTime;
          return Object.assign({}, state, {
            nextService: action.serviceSates.nextService,
            isStarted: action.serviceSates.isStarted,
            serviceName: action.serviceSates.serviceName,
            isSensitive: action.serviceSates.isSensitive || false,
            startedEvent: objectFound
          });
        }
      }

      else{
        return Object.assign({}, state, {
          nextService: action.serviceSates.nextService,
          isStarted: action.serviceSates.isStarted
        });
      }
    }

    case types.SERVICE_READY: {
      return Object.assign({}, state, {nextService: action.counter});
    }

    case types.IS_SENSITIVE: {
      return Object.assign({}, state, {isSensitive: action.isSensitive});
    }
    case types.SHOW_TOASTER: {
      return Object.assign({}, state, {
        showToaster: true,
        toasterMessage: action.toaster.message,
        toasterColor: action.toaster.color,
        toasterType: action.toaster.type
      });
    }

    case types.HIDE_TOASTER: {
      return Object.assign({}, state, {
        showToaster: false,
        toasterMessage: null,
        toasterColor: null,
        toasterType: null
      });
    }
    default:
      return state;
  }
};

export default serviceReducer;