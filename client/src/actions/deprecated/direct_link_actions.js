// import * as DirectLinkApiUtil from '../../util/deprecated/direct_links_api_util';
// import { handleErrors } from '../fetch_error_handler';
// import { receiveDirectLinkErrors } from '../error_actions';
// import { receiveOpportunities } from './opportunity_actions';
// import { receiveUser } from '../user_actions';

// const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

// export const RECEIVE_DIRECT_LINK = 'RECEIVE_DIRECT_LINK';
// export const REMOVE_DIRECT_LINK = "REMOVE_DIRECT_LINK";

// export const receiveDirectLink = directLink => ({
//   type: RECEIVE_DIRECT_LINK,
//   directLink,
// });

// export const removeDirectLink = () => ({
//   type: REMOVE_DIRECT_LINK,
// });

// export const createDirectLink = (opportunityIds) => dispatch => (
//   DirectLinkApiUtil.createDirectLink(opportunityIds)
//     .then(handleErrors)
//     .then(data => dispatch(receiveDirectLink(data.directLink)))
//     .catch(errors => {
//       if (!(errors instanceof Array)){
//         errors = [genericError];
//       }
//       dispatch(receiveDirectLinkErrors(errors))
//     })
// );

// export const fetchDirectLink = (linkCode) => dispatch => (
//   DirectLinkApiUtil.fetchDirectLink(linkCode)
//     .then(handleErrors)
//     .then(data => {
//       dispatch(receiveDirectLink(data.directLink))
//       dispatch(receiveOpportunities(data.opportunities))
//       dispatch(receiveUser(data.user))
//     })
//     .catch(errors => {
//       if (!(errors instanceof Array)){
//         errors = [genericError];
//       }
//       dispatch(receiveDirectLinkErrors(errors))
//     })
// );
