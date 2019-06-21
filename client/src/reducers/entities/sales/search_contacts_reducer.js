import {
  RECEIVE_SALES_CONTACT_RESULTS,
  CLEAR_SALES_CONTACT_RESULTS
} from '../../../actions/sales_contacts_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_SALES_CONTACT_RESULTS:
      return merge({}, action.contacts);
    case CLEAR_SALES_CONTACT_RESULTS:
      return {};
    default:
      return state;
  }
};
