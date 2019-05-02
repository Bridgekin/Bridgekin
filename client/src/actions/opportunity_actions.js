import * as OpportunityApiUtil from '../util/opportunities_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveNetworks } from './network_actions';
// import { receiveNetworkOpps } from './network_opp_actions';
import { receiveOppPermissions,
  receiveNetworkOppPermissions,
  receiveNetworkOppPermission,
  removeNetworkOppPermission,
  receiveUserOppPermissions,
  receiveProfileOppPermissions } from './opp_permission_actions';
import { receiveUserOpportunities } from './user_opportunity_actions';
import { receiveProfileOpportunities } from './profile_opportunity_actions';
import { receiveOpportunityErrors } from './error_actions';

import { receiveConnectedOpportunities } from './connected_opportunity_actions';
import { receiveFacilitatedOpportunities } from './facilitated_opportunity_actions';
import { receivePassedOpportunities } from './passed_opportunity_actions';
import { receiveSavedOpportunities } from './saved_opportunity_actions';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_OPPORTUNITIES = 'RECEIVE_OPPORTUNITIES';
export const RECEIVE_OPPORTUNITY = 'RECEIVE_OPPORTUNITY';
export const REMOVE_OPPORTUNITY = "REMOVE_OPPORTUNITY";
export const RECEIVE_SESSION_OPPORTUNITY = "RECEIVE_SESSION_OPPORTUNITY";
export const REMOVE_SESSION_OPPORTUNITY = "REMOVE_SESSION_OPPORTUNITY";

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

export const receiveSessionOpportunity = (opportunity, subAction) => ({
  type: RECEIVE_SESSION_OPPORTUNITY,
  opportunity, subAction
});

export const removeSessionOpportunity = opportunityId => ({
  type: REMOVE_SESSION_OPPORTUNITY,
  opportunityId
});

export const fetchOpportunities = (workspaceId, option) => dispatch => (
  OpportunityApiUtil.fetchOpportunities(workspaceId, option)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveOpportunities(data.opportunities));
      dispatch(receiveNetworkOppPermissions(data.oppPermissions));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveOpportunityErrors(errors))
    })
);

export const fetchAllTouchedOpportunities = () => dispatch => (
  OpportunityApiUtil.fetchAllTouchedOpportunities()
    .then(handleErrors)
    .then(data => {
      dispatch(receiveOpportunities(data.opportunities));
      dispatch(receiveUserOppPermissions(data.userOppPermissions));
      dispatch(receiveConnectedOpportunities(data.connectedOpportunityIds))
      dispatch(receiveFacilitatedOpportunities(data.facilitatedOpportunityIds))
      dispatch(receivePassedOpportunities(data.passedOpportunityIds));
      dispatch(receiveSavedOpportunities(data.savedOpportunities))
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveOpportunityErrors(errors))
    })
);

export const fetchUserOpportunities = () => dispatch => (
  OpportunityApiUtil.fetchUserOpportunities()
    .then(handleErrors)
    .then(data => {
      dispatch(receiveOpportunities(data.opportunities));
      dispatch(receiveUserOppPermissions(data.oppPermissions));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveOpportunityErrors(errors))
    })
);

export const fetchProfileOpportunities = (profileId) => dispatch => (
  OpportunityApiUtil.fetchProfileOpportunities(profileId)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveOpportunities(data.opportunities));
      dispatch(receiveProfileOpportunities(data.filteredOpps));
    })
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
    .then(data => dispatch(receiveSessionOpportunity(data.opportunity, 'create opp')))
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
    .then(data => {
      dispatch(receiveOpportunity(data.opportunity))
      dispatch(receiveSessionOpportunity(data.opportunity, 'update opp'))
    })
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
    .then(() => dispatch(removeSessionOpportunity(id)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveOpportunityErrors(errors))
    })
);
