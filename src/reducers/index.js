import { combineReducers } from 'redux';
import navigationReducer from './navigation.reducer';
import drawerReducer from './drawer.reducer';
import serviceReducer from './service.reducer';

const rootReducer = combineReducers({
  navigation: navigationReducer,
  drawer: drawerReducer,
  service: serviceReducer
});

export default rootReducer;
