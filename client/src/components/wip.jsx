import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
// import { Container, Button } from 'semantic-ui-react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import { Link } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  wrapper:{
    marginTop: 80
  },
  typography: {
    marginBottom: 40
  }
});

class WorkInProgress extends Component {
  render () {
    const {classes} = this.props;
    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Grid container justify="center" alignItems="center"
          className={classes.wrapper}>
          <Grid item xs={6}>
            <Typography variant="h1" align='center' color='inherit'
              gutterBottom className={classes.typography}>
              Work in Progress!
            </Typography>
            <Typography variant="h6" align='center' color='inherit'
              gutterBottom className={classes.typography}>
              Check back here in a little while to see what we've been working on!
            </Typography>
            <div style={{ display:'flex', justifyContent:'center'}}>
              <Button variant="contained" color="secondary"
                href='/'>
                Back to home
              </Button>
            </div>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(WorkInProgress);
