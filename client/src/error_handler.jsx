import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './components/theme';
import * as Sentry from '@sentry/browser';
import Raven from 'raven-js';

Sentry.init({
 dsn: "https://a84f2e17de8c43a7b66471a2bc28de50@sentry.io/1437155",
 environment: process.env.NODE_ENV,
});

// Raven.config('https://a84f2e17de8c43a7b66471a2bc28de50@sentry.io/1437155').install()

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  homeGrid:{
    flexGrow: 1,
    paddingTop: 0,
    marginTop: 150,
    marginBottom: 50,
    padding: 30
  }
});


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      eventId: null,
      hasError: false,
      sent: false
    };
    this.sendSentryDiagnostic = this.sendSentryDiagnostic.bind(this);
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.error(error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
    this.setState({ error });
    Sentry.withScope(scope => {
        scope.setExtras(errorInfo);
        const eventId = Sentry.captureException(error);
        this.setState({eventId})
    });
    // Sentry.configureScope((scope) => {
    //   scope.setUser({"email": "john.doe@example.com"});
    // });
    // Raven.captureException(error, { extra: errorInfo });
  }

  sendSentryDiagnostic(){
    // Raven.lastEventId()
    // Raven.showReportDialog()
    Sentry.showReportDialog({ eventId: this.state.eventId })
    this.setState({ sent: true})
  }

  render() {
    if (this.state.hasError) {
      const {classes} = this.props;
      // You can render any custom fallback UI
      return (
        <MuiThemeProvider theme={theme} className={classes.root}>
          <Grid container justify="center" alignItems="center"
            className={classes.homeGrid} direction='column'>
            <Typography variant="body1" align='center'
              color="textPrimary"
              style={{ fontSize: 26, fontWeight: 600 }}>
              Something went wrong!
            </Typography>
            <Typography variant="body1" gutterBottom align='center'
              color="textSecondary"
              style={{ fontSize: 24, fontWeight: 400 }}>
              Please reload the page
            </Typography>
            <Button variant={!this.state.sent ? 'contained' : ''}
              color={this.state.sent && 'primary'}
              onClick={this.sendSentryDiagnostic}
              style={{ marginTop: 50}}>
              { `Report Feedback` }
            </Button>
          </Grid>
        </MuiThemeProvider>
      )
    }

    return this.props.children;
  }
}

export default withStyles(styles)(ErrorBoundary);
