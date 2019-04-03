import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import HomeImage from '../../static/Login_Background_Image.jpg'
// import './home.css';

import { connect } from 'react-redux';
import { registerWaitlistUser } from '../../actions/waitlist_user_actions';
import { openWaitlist } from '../../actions/modal_actions';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
// import WaitlistModal from '../waitlist_modal'
import BottomFade from '../../static/bottom-fade.png';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  windowHeight: state.window
});

const mapDispatchToProps = dispatch => ({
  openWaitlist: () => dispatch(openWaitlist()),
  registerWaitlistUser: (user) => dispatch(registerWaitlistUser(user))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
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
  homeGridDesktop: {
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
  homeGridMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    flexGrow: 1,
    paddingTop: 0,
    marginBottom: 50
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

class HomePage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      fname: '',
      lname: '',
      loading: false,
      success: false,
      open: false
    };

    this.handleWaitlistSubmit = this.handleWaitlistSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleWaitlistSubmit(e){
    e.preventDefault();

    let user = {
      email: this.state.email,
      fname: this.state.fname,
      lname: this.state.lname
    }

    if (!this.state.loading) {
      this.setState({ success: false,loading: true },
        () => {
          this.props.registerWaitlistUser(user)
            .then(res => {
              this.props.openWaitlist();
              this.setState({
                loading: false,
                success: true,
                email: '',
                fname: '',
                lname: ''
              })
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
    const { classes, windowHeight } = this.props;
    const { loading, open } = this.state;

    let mui = true;
    let form = mui ? (
      <form className='form-container'>
        <Grid container justify="flex-start" alignItems="center" spacing={8}>
          <Grid item xs={10} md={5} >
            <TextField
              required
              label="First Name"
              className={classes.textField}
              margin="normal"
              fullWidth
              variant='outlined'
              value={this.state.fname}
              onChange={this.handleChange('fname')}
              onMouseUp={this.handleChange('fname')}
              />
          </Grid>
          <Grid item xs={10} md={5} >
            <TextField
              required
              label="Last Name"
              className={classes.textField}
              margin="normal"
              fullWidth
              variant='outlined'
              value={this.state.lname}
              onChange={this.handleChange('lname')}
              onMouseUp={this.handleChange('lname')}
              />
          </Grid>
          <Grid item xs={10} sm={10}>
            <TextField
              required
              label="Email"
              className={classes.textField}
              margin="normal"
              fullWidth
              variant='outlined'
              value={this.state.email}
              onChange={this.handleChange('email')}
              onMouseUp={this.handleChange('email')}
              />
          </Grid>
          <Grid item xs={10} className={classes.wrapper}>
            <Button variant="contained" color="primary"
              className={classes.button} disabled={loading}
              onClick={this.handleWaitlistSubmit}>
              Join Our Waitlist
            </Button>
            {loading && <CircularProgress size={24}
              className={classes.buttonProgress} />}
          </Grid>
        </Grid>
      </form>
    ) : (
      <div></div>
    )

    return (
      <div className={classes.root}>
        <Grid container className={classes.homeGridDesktop}
          justify="flex-start" alignItems="center"
          style={{ top: 45, position: 'relative'}}>
          <Grid item xs={10} sm={7} md={6} container justify="flex-start" alignItems="center"
            style={{ marginLeft: 50, marginTop: 20}}>
            <Grid item xs={10} >
              <Typography className={classes.homeHeader} color="textPrimary"
                variant="h5" gutterBottom>
                {"Bridgekin is changing the way people connect to the business opportunities within their network"}
              </Typography>
            </Grid>

            <Grid item xs={10} sm={8}>
              <Typography className={classes.homeSubheader} color="textPrimary"
                variant="body1" gutterBottom>
                {"Bridgekin is currently an invite-only community that has connected over $71M in opportunities. Sign up now to join our waitlist."}
              </Typography>
              {form}
            </Grid>
          </Grid>
          <div className={classes.bottomFade} />
        </Grid>

        <Grid container className={classes.homeGridMobile}
          justify="flex-start" alignItems="center"
          style={{ top: 64, position: 'relative'}}>
          <Grid item xs={11} sm={7} md={6} container justify="flex-start" alignItems="center"
            style={{ marginLeft: 50, marginTop: 20}}>
            <Grid item xs={11} >
              <Typography className={classes.homeHeader}
                variant="h5" gutterBottom>
                {"Bridgekin is changing the way people connect to the business opportunities within their network"}
              </Typography>
            </Grid>

            <Grid item xs={11} sm={7}>
              <Typography className={classes.homeSubheader}
                variant="p" gutterBottom>
                {"Bridgekin is currently an invite-only community that has connected over $71M in opportunities. Sign up now to join our waitlist."}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomePage));
