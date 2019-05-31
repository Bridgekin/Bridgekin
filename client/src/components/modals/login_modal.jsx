import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/CloseSharp';

import { connect } from 'react-redux';
import { clearSessionErrors } from '../../actions/error_actions';

import { closeLogin } from '../../actions/modal_actions';
import { login } from '../../actions/session_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  sessionErrors: state.errors.login,
  loginModal: state.modals.login
});

const mapDispatchToProps = dispatch => ({
  clearSessionErrors: () => dispatch(clearSessionErrors()),
  closeLogin: () => dispatch(closeLogin()),
  login: (user) => dispatch(login(user)),
});

const styles = theme => ({
  grid:{
    margin: 50
  },
  thanksHeader:{
    marginBottom: 30,
    color: theme.palette.darkGrey
  },
  cardModalWrapper:{
    padding: 0,
    // minWidth: 500,
  },
  modalPaper:{
    margin: 15,
    backgroundColor: theme.palette.base3
  },
  badge: {
    top: 19,
    right: 19,
    border: `1px solid`,
    borderRadius: '50%',
    height: 'auto',
    color: theme.palette.base3,
    backgroundColor: theme.palette.text.primary,
    padding: 5,
    cursor: 'pointer'
  },
  listText:{ color: theme.palette.text.primary},
  loginButton: {
    textTransform: 'capitalize',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 400
  },
  form: {
    margin: 30
  },
  forgotPassword: {
    marginTop: 15,
    cursor: 'pointer',
    fontSize: 12
  }
});

class LoginModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      login: false,
      loading: false
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordReset = this.handlePasswordReset.bind(this);
    this.backToLogin = this.backToLogin.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let next = nextProps.loginModal
    let current = this.props.loginModal
    if(next.open && next.open !== current.open){
      this.setState({ login: next.login })
    }
    return true
  }

  handleChange(field){
    return (e) => {
      e.preventDefault();
      this.setState({ [field]: e.target.value});
    }
  }

  handleSubmit(e){
    e.preventDefault();
    let credentials = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(credentials)
    .then(() => {
      if(this.props.sessionErrors.length > 0){
        this.setState({ login: false})
      } else {
        this.handleClose();
      }
    })
  }

  handleClose = () => {
    if(this.props.sessionErrors.length > 0){
      this.props.clearSessionErrors();
    }
    this.props.closeLogin();
    this.setState({ email: '', password: ''})
  };

  handlePasswordReset(){
    this.handleClose();
    this.props.history.push('/passwordreset');
  }

  backToLogin(){
    this.setState({ login: true, email: '', password:''})
  }

  render () {
    const { classes, loginModal } = this.props;
    const { login, email, password } = this.state;

    let sessionErrors = this.props.sessionErrors.map(error => {
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

    let responseText = (
      <Grid item xs={11} sm={10} className={classes.grid}>
        <Typography variant="h2" id="modal-title" color='textPrimary'
          className={classes.thanksHeader} align='left'>
          You’re almost back in!
        </Typography>
        <Typography variant="body1" id="simple-modal-description"
          align='left' color='textPrimary'>
          We weren’t able to log you in because:
        </Typography>
        <List data-cy='login-errors'>
          {sessionErrors}
        </List>

        <Grid item xs={12} container justify='flex-start'>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='primary'>
            Close
          </Button>
        </Grid>

        <Grid container justify='center'>
          <Button className={classes.loginButton}
          autoFocus color='secondary'
          onClick={this.backToLogin}>
            {`Retry?`}
          </Button>
        </Grid>

        <Typography color='textSecondary' align='center'
        className={classes.forgotPassword}
        onClick={this.handlePasswordReset}>
          <i>{`Forgot Password?`}</i>
        </Typography>
      </Grid>
    )

    let closeBar = (
      <Grid container justify='flex-end'>
        <CloseIcon onClick={this.handleClose}
          style={{ color: 'grey', pointer: 'cursor'}}/>
      </Grid>
    )
    let form = (
      <Grid item container xs={10} direction='column'
      className={classes.form}>
        {closeBar}
        <Typography color='textSecondary' align='center'
        gutterBottom
        style={{ fontSize: 18, fontWeight: 600, marginTop: 10}}>
          {`Login To Your Bridgekin Acount below:`}
        </Typography>
        <TextField
          required
          label="Email"
          className={classes.textField}
          margin="normal"
          variant='outlined'
          type='text'
          value={email}
          onChange={this.handleChange('email')}
          onMouseUp={this.handleChange('email')}
          />
        <TextField
          required
          label="Password"
          className={classes.textField}
          margin="normal"
          variant='outlined'
          type='password'
          value={password}
          onChange={this.handleChange('password')}
          onMouseUp={this.handleChange('password')}
          />

        <Grid container justify='center'>
          <Button className={classes.loginButton}
          autoFocus variant='contained' color='primary'
          disabled={!email || !password}
          onClick={this.handleSubmit}>
            {`Login`}
          </Button>
        </Grid>

        <Typography color='textSecondary' align='center'
        className={classes.forgotPassword}
        onClick={this.handlePasswordReset}>
          <i>{`Forgot Password?`}</i>
        </Typography>
      </Grid>
    )

    let content = login ? form : responseText

    return (
      <Dialog
        open={loginModal.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={this.handleClose}
        className={classes.cardModalWrapper}
        classes={{ paper: classes.modalPaper}}>
          <Grid container justify='center' alignItems='center'>
            {content}
          </Grid>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(LoginModal)));
