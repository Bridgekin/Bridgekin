import * as SalesIntrosApiUtil from '../util/sales_intros_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveSalesIntroErrors } from './error_actions';
import { receiveSalesContact } from './sales_contacts_actions';

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

export const fetchSalesIntros = () => dispatch => (
  SalesIntrosApiUtil.fetchSalesIntros()
    .then(handleErrors)
    .then(data => dispatch(receiveSalesIntros(data.salesIntros)))
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
    .then(data => dispatch(receiveSalesIntro(data.salesIntros)))
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

export const deleteSalesIntro = (salesIntroId) => dispatch => (
  SalesIntrosApiUtil.deleteSalesIntro(salesIntroId)
    .then(handleErrors)
    .then(data => dispatch(removeSalesIntro(salesIntroId)))
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveSalesIntroErrors(errors))
    })
);
