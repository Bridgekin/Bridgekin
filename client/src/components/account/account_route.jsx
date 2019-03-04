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

// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from '../theme';

import AccountMain from './account_main';
import AccountOpportunities from './account_opportunities'

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({
});

const styles = theme => ({
  root: {
    flexGrow: 1
  },
});


class AccountRoute extends React.Component {
  render (){
    let classes = this.props.classes;

    return (
      <Switch>
        <ProtectedRoute path="/account/opportunities" component={AccountOpportunities} />
        <ProtectedRoute path="/account" component={AccountMain} />
      </Switch>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountRoute));
