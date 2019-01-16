import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import HomeImage from '../../static/Login_Background_Image.jpg'
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
    const { loading, open } = this.state;

    let mui = true;
    let form = mui ? (
      <form className='form-container'>
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
        <div className={classes.wrapper}>
          <Button variant="contained" color="secondary"
            className={classes.button} disabled={loading}
            onClick={this.handleWaitlistSubmit}>
            Join Our Waitlist
          </Button>
          {loading && <CircularProgress size={24}
            className={classes.buttonProgress} />}
        </div>
      </form>
    ) : (
      <div></div>
    )

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Grid container className={classes.homeGrid}
          justify="flex-start" alignItems="center">
          <Grid item xs={5} container justify="flex-start" alignItems="center"
            style={{ marginLeft: 50, marginTop: 20}}>
            <Grid item xs={12} >
              <Typography className={classes.homeHeader}
                variant="h5" gutterBottom>
                {"Bridgekin is changing the way people connect to the business opportunities within their network"}
              </Typography>
            </Grid>

            <Grid item xs={8} >
              <Typography className={classes.homeSubheader}
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
