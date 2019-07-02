import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import HomeImage from '../../static/Login_Background_Image.jpg'
import './home.css';

import { connect } from 'react-redux';
import { refSignup } from '../../actions/session_actions';
import { openSignup } from '../../actions/modal_actions';

// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from '../theme';
// import SignupModal from './signup_modal';
import BottomFade from '../../static/bottom-fade.png';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  code: ownProps.match.params.code,
  userErrors: state.errors.users,
  // sessionErrors: state.errors.login,
});

const mapDispatchToProps = dispatch => ({
  signup: (user, code) => dispatch(refSignup(user, code)),
  openSignup: (payload) => dispatch(openSignup(payload))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  homeGridDesktop:{
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
    flexGrow: 1,
    paddingTop: 0,
    backgroundImage: `url(${HomeImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    backgroundSize: 'cover',
    marginBottom: 50
  },
  homeGridMobile:{
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    flexGrow: 1,
    paddingTop: 0,
    marginBottom: 50
  },
  button:{
    height: 50,
    marginTop: 30,
    fontSize: 16
  },
  homeHeader: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20
  },
  homeSubheader:{
    marginTop: 20,
    fontSize: 16
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  buttonProgress: {
    color: '#4067B2',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -12,
  },
  bottomFade:{
    zIndex: 2,
  	position: 'relative',
  	bottom: '0%',
  	backgroundImage: `url(${BottomFade})`,
    backgroundSize:'cover',
    height: '250px',
    width: '100%',
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
      termsAgreement: false,
      // passwordConfirmation: '',
      loading: false,
      success: false,
      open: false
    };

    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSignupSubmit(e){
    e.preventDefault();

    let user = {
      email: this.state.email,
      fname: this.state.fname,
      lname: this.state.lname,
      password: this.state.password,
      password_confirmation: this.state.passwordConfirmation,
      termsAgreement: this.state.termsAgreement
    }

    if (!this.state.loading) {
      this.setState({ success: false,loading: true },
        () => {
          this.props.signup(user, this.props.code)
            .then(res => {
              if(this.props.userErrors.length === 0){
                this.setState({
                  loading: false,
                  success: true,
                  email: '',
                  fname: '',
                  lname: '',
                  password: '',
                  termsAgreement: false,
                  // passwordConfirmation: ''
                })
              } else {
                this.props.openSignup({ 
                  page: 'response'
                });
                this.setState({
                  loading: false,
                  success: true,
                })
              }
            })
      })
    }
  }

  handleChange(field){
    return (e) => {
      e.preventDefault();
      if(field === 'termsAgreement'){
        this.setState({ [field]: e.target.checked});
      }
      else {
        this.setState({ [field]: e.target.value});
      }
    }
  }

  render(){
    let classes = this.props.classes;
    const { loading, success, open, termsAgreement } = this.state;

    const userAgreementLink = <a href='/useragreement'>User Agreement</a>
    const privacyPolicyLink = <a href='/privacypolicy'>Privacy Policy</a>
    let termsMessage = (
      <Typography variant="subtitle2" gutterBottom>
        {`By registering, I acknowledge and agree to the `}
        {userAgreementLink}
        {` and `}
        {privacyPolicyLink}
      </Typography>
    )

    let form = (
      <form className='form-container'>
        <Grid container justify="center" alignItems="center" spacing={1}>
          <Grid item xs={12} sm={6} >
            <TextField
              required
              label="First Name"
              className={classes.textField}
              margin="normal"
              fullWidth
              data-cy='first-name-signup'
              variant='outlined'
              value={this.state.fname}
              onChange={this.handleChange('fname')}
              onMouseUp={this.handleChange('fname')}
              />
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField
              required
              label="Last Name"
              className={classes.textField}
              margin="normal"
              fullWidth
              data-cy='last-name-signup'
              variant='outlined'
              value={this.state.lname}
              onChange={this.handleChange('lname')}
              onMouseUp={this.handleChange('lname')}
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Email"
              className={classes.textField}
              margin="normal"
              fullWidth
              data-cy='email-signup'
              variant='outlined'
              value={this.state.email}
              onChange={this.handleChange('email')}
              onMouseUp={this.handleChange('email')}
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Password"
              className={classes.textField}
              margin="normal"
              fullWidth
              variant='outlined'
              data-cy='password-signup'
              type="password"
              value={this.state.password}
              onChange={this.handleChange('password')}
              onMouseUp={this.handleChange('password')}
              />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.termsAgreement}
                  data-cy='terms-checkbox'
                  onChange={this.handleChange('termsAgreement')}
                  value="termsAgreement"
                />
              }
              label={termsMessage}
            />
          </Grid>
          <Grid item xs={12} className={classes.wrapper}>
            <Button variant="contained" color="primary" className={classes.button}
              data-cy='signup-submit-button'
              disabled={loading || !termsAgreement } onClick={this.handleSignupSubmit}>
              Sign In Now
            </Button>
            {loading && <CircularProgress size={24}
            className={classes.buttonProgress} />}
          </Grid>
        </Grid>
      </form>
    )

    return (
      <div>
        <Grid container className={classes.homeGridDesktop}
          justify="flex-start" alignItems="center"
          style={{ top: 45, position: 'relative'}}>
          <Grid item xs={11} sm={9} md={6} container justify="flex-start" alignItems="center"
            style={{ marginLeft: 50, marginTop: 20}}>
            <Grid item xs={10} >
              <Typography className={classes.homeHeader}
                color="textPrimary" variant="h5" gutterBottom>
                {"Bridgekin is changing the way people connect to the business opportunities within their network"}
              </Typography>
            </Grid>

            <Grid item xs={10} sm={8} >
              <Typography className={classes.homeSubheader}
                color="textPrimary" variant="body1" gutterBottom>
                {"You’ve received a private invitation to join Bridgekin, an invite-only platform that has connected over $72M in opportunities. Complete your registration below to sign in."}
              </Typography>
              {form}
            </Grid>
          </Grid>
          <div className={classes.bottomFade} />

        </Grid>

        <Grid container className={classes.homeGridMobile}
          justify="flex-start" alignItems="center"
          style={{ top: 45, position: 'relative'}}>
          <Grid item xs={11} sm={9} md={6} container justify="flex-start" alignItems="center"
            style={{ marginLeft: 50, marginTop: 20}}>
            <Grid item xs={10} >
              <Typography className={classes.homeHeader}
                color="textPrimary" variant="h5" gutterBottom>
                {"Bridgekin is changing the way people connect to the business opportunities within their network"}
              </Typography>
            </Grid>

            <Grid item xs={10} sm={8} >
              <Typography className={classes.homeSubheader}
                color="textPrimary" variant="body1" gutterBottom>
                {"You’ve received a private invitation to join Bridgekin, an invite-only platform that has connected over $72M in opportunities. Complete your registration below to sign in."}
              </Typography>
              {form}
            </Grid>
          </Grid>
          <div className={classes.bottomFade} />

        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignupPage));
