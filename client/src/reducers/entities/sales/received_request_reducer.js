import {
  RECEIVE_RECEIVED_REQUESTS,
  REMOVE_RECEIVED_REQUEST
} from '../../../actions/sales_intro_actions';

export default (state = new Set(), action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_RECEIVED_REQUESTS:
      return new Set([...action.introIds])
    case REMOVE_RECEIVED_REQUEST:
      let newState = new Set([...state]);
      newState.delete(action.introId)
      return newState;
    default:
      return state;
  }
};
