import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import configureStore from './store/store';
import * as SessionApiUtil from './util/session_api_util';
import * as WaitlistApiUtil from './util/waitlist_api_util';
import './index.css';

import { handleAuthErrors } from './actions/fetch_error_handler';
import { getAuthUserId } from './util/session_api_util';
import { receiveCurrentUser } from './actions/session_actions';
import { receiveUser } from './actions/user_actions';

import GenericLogo from './static/castle.jpg';

document.addEventListener("DOMContentLoaded", () => {

  const root = document.getElementById('root');
  let preloadedState = {
    siteTemplate: {
      navLogo: GenericLogo,
      network: null
    }
  };
  let token = localStorage.getItem('bridgekinToken');

  if (token){
    getAuthUserId(token)
    .then(handleAuthErrors)
    .then( ({user, token, siteTemplate, workspaces}) => {
      let preloadedState = {
        users: { [user.id]: user},
        session: { id: user.id},
        siteTemplate,
        workspaces
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

  // window.getTemplate = SiteTemplateApiUtil.fetchSiteTemplate;
});
