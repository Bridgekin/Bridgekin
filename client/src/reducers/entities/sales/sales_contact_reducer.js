import {
  RECEIVE_SALES_CONTACTS,
  RECEIVE_SALES_CONTACT,
  REMOVE_SALES_CONTACT
} from '../../../actions/sales_contacts_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_SALES_CONTACTS:
      return merge({}, state, action.contacts);
    case RECEIVE_SALES_CONTACT:
      return merge({}, state, {[action.contact.id]: action.contact });
    case REMOVE_SALES_CONTACT:
      delete newState[action.contactId]
      return newState;
    default:
      return state;
  }
};
