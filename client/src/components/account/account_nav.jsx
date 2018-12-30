import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
    borderBottom: '1px solid #d3d3d3'
  },
  acccountMain:{
    marginTop: 50
  },
  accountNavSection:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  button: {
    margin: "0px 7px",
    fontSize: 16
  },
  buttonContainer:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dot:{ fontSize: 10},
  navLink: {
    textDecoration: 'none'
  }
});

var ROUTEMAPPING = {
  'My Profile': 'home',
  'Connected Opportunities': 'connected',
  'Posted Opportunities': 'posted',
  'Settings': 'settings'
};

class AccountNav extends React.Component {
  render(){
    const { classes }= this.props;

    let buttonHeaders = ['My Profile', 'Connected Opportunities',
      'Posted Opportunities', 'Settings'];

    let buttons = buttonHeaders.map(header => {
      return (
        <div className={classes.buttonContainer}>
          <i className={["fas fa-circle", classes.dot].join(' ')}></i>
          <Link to={`/account/${ROUTEMAPPING[header]}`}
            className={classes.navLink}>
            <Button color="secondary" className={classes.button}>
              {header}
            </Button>
          </Link>
        </div>
      )
    });

    return (
      <Grid container className={classes.root}
        justify='space-around' alignItems='center'>
        <Grid item xs={10} sm={2} className={classes.accountNavSection}>
          <Typography className={classes.waitlistCTA} variant="h4" gutterBottom>
            <strong>My Profile</strong>
          </Typography>
        </Grid>
        <Grid item xs={0} sm={2}/>
        <Grid item xs={10} sm={7} className={classes.accountNavSection}>
          {buttons}
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(AccountNav);
