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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import { fade } from '@material-ui/core/styles/colorManipulator';

import AccountHome from './account_home';
import AccountSettings from './account_settings';
import AccountOpportunities from './account_opportunities';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({
});

const styles = {
  root: {
    flexGrow: 1
  },
  grid:{
    position: 'relative',
    // padding: "64px 35px 50px 35px",
    // paddingTop: 64 + 34,
    flexGrow: 1,
    backgroundColor: `${fade(theme.palette.common.black,0.05)}`,
    minHeight: window.innerHeight
  },
  column:{
    paddingLeft: 0,
    paddingRight: 0,
    display: 'inline-block'
  },
  filterCard:{
    marginTop: 18,
    backgroundColor: `${theme.palette.white}`,
    width: '100%',
    borderRadius: 5,
    border: `1px solid ${theme.palette.lightGrey}`
  },
  filterItem:{
    borderTop: `1px solid ${theme.palette.grey1}`,
  },
  cardHeader: {
    fontSize: 14,
    fontWeight: 900
  },
  filterHeader:{
    fontSize: 13,
    fontWeight: 500
  },
};


class AccountMain extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      opp_filter: 'posted'
    };
  }

  render (){
    let { classes } = this.props;
    let pathName = this.props.location.pathname;
    let { opp_filter } = this.state;

    let destinations = [
      {title: 'My Profile', dest: '/account/home'},
      {title: 'Connected/Posted Opportunities', dest: '/account/opportunities'},
      {title: 'Settings', dest: '/account/settings'}
    ]

    let navigation = (
      <Grid container justify='center' alignItems='center'
        style={{ padding: 0, width: '100%'}}>
        <div className={classes.filterCard}>
          <Typography align='Left'
            className={classes.cardHeader}
            style={{ margin: "10px 15px 0px"}}>
            My Account
          </Typography>

          <List component="nav">
            {destinations.map(item => (
              <ListItem button className={classes.filterItem}
                onClick={() => this.props.history.push(item.dest)}
                selected={pathName === item.dest}>
                <Typography variant="h6" align='left'
                  color="textPrimary" className={classes.filterHeader}>
                  {item.title}
                </Typography>
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>
    )

    let filters = [
      {title: "Opportunities You've Connected To", name: 'connected'},
      {title: "Opportunities You've Referred", name: 'referred'},
      {title: "Opportunities You've Posted", name: 'posted'}
    ]

    let opp_filters = (
      <Grid container justify='center' alignItems='center'
        style={{ padding: 0, width: '100%'}}>
        <div className={classes.filterCard}>
          <Typography align='Left'
            className={classes.cardHeader}
            style={{ margin: "10px 15px 0px"}}>
            Connected Opportunities
          </Typography>

          <List component="nav">
            {filters.map(item => (
              <ListItem button className={classes.filterItem}
                onClick={() => this.setState({ opp_filter: item.name })}
                selected={opp_filter === item.name}>
                <Typography variant="h6" align='left'
                  color="textPrimary" className={classes.filterHeader}>
                  {item.title}
                </Typography>
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>
    )

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Grid container justify='center' className={classes.grid}>
          <div style={{ position: 'fixed', top: 64, width:1100 }}>
            <div className={classes.column}
              style={{ position: 'static', marginRight: 20, width: 250}}>
              {pathName === '/account/opportunities' && opp_filters}
            </div>
            <div className={classes.column}
              style={{ position: 'static', maxHeight: window.innerHeight, width: 500, paddingTop: 18 }}>
              <Switch>
                <ProtectedRoute path="/account/settings" component={AccountSettings} />
                <ProtectedRoute
                    path="/account/opportunities"
                    component={AccountOpportunities}
                    passedProps={{ opp_filter: opp_filter }} />
                <ProtectedRoute path="/account/home" component={AccountHome} />
              </Switch>
            </div>
            <div className={classes.column}
              style={{ position: 'fixed', marginLeft: 20, width: 250, top: 64}}>
              {navigation}
            </div>
          </div>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountMain));
