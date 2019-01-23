import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

import { login } from '../../actions/session_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(login(user)),
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    // marginTop: 50
    position: 'fixed',
    top: 64
  },
  button: {
    marginTop: 30
  },
  cover: {
    width: '100%',
    height: 217
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 30
  },
  signinHeader: {
    marginBottom: 20
  },
  textField: {
    marginBottom: 20
  },
  buttonWrapper:{
    display: 'flex',
    justifyContent: 'center'
  }
});

class AccountConfirmed extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }

    // this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // handleClick(){
  //   this.props.history.push('/');
  // }

  handleSubmit(e){
    e.preventDefault();

    let credentials = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(credentials)
  }

  handleChange(field){
    return (e) => {
      e.preventDefault();
      this.setState({ [field]: e.target.value});
    }
  }

  render(){
    let classes = this.props.classes;

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Grid container className={classes.root} justify="center"
          style={{ paddingTop: 50}}>
          <Grid item xs={10} sm={8} md={6}>
            <Typography variant="h2" gutterBottom align='left'
              color="secondary">
              Thanks for confirming your email!
            </Typography>
            <Typography variant="body1" gutterBottom align='left'
              color="textPrimary">
              You are now able to login to Bridgekin and start sharing
              your opportunities with the world!
            </Typography>

            <Card className={classes.card}>
              <Grid container justify="center" alignItems="center">

                <Grid item xs={8} sm={7} md={6} className={classes.content}>
                  <Typography variant="h2" align='center' color="textPrimary"
                    className={classes.signinHeader}>
                    Sign in below:
                  </Typography>
                  <TextField
                    required
                    label="Email"
                    className={classes.textField}
                    margin="normal"
                    fullWidth
                    variant='outlined'
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    />
                  <TextField
                    required
                    label="Password"
                    className={classes.textField}
                    type="password"
                    margin="normal"
                    fullWidth
                    variant='outlined'
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    />
                  <div className={classes.buttonWrapper}>
                    <Button variant="contained" color="secondary"
                      className={classes.button} onClick={this.handleSubmit}>
                      Login
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Card>

          </Grid>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountConfirmed)))
