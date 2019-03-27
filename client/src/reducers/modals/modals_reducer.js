import { combineReducers } from 'redux';
import inviteReducer from './invite_reducer';
import createCircleReducer from './create_circle_reducer';
import circleReducer from './circle_reducer';
import customEmailReducer from './custom_email_reducer';

export default combineReducers({
  invite: inviteReducer,
  createCircle: createCircleReducer,
  circle: circleReducer,
  customEmail: customEmailReducer
});
