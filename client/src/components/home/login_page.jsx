import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

import { login } from '../../actions/session_actions';
import { addUserByReferral } from '../../actions/member_users_actions';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  session: state.session.id,
});

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(login(user)),
  addUserByReferral: (referralCode, userId) => dispatch(addUserByReferral(referralCode, userId))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grid:{
    flexGrow: 1,
    paddingTop: 50
  },
  cover: {
    width: '100%',
    height: 217
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  signinHeader: {
    marginBottom: 20
  },
  textField: {
    marginBottom: 20
  },
  buttonWrapper:{
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20
  }
});


class AccountHome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    let path = window.location.pathname.split('/');
    let credentials = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(credentials)
    .then((user) => {
      let lastElement = path.pop();
      if(lastElement !== 'login' && user){
        this.props.addUserByReferral(lastElement, user.id)
      }
    })

  }

  handleChange(field){
    return (e) => {
      e.preventDefault();
      this.setState({ [field]: e.target.value});
    }
  }

  render(){
    const { classes }= this.props;

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Grid container justify="center" alignItems="center"
          className={classes.grid}
          style={{ top: 64, position: 'relative' }}>

          <Grid item xs={10} sm={8} md={6}>
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
                  <Link to="/passwordreset">
                    {`Forgot your password?`}
                  </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountHome));
