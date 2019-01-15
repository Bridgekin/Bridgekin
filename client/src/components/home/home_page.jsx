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
import { registerWaitlistUser } from '../../actions/waitlist_user_actions';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import WaitlistModal from '../waitlist_modal'

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({
  registerWaitlistUser: (user) => dispatch(registerWaitlistUser(user))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  // jumboImage:{
  //   maxWidth: '100%'
  // },
  // jumbo: {
  //   height: 200
  // },
  // textField:{ width: '100%'},
  button:{
    width: '50%',
    height: 50,
    marginTop: 30
  },
  homeHeader: {
    marginTop: 20,
    fontWeight: 600,
    fontSize: 22
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
              this.setState({
                loading: false,
                success: true,
                open: true,
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
          fullWidth
          value={this.state.fname}
          onChange={this.handleChange('fname')}
          onMouseUp={this.handleChange('fname')}
          />
        <TextField
          required
          label="Last Name"
          className={classes.textField}
          margin="normal"
          fullWidth
          value={this.state.lname}
          onChange={this.handleChange('lname')}
          onMouseUp={this.handleChange('lname')}
          />
        <TextField
          required
          label="Email"
          className={classes.textField}
          margin="normal"
          fullWidth
          value={this.state.email}
          onChange={this.handleChange('email')}
          onMouseUp={this.handleChange('email')}
          />
        <div className={classes.wrapper}>
          <Button variant="contained" color="secondary" className={classes.button}
            disabled={loading} onClick={this.handleWaitlistSubmit}>
            Join Our Waitlist
          </Button>
          {loading && <CircularProgress size={24}
            className={classes.buttonProgress} />}
        </div>
      </form>
    ) : (
      <div></div>
    )


    // <Grid className={classes.homeHeader} container spacing={24} justify="center" alignItems="center">
    //   <Grid item xs={10} md={7} >
    //     <Typography className={classes.waitlistCTA} variant="h5" gutterBottom>
    //       {"Bridgekin is changing the way people connect to the business opportunities within their network"}
    //     </Typography>
    //   </Grid>
    //   <Grid item xs={0} md={3} />
    // </Grid>
    //
    // <Grid container spacing={24} justify="center" alignItems="flex-start">
    //   <Grid item xs={1} />
    //   <Grid item xs={10} md={4}>
    //     <Typography className={classes.waitlistCTA} variant="p" gutterBottom>
    //       Bridgekin is currently an invite-only community. Sign up now to join our waitlist.
    //     </Typography>
    //     {form}
    //   </Grid>
    //
    //   <Grid item xs={0} md={7}>
    //     <img src={HomeImage}/>
    //   </Grid>
    // </Grid>


    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Grid container className={classes.root}
          justify="flex-start" alignItems="center">
          <Grid item xs={5} container justify="flex-start" alignItems="center"
            style={{ marginLeft: 50, border: '1px solid red'}}>
            <Grid item xs={12} >
              <Typography className={classes.waitlistCTA}
                variant="h5" gutterBottom>
                {"Bridgekin is changing the way people connect to the business opportunities within their network"}
              </Typography>
            </Grid>

            <Grid item xs={8} >
              <Typography className={classes.waitlistCTA}
                variant="p" gutterBottom>
                Bridgekin is currently an invite-only community. Sign up now to join our waitlist.
              </Typography>
              {form}
            </Grid>
          </Grid>

        </Grid>

        <WaitlistModal open={open} handleClose={this.handleClose}/>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomePage));
