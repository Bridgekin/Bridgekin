import {
  UPDATE_DRAFT_FLAG} from '../../../actions/hiring_actions';
import merge from 'lodash/merge';
import { TemplateProtectedRoute } from '../../../util/route_util';

export default(state = true, action) => {
  Object.freeze(state);

  switch(action.type){
    case UPDATE_DRAFT_FLAG:
      return action.draftFlag;
    default:
      return state;
  }
};
