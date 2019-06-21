import {
  RECEIVE_SENT_REQUESTS,
  REMOVE_SENT_REQUEST
} from '../../../actions/sales_intro_actions';

export default (state = new Set(), action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SENT_REQUESTS:
      return new Set([...action.introIds])
    case REMOVE_SENT_REQUEST:
      let newState = new Set([...state]);
      newState.delete(action.introId)
      return newState;
    default:
      return state;
  }
};
