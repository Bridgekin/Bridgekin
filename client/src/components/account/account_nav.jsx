import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
    borderBottom: `0.5px solid ${theme.palette.grey1}`,
    backgroundColor: 'RGBA(196,196,196,0.1)'
  },
  acccountMain:{
    marginTop: 50
  },
  accountNavSection:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100

  },
  button: {
    margin: "0px 7px",
    // fontSize: 16
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
      let path = this.props.hash.split('/').pop();
      let dotPath = ROUTEMAPPING[header];

      let dot = (dotPath === path) ? (
        <i className={["fas fa-circle", classes.dot].join(' ')} />
      ) : (
        <i className={["far fa-circle", classes.dot].join(' ')} />
      )

      // let dot = (<i className={["fas fa-circle", classes.dot].join(' ')} />)
      return (
        <div className={classes.buttonContainer}>
          {dot}
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
          <Typography variant="h5" gutterBottom>
            <strong>Profile</strong>
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
