import { combineReducers } from 'redux';
import opportuntiesReducer from './opportunities_reducer';
import usersReducer from './users_reducer';

export default combineReducers({
  opportuntiesReducer: opportuntiesReducer,
  usersReducer: usersReducer
});
