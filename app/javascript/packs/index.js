import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../src/root';
import configureStore from '../src/store/store';
import * as SessionApiUtil from '../src/util/session_api_util';
import * as WaitlistApiUtil from '../src/util/waitlist_api_util';
import '../src/index.css';

import { handleAuthErrors } from '../src/actions/fetch_error_handler';
import { getAuthUserId } from '../src/util/session_api_util';
import { receiveCurrentUser } from '../src/actions/session_actions';
import { receiveUser } from '../src/actions/user_actions';

document.addEventListener("DOMContentLoaded", () => {

  const root = document.getElementById('root');
  let preloadedState = undefined;
  let token = localStorage.getItem('bridgekinToken');

  if (token){
    getAuthUserId(token)
    .then(handleAuthErrors)
    .then( ({user}) => {
      let preloadedState = {
        users: { [user.id]: user},
        session: { id: user.id}
      };
      let store = configureStore(preloadedState);
      console.log('Rendering site');
      ReactDOM.render(<Root store={store}/>, root);
    })
    .catch(() => {
      localStorage.removeItem('bridgekinToken');
      let store = configureStore(preloadedState);
      ReactDOM.render(<Root store={store}/>, root);
    })
  } else {
    let store = configureStore(preloadedState);
    ReactDOM.render(<Root store={store}/>, root);
  }

  // window.signup = SessionApiUtil.signup;
  window.login = SessionApiUtil.login;
  window.logout = SessionApiUtil.logout;
  window.getAuthUserId = SessionApiUtil.getAuthUserId;

  window.joinWaitlist = WaitlistApiUtil.joinWaitlist;
});
