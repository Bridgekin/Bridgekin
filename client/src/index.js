import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import './index.css';
import configureStore from './store/store';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');
  let preloadedState = undefined;

  // if (window.currentUser) {
  //   preloadedState = {
  //     users: { [window.currentUser.id]: window.currentUser},
  //     session: { id: window.currentUser.id},
  //   };
  //   delete window.currentUser;
  // }

  const store = configureStore(preloadedState);
  ReactDOM.render(<Root store={store}/>, root);
});
