import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
// import { Container, Button } from 'semantic-ui-react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import { Link } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import HomeImage from '../static/Login_Background_Image.jpg'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  homeGrid:{
    flexGrow: 1,
    paddingTop: 0,
    backgroundImage: `url(${HomeImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    backgroundSize: 'cover',
    marginBottom: 50
  },
  header: { fontSize: 60, marginBottom: 30},
  buttonWrapper:{
    display: 'flex',
    border: '1px solid red'
  },
  label: {
    textTransform: 'lowercase',
  },
});

class ConfirmationError extends Component {
  render () {
    const {classes} = this.props;
    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Grid container justify="center" alignItems="center"
          className={classes.homeGrid}>
          <Grid item xs={6} style={{ marginTop: 100}}>
            <Typography variant="h1" align='center' color='inherit'
              gutterBottom className={classes.header}>
              Sorry
            </Typography>
            <Typography variant="body1" align='center' color='inherit'
              gutterBottom style={{ marginBottom: 15}}>
              We're usually much better at connecting the dots :)
            </Typography>
            <Typography variant="body1" align='center' color='inherit'
              gutterBottom style={{ marginBottom: 30}}>
              However, your confirmation token is expired or invalid.
            </Typography>
            <Typography variant="body1" align='center' color='inherit'
              style={{ marginBottom: 30}}>
              {"Try going back to our homepage"}
            </Typography>

            <Grid container justify='flex-start' alignItems='center'>
              <Button variant="contained" color="secondary"
                href='/'>
                Homepage
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(ConfirmationError);
