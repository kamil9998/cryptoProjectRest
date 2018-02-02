import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import balanceReducer from './balance_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  balance: balanceReducer
});

export default rootReducer;
