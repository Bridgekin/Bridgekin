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
  },
  badge: {
    top: 4,
    right: 4,
    border: `1px solid`,
    color: theme.palette.white,
    backgroundColor: theme.palette.primary.main,
    padding: 5
    // The border color match the background color.
    // border: `2px solid ${
    //   theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    // }`,
  },
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
    const { open, classes, referred } = this.props;

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

    let modalSuccessText = referred ? (
      <Grid item xs={11} sm={10} md={8} className={classes.grid}
        container justify='flex-start'>
        <Typography variant="h2" id="modal-title" color='textPrimary'
          className={classes.thanksHeader} align='left'>
          Thanks for referring your trusted contact!
        </Typography>
        <Typography variant="body1" id="simple-modal-description"
          align='left'>
          We’ve sent them an email letting them know you referred them and they’ve been added to our waitlist.
        </Typography>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='secondary'>
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
          align='left'>
          You've now been added to our waitlist! You'll receive a confirmation email shortly.
        </Typography>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='secondary'>
            Close
          </Button>
        </Grid>
      </Grid>
    )

    let modalErrorText = referred ? (
      <Grid item xs={11} sm={10} md={8} className={classes.grid}
        container justify='flex-start'>
        <Typography variant="h2" id="modal-title" color='textPrimary'
          className={classes.thanksHeader} align='left'>
          Thanks for referring your trusted contact!
        </Typography>
        <Typography variant="body1" id="simple-modal-description"
          align='left'>
          It looks like we were unable to add them to the waitlist because:
        </Typography>
        <List>
          {waitlistErrors}
        </List>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='secondary'>
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
          align='left'>
          Unfortunately, we weren't able to sign you up because:
        </Typography>
        <List>
          {waitlistErrors}
        </List>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='secondary'>
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
        open={open}
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
