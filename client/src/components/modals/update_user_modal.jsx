import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';

import CloseIcon from '@material-ui/icons/CloseSharp';

import { connect } from 'react-redux';
import { closeUpdateUser } from '../../actions/modal_actions';
import { clearUserErrors } from '../../actions/error_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  userErrors: state.errors.users,
  updateUserModal: state.modals.updateUser
});

const mapDispatchToProps = dispatch => ({
  closeUpdateUser: () => dispatch(closeUpdateUser()),
  clearUserErrors: () => dispatch(clearUserErrors())
});

const styles = theme => ({
  thanksHeader:{
    marginBottom: 30,
    color: theme.palette.darkGrey
  },
  grid:{
    margin: '70px 0px 70px 0px'
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
  listText:{ color: theme.palette.text.primary}
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

  handleClose(){
    this.props.closeUpdateUser();

    if(this.props.userErrors.length > 0){
      this.props.clearUserErrors();
    } else {
      this.props.history.push('/account/profile')
    }
  };

  getText(){
    const { classes, updateUserModal } = this.props;

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

    let modalTextEmail = this.props.userErrors.length === 0 ? (
      <Grid item xs={11} sm={10} md={8} className={classes.grid}>
        <Typography variant="h2" id="modal-title" color='textPrimary'
          className={classes.thanksHeader} align='left'>
          Email Confirmation Sent!
        </Typography>
        <Typography variant="body1" id="simple-modal-description"
          color='textPrimary' align='left'>
          We've sent you an email confirmation at your new email address. Confirm your email to finalize this change.
        </Typography>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='primary'>
            Close
          </Button>
        </Grid>
      </Grid>
    ) : (
      <Grid item xs={11} sm={10} md={8} className={classes.grid}>
        <Typography variant="h2" id="modal-title" color='textPrimary'
          className={classes.thanksHeader} align='left'>
          Email Confirmation Error
        </Typography>
        <Typography variant="body1" id="simple-modal-description"
          color='textPrimary' align='left'>
          Unfortunately, we weren't able to change your email because:
        </Typography>
        <List>
          {userErrors}
        </List>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='primary'>
            Close
          </Button>
        </Grid>
      </Grid>
    )

    let modalTextPassword = this.props.userErrors.length === 0 ? (
      <Grid item xs={11} sm={10} md={8} className={classes.grid}>
        <Typography variant="h2" id="modal-title" color='textPrimary'
          className={classes.thanksHeader} align='left'>
          Password Changed!
        </Typography>
        <Typography variant="body1" id="simple-modal-description"
          color='textPrimary' align='left'>
          You have successfully updated your password.
        </Typography>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='primary'>
            Close
          </Button>
        </Grid>
      </Grid>
    ) : (
      <Grid item xs={11} sm={10} md={8} className={classes.grid}>
        <Typography variant="h2" id="modal-title" color='textPrimary'
          className={classes.thanksHeader} align='left'>
          Password wasn't changed
        </Typography>
        <Typography variant="body1" id="simple-modal-description"
          color='textPrimary' align='left'>
          Unfortunately, we weren't able to change your password because:
        </Typography>
        <List>
          {userErrors}
        </List>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='primary'>
            Close
          </Button>
        </Grid>
      </Grid>
    )

    let modalTextGeneral = this.props.userErrors.length === 0 ? (
      <Grid item xs={11} sm={10} md={8} className={classes.grid}>
        <Typography variant="h2" id="modal-title" color='textPrimary'
          className={classes.thanksHeader} align='left'>
          Profile Information Updated
        </Typography>
        <Typography variant="body1" id="simple-modal-description"
          color='textPrimary' align='left'>
          You have successfully updated your profile information.
        </Typography>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='primary'>
            Close
          </Button>
        </Grid>
      </Grid>
    ) : (
      <Grid item xs={11} sm={10} md={8} className={classes.grid}>
        <Typography variant="h2" id="modal-title" color='textPrimary'
          className={classes.thanksHeader} align='left'>
          Profile Information Wasn't Updated
        </Typography>
        <Typography variant="body1" id="simple-modal-description"
          color='textPrimary' align='left'>
          Unfortunately, we weren't able to update your profile info because:
        </Typography>
        <List>
          {userErrors}
        </List>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='primary'>
            Close
          </Button>
        </Grid>
      </Grid>
    )

    switch(updateUserModal.settingsType){
      case 'email':
        return modalTextEmail;
      case 'password':
        return modalTextPassword;
      default:
        return modalTextGeneral;
    }
  }

  render () {
    const { updateUserModal, classes } = this.props;
    // let modalText = {updateUserModal.settingsType === 'password' ? {modalTextPassword} : {modalTextGeneral}}

    return (
      <Dialog
        open={updateUserModal.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={this.handleClose}
        classes={{ paper: classes.modalPaper}}>
        <Badge
          badgeContent={<CloseIcon onClick={this.handleClose}/>}
          classes={{ badge: classes.badge }}
          style={{ width: '100%'}}
          >
          <Grid container justify='center' alignItems='center'>
            {this.getText()}
          </Grid>
        </Badge>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(UpdateUserModal)));
