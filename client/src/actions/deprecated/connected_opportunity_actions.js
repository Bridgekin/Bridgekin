// import * as ConnectedOpportunityApiUtil from '../../util/deprecated/connected_opportunities_api_util';
// import { handleErrors } from '../fetch_error_handler';
// import { receiveFacilitatedOpportunities,
//   receiveFacilitatedOpportunity } from './facilitated_opportunity_actions';
// import { receiveOpportunities } from './opportunity_actions';
// import { receiveConnectedOpportunityErrors } from '../error_actions';

// const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

// export const RECEIVE_CONNECTED_OPPORTUNITIES = 'RECEIVE_CONNECTED_OPPORTUNITIES';
// export const RECEIVE_CONNECTED_OPPORTUNITY = 'RECEIVE_CONNECTED_OPPORTUNITY';
// export const REMOVE_CONNECTED_OPPORTUNITY = "REMOVE_CONNECTED_OPPORTUNITY";

// export const receiveConnectedOpportunities = connectedOppIds => ({
//   type: RECEIVE_CONNECTED_OPPORTUNITIES,
//   connectedOppIds,
// });

// export const receiveConnectedOpportunity = connectedOppId => ({
//   type: RECEIVE_CONNECTED_OPPORTUNITY,
//   connectedOppId,
// });

// export const removeConnectedOpportunity = connectedOppId => ({
//   type: REMOVE_CONNECTED_OPPORTUNITY,
//   connectedOppId
// });

// export const fetchConnectedOpportunities = (networkId) => dispatch => (
//   ConnectedOpportunityApiUtil.fetchConnectedOpportunities(networkId)
//     .then(handleErrors)
//     .then(data => {
//       dispatch(receiveOpportunities(data.opportunities))
//       dispatch(receiveConnectedOpportunities(data.connectedOpps))
//       dispatch(receiveFacilitatedOpportunities(data.facilitatedOpps))
//     })
//     .catch(errors => {
//       if (!(errors instanceof Array)){
//         errors = [genericError];
//       }
//       dispatch(receiveConnectedOpportunityErrors(errors))
//     })
// );

// export const fetchConnectedOpportunity = (id) => dispatch => (
//   ConnectedOpportunityApiUtil.fetchConnectedOpportunity(id)
//     .then(handleErrors)
//     .then(data => dispatch(receiveConnectedOpportunity(data)))
//     .catch(errors => dispatch(receiveConnectedOpportunityErrors(errors)))
// );

// export const createConnectedOpportunity = (opportunity) => dispatch => (
//   ConnectedOpportunityApiUtil.createConnectedOpportunity(opportunity)
//     .then(handleErrors)
//     .then(data => dispatch(receiveConnectedOpportunity(data)))
//     .catch(errors => {
//       if (!(errors instanceof Array)){
//         errors = [genericError];
//       }
//       dispatch(receiveConnectedOpportunityErrors(errors))
//     })
// );

// export const deleteConnectedOpportunity = (id) => dispatch => (
//   ConnectedOpportunityApiUtil.deleteConnectedOpportunity(id)
//     .then(handleErrors)
//     .then(() => dispatch(removeConnectedOpportunity(id)))
//     .catch(errors => dispatch(receiveConnectedOpportunityErrors(errors)))
// );
