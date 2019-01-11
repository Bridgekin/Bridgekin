import {
  RECEIVE_EMAIL_NOTIFICATION,
  REMOVE_EMAIL_NOTIFICATION} from '../../actions/email_notification_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_EMAIL_NOTIFICATION:
      return merge({}, action.notification);
    case REMOVE_EMAIL_NOTIFICATION:
      delete newState[action.notificationId];
      return newState;
    default:
      return state;
  }
};
