import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { clearSessionErrors } from '../../actions/error_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  sessionErrors: state.errors.login
});

const mapDispatchToProps = dispatch => ({
  clearSessionErrors: () => dispatch(clearSessionErrors())
});

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '40%',
    height: 350,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  thanksHeader:{
    marginBottom: 30
  }
});

class SignupModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      success: false,
      open: false
    };

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose = () => {
    if(this.props.sessionErrors){
      this.props.clearSessionErrors();
    }
    this.props.handleClose();
  };

  render () {
    const { open, classes } = this.props;

    let sessionErrors = this.props.sessionErrors.map(error => {
      error = error.replace(/(Fname|Lname)/g, (ex) => {
        return ex === 'Fname' ? 'First name' : 'Last name';
      });
      return (
        <ListItem >
          <ListItemText primary={error} />
        </ListItem>
      )
    })

    let modalText = this.props.sessionErrors.length === 0 ? (
      <div style={{top:'25%', left: '30%'}} className={classes.paper}>
        <Typography variant="h4" id="modal-title" color='secondary' className={classes.thanksHeader}>
          Thanks for signing up!
        </Typography>
        <Typography variant="subtitle1" id="simple-modal-description">
          We've sent you a confirmation email. Confirm your email to login.
        </Typography>
        <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
          onClick={this.handleClose} color='secondary'>
          Close
        </Button>
      </div>
    ) : (
      <div style={{top:'25%', left: '30%'}} className={classes.paper}>
        <Typography variant="h4" id="modal-title" color='secondary' className={classes.thanksHeader}>
          Thanks for your interest in Bridgekin!
        </Typography>
        <Typography variant="subtitle1" id="simple-modal-description">
          Apologies, but we weren't able to sign you up because:
        </Typography>
        <List>
          {sessionErrors}
        </List>
        <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
          onClick={this.handleClose} color='secondary'>
          Close
        </Button>
      </div>
    )

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        disableAutoFocus={true}
        onClose={this.handleClose}>
        {modalText}
      </Modal>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignupModal));
