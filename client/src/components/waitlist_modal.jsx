import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { clearWaitlistUserErrors } from '../actions/error_actions';
import theme from './theme';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  waitlistErrors: state.errors.waitlistUsers
});

const mapDispatchToProps = dispatch => ({
  clearWaitlistUserErrors: () => dispatch(clearWaitlistUserErrors())
});

const styles = theme => ({
  grid:{
    margin: '70px 0px 70px 0px'
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
    margin: 15
  }
});

class WaitlistModal extends React.Component {
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
    if(this.props.waitlistErrors){
      this.props.clearWaitlistUserErrors();
    }
    this.props.handleClose();
  };

  render () {
    const { open, classes } = this.props;

    let waitlistErrors = this.props.waitlistErrors.map(error => {
      error = error.replace(/(Fname|Lname)/g, (ex) => {
        return ex === 'Fname' ? 'First name' : 'Last name';
      });
      return (
        <ListItem >
          <ListItemText primary={error} />
        </ListItem>
      )
    })

    let modalText = this.props.waitlistErrors.length === 0 ? (
      <Grid item xs={11} sm={10} md={8} className={classes.grid}>
        <Typography variant="h2" id="modal-title" color='textPrimary'
          className={classes.thanksHeader}>
          Thanks for signing up!
        </Typography>
        <Typography variant="body1" id="simple-modal-description">
          You've now been added to our waitlist! You'll receive a confirmation email shortly.
        </Typography>
        <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
          onClick={this.handleClose} color='secondary'>
          Close
        </Button>
      </Grid>
    ) : (
      <Grid item xs={11} sm={10} md={8} className={classes.grid}>
        <Typography variant="h2" id="modal-title" color='textPrimary'
          className={classes.thanksHeader}>
          Thanks for your interest in Bridgekin!
        </Typography>
        <Typography variant="body1" id="simple-modal-description">
          Unfortunately, we weren't able to sign you up because:
        </Typography>
        <List>
          {waitlistErrors}
        </List>
        <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
          onClick={this.handleClose} color='secondary'>
          Close
        </Button>
      </Grid>
    )

    return (
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={this.handleClose}
        className={classes.cardModalWrapper}
        classes={{ paper: classes.modalPaper}}>
        <Grid container justify='center' alignItems='center'>
          {modalText}
        </Grid>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WaitlistModal));
