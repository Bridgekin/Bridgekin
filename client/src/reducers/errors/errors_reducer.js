import { combineReducers } from 'redux';
import LoginErrorsReducer from './login_errors_reducer';
import UsersErrorsReducer from './users_errors_reducer';

export default combineReducers({
  login: LoginErrorsReducer,
  users: UsersErrorsReducer
});
