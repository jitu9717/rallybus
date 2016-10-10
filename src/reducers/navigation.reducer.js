import * as actions from '../actions';

const intialState = {
  hideNavBar: false,
  currentPage: 'home'
};

const navigationReducer = function(state = intialState, action) {
  switch(action.type) {
    case actions.TOGGLE_NAVBAR_VISIBILITY:
      return Object.assign({}, state, {hideNavBar: !action.isVisible})
    default:
      return state;
  }
};

export default navigationReducer;