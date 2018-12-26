import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';

import JumboImage from '../../static/cogs.jpg';
import HomeImage from '../../static/home_logo.png';
import logo from '../../static/logo_blue.png';
import './home.css';

import { connect } from 'react-redux';
import { registerWaitlistUser } from '../../actions/waitlist_user_actions';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id]
  // homes: Object.values(state.entities.homes)
});

const mapDispatchToProps = dispatch => ({
  registerWaitlistUser: (user) => dispatch(registerWaitlistUser(user))
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
  paper: {
    position: 'absolute',
    width: '40%',
    height: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
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

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleWaitlistSubmit(e){
    e.preventDefault();

    let user = {
      email: this.state.email,
      fname: this.state.fname,
      lname: this.state.lname
    }

    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true,
        },
        () => {
          this.props.registerWaitlistUser(user)
            .then(res => {
              if(res.type === 'ok'){
                this.setState({
                  loading: false,
                  success: true,
                  open: true,
                  email: '',
                  fname: '',
                  lname: ''
                });
              } else {
                alert('There was a problem when we tried to register your information. Please try again later.');
                this.setState({
                  loading: false,
                  email: '',
                  fname: '',
                  lname: ''
                });
              }
            })
        },
      );
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

    let mui = true;
    let form = mui ? (
      <form className='form-container'>
        <TextField
          required
          label="First Name"
          className={classes.textField}
          margin="normal"
          value={this.state.fname}
          onChange={this.handleChange('fname')}
          />
        <TextField
          required
          label="Last Name"
          className={classes.textField}
          margin="normal"
          value={this.state.lname}
          onChange={this.handleChange('lname')}
          />
        <TextField
          required
          label="Email"
          className={classes.textField}
          margin="normal"
          value={this.state.email}
          onChange={this.handleChange('email')}
          />
        <div className={classes.wrapper}>
          <Button variant="contained" color="secondary" className={classes.button}
            disabled={loading} onClick={this.handleWaitlistSubmit}>
            Be the first to know
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </form>
    ) : (
      <div></div>
    )

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Grid container className={classes.root}
          justify="center" alignItems="center">

          <Grid className={classes.homeHeader} container spacing={24} justify="center" alignItems="center">
            <Grid item xs={10} md={7} >
              <Typography className={classes.waitlistCTA} variant="h5" gutterBottom>
                Bridgekin is changing the way people connect
                with opportunities within their network.
              </Typography>
            </Grid>
            <Grid item xs={0} md={3} />
          </Grid>

          <Grid container spacing={24} justify="center" alignItems="flex-start">
            <Grid item xs={1} />
            <Grid item xs={10} md={4}>
              <Typography className={classes.waitlistCTA} variant="p" gutterBottom>
                Sign up now to get notified when Bridgekin is open to the public.
              </Typography>
              {form}
            </Grid>

            <Grid item xs={0} md={7}>
              <img src={HomeImage}/>
            </Grid>
          </Grid>

        </Grid>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          disableAutoFocus={true}
          onClose={this.handleClose}>

          <div style={{top:'25%', left: '30%'}} className={classes.paper}>
            <Typography variant="h4" id="modal-title" color='secondary' className={classes.thanksHeader}>
              Thanks for signing up!
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Today, Bridgekin is invite-only. However, you'll be the first to know when we begin accepting new users!
            </Typography>
            <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
              onClick={this.handleClose} color='secondary'>
              Close
            </Button>
          </div>
        </Modal>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomePage));
