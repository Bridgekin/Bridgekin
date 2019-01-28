import * as OpportunityApiUtil from '../util/opportunities_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveOpportunityErrors } from './error_actions';

const genericError = 'Something went wrong. Please again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_OPPORTUNITIES = 'RECEIVE_OPPORTUNITIES';
export const RECEIVE_OPPORTUNITY = 'RECEIVE_OPPORTUNITY';
export const REMOVE_OPPORTUNITY = "REMOVE_OPPORTUNITY";

export const receiveOpportunities = opportunities => ({
  type: RECEIVE_OPPORTUNITIES,
  opportunities,
});

export const receiveOpportunity = opportunity => ({
  type: RECEIVE_OPPORTUNITY,
  opportunity,
});

export const removeOpportunity = opportunityId => ({
  type: REMOVE_OPPORTUNITY,
  opportunityId
});

export const fetchOpportunities = (networkId) => dispatch => (
  OpportunityApiUtil.fetchOpportunities(networkId)
    .then(handleErrors)
    .then(data => dispatch(receiveOpportunities(data)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveOpportunityErrors(errors))
    })
);

export const fetchUserOpportunities = (networkId) => dispatch => (
  OpportunityApiUtil.fetchUserOpportunities(networkId)
    .then(handleErrors)
    .then(data => dispatch(receiveOpportunities(data)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveOpportunityErrors(errors))
    })
);

export const fetchOpportunity = (id) => dispatch => (
  OpportunityApiUtil.fetchOpportunity(id)
    .then(handleErrors)
    .then(data => dispatch(receiveOpportunity(data.opportunity)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveOpportunityErrors(errors))
    })
);

export const createOpportunity = (opportunity) => dispatch => (
  OpportunityApiUtil.createOpportunity(opportunity)
    .then(handleErrors)
    .then(data => dispatch(receiveOpportunity(data.opportunity)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveOpportunityErrors(errors))
    })
);

export const updateOpportunity = (opportunity) => dispatch => (
  OpportunityApiUtil.updateOpportunity(opportunity)
    .then(handleErrors)
    .then(data => dispatch(receiveOpportunity(data)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveOpportunityErrors(errors))
    })
);

export const deleteOpportunity = (id) => dispatch => (
  OpportunityApiUtil.deleteOpportunity(id)
    .then(handleErrors)
    .then(() => dispatch(removeOpportunity(id)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveOpportunityErrors(errors))
    })
);
