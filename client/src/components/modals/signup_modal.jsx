import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import theme from '../theme';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/CloseSharp';

import { connect } from 'react-redux';
import { clearUserErrors } from '../../actions/error_actions';
import { closeSignup } from '../../actions/modal_actions';
import TextField from '@material-ui/core/TextField';
import { hireSignup } from '../../actions/session_actions';
import { openRefAppModal, openLogin } from '../../actions/modal_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  userErrors: state.errors.users,
  signupModal: state.modals.signup
});

const mapDispatchToProps = dispatch => ({
  openLogin: payload => dispatch(openLogin(payload)),
  hireSignup: user => dispatch(hireSignup(user)),
  clearUserErrors: () => dispatch(clearUserErrors()),
  closeSignup: () => dispatch(closeSignup()),
  openRefAppModal: (payload) => dispatch(openRefAppModal(payload)),
});

const styles = theme => ({
  thanksHeader:{
    marginBottom: 30,
    color: theme.palette.darkGrey
  },
  grid:{
    margin: '30px 0px 30px 0px'
  },
  modalPaper:{
    margin: 15,
    minWidth: 400,
    backgroundColor: theme.palette.base3
  },
  listText:{ color: theme.palette.text.primary},
  searchPaper:{
    padding: "5px 15px",
    margin: "10px 0px"
  },
  input:{
    width: '100%'
  },
});

class SignupModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      success: false,
      open: false,
      page: 'default',
      fname:'',
      lname: '',
      email: '',
      password: ''
    };

    this.handleClose = this.handleClose.bind(this);
    this.getContent = this.getContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.retry = this.retry.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    const nextModal = nextProps.signupModal;
    const currentModal = this.props.signupModal;
    if(nextModal.open && currentModal.open !== nextModal.open){
      this.setState({ page: nextModal.page })
    }
    return true;
  }

  retry(){
    this.props.clearUserErrors();
    this.setState({ page: 'new'})
  }

  redirectToLogin(){
    const { signupModal } = this.props;
    let payload={
      page: 'login',
      from: 'signup',
      id: signupModal.id,
      referralCode: signupModal.referralCode,
      type: signupModal.type
    }
    this.props.openLogin(payload);
    this.props.closeSignup();
  }

  handleClose(e){
    e.stopPropagation();
    if(this.props.userErrors){
      this.props.clearUserErrors();
    }
    this.props.closeSignup();
  };

  handleChange(field){
    return e => {
      this.setState({ [field]: e.target.value })
    }
  } 

  handleSubmit(){
    const { fname, lname, email, password } = this.state;
    //do some things
    let user = {
      fname, email, password,lname: ''
    }
    this.props.hireSignup(user)
    .then(() => {
      if(this.props.userErrors.length === 0){
        this.setState({
          fname:'', lname: '', email: '', password: ''
         })

        const { signupModal } = this.props;
        if(signupModal.type === 'personal'){
          let payload = { type: 'personal',
            id: signupModal.id,
            referralCode: signupModal.referralCode
          }
          this.props.openRefAppModal(payload)
          this.props.closeSignup();
        } else if(signupModal.type === 'refer'){
          this.props.closeSignup();
          this.props.history.push(`/hiring/share/${signupModal.id}?referralCode=${signupModal.referralCode}`)
        }
      } else {
        this.setState({ page: 'response'})
      }
    })
  }

  getContent(){
    const { classes, signupModal } = this.props;
    const { page } = this.state;

    switch(page){
      case 'new':
        let loginHeader = <Grid container 
        justify='space-between'
        style={{ paddingBottom: 30, borderBottom: `1px solid grey`, marginBottom: 20, width: '100%'}}>
          <Typography color='textPrimary'
          style={{ fontSize: 24 }}>
            {`Signup`}
          </Typography>
        </Grid>

        let section = <Grid container direction='column'>
          <Typography color='textSecondary'
          style={{ fontSize: 18 }}>
            {signupModal.message}
          </Typography>
          <TextField fullWidth
          variant="outlined"
          label='First Name'
          margin='normal'
          onChange={this.handleChange('fname')}
          value={this.state.fname}
          />
          <TextField fullWidth
          variant="outlined"
          label='Last Name'
          margin='normal'
          onChange={this.handleChange('lname')}
          value={this.state.lname}
          />
          <TextField fullWidth
          variant="outlined"
          label='Email Name'
          margin='normal'
          onChange={this.handleChange('email')}
          value={this.state.email}
          />
          <TextField fullWidth
          variant="outlined"
          label='Password'
          type='password'
          margin='normal'
          onChange={this.handleChange('password')}
          value={this.state.password}
          />
          <Grid container justify='center'>
            <Button color='primary' variant='contained'
            style={{ marginTop: 20}}
            onClick={this.handleSubmit}>
              {`Signup`}
            </Button>
          </Grid>
          <Grid container justify='center'>
            <Button
            style={{ marginTop: 10, textTransform: 'none', fontSize: 14, fontWeight: 400}}
            onClick={this.redirectToLogin}>
              {`Already have an account? Sign-in here!`}
            </Button>
          </Grid>
        </Grid>
  
        return <Grid>
          {loginHeader}
          {section}
        </Grid>;
      default:
        let userErrors = this.props.userErrors.map(error => {
          error = error.replace(/(Fname|Lname)/g, (ex) => {
            return ex === 'Fname' ? 'First name' : 'Last name';
          });
          return (
            <ListItem >
              <ListItemText primary={error}
                classes={{ primary: classes.listText }}/>
            </ListItem>
          )
        })
    
        let modalText = this.props.userErrors.length === 0 ? (
          <Grid>
            <Typography variant="h2" id="modal-title"
              color='textPrimary' align='left'
              className={classes.thanksHeader} >
              Thanks for signing up!
            </Typography>
            <Typography variant="body1" id="simple-modal-description"
              data-cy='signup-success'
              color='textPrimary' align='left'>
              We've sent you a confirmation email. Please confirm within your email to login.
            </Typography>
            <Grid item xs={12}>
              <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
                onClick={this.handleClose} color='primary'>
                Close
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid>
            <Typography variant="h2" id="modal-title"
              color='textPrimary' align='left'
              className={classes.thanksHeader}>
              Thanks for your interest in Bridgekin!
            </Typography>
            <Typography variant="body1" id="simple-modal-description"
              color='textPrimary' align='left'>
              Unfortunately, we weren't able to sign you up because:
            </Typography>
            <List data-cy='signup-errors'>
              {userErrors}
            </List>
            <Grid container justify='center'
            style={{marginTop: 30}}>
              <Button variant="contained"
                onClick={this.handleClose} color='primary'>
                Close
              </Button>
            </Grid>
            <Grid container justify='center'>
              <Button onClick={this.retry}>
                Retry?
              </Button>
            </Grid>
          </Grid>
        )
        return modalText;
    }
  }

  render () {
    const { classes, signupModal } = this.props;

    let closeBar = (
      <Grid container justify='flex-end'>
        <CloseIcon onClick={this.handleClose}
          style={{ color: 'grey', pointer: 'cursor'}}/>
      </Grid>
    )

    return (
      <Dialog
      open={signupModal.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={this.handleClose}
      classes={{ paper: classes.modalPaper}}>
        <Grid container justify='center' alignItems='center'>
          <Grid item xs={10} className={classes.grid}>
            {closeBar}
            {this.getContent()}
          </Grid>
        </Grid>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(SignupModal)));
