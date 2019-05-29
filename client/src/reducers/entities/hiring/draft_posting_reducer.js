import {
  UPDATE_DRAFT_POSTING,
  RESET_DRAFT_POSTING } from '../../../actions/hiring_actions';
import merge from 'lodash/merge';

const DEFAULT_STATE = {
  title: '',
  description: '',
  type: '',
  company: '',
  compensation: '',
  city: '',
  state: '',
  zipcode: '',
  interviewIncentive: 0,
  hireIncentive: 0
  // market: '',
}

export default(state = DEFAULT_STATE, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case UPDATE_DRAFT_POSTING:
      return merge({}, state, action.draftPosting);
    case RESET_DRAFT_POSTING:
      return {};
    default:
      return state;
  }
};
