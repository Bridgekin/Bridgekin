import React from 'react';
import { Provider } from 'react-redux';
import GAListener from './components/ga_listener';
import ErrorBoundary from './error_handler';
import ThemeProvider from './theme_provider';
// import { HashRouter, BrowserRouter } from 'react-router-dom';
// import App from './App';

// import { MuiThemeProvider } from '@material-ui/core/styles';
// import getTheme from './components/theme';

import bugsnag from '@bugsnag/js'
import bugsnagReact from '@bugsnag/plugin-react'

// let bugsnagClient = bugsnag('d8bce99bd337612bba15fa627e999afd');
let bugsnagClient = bugsnag('60b52254c678957f441260927879d7fa');
bugsnagClient.use(bugsnagReact, React);
let BugsnagBoundary = bugsnagClient.getPlugin('react');
// bugsnagClient.notify(new Error('Test error'))

class Root extends React.Component{
  render(){
    return (
      <BugsnagBoundary>
        <ErrorBoundary>
          <Provider store={this.props.store}>
            <ThemeProvider siteTemplate={this.props.siteTemplate}/>
          </Provider>
        </ErrorBoundary>
      </BugsnagBoundary>
    )
  }
}

export default Root;
