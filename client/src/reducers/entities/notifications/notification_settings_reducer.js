import {
  RECEIVE_NOTIFICATION_SETTINGS,
  // RECEIVE_NOTIFICATION_SETTING,
  // REMOVE_NOTIFICATION_SETTING
} from '../../../actions/notification_setting_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_NOTIFICATION_SETTINGS:
      return merge({}, action.notificationSetting);
    default:
      return state;
  }
};
