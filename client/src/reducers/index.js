import { combineReducers } from 'redux';
import authReducer from './authReducer';

import userReducer from './user_reducer';

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
});

export default rootReducer;