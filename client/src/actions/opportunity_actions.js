import * as OpportunityApiUtil from '../util/opportunity_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveOpportunityErrors } from './error_actions';

export const RECEIVE_OPPORTUNITIES = 'RECEIVE_OPPORTUNITIES';
export const RECEIVE_OPPORTUNITY = 'RECEIVE_OPPORTUNITY';
export const LOGOUT_OPPORTUNITY = "LOGOUT_OPPORTUNITY";

export const receiveOpportunities = opportunities => ({
  type: RECEIVE_OPPORTUNITIES,
  opportunities,
});

export const receiveOpportunity = opportunity => ({
  type: RECEIVE_OPPORTUNITY,
  opportunity,
});

export const removeOpportunity = () => ({
  type: LOGOUT_OPPORTUNITY,
});

export const fetchOpportunities = () => dispatch => (
  OpportunityApiUtil.fetchOpportunities()
    .then(handleErrors)
    .then(data => dispatch(receiveOpportunity(data.opportunity)))
    .catch(errors => dispatch(receiveOpportunityErrors(errors.errors[0])))
);

export const fetchOpportunity = (id) => dispatch => (
  OpportunityApiUtil.fetchOpportunity(id)
    .then(handleErrors)
    .then(data => dispatch(receiveOpportunity(data.opportunity)))
    .catch(errors => dispatch(receiveOpportunityErrors(errors.errors[0])))
);

export const createOpportunity = (opprtunity) => dispatch => (
  OpportunityApiUtil.createOpportunity(opprtunity)
    .then(handleErrors)
    .then(data => dispatch(receiveOpportunity(data.opportunity)))
    .catch(errors => dispatch(receiveOpportunityErrors(errors.errors[0])))
);

export const updateOpportunity = (opportunity) => dispatch => (
  OpportunityApiUtil.updateOpportunity(opportunity)
    .then(handleErrors)
    .then(data => dispatch(receiveOpportunity(data.opportunity)))
    .catch(errors => dispatch(receiveOpportunityErrors(errors.errors[0])))
);

export const deleteOpportunity = (id) => dispatch => (
  OpportunityApiUtil.deleteOpportunity(id)
    .then(handleErrors)
    .then(() => dispatch(removeOpportunity(id)))
    .catch(errors => dispatch(receiveOpportunityErrors(errors.errors[0])))
);
