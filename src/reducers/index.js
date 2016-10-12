import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import navigationReducer from './navigation.reducer';
import drawerReducer from './drawer.reducer';
import serviceReducer from './service.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  navigation: navigationReducer,
  drawer: drawerReducer,
  service: serviceReducer
});

export default rootReducer;
