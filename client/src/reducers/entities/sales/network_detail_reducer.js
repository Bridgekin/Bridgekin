import {
  RECEIVE_SALES_NETWORK_DETAILS,
  CLEAR_SALES_NETWORK_DETAILS
} from '../../../actions/sales_network_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_SALES_NETWORK_DETAILS:
      return merge({}, action.networkDetails);
    case CLEAR_SALES_NETWORK_DETAILS:
      return {};
    default:
      return state;
  }
};
