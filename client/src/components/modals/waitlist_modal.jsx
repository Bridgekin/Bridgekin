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

import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/CloseSharp';

import { connect } from 'react-redux';
import { closeWaitlist } from '../../actions/modal_actions';
import { clearWaitlistUserErrors } from '../../actions/error_actions';
// import theme from './theme';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  waitlistErrors: state.errors.waitlistUsers,
  waitlistModal: state.modals.waitlist
});

const mapDispatchToProps = dispatch => ({
  closeWaitlist: () => dispatch(closeWaitlist()),
  clearWaitlistUserErrors: () => dispatch(clearWaitlistUserErrors())
});

const styles = theme => ({
  grid:{
    margin: '70px 0px 70px 0px'
  },
  thanksHeader:{
    marginBottom: 30,
    // color: theme.palette.darkGrey
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
  listText:{ color: theme.palette.text.primary}
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

  handleClose(){
    if(this.props.waitlistErrors){
      this.props.clearWaitlistUserErrors();
    }
    this.props.closeWaitlist();
  };

  render() {
    const { open, classes, referred,
      waitlistModal } = this.props;

    let waitlistErrors = this.props.waitlistErrors.map(error => {
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

    let modalSuccessText = waitlistModal.referred ? (
      <Grid item xs={11} sm={10} md={8} className={classes.grid}
        container justify='flex-start'>
        <Typography variant="h2" id="modal-title" color='textPrimary'
          className={classes.thanksHeader} align='left'>
          {`You’ve invited your trusted contact!`}
        </Typography>
        <Typography variant="body1" id="simple-modal-description"
          data-cy='waitlist-success'
          align='left' color='textPrimary'>
          {`We’ve sent them an email letting them know.`}
        </Typography>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='primary'>
            Close
          </Button>
        </Grid>
      </Grid>
    ) : (
      <Grid item xs={11} sm={10} md={8} className={classes.grid}
        container justify='flex-start'>
        <Typography variant="h2" id="modal-title" color='textPrimary'
          className={classes.thanksHeader} align='left'>
          Thanks for signing up!
        </Typography>
        <Typography variant="body1" id="simple-modal-description"
          align='left' color='textPrimary'
          data-cy='waitlist-success'>
          You've now been added to our waitlist! You'll receive a confirmation email shortly.
        </Typography>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='primary'>
            Close
          </Button>
        </Grid>
      </Grid>
    )

    let modalErrorText = waitlistModal.referred ? (
      <Grid item xs={11} sm={10} md={8} className={classes.grid}
        container justify='flex-start'>
        <Typography variant="h2" id="modal-title" color='textPrimary'
          className={classes.thanksHeader} align='left'>
          Thanks for referring your trusted contact!
        </Typography>
        <Typography variant="body1" id="simple-modal-description"
          align='left' color='textPrimary'>
          It looks like we were unable to add them to the waitlist because:
        </Typography>
        <List data-cy='waitlist-errors'>
          {waitlistErrors}
        </List>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='primary'>
            Close
          </Button>
        </Grid>
      </Grid>
    ) : (
      <Grid item xs={11} sm={10} md={8} className={classes.grid}
        container justify='flex-start'>
        <Typography variant="h2" id="modal-title" color='textPrimary'
          className={classes.thanksHeader} align='left'>
          Thanks for your interest in Bridgekin!
        </Typography>
        <Typography variant="body1" id="simple-modal-description"
          align='left' color='textPrimary'>
          Unfortunately, we weren't able to sign you up because:
        </Typography>
        <List data-cy='waitlist-errors'>
          {waitlistErrors}
        </List>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='primary'>
            Close
          </Button>
        </Grid>
      </Grid>
    )


    let modalText = this.props.waitlistErrors.length === 0 ? (
      modalSuccessText
    ) : (
      modalErrorText
    )

    return (
      <Dialog
        open={waitlistModal.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={this.handleClose}
        className={classes.cardModalWrapper}
        classes={{ paper: classes.modalPaper}}>
        <Badge
          badgeContent={<CloseIcon onClick={this.handleClose}/>}
          classes={{ badge: classes.badge }}
          style={{ width: '100%'}}
          >
          <Grid container justify='center' alignItems='center'>
            {modalText}
          </Grid>
        </Badge>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WaitlistModal));
