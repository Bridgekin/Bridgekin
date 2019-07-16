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
import { fetchUserOpportunities,
  deleteOpportunity } from '../../actions/opportunity_actions';
import { closeSalesNetworkInvite } from '../../actions/modal_actions';
import { clearSalesNetworkInviteErrors } from '../../actions/error_actions';
// import theme from './theme';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  salesNetworkInviteModal: state.modals.salesNetworkInvite,
  salesNetworkInviteErrors: state.errors.salesNetworkInvite,
  salesNetworkInvites: state.entities.sales.salesNetworkInvites,
});

const mapDispatchToProps = dispatch => ({
  closeSalesNetworkInvite: () => dispatch(closeSalesNetworkInvite()),
  clearSalesNetworkInviteErrors: () => dispatch(clearSalesNetworkInviteErrors())
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

class SalesNetworkInviteModal extends React.Component {
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
    const nextModal = nextProps.salesNetworkInviteModal;
    const currentModal = this.props.salesNetworkInviteModal;
    if (nextModal.open && currentModal.open !== nextModal.open) {
      this.setState({ page: nextModal.page })
    }
    return true;
  }

  handleClose(){
    if (this.props.salesNetworkInviteErrors.length > 0) {
      this.props.clearSalesNetworkInviteErrors();
    }
    this.setState({ loaded: false },
      () => this.props.closeSalesNetworkInvite());
  };

  redirectToDashboard(){
    this.props.closeSalesNetworkInvite()
    this.props.history.push('/sales/dashboard')
  }

  getContent(){
    const { classes, salesNetworkInviteModal } = this.props;
    const { page } = this.state;

    switch(page){
      case 'response':
        let salesNetworkInviteErrors = this.props.salesNetworkInviteErrors.map(error => {
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

        let modalText = this.props.salesNetworkInviteErrors.length === 0 ? (
          <Grid item xs={10}>
            <Typography variant="h2" id="modal-title"
              color='textPrimary' align='left'
              className={classes.thanksHeader} >
              {`Your Invites Have Been Sent`}
            </Typography>
            <Typography variant="body1" id="simple-modal-description"
              data-cy='signup-success'
              color='textPrimary' align='left'>
              {`We've sent email requests to the teammembers and partners you've requested. Once they click the link, they'll be able to signup or upload their contacts, depending on what type of user they are.`}
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
              {salesNetworkInviteErrors}
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
    const { classes, salesNetworkInviteModal } = this.props;

    return (
      <Dialog
        open={salesNetworkInviteModal.open}
        onClose={this.handleClose}
        className={classes.cardModalWrapper}
        classes={{ paper: classes.modalPaper }}>
        <Grid container justify='center'
          style={{ padding: "20px 0px"}}>
          <Grid item xs={10} container justify='flex-end'>
            <CloseIcon onClick={this.handleClose}
              style={{ color: 'grey', pointer: 'cursor'}}/>
          </Grid>
          {salesNetworkInviteModal.open && this.getContent()}
        </Grid>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(SalesNetworkInviteModal)));
