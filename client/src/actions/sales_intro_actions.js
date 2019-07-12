import * as SalesIntrosApiUtil from '../util/sales_intros_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveSalesIntroErrors } from './error_actions';
import { receiveSalesContact, receiveSalesContacts } from './sales_contacts_actions';
import { receiveUsers } from './user_actions';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_SALES_INTROS = 'RECEIVE_SALES_INTROS';
export const RECEIVE_SALES_INTRO = 'RECEIVE_SALES_INTRO';
export const REMOVE_SALES_INTRO = 'REMOVE_SALES_INTRO';

export const receiveSalesIntros = intros => ({
  type: RECEIVE_SALES_INTROS,
  intros,
});
export const receiveSalesIntro = intro => ({
  type: RECEIVE_SALES_INTRO,
  intro,
});
export const removeSalesIntro = introId => ({
  type: REMOVE_SALES_INTRO,
  introId
});

export const RECEIVE_SENT_REQUESTS = 'RECEIVE_SENT_REQUESTS';
export const REMOVE_SENT_REQUEST = 'REMOVE_SENT_REQUEST';

export const receiveSentRequests = introIds => ({
  type: RECEIVE_SENT_REQUESTS,
  introIds,
});
export const removeSentRequest = introId => ({
  type: REMOVE_SENT_REQUEST,
  introId
});

export const RECEIVE_RECEIVED_REQUESTS = 'RECEIVE_RECEIVED_REQUESTS';
export const REMOVE_RECEIVED_REQUEST = 'REMOVE_RECEIVED_REQUEST';

export const receiveReceivedRequests = introIds => ({
  type: RECEIVE_RECEIVED_REQUESTS,
  introIds,
});
export const removeReceivedRequest = introId => ({
  type: REMOVE_RECEIVED_REQUEST,
  introId
});

export const fetchSalesIntros = () => dispatch => (
  SalesIntrosApiUtil.fetchSalesIntros()
    .then(handleErrors)
    .then(data => {
      dispatch(receiveSalesIntros(data.salesIntros))
      dispatch(receiveSentRequests(data.requestsSent))
      dispatch(receiveReceivedRequests(data.requestsReceived))
      dispatch(receiveSalesContacts(data.salesContacts))
      dispatch(receiveUsers(data.actors))
    })
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveSalesIntroErrors(errors))
    })
);

export const fetchSalesIntro = (introId) => dispatch => (
  SalesIntrosApiUtil.fetchSalesIntro(introId)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveSalesIntro(data.salesIntro))
      dispatch(receiveSalesContact(data.salesContact))
    })
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveSalesIntroErrors(errors))
    })
);

export const createSalesIntro = (salesIntro) => dispatch => (
  SalesIntrosApiUtil.createSalesIntro(salesIntro)
    .then(handleErrors)
    .then(data => data)
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveSalesIntroErrors(errors))
    })
);

export const respondToRequest = (response) => dispatch => (
  SalesIntrosApiUtil.respondToRequest(response)
    .then(handleErrors)
    .then(data => data)
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveSalesIntroErrors(errors))
    })
);

export const updateSalesIntro = (payload) => dispatch => (
  SalesIntrosApiUtil.updateSalesIntro(payload)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveSalesIntro(data.salesIntro));
      dispatch(receiveSalesContact(data.salesContact));
    })
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveSalesIntroErrors(errors))
    })
);

export const deleteSalesIntro = (salesIntroId) => dispatch => (
  SalesIntrosApiUtil.deleteSalesIntro(salesIntroId)
    .then(handleErrors)
    .then(data => {
      dispatch(removeSentRequest(salesIntroId))
      dispatch(removeSalesIntro(salesIntroId))
    })
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveSalesIntroErrors(errors))
    })
);
