import * as EmailTemplateApiUtil from '../util/email_template_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveEmailTemplateErrors } from './error_actions';

const genericError = 'Something went wrong. Please again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_EMAIL_TEMPLATE = 'RECEIVE_EMAIL_TEMPLATE';
export const REMOVE_EMAIL_TEMPLATE = "REMOVE_EMAIL_TEMPLATE";

export const receiveEmailTemplate = template => ({
  type: RECEIVE_EMAIL_TEMPLATE,
  template,
});

export const removeEmailTemplate = () => ({
  type: REMOVE_EMAIL_TEMPLATE
});

export const fetchEmailTemplate = (templateType) => dispatch => (
  EmailTemplateApiUtil.fetchEmailTemplate(templateType)
    .then(handleErrors)
    .then(data => dispatch(receiveEmailTemplate(data.template)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveEmailTemplateErrors(errors))
    })
);

// export const fetchConnectionTemplate = (connectBool) => dispatch => (
//   EmailTemplateApiUtil.fetchConnectionTemplate(connectBool)
//     .then(handleErrors)
//     .then(data => dispatch(receiveEmailTemplate(data.template)))
//     .catch(errors => {
//       if (!(errors instanceof Array)){
//         errors = [genericError];
//       }
//       dispatch(receiveEmailTemplateErrors(errors))
//     })
// );

export const fetchWaitlistReferralTemplate = (email) => dispatch => (
  EmailTemplateApiUtil.fetchWaitlistReferralTemplate(email)
    .then(handleErrors)
    .then(data => dispatch(receiveEmailTemplate(data.template)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveEmailTemplateErrors(errors))
    })
);
