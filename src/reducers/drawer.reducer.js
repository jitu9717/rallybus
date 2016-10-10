import * as types from '../actions/drawer.action';
import AllowedFeatures from '../env/features';

let initialList = [
  { linkIcon: 'content-paste', primaryText: 'SERVICE', componentToShow: 'ServiceComponent', name: 'service'},
  { linkIcon: 'home', primaryText: 'HOME', componentToShow: 'HomeComponent', name: 'home'},
  { linkIcon: 'exit-to-app', primaryText: 'Logout', name: 'logout' }
];

let listWithAllowedFeatures = initialList.filter(function(item, index){
    return AllowedFeatures[item.name];
});

const initialState = {
  list: listWithAllowedFeatures,
  date : ""
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case types.UPDATE_MENU_ITEMS:
      return Object.assign({}, state, {list: action.list});
    default:
      return state;
  }
}