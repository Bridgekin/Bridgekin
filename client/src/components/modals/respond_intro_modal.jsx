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
import { closeRespondToRequest } from '../../actions/modal_actions';
import { respondToRequest, trackRespondIntro } from '../../actions/sales_intro_actions';
import { clearSalesIntroErrors } from '../../actions/error_actions';
// import theme from './theme';
import copy from 'copy-to-clipboard';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  respondToRequestModal: state.modals.respondToRequest,
  salesIntroErrors: state.errors.salesIntro,
  salesIntros: state.entities.sales.salesIntros,
  salesContacts: state.entities.sales.salesContacts,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  closeRespondToRequest: () => dispatch(closeRespondToRequest()),
  respondToRequest: response => dispatch(respondToRequest(response)),
  clearSalesIntroErrors: () => dispatch(clearSalesIntroErrors()),
  trackRespondIntro: type => dispatch(trackRespondIntro(type))
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
  },
  modalWrapper: {
    padding: 0,
    // minWidth: 500,
  },
});

class RespondIntroModal extends React.Component {
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
      details: '',
      copiedSubject: false,
      copiedBody: false
    };

    this.reasons = [
      "I'd rather a sales person reach out and use my name",
      "I don't believe they need our services"]

    this.handleClose = this.handleClose.bind(this);
    this.getContent = this.getContent.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectToStats = this.redirectToStats.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const nextModal = nextProps.respondToRequestModal;
    const currentModal = this.props.respondToRequestModal;
    if (nextModal.open && currentModal.open !== nextModal.open) {
      const { salesIntros, salesContacts } = this.props;
      let intro = salesIntros[nextModal.introId]
      let contact = salesContacts[intro.contactId]
      switch(nextModal.decision){
        case "intro":
          this.props.respondToRequest({
            decision: nextModal.decision,
            introId: nextModal.introId
          })
          let email = contact.email
          let subject = intro.introSubject || ""
          let body = intro.introBody || ""

          this.setState({
            page: 'intro',
            email, subject, body, contact
          })

          // OPEN EMAIL HERE
          // window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_self')
          // this.handleClose()
          // this.setState({ sales_intro: intro })
          break;
        case "prefer not":
          this.setState({ 
            page: "prefer not", 
            sales_intro: intro,
            contact
          })
          break;
        case "don't know":
          this.props.respondToRequest({
            decision: nextModal.decision,
            introId: nextModal.introId
          })
          this.setState({ 
            page: "don't know",
            sales_intro: intro
          })
          break;
        case "response":
          this.setState({ page: 'response' })
          break;
        default:
          break;
      }

      this.props.trackRespondIntro(nextModal.decision)
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

  handleCopy(link, field) {
    return () => {
      copy(link);
      switch(field){
        case "subject": 
          this.setState({ copiedSubject: true })
          return
        case "body": 
          this.setState({ copiedBody: true })
          return
        default: return
      }
    }
  }

  handleSubmit(){
    const { respondToRequestModal } = this.props;
    const { email, subject, body, reason, details} = this.state;
    let response = {
      decision: respondToRequestModal.decision,
      introId: respondToRequestModal.introId,
      email, subject, body, reason, details
    }
    this.props.respondToRequest(response)
    .then(() => {
      this.setState({ page: 'response' })
    })
  }

  redirectToStats(){
    this.props.closeRespondToRequest()
    this.props.history.push('/sales/stats')
  }

  getContent(){
    const { classes, respondToRequestModal, 
      salesIntros, salesContacts, users } = this.props;
    const { page, reason, details, email, 
      subject, body, contact, sales_intro,
      copiedSubject, copiedBody } = this.state;
    let requestor;

    switch(page){
      case "intro":  
        // let intro = <Grid item xs={10} container>
        //   <Typography gutterBottom
        //     style={{ fontSize: 20, fontWeight: 600 }}>
        //     {`Thanks for moving forward with this Introduction Request!`}
        //   </Typography>
        //   <Typography gutterBottom
        //     style={{ fontSize: 16 }}>
        //     {`We've opened your native email client and pre-filled the note to your contact. The rest is in your hands!`}
        //   </Typography>
        //   <Grid item xs={12}>
        //     <Button style={{ margin: '0 auto', marginTop: 30 }}
        //       onClick={this.redirectToStats} color='primary'>
        //       {`Back to Stats`}
        //     </Button>
        //   </Grid>
        // </Grid>

        let intro = <Grid item xs={10} container direction='column'>
          <Typography gutterBottom align='center'
            style={{ fontSize: 18, fontWeight: 600 }}>
            {`Message to Candidate`}
          </Typography>
          <Typography 
          style={{ fontSize: 14, margin: "15px 0px"}}>
            {`Below are the suggested subject and email. Feel free to copy both and send through your email`}
          </Typography>
          {/* <TextField
            fullWidth
            label="Email"
            variant='outlined'
            value={email}
            onChange={this.handleChange('email')}
            style={{ marginBottom: 10 }}
          /> */}
          <TextField
            fullWidth
            label="Subject"
            variant='outlined'
            value={subject}
            onChange={this.handleChange('subject')}
          />
          <Grid container justify='flex-start'>
            <Button onClick={this.handleCopy(subject, "subject")}
              color='default' variant='contained'
              style={{ margin: "20px 0px" }}>
              {copiedSubject ? `Copied` : `Copy Subject`}
            </Button>
          </Grid>
          <TextField
            fullWidth
            multiline
            rows="12"
            label="Body"
            variant='outlined'
            value={body}
            onChange={this.handleChange('body')}
          />
          <Grid container justify='flex-start'>
            <Button onClick={this.handleCopy(body, "body")}
              color='default' variant='contained'
              style={{ margin: "20px 0px" }}>
              {copiedBody ? `Copied` :`Copy Body`}
            </Button>
          </Grid>
          <Grid container justify="center"
            style={{ marginTop: 15 }}>
            <Button style={{ margin: '0 auto', marginTop: 30 }}
              onClick={this.redirectToStats} color='primary'>
              {`Back to Stats`}
            </Button>
          </Grid>
        </Grid>

        return intro;
      case "prefer not":
        requestor = users[sales_intro.requestorId]
        this.reasons[0] = `I’d rather ${Capitalize(requestor.fname)} reach out and use my name`
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
            label={this.reasons[0]}/>
          <FormControlLabel
            control={
              <Checkbox
                checked={reason === this.reasons[1]}
                onChange={this.handleCheckbox('reason', 1)}
                color="primary"
              />
            }
            label={this.reasons[1]}/>
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
          <Grid container justify="space-between"
            style={{ marginTop: 15 }}>
            <Button variant='contained' color='default'
              onClick={this.handleClose}>
              {`Cancel`}
            </Button>

            <Button variant='contained' color='primary'
              disabled={!reason}
              onClick={this.handleSubmit}>
              {`Send`}
            </Button>
          </Grid>
        </Grid>
        return refuse;
      case "don't know":
        requestor = users[sales_intro.requestorId]
        let unknown = <Grid item xs={10} container>
          <Typography gutterBottom
            style={{ fontSize: 20, fontWeight: 600 }}>
            {`No Problem!`}
          </Typography>
          <Typography gutterBottom
            style={{ fontSize: 16 }}>
            {`Thanks for letting us know. We’ve let ${Capitalize(requestor.fname)} know you don’t know them.`}
          </Typography>
          {/* <Grid item xs={12}>
            <Button variant="contained" style={{ margin: '0 auto', marginTop: 30 }}
              onClick={this.redirectToStats} color='primary'>
              {`Back to Stats`}
            </Button>
          </Grid> */}
        </Grid>
        return unknown
      case 'response':
        let salesIntroErrors = this.props.salesIntroErrors.map(error => {
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

        let modalText = this.props.salesIntroErrors.length === 0 ? (
          <Grid item xs={10}>
            <Typography variant="h2" id="modal-title"
              color='textPrimary' align='left'
              className={classes.thanksHeader} >
              {`Thanks for responding`}
            </Typography>
            <Typography variant="body1" id="simple-modal-description"
              data-cy='signup-success'
              color='textPrimary' align='left'>
              {`Thanks for letting us know. We’ve let the introduction requestor know you’d prefer not to reach out.`}
            </Typography>
            <Grid item xs={12}>
              <Button variant="contained" style={{ margin: '0 auto', marginTop: 30 }}
                onClick={this.redirectToStats} color='primary'>
                {`Back to Stats`}
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={10}>
            <Typography variant="h2" id="modal-title"
              color='textPrimary' align='left'
              className={classes.thanksHeader}>
              {`Response Error!`}
          </Typography>
            <Typography variant="body1" id="simple-modal-description"
              color='textPrimary' align='left'>
              {`Unfortunately, we weren't able to respond to this introduction request because:`}
          </Typography>
            <List data-cy='signup-errors'>
              {salesIntroErrors}
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
    const { classes, respondToRequestModal } = this.props;

    return (
      <Dialog
        open={respondToRequestModal.open}
        onClose={this.handleClose}
        className={classes.cardModalWrapper}
        classes={{ paper: classes.modalPaper }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(RespondIntroModal)));
