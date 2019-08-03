import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/CloseSharp';
import Capitalize from 'capitalize';

import { connect } from 'react-redux';
import { closeSalesInvite } from '../../actions/modal_actions';
import { clearSalesInviteErrors } from '../../actions/error_actions';
// import theme from './theme';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  salesInviteModal: state.modals.salesInvite,
  salesInviteErrors: state.errors.salesInvite,
  salesInvites: state.entities.sales.salesInvites,
});

const mapDispatchToProps = dispatch => ({
  closeSalesInvite: () => dispatch(closeSalesInvite()),
  clearSalesInviteErrors: () => dispatch(clearSalesInviteErrors())
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
    backgroundColor: theme.palette.base3,
    minWidth: 400,
    [theme.breakpoints.down('sm')]: {
      minWidth: `60%`
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: `90%`
    },
  },
  listText:{ color: theme.palette.text.primary},
  button:{
    margin: 10
  },
  modalWrapper: {
    padding: 0,
    // minWidth: 500,
  },
});

class SalesInviteModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      subject: '',
      body: '',
      loading: false,
      success: false,
      open: false,
      page: 'response',
      reason: '',
      details: ''
    };

    this.handleClose = this.handleClose.bind(this);
    this.getContent = this.getContent.bind(this);
    this.redirectToDashboard = this.redirectToDashboard.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const nextModal = nextProps.salesInviteModal;
    const currentModal = this.props.salesInviteModal;
    if (nextModal.open && currentModal.open !== nextModal.open) {
      this.setState({ page: nextModal.page })
    }
    return true;
  }

  handleClose(){
    if (this.props.salesInviteErrors.length > 0) {
      this.props.clearSalesInviteErrors();
    }
    this.setState({ loaded: false },
      () => this.props.closeSalesInvite());
  };

  redirectToDashboard(){
    this.props.closeSalesInvite()
    this.props.history.push('/sales/dashboard')
  }

  getContent(){
    const { classes, salesInviteModal } = this.props;
    const { page } = this.state;

    switch(page){
      case 'response':
        let salesInviteErrors = this.props.salesInviteErrors.map(error => {
          error = error.replace(/(Fname|Lname)/g, (ex) => {
            return ex === 'Fname' ? 'First name' : 'Last name';
          });
          return (
            <ListItem >
              <ListItemText primary={error}
                classes={{ primary: classes.listText }} />
            </ListItem>
          )
        })

        let modalText = this.props.salesInviteErrors.length === 0 ? (
          <Grid item xs={10}>
            <Typography variant="h2" id="modal-title"
              color='textPrimary' align='left'
              data-cy='invite-response-header'
              className={classes.thanksHeader} >
              {`Your Invites Have Been Sent`}
            </Typography>
            <Typography variant="body1" id="simple-modal-description"
              data-cy='signup-success'
              color='textPrimary' align='left'>
              {`We've sent email requests to the contacts you've requested. Once they click the link, they'll be able to signup!`}
            </Typography>
            <Grid item xs={12}>
              <Button variant="contained" style={{ margin: '0 auto', marginTop: 30 }}
                onClick={this.redirectToDashboard} color='primary'>
                {`Back to Dashboard`}
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={10}>
            <Typography variant="h2" id="modal-title"
              color='textPrimary' align='left'
              className={classes.thanksHeader}>
              {`Your Invites Weren't Sent`}
          </Typography>
            <Typography variant="body1" id="simple-modal-description"
              color='textPrimary' align='left'>
              {`Unfortunately, we weren't able to send your invites because:`}
          </Typography>
            <List data-cy='signup-errors'>
              {salesInviteErrors}
            </List>
            <Grid container justify='center'
              style={{ marginTop: 30 }}>
              <Button variant="contained"
                onClick={this.handleClose} color='primary'>
                Close
            </Button>
            </Grid>
          </Grid>
        )
        return <Grid container justify='center'>
          {modalText}
        </Grid>
      default:
        return <div></div>
    }
  }

  render() {
    const { classes, salesInviteModal } = this.props;

    return (
      <Dialog
        open={salesInviteModal.open}
        onClose={this.handleClose}
        className={classes.cardModalWrapper}
        classes={{ paper: classes.modalPaper }}>
        <Grid container justify='center'
          style={{ padding: "20px 0px"}}>
          <Grid item xs={10} container justify='flex-end'>
            <CloseIcon onClick={this.handleClose}
              style={{ color: 'grey', pointer: 'cursor'}}/>
          </Grid>
          {salesInviteModal.open && this.getContent()}
        </Grid>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(SalesInviteModal)));
