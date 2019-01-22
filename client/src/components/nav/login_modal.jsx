import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/CloseSharp';

import { connect } from 'react-redux';
import { clearSessionErrors } from '../../actions/error_actions';
// import theme from './theme';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  sessionErrors: state.errors.login
});

const mapDispatchToProps = dispatch => ({
  clearSessionErrors: () => dispatch(clearSessionErrors())
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
  cardModalWrapper:{
    padding: 0,
    minWidth: 500,
  },
  grid:{
    margin: '70px 0px 70px 0px'
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
  },
});

class LoginModal extends React.Component {
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
    if(this.props.sessionErrors){
      this.props.clearSessionErrors();
    }
    // this.props.handleClose();
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

    let modalText = (
      <Grid item xs={11} sm={10} md={8} className={classes.grid}>
        <Typography variant="h2" id="modal-title" color='textPrimary'
          className={classes.thanksHeader} align='left'>
          You’re almost back in!
        </Typography>
        <Typography variant="body1" id="simple-modal-description"
          align='left'>
          We weren’t able to log you in because:
        </Typography>
        <List>
          {sessionErrors}
        </List>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='secondary'>
            Close
          </Button>
        </Grid>
      </Grid>
    )

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
            {modalText}
          </Grid>
        </Badge>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginModal));
