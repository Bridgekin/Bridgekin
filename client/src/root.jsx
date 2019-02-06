import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import GAListener from './components/ga_listener';
import ErrorBoundary from './error_handler';
import App from './App';

export default ({ store }) => (
  <ErrorBoundary>
    <Provider store={store}>
      <BrowserRouter>
        <GAListener>
          <App />
        </GAListener>
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>
);
