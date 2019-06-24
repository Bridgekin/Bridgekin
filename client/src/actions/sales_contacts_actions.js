import * as SalesContactsApiUtil from '../util/sales_contact_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveSalesContactErrors } from './error_actions';
import { receiveUsers } from './user_actions'

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_SALES_CONTACT_RESULTS = 'RECEIVE_SALES_CONTACT_RESULTS';
export const CLEAR_SALES_CONTACT_RESULTS = 'CLEAR_SALES_CONTACT_RESULTS';

export const retrieveContactResults = contacts => ({
  type: RECEIVE_SALES_CONTACT_RESULTS,
  contacts,
});
export const clearContactResults = () => ({
  type: CLEAR_SALES_CONTACT_RESULTS,
});

export const RECEIVE_SALES_CONTACTS = 'RECEIVE_SALES_CONTACTS';
export const RECEIVE_SALES_CONTACT = 'RECEIVE_SALES_CONTACT';
export const REMOVE_SALES_CONTACT = 'REMOVE_SALES_CONTACT';

export const receiveSalesContacts = contacts => ({
  type: RECEIVE_SALES_CONTACTS,
  contacts,
});
export const receiveSalesContact = contact => ({
  type: RECEIVE_SALES_CONTACT,
  contact,
});
export const removeSalesContact = contactId => ({
  type: REMOVE_SALES_CONTACT,
  contactId
});

export const RECEIVE_FRIEND_MAP = 'RECEIVE_FRIEND_MAP';
export const CLEAR_FRIEND_MAP = 'CLEAR_FRIEND_MAP';

export const receiveFriendMap = friendMap => ({
  type: RECEIVE_FRIEND_MAP,
  friendMap,
});
export const clearFriendMap = () => ({
  type: CLEAR_FRIEND_MAP,
});


export const searchByName = (search) => dispatch => (
  SalesContactsApiUtil.searchByName(search)
    .then(handleErrors)
    .then(data => {
      dispatch(retrieveContactResults(data.salesContacts))
      dispatch(receiveUsers(data.friendUsers))
      dispatch(receiveFriendMap(data.friendMap))
    })
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveSalesContactErrors(errors))
    })
);

export const searchByCharacteristic = (search) => dispatch => (
  SalesContactsApiUtil.searchByCharacteristic(search)
    .then(handleErrors)
    .then(data => {
      dispatch(retrieveContactResults(data.salesContacts))
      dispatch(receiveUsers(data.friendUsers))
      dispatch(receiveFriendMap(data.friendMap))
    })
    .catch(errors => {
      if (!(errors instanceof Array)) {
        errors = [genericError];
      }
      dispatch(receiveSalesContactErrors(errors))
    })
);
