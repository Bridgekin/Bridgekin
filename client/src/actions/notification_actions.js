import * as NotificationApiUtil from '../util/notifications_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveNotificationErrors } from './error_actions';
import { receiveUsers } from './user_actions';

const genericError = 'Something went wrong. Please again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_NOTIFICATIONS = 'RECEIVE_NOTIFICATIONS';
export const RECEIVE_NOTIFICATION = 'RECEIVE_NOTIFICATION';
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";

export const receiveNotifications = notifications => ({
  type: RECEIVE_NOTIFICATIONS,
  notifications,
});

export const receiveNotification = notification => ({
  type: RECEIVE_NOTIFICATION,
  notification,
});

export const removeNotification = notificationID => ({
  type: REMOVE_NOTIFICATION,
  notificationID
});

export const fetchNotifications = () => dispatch => (
  NotificationApiUtil.fetchNotifications()
    .then(handleErrors)
    .then(data => {
      dispatch(receiveNotifications(data.notifications))
      dispatch(receiveUsers(data.users))
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveNotificationErrors(errors))
    })
);

export const updateAsRead = (notificationIds) => dispatch => (
  NotificationApiUtil.updateAsRead(notificationIds)
    .then(handleErrors)
    .then(data => dispatch(receiveNotifications(data.notifications)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveNotificationErrors(errors))
    })
);
