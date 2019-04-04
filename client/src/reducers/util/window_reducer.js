import { RECEIVE_DIMENSIONS } from '../../actions/util_actions';
import merge from 'lodash/merge';

export default(state = {width: window.innerWith, height: window.innerHeight}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_DIMENSIONS:
      return merge({}, {width: action.width, height: action.height})
    default:
      return state;
  }
};
