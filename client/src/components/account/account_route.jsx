import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route , withRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute} from '../../util/route_util';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import CircularProgress from '@material-ui/core/CircularProgress';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

import AccountNav from './account_nav';
import AccountHome from './account_home';
import AccountSettings from './account_settings';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({
  // registerWaitlist: (user) => dispatch(registerWaitlist(user))
});

const styles = theme => ({
  jumboRoot: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1,
  },
  acccountMain:{
    marginTop: 50
  },
});


class AccountRoute extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render (){
    let classes = this.props.classes;

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <AccountNav hash={this.props.location.pathname}/>

        <Switch>
          <ProtectedRoute path="/account/settings" component={AccountSettings} />
          <ProtectedRoute path="/account" component={AccountHome} />
        </Switch>

      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountRoute));
