import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import questionsReducer from './questions/reducer';

export default combineReducers({
  auth: authReducer,
  questions: questionsReducer,
});
