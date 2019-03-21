import * as NotificationSettingApiUtil from '../util/notification_settings_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveNotificationSettingErrors } from './error_actions';
// import { receiveUsers } from './user_actions';

const genericError = 'Something went wrong. Please again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_NOTIFICATION_SETTINGS = 'RECEIVE_NOTIFICATION_SETTINGS';
// export const RECEIVE_NOTIFICATION_SETTING = 'RECEIVE_NOTIFICATION_SETTING';
// export const REMOVE_NOTIFICATION_SETTING = "REMOVE_NOTIFICATION_SETTING";

export const receiveNotificationSettings = notificationSetting => ({
  type: RECEIVE_NOTIFICATION_SETTINGS,
  notificationSetting,
});

// export const receiveNotificationSetting = managedNetwork => ({
//   type: RECEIVE_NOTIFICATION_SETTING,
//   managedNetwork,
// });
//
// export const removeNotificationSetting = managedNetworkID => ({
//   type: REMOVE_NOTIFICATION_SETTING,
//   managedNetworkID
// });

export const fetchNotificationSettings = () => dispatch => (
  NotificationSettingApiUtil.fetchNotificationSettings()
    .then(handleErrors)
    .then(data => dispatch(receiveNotificationSettings(data.notificationSetting)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveNotificationSettingErrors(errors))
    })
);

export const updateNotificationSetting = (notificationSetting) => dispatch => (
  NotificationSettingApiUtil.updateNotificationSetting(notificationSetting)
    .then(handleErrors)
    .then(data => dispatch(receiveNotificationSettings(data.notificationSetting)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveNotificationSettingErrors(errors))
    })
);
