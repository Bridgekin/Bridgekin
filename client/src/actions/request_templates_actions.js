import * as RequestTemplateApiUtil from '../util/request_templates_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveRequestTemplateErrors } from './error_actions';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_REQUEST_TEMPLATES = 'RECEIVE_REQUEST_TEMPLATES';
export const RECEIVE_REQUEST_TEMPLATE = 'RECEIVE_REQUEST_TEMPLATE';
export const REMOVE_REQUEST_TEMPLATE = 'REMOVE_REQUEST_TEMPLATE';

export const receiveRequestTemplates = requestTemplates => ({
  type: RECEIVE_REQUEST_TEMPLATES,
  requestTemplates,
});
export const receiveRequestTemplate = requestTemplate => ({
  type: RECEIVE_REQUEST_TEMPLATE,
  requestTemplate,
});
export const removeRequestTemplate = requestTemplateId => ({
  type: REMOVE_REQUEST_TEMPLATE,
  requestTemplateId
});

export const fetchRequestTemplates = () => dispatch => (
  RequestTemplateApiUtil.fetchRequestTemplates()
    .then(handleErrors)
    .then(data => {
      dispatch(receiveRequestTemplates(data.requestTemplates))
    })
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveRequestTemplateErrors(errors))
    })
);

export const createRequestTemplate = (payload) => dispatch => (
  RequestTemplateApiUtil.createRequestTemplate(payload)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveRequestTemplate(data.requestTemplate))
      return data.requestTemplate
    })
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveRequestTemplateErrors(errors))
    })
);
