import {
  RECEIVE_NOTIFICATIONS,
  RECEIVE_NOTIFICATION,
  REMOVE_NOTIFICATION} from '../../../actions/notification_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_NOTIFICATIONS:
      return merge({}, state, action.notifications);
    case RECEIVE_NOTIFICATION:
      return Object.assign({}, state, {[action.notification.id]: action.notification})
    case REMOVE_NOTIFICATION:
      delete newState[action.notificationId]
      return newState;
    default:
      return state;
  }
};
