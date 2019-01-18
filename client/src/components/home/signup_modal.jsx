import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import theme from '../theme';

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
      this.props.clearUserErrors();
    }
    this.props.handleClose();
  };

  render () {
    const { open, classes } = this.props;

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

    let modalText = this.props.userErrors.length === 0 ? (
      <div className={classes.paper}>
        <Typography variant="h2" id="modal-title" color='secondary' className={classes.thanksHeader}>
          Thanks for signing up!
        </Typography>
        <Typography variant="body1" id="simple-modal-description">
          We've sent you a confirmation email. Please confirm within your email to login.
        </Typography>
        <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
          onClick={this.handleClose} color='secondary'>
          Close
        </Button>
      </div>
    ) : (
      <div className={classes.paper}>
        <Typography variant="h2" id="modal-title" color='secondary' className={classes.thanksHeader}>
          Thanks for your interest in Bridgekin!
        </Typography>
        <Typography variant="body1" id="simple-modal-description">
          Unfortunately, we weren't able to sign you up because:
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

    return (
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={this.handleClose}>
        {modalText}
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignupModal));
