import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 50
  },
  button: {
    marginTop: 30
  }
});

class AccountConfirmed extends React.Component  {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.props.history.push('/');
  }

  render(){
    let classes = this.props.classes;

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Grid container className={classes.root} justify="center">
          <Grid item xs={10} md={8}>
            <Typography variant="h4" gutterBottom align='left'
              color="secondary">
              Thanks for confirming your email!
            </Typography>
            <Typography variant="h6" gutterBottom align='left'
              color="textPrimary">
              You are now able to login to Bridgekin and start sharing
              your opportunities with the world!
            </Typography>
            <Button variant="contained" color="secondary"
              onClick={this.handleClick} className={classes.button}>
              Back to Home Page
            </Button>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(withStyles(styles)(AccountConfirmed))
