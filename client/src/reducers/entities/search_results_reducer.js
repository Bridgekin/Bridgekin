import {RECEIVE_SEARCH_RESULTS} from '../../actions/user_actions';

export default(state = [], action) => {
  Object.freeze(state);

  switch(action.type){
    case RECEIVE_SEARCH_RESULTS:
      return [...action.searchResultIds];
    default:
      return state;
  }
};
