import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import theme from '../theme';
import Grid from '@material-ui/core/Grid';

import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/CloseSharp';

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
    // position: 'absolute',
    // width: '40%',
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
    marginBottom: 30,
    color: theme.palette.darkGrey
  },
  grid:{
    margin: '70px 0px 70px 0px'
  },
  modalPaper:{
    margin: 15
  },
  badge: {
    top: 19,
    right: 19,
    border: `1px solid`,
    borderRadius: '50%',
    height: 'auto',
    color: theme.palette.white,
    backgroundColor: theme.palette.primary.main,
    padding: 5,
    cursor: 'pointer'
  },
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

  getText(){
    const { classes, modalType } = this.props;

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

    let modalTextEmail = this.props.userErrors.length === 0 ? (
      <Grid item xs={11} sm={10} md={8} className={classes.grid}>
        <Typography variant="h2" id="modal-title" color='textPrimary'
          className={classes.thanksHeader} align='left'>
          Email Confirmation Sent!
        </Typography>
        <Typography variant="body1" id="simple-modal-description"
          align='left'>
          We've sent you an email confirmation at your new email address. Confirm your email to finalize this change.
        </Typography>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='secondary'>
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
          align='left'>
          Unfortunately, we weren't able to change your email because:
        </Typography>
        <List>
          {userErrors}
        </List>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='secondary'>
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
          align='left'>
          You have successfully updated your password.
        </Typography>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='secondary'>
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
          align='left'>
          Unfortunately, we weren't able to change your password because:
        </Typography>
        <List>
          {userErrors}
        </List>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='secondary'>
            Close
          </Button>
        </Grid>
      </Grid>
    )

    let modalTextGeneral = this.props.userErrors.length === 0 ? (
      <Grid item xs={11} sm={10} md={8} className={classes.grid}>
        <Typography variant="h2" id="modal-title" color='secondary'
          className={classes.thanksHeader} align='left'>
          Profile Information Updated
        </Typography>
        <Typography variant="body1" id="simple-modal-description"
          align='left'>
          You have successfully updated your profile information.
        </Typography>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='secondary'>
            Close
          </Button>
        </Grid>
      </Grid>
    ) : (
      <Grid item xs={11} sm={10} md={8} className={classes.grid}>
        <Typography variant="h2" id="modal-title" color='secondary'
          className={classes.thanksHeader} align='left'>
          Profile Information Wasn't Updated
        </Typography>
        <Typography variant="body1" id="simple-modal-description"
          align='left'>
          Unfortunately, we weren't able to update your profile info because:
        </Typography>
        <List>
          {userErrors}
        </List>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='secondary'>
            Close
          </Button>
        </Grid>
      </Grid>
    )

    switch(modalType){
      case 'email':
        return modalTextEmail;
      case 'password':
        return modalTextPassword;
      default:
        return modalTextGeneral;
    }
  }

  render () {
    const { open, classes } = this.props;

    // let modalText = {modalType === 'password' ? {modalTextPassword} : {modalTextGeneral}}

    return (
      <Dialog
        open={open}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UpdateUserModal));
