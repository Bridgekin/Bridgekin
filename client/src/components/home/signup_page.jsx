import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import JumboImage from '../../static/cogs.jpg';
import HomeImage from '../../static/home_logo.png';
import logo from '../../static/logo_blue.png';
import './home.css';

import { connect } from 'react-redux';
import { refSignup } from '../../actions/session_actions';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import SignupModal from './signup_modal'

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  code: ownProps.match.params.code,
  sessionErrors: state.errors.login
});

const mapDispatchToProps = dispatch => ({
  signup: (user, code) => dispatch(refSignup(user, code))
});

const styles = theme => ({
  jumboRoot: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1,
  },
  jumboImage:{
    maxWidth: '100%'
  },
  jumbo: {
    height: 200
  },
  waitlistItem: {},
  textField:{ width: '100%'},
  button:{
    width: '50%',
    height: 50,
    marginTop: 30
  },
  waitlistCTA: {
    marginTop: 20,
    fontWeight: 300
  },
  homeHeader:{
    marginBottom: 0
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
    width: 400,
    display: 'flex',
    justifyContent: 'center'
  },
  buttonProgress: {
    color: '#4067B2',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -12,
  },
  logo: {
    maxWidth: '50%',
    marginTop: 30
  },
  thanksHeader: {
    marginBottom: 30,
    fontWeight: 600
  }
});


class SignupPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      fname: '',
      lname: '',
      password: '',
      passwordConfirmation: '',
      loading: false,
      success: false,
      open: false
    };

    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSignupSubmit(e){
    e.preventDefault();

    let user = {
      email: this.state.email,
      fname: this.state.fname,
      lname: this.state.lname,
      password: this.state.password,
      password_confirmation: this.state.passwordConfirmation
    }

    if (!this.state.loading) {
      this.setState({ success: false,loading: true },
        () => {
          this.props.signup(user, this.props.code)
            .then(res => {
              if(this.props.sessionErrors.length === 0){
                this.setState({
                  loading: false,
                  success: true,
                  open: true,
                  email: '',
                  fname: '',
                  lname: '',
                  password: '',
                  passwordConfirmation: ''
                })
              } else {
                this.setState({
                  loading: false,
                  success: true,
                  open: true,
                })
              }
            })
      })
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange(field){
    return (e) => {
      e.preventDefault();
      this.setState({ [field]: e.target.value});
    }
  }

  render(){
    let classes = this.props.classes;
    const { loading, success, open } = this.state;

    let form = (
      <form className='form-container'>
        <TextField
          required
          label="First Name"
          className={classes.textField}
          margin="normal"
          value={this.state.fname}
          onChange={this.handleChange('fname')}
          onMouseUp={this.handleChange('fname')}
          />
        <TextField
          required
          label="Last Name"
          className={classes.textField}
          margin="normal"
          value={this.state.lname}
          onChange={this.handleChange('lname')}
          onMouseUp={this.handleChange('lname')}
          />
        <TextField
          required
          label="Email"
          className={classes.textField}
          margin="normal"
          value={this.state.email}
          onChange={this.handleChange('email')}
          onMouseUp={this.handleChange('email')}
          />
        <TextField
          required
          label="Password"
          className={classes.textField}
          margin="normal"
          type="password"
          value={this.state.password}
          onChange={this.handleChange('password')}
          onMouseUp={this.handleChange('password')}
          />
        <TextField
          required
          label="Password Confirmation"
          className={classes.textField}
          margin="normal"
          type="password"
          value={this.state.passwordConfirmation}
          onChange={this.handleChange('passwordConfirmation')}
          onMouseUp={this.handleChange('passwordConfirmation')}
          />
        <div className={classes.wrapper}>
          <Button variant="contained" color="secondary" className={classes.button}
            disabled={loading} onClick={this.handleSignupSubmit}>
            Sign Up Now
          </Button>
          {loading && <CircularProgress size={24}
            className={classes.buttonProgress} />}
        </div>
      </form>
    )

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Grid container className={classes.root}
          justify="center" alignItems="center">

          <Grid container className={classes.homeHeader} spacing={24} justify="center" alignItems="center">
            <Grid item xs={10} md={7} >
              <Typography className={classes.waitlistCTA} variant="h5" gutterBottom>
                {"Bridgekin is changing the way people connect to the business opportunities within their network"}
              </Typography>
            </Grid>
            <Grid item xs={0} md={3} />
          </Grid>

          <Grid container spacing={24} justify="center" alignItems="flex-start">
            <Grid item xs={1} />
            <Grid item xs={10} md={4}>
              <Typography className={classes.waitlistCTA} variant="p" gutterBottom>
                {"You’ve received a private invitation to join the Bridgekin network. Complete your registration and sign in below!"}
              </Typography>

              {form}
            </Grid>

            <Grid item xs={0} md={7}>
              <img src={HomeImage}/>
            </Grid>
          </Grid>
        </Grid>

        <SignupModal
          open={open}
          handleClose={this.handleClose}/>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignupPage));
