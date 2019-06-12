import {
  RECEIVE_SEARCH_NETWORKS,
  CLEAR_SEARCH_NETWORKS
} from '../../../actions/sales_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_SEARCH_NETWORKS:
      return merge({}, action.salesNetworks);
    case CLEAR_SEARCH_NETWORKS:
      return {};
    default:
      return state;
  }
};
