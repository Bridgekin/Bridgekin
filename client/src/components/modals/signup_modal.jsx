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
import { closeSignup } from '../../actions/modal_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  userErrors: state.errors.users,
  signupModal: state.modals.signup
});

const mapDispatchToProps = dispatch => ({
  clearUserErrors: () => dispatch(clearUserErrors()),
  closeSignup: () => dispatch(closeSignup()),
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

  handleClose(e){
    e.stopPropagation();
    if(this.props.userErrors){
      this.props.clearUserErrors();
    }
    this.props.closeSignup();
  };

  render () {
    const { classes, signupModal } = this.props;

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
      <Grid item xs={11} sm={10} md={8} className={classes.grid}>
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
      <Grid item xs={11} sm={10} md={8} className={classes.grid}>
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
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='primary'>
            Close
          </Button>
        </Grid>
      </Grid>
    )

    return (
      <Dialog
        open={signupModal.open}
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
            {modalText}
          </Grid>
        </Badge>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignupModal));
