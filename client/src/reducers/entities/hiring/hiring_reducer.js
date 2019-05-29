import { combineReducers } from 'redux';

import draftPostingReducer from './draft_posting_reducer.js';
import draftFlagReducer from './draft_flag_reducer.js';

export default combineReducers({
  draftPosting: draftPostingReducer,
  draftFlag: draftFlagReducer
})