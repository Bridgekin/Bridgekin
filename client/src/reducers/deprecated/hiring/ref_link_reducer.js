import { RECEIVE_REF_LINK
} from '../../../actions/ref_link_actions';
import merge from 'lodash/merge';

export default(state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_REF_LINK:
      return merge({}, action.refLink);
    default:
      return state;
  }
};
