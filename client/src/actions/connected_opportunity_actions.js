import * as ConnectedOpportunityApiUtil from '../util/connected_opportunities_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveFacilitatedOpportunities,
  receiveFacilitatedOpportunity } from './facilitated_opportunity_actions';
import { receiveConnectedOpportunityErrors } from './error_actions';

export const RECEIVE_CONNECTED_OPPORTUNITIES = 'RECEIVE_CONNECTED_OPPORTUNITIES';
export const RECEIVE_CONNECTED_OPPORTUNITY = 'RECEIVE_CONNECTED_OPPORTUNITY';
export const REMOVE_CONNECTED_OPPORTUNITY = "REMOVE_CONNECTED_OPPORTUNITY";

export const receiveConnectedOpportunities = opportunities => ({
  type: RECEIVE_CONNECTED_OPPORTUNITIES,
  opportunities,
});

export const receiveConnectedOpportunity = opportunity => ({
  type: RECEIVE_CONNECTED_OPPORTUNITY,
  opportunity,
});

export const removeConnectedOpportunity = opportunityId => ({
  type: REMOVE_CONNECTED_OPPORTUNITY,
  opportunityId
});

export const fetchConnectedOpportunities = (networkId) => dispatch => (
  ConnectedOpportunityApiUtil.fetchConnectedOpportunities(networkId)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveConnectedOpportunities(data.connectedOpportunities))
      dispatch(receiveFacilitatedOpportunities(data.facilitatedConnectedOpportunities))
    })
    .catch(errors => dispatch(receiveConnectedOpportunityErrors(errors)))
);

export const fetchConnectedOpportunity = (id) => dispatch => (
  ConnectedOpportunityApiUtil.fetchConnectedOpportunity(id)
    .then(handleErrors)
    .then(data => dispatch(receiveConnectedOpportunity(data)))
    .catch(errors => dispatch(receiveConnectedOpportunityErrors(errors)))
);

export const createConnectedOpportunity = (opportunity) => dispatch => (
  ConnectedOpportunityApiUtil.createConnectedOpportunity(opportunity)
    .then(handleErrors)
    .then(data => dispatch(receiveConnectedOpportunity(data)))
    .catch(errors => {
      dispatch(receiveConnectedOpportunityErrors(errors))
    })
);

export const deleteConnectedOpportunity = (id) => dispatch => (
  ConnectedOpportunityApiUtil.deleteConnectedOpportunity(id)
    .then(handleErrors)
    .then(() => dispatch(removeConnectedOpportunity(id)))
    .catch(errors => dispatch(receiveConnectedOpportunityErrors(errors)))
);
