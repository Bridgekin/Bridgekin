import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from './theme';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  homeGrid:{
    flexGrow: 1,
    paddingTop: 0,
    marginBottom: 50
  },
  progress: {
    fontSize: 48,
    color: theme.palette.text.primary
  }
});

class Loading extends Component {
  render () {
    const {classes} = this.props;
    return (
      <Grid container justify="center" alignItems="center"
        className={classes.homeGrid}>
        <CircularProgress className={classes.progress}/>
      </Grid>
    )
  }
}

export default withStyles(styles)(Loading);
