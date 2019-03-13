import { combineReducers } from 'redux';
import inviteReducer from './invite_reducer';

export default combineReducers({
  invite: inviteReducer,
});
