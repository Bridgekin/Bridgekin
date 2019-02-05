import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './components/theme';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  homeGrid:{
    flexGrow: 1,
    paddingTop: 0,
    marginTop: 150,
    marginBottom: 50
  }
});


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    debugger
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      const {classes} = this.props;
      // You can render any custom fallback UI
      return (
        <MuiThemeProvider theme={theme} className={classes.root}>
          <Grid container justify="center" alignItems="center"
            className={classes.homeGrid}>
            <Typography variant="h2" gutterBottom align='left'
              color="secondary">
              Something went wrong. Reload the page!
            </Typography>
          </Grid>
        </MuiThemeProvider>
      )
    }

    return this.props.children;
  }
}

export default withStyles(styles)(ErrorBoundary);
