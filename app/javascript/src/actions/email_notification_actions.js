import * as EmailNotificationApiUtil from '../util/email_notification_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveNotificationErrors } from './error_actions';

const genericError = 'Something went wrong. Please again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_EMAIL_NOTIFICATION = 'RECEIVE_EMAIL_NOTIFICATION';
export const REMOVE_EMAIL_NOTIFICATION = "REMOVE_EMAIL_NOTIFICATION";

export const receiveEmailNotification = notification => ({
  type: RECEIVE_EMAIL_NOTIFICATION,
  notification,
});

export const removeEmailNotification = notificationId => ({
  type: REMOVE_EMAIL_NOTIFICATION,
  notificationId
});

export const fetchEmailNotification = () => dispatch => (
  EmailNotificationApiUtil.fetchEmailNotification()
    .then(handleErrors)
    .then(data => dispatch(receiveEmailNotification(data)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveNotificationErrors(errors))
    })
);

export const createEmailNotification = (notification) => dispatch => (
  EmailNotificationApiUtil.createEmailNotification(notification)
    .then(handleErrors)
    .then(data => dispatch(receiveEmailNotification(data)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveNotificationErrors(errors))
    })
);
