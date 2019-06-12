import * as SalesApiUtil from '../util/sales_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveSalesErrors } from './error_actions';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_SEARCH_NETWORKS = 'RECEIVE_SEARCH_NETWORKS';
export const CLEAR_SEARCH_NETWORKS = 'CLEAR_SEARCH_NETWORKS';

export const retrieveSearchResults = salesNetworks => ({
  type: RECEIVE_SEARCH_NETWORKS,
  salesNetworks,
});
export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_NETWORKS,
});

export const searchNetworks = (title) => dispatch => (
  SalesApiUtil.searchNetworks(title)
    .then(handleErrors)
    .then(data => dispatch(retrieveSearchResults(data.salesNetworks)))
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveSalesErrors(errors))
    })
);

export const connectSocial = (payload) => dispatch => (
  SalesApiUtil.connectSocial(payload)
    .then(handleErrors)
    .then(data => data)
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveSalesErrors(errors))
    })
);
