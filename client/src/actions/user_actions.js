import * as UserApiUtil from '../util/user_api_util';
import { receiveUserErrors } from './error_actions';
import { handleErrors } from './fetch_error_handler';

const genericError = 'Something went wrong. Please try again in a bit or contact us at admin@bridgekin.com';

export const RECEIVE_SEARCH_RESULTS_PAGE = 'RECEIVE_SEARCH_RESULTS_PAGE';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const REMOVE_USER = "REMOVE_USER";

export const receiveSearchResultsPage = searchResultIds => ({
  type: RECEIVE_SEARCH_RESULTS_PAGE,
  searchResultIds,
});

export const receiveSearchResults = searchResultIds => ({
  type: RECEIVE_SEARCH_RESULTS,
  searchResultIds,
});

export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users,
});

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user,
});

export const removeUser = userId => ({
  type: REMOVE_USER,
  userId
});

// export const addExternalUser = (user) => dispatch => (
//   UserApiUtil.addExternalUser(user)
//     .then(handleErrors)
//     .then(data => {
//       // debugger
//       return true
//     })
//     .catch(errors => {
//       if (!(errors instanceof Array)){
//         errors = [genericError];
//       }
//       dispatch(receiveUserErrors(errors))
//     })
// );

export const fetchSearchResults = (searchInput, bool) => dispatch => (
  UserApiUtil.fetchSearchResults(searchInput)
    .then(handleErrors)
    .then(data => {
      dispatch(receiveUsers(data.users));
      if(bool){
        dispatch(receiveSearchResults(data.searchUsers));
      } else {
        dispatch(receiveSearchResultsPage(data.searchUsers));
      }
    })
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveUserErrors(errors))
    })
);

export const fetchProfile = (userId) => dispatch => (
  UserApiUtil.fetchUser(userId)
    .then(handleErrors)
    .then(data => dispatch(receiveUser(data)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveUserErrors(errors))
    })
);

export const updateUser = (user) => dispatch => (
  UserApiUtil.updateUser(user)
    .then(handleErrors)
    .then(data => dispatch(receiveUser(data)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveUserErrors(errors))
    })
);

export const deleteUser = (id) => dispatch => (
  UserApiUtil.deleteUser(id)
    .then(handleErrors)
    .then(() => dispatch(removeUser(id)))
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveUserErrors(errors))
    })
);

export const resetPassword = (email) => dispatch => (
  UserApiUtil.resetPassword(email)
    .then(handleErrors)
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveUserErrors(errors))
    })
);

export const passwordUpdate = (payload) => dispatch => (
  UserApiUtil.passwordUpdate(payload)
    .then(handleErrors)
    .catch(errors => {
      if (!(errors instanceof Array)){
        errors = [genericError];
      }
      dispatch(receiveUserErrors(errors))
    })
);
