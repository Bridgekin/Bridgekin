import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { clearUserErrors } from '../../actions/error_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  userErrors: state.errors.users
});

const mapDispatchToProps = dispatch => ({
  clearUserErrors: () => dispatch(clearUserErrors())
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

class UpdateUserModal extends React.Component {
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

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose = () => {
    this.props.handleClose();

    if(this.props.userErrors){
      this.props.clearUserErrors();
    }
  };

  render () {
    const { open, classes, modalType } = this.props;

    let userErrors = this.props.userErrors.map(error => {
      error = error.replace(/(Fname|Lname)/g, (ex) => {
        return ex === 'Fname' ? 'First name' : 'Last name';
      });
      return (
        <ListItem >
          <ListItemText primary={error} />
        </ListItem>
      )
    })

    let modalTextPassword = this.props.userErrors.length === 0 ? (
      <div style={{top:'25%', left: '30%'}} className={classes.paper}>
        <Typography variant="h4" id="modal-title" color='secondary' className={classes.thanksHeader}>
          Password Changed!
        </Typography>
        <Typography variant="subtitle1" id="simple-modal-description">
          You have successfully updated your password.
        </Typography>
        <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
          onClick={this.handleClose} color='secondary'>
          Close
        </Button>
      </div>
    ) : (
      <div style={{top:'25%', left: '30%'}} className={classes.paper}>
        <Typography variant="h4" id="modal-title" color='secondary' className={classes.thanksHeader}>
          Password wasn't changed
        </Typography>
        <Typography variant="subtitle1" id="simple-modal-description">
          Apologies, but we weren't able to change your password because:
        </Typography>
        <List>
          {userErrors}
        </List>
        <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
          onClick={this.handleClose} color='secondary'>
          Close
        </Button>
      </div>
    )

    let modalTextGeneral = this.props.userErrors.length === 0 ? (
      <div style={{top:'25%', left: '30%'}} className={classes.paper}>
        <Typography variant="h4" id="modal-title" color='secondary' className={classes.thanksHeader}>
          Profile Information Updated
        </Typography>
        <Typography variant="subtitle1" id="simple-modal-description">
          You have successfully updated your profile information.
        </Typography>
        <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
          onClick={this.handleClose} color='secondary'>
          Close
        </Button>
      </div>
    ) : (
      <div style={{top:'25%', left: '30%'}} className={classes.paper}>
        <Typography variant="h4" id="modal-title" color='secondary' className={classes.thanksHeader}>
          Profile Information Wasn't Updated
        </Typography>
        <Typography variant="subtitle1" id="simple-modal-description">
          Apologies, but we weren't able to update your profile info because:
        </Typography>
        <List>
          {userErrors}
        </List>
        <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
          onClick={this.handleClose} color='secondary'>
          Close
        </Button>
      </div>
    )

    // let modalText = {modalType === 'password' ? {modalTextPassword} : {modalTextGeneral}}

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        disableAutoFocus={true}
        onClose={this.handleClose}>
        {modalType === 'password' ? modalTextPassword : modalTextGeneral}

      </Modal>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UpdateUserModal));
