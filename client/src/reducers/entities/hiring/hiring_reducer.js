import { combineReducers } from 'redux';

import draftPostingReducer from './draft_posting_reducer.js';
import draftFlagReducer from './draft_flag_reducer.js';
import refOppsReducer from './ref_opps_reducer.js'
import refApplicationReducer from './ref_application_reducer.js'
import submittedApplicationReducer from './submitted_application_reducer.js'
import ownedApplicationReducer from './owned_application_reducer.js'
import refLinkReducer from './ref_link_reducer.js'

export default combineReducers({
  draftPosting: draftPostingReducer,
  draftFlag: draftFlagReducer,
  refOpps: refOppsReducer,
  refApps: refApplicationReducer,
  submittedApps: submittedApplicationReducer,
  ownedApps: ownedApplicationReducer,
  refLink: refLinkReducer,
})