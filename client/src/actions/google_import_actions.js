import * as GoogleImportApiUtil from '../util/google_import_api_util';
import { handleErrors } from './fetch_error_handler';
import { receiveGoogleImportErrors } from './error_actions';
import { receiveUsers } from './user_actions';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_GOOGLE_MATCHED_CONTACTS = 'RECEIVE_GOOGLE_MATCHED_CONTACTS';
export const REMOVE_GOOGLE_MATCHED_CONTACTS = "REMOVE_GOOGLE_MATCHED_CONTACTS";

export const receiveGoogleMatchedContacts = matchedContacts => ({
  type: RECEIVE_GOOGLE_MATCHED_CONTACTS,
  matchedContacts,
});

export const removeGoogleMatchedContacts = () => ({
  type: REMOVE_GOOGLE_MATCHED_CONTACTS
});

export const fetchGoogleMatchedContacts = (contacts) => dispatch => (
  GoogleImportApiUtil.fetchGoogleMatchedContacts(contacts)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveUsers(data.users));
      dispatch(receiveGoogleMatchedContacts(data.contacts));
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveGoogleImportErrors(errors))
    })
);
