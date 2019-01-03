import { combineReducers } from 'redux';
import opportuntiesReducer from './opportunities_reducer';

export default combineReducers({
  opportuntiesReducer: opportuntiesReducer
});
