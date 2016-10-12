import * as actions from '../actions';

const initialState = {
  isLoggedIn: false,
  loggingIn: false,
  info: null
};

const userReducer = function (state = initialState, action) {
  switch (action.type) {
    case actions.INITIATE_USER_LOGIN:
      return Object.assign({}, state, { loggingIn: true });
    case actions.USER_LOGIN_SUCCESS:
      return Object.assign({}, state, { isLoggedIn: true, loggingIn: false, info: action.user });
    case actions.USER_LOGOUT:
      return Object.assign({}, state, { isLoggedIn: false, info: null });
    case actions.USER_LOGIN_FAILED:
      return Object.assign({}, state, { isLoggedIn: false, info: null, loggingIn: false });
    default:
      return state;
  }
};

export default userReducer;