import * as Sentry from "@sentry/browser";
import Raven from "raven-js";
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/root_reducer';
import createRavenMiddleware from "raven-for-redux";
import createSentryMiddleware from "redux-sentry-middleware";
import bugsnagMiddleware from 'redux-bugsnag-middleware';

import amplitude from 'amplitude-js';
import Amplitude, { logEvent } from '@redux-beacon/amplitude';
import { createMiddleware, createMetaReducer } from 'redux-beacon';
import analytics from 'redux-analytics';

const prod = process.env.NODE_ENV === 'production';

// const prod = process.env.NODE_ENV === 'development';
// debugger
// Initialize Amplitude
// const amplitudeInstance = amplitude.getInstance();
// amplitudeInstance.init('36ef97cd7f0c786ba501c0a558c783c3');
// RAILS.ENV('')

// amplitudeInstance.logEvent('Test')
// const target = Amplitude({ instance: amplitudeInstance });

// const eventsMap = {
//   '*': logEvent((action, prevState, nextState) => {
//     return {
//     category: 'redux',
//     action: 'test'
//   }}),
// }

// const amplitudeMiddleware = createMiddleware(eventsMap, target);

// let trackEvent = logEvent((action, prevState, nextState) => ({
//     category: 'redux',
//     action: action.type,
//   }))
//
// const eventsMapper = (action) => {
//   switch(action.type) {
//     case 'other':
//       return '';
//     default:
//       debugger
//       return trackEvent;
//   }
// }

// const analyticsMiddleware = analytics(({ type, payload }) => {
//   amplitudeInstance.logEvent(action => ({
//     category: 'redux',
//     action: action.type
//   }))
// });

// const customMiddleWare = store => next => action => {
//   console.log("Middleware triggered:");
//   window.amplitudeInstance.logEvent(action)
//   // if(!(action instanceof Function)){
//   //   window.amplitudeInstance.logEvent((action, store) => ({
//   //     category: 'redux',
//   //     action
//   //   }))
//   // }
//   return next(action);
// }
const facebookPixelMiddleWare = store => next => action => {
  switch(action.type){
    case 'REQUEST_SALES_DEMO':
      window.ReactPixel.track('Lead', { demoType: 'sales'})
      break;
    default:
      break;
  }
  return next(action);
}

const customAmplitudeMiddleWare = store => next => action => {
  console.log("Middleware triggered:");
  if(!(action instanceof Function)){
    window.amplitudeInstance.logEvent(action.type)
  }
  return next(action);
}

// Sentry State Transformer
const stateTransformer = state => {
  // make sure you don't change state tree
  const stateCopy = Object.assign({}, state);
  // make sure you don't change billing object (by reference)
  const usersCopy = Object.assign({}, stateCopy.users);
  let usersKeys = Object.keys(usersCopy)
  for(let i = 0; i < usersKeys.length; i++){
    let key = usersKeys[i];
    let user = Object.assign({}, usersCopy[key]);
    user.email = '######';
    user.fname = '######';
    user.lname = '######';
    usersCopy[key] = user;
  }
  // pass users copy to state copy
  stateCopy.users = usersCopy
  // return sanitized state
  return stateCopy;
}

export default (preloadedState = {}) => {
  if(prod){
    return createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(
        customAmplitudeMiddleWare,
        facebookPixelMiddleWare,
        createSentryMiddleware(Sentry, {stateTransformer}),
        thunk
      )
    )
  } else {
    let store = createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(
        customAmplitudeMiddleWare,
        facebookPixelMiddleWare,
        // analyticsMiddleware,
        // amplitudeMiddleware,
        createSentryMiddleware(Sentry),
        thunk,
        logger,
      )
    )

    if(window.Cypress){
      window.__store__ = store
    }
    return store;
  }
}
