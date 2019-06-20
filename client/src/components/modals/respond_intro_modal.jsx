import React from 'react';
import { withStyles } from '@material-ui/core/styles';

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
import { closeRespondToRequest } from '../../actions/modal_actions';
import { clearSalesIntroErrors } from '../../actions/error_actions';
// import theme from './theme';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  respondToRequestModal: state.modals.respondToRequest,
  salesIntroErrors: state.errors.salesIntro,
  salesIntros: state.entities.sales.salesIntros,
  salesContacts: state.entities.sales.salesContacts
});

const mapDispatchToProps = dispatch => ({
  closeRespondToRequest: () => dispatch(closeRespondToRequest()),
  fetchUserOpportunities: () => dispatch(fetchUserOpportunities()),
  deleteOpportunity: (id) => dispatch(deleteOpportunity(id)),
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
  listText:{ color: theme.palette.text.primary},
  button:{
    margin: 10
  }
});

class RespondIntroModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      fname: '',
      lname: '',
      loading: false,
      success: false,
      open: false,
      page: 'response',
      reason: '',
      details: ''
    };

    this.reasons = [
      "I'd rather a sales person reach out and use my name",
      "I don't believe they need our services"]

    this.handleClose = this.handleClose.bind(this);
    this.getContent = this.getContent.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const nextModal = nextProps.respondToRequestModal;
    const currentModal = this.props.respondToRequestModal;
    if (nextModal.open && currentModal.open !== nextModal.open) {
      switch(nextModal.decision){
        case "yes":
          this.setState({ page: 'intro'})
          break;
        case "no":
          this.setState({ page: 'refuse' })
          break;
        default:
          break;
      }
    }
    return true;
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value })
    }
  }

  handleCheckbox(field, index){
    return e => {
      this.setState({[field]: this.reasons[index]});
    }
  }

  handleClose(){
    if (this.props.salesIntroErrors.length > 0) {
      this.props.clearSalesIntroErrors();
    }
    this.setState({ loaded: false },
      () => this.props.closeRespondToRequest());
  };

  getContent(){
    const { page, reason, details } = this.state;

    switch(page){
      case 'intro':
        let intro = <Grid item xs={10} container direction='column'>
          
        </Grid>
        return intro;
      case 'refuse':
        const { respondToRequestModal, salesIntros,
        salesContacts } = this.props;
        let contact = salesContacts[salesIntros[respondToRequestModal.introId].contactId]

        let refuse = <Grid item xs={10} container direction='column'>
          <Typography gutterBottom
            style={{ fontSize: 16, fontWeight: 600 }}>
            {`Tell us why ${Capitalize(contact.fname)} ${Capitalize(contact.lname)} isn’t a good fit `}
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={reason === this.reasons[0]}
                onChange={this.handleCheckbox('reason', 0)}
                color="primary"
              />
            }
            label={this.reasons[0]}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={reason === this.reasons[1]}
                onChange={this.handleCheckbox('reason', 1)}
                color="primary"
              />
            }
            label={this.reasons[1]}
      />
          <Typography gutterBottom
            style={{ fontSize: 16, fontWeight: 600 }}>
            {`More Details `}
          </Typography>
          <TextField
            multiline
            fullWidth
            rows="6"
            variant='outlined'
            helperText="Optional"
            placeholder={`Additional details`}
            value={details}
            onChange={this.handleChange('details')}
          />
          <Grid container justify='center'
          style={{ marginTop: 20}}>
            <div>
              <Button variant='contained' color='primary'
              onClick={this.handleSubmit}>
                {`Send`}
              </Button>
            </div>
          </Grid>
        </Grid>
        return refuse;
      case 'response':
        return 'response';
      default:
        return ''
    }
  }

  render() {
    const { classes, respondToRequestModal } = this.props;

    return (
      <Dialog
        open={respondToRequestModal.open}
        onClose={this.handleClose}>
        <Grid container justify='center'
          style={{ padding: "20px 0px"}}>
          <Grid item xs={10} container justify='flex-end'>
            <CloseIcon onClick={this.handleClose}
              style={{ color: 'grey', pointer: 'cursor'}}/>
          </Grid>
          {respondToRequestModal.open && this.getContent()}
        </Grid>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RespondIntroModal));
