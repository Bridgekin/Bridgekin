import {
  RECEIVE_DIRECT_LINK,
  REMOVE_DIRECT_LINK} from '../../actions/direct_link_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  // let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_DIRECT_LINK:
      return merge({}, action.directLink);
    case REMOVE_DIRECT_LINK:
      return {};
    default:
      return state;
  }
};
