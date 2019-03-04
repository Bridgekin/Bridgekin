import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import GAListener from './components/ga_listener';
import ErrorBoundary from './error_handler';
import App from './App';

import { MuiThemeProvider } from '@material-ui/core/styles';
import getTheme from './components/theme';

class Root extends React.Component{
  render(){
    return (
      <ErrorBoundary>
        <MuiThemeProvider theme={getTheme(this.props.siteTemplate)}>
          <Provider store={this.props.store}>
            <GAListener>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </GAListener>
          </Provider>
        </MuiThemeProvider>
      </ErrorBoundary>
    )
  }
}

export default Root;
