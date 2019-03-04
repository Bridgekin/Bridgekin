import React from 'react';
import { Provider } from 'react-redux';
import GAListener from './components/ga_listener';
import ErrorBoundary from './error_handler';
import ThemeProvider from './theme_provider';
// import { HashRouter, BrowserRouter } from 'react-router-dom';
// import App from './App';

// import { MuiThemeProvider } from '@material-ui/core/styles';
// import getTheme from './components/theme';

class Root extends React.Component{
  render(){
    return (
      <ErrorBoundary>
        <Provider store={this.props.store}>
          <ThemeProvider siteTemplate={this.props.siteTemplate}/>
        </Provider>
      </ErrorBoundary>
    )
  }
}

export default Root;
