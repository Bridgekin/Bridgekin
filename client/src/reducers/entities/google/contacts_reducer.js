import {
  RECEIVE_GOOGLE_MATCHED_CONTACTS,
  REMOVE_GOOGLE_MATCHED_CONTACTS
} from '../../../actions/google_import_actions';

export default(state = [], action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_GOOGLE_MATCHED_CONTACTS:
      return [...action.matchedContacts];
    case REMOVE_GOOGLE_MATCHED_CONTACTS:
      return [];
    default:
      return state;
  }
};
