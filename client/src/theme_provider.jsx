import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import App from './App';

import { MuiThemeProvider } from '@material-ui/core/styles';
import getTheme from './components/theme';

const mapStateToProps = state => ({
  siteTemplate: state.siteTemplate,
});

class ThemeProvider extends React.Component{
  render(){
    return (
      <MuiThemeProvider theme={getTheme(this.props.siteTemplate)}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, {})(ThemeProvider);
