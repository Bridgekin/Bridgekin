import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/PersonSharp';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/CloseSharp';
import SendIcon from '@material-ui/icons/SendSharp';

import Loading from '../loading';
import { closeCustomEmail, openWaitlist,
  openOppCard} from '../../actions/modal_actions';
import { fetchWaitlistReferralTemplate,
  fetchEmailTemplate,
  fetchConnectedOpportunityTemplate,
  removeEmailTemplate } from '../../actions/email_template_actions';
import { registerWaitlistFromReferral } from '../../actions/waitlist_user_actions';
import { clearEmailTemplateErrors } from '../../actions/error_actions';
import { createConnectedOpportunity } from '../../actions/connected_opportunity_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  customEmailModal: state.modals.customEmail,
  emailTemplate: state.entities.emailTemplate,
  emailTemplateErrors: state.errors.emailTemplate,
  opportunities: state.entities.opportunities,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  closeCustomEmail: () => dispatch(closeCustomEmail()),
  openWaitlist: (referredBool) => dispatch(openWaitlist(referredBool)),
  clearEmailTemplateErrors: () => dispatch(clearEmailTemplateErrors()),
  fetchEmailTemplate: (type) => dispatch(fetchEmailTemplate(type)),
  fetchWaitlistReferralTemplate: (email) => dispatch(fetchWaitlistReferralTemplate(email)),
  fetchConnectedOpportunityTemplate: (connectBool, oppId) =>
    dispatch(fetchConnectedOpportunityTemplate(connectBool, oppId)),
  registerWaitlistFromReferral: (user) => dispatch(registerWaitlistFromReferral(user)),
  removeEmailTemplate: () => dispatch(removeEmailTemplate()),
  createConnectedOpportunity: (opportunity) => dispatch(createConnectedOpportunity(opportunity)),
  openOppCard: (payload) => dispatch(openOppCard(payload)),
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  cardModalWrapper:{ padding: 0 },
  grid:{
    margin: 70
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
  pic: { width: 135, height: 135},
  thanksHeader: {
    marginBottom: 20
  },
  closeBar:{
    backgroundColor: theme.palette.base4,
    height: 33,
    padding: "0px 10px",
    [theme.breakpoints.up('sm')]: {
      minWidth: 400,
    }
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
})

class CustomEmailModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      subject: '',
      subjectFName: '',
      body: '',
      templateLoaded: false,
      loading: false,
      responsePage: false
    }

    this.resetTemplate = this.resetTemplate.bind(this);
    this.saveTemplateLocally = this.saveTemplateLocally.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let next = nextProps.customEmailModal
    let current = this.props.customEmailModal
    if(next.open && next.open !== current.open){
      this.resetTemplate(next)();
    }
    return true
  }

  resetTemplate(customEmailModal){
    return e => {
      switch(customEmailModal.type){
        case "waitlist_referral":
          this.props.fetchWaitlistReferralTemplate(customEmailModal.email)
          .then(() => this.saveTemplateLocally(customEmailModal.type))
          break;
        // case "connection":
        //   this.props.fetchConnectionTemplate(customEmailModal.connectBool)
        //   .then(() => this.saveTemplateLocally(customEmailModal.type))
        //   break;
        case "connected_opportunity":
          let templateType = customEmailModal.connectBool ? "connection_direct" : "connection_referral"
          this.props.fetchConnectedOpportunityTemplate(
            customEmailModal.connectBool,
            customEmailModal.oppId)
            .then(() => this.saveTemplateLocally(customEmailModal.type))
            break;
        default:
          this.props.fetchEmailTemplate(customEmailModal.type)
            .then(() => this.saveTemplateLocally(customEmailModal.type))
          break;
      }
    }
  }

  saveTemplateLocally(templateType){
    if (this.props.emailTemplateErrors.length === 0){
      const { emailTemplate, currentUser, opportunities, users,
        customEmailModal } = this.props;
      const templateVars = {
        currentUser:{
          fname: this.capitalize(currentUser.fname),
          lname: this.capitalize(currentUser.lname),
        }
      }
      let subjectFName = '';
      if (templateType === "waitlist_referral"){
        subjectFName = this.capitalize(customEmailModal.fname);
      } else if (templateType === "connected_opportunity") {
        let opp = opportunities[customEmailModal.oppId];
        let owner = users[opp.ownerId];
        let title = opp.title;
        subjectFName = this.capitalize(owner.fname);
        // debugger
        templateVars['title']= this.capitalize(title);
        templateVars['owner'] = { fname : this.capitalize(owner.fname)}
      }

      this.setState({
        subjectFName,
        templateLoaded: true,
        subject: this.fillTemplate(emailTemplate.subject, templateVars),
        body: this.fillTemplate(emailTemplate.body, templateVars)
      })
    } else { this.setState({ templateLoaded: true}) }
  }

  fillTemplate(templateString, templateVars){
    return new Function("return `"+templateString +"`;").call(templateVars);
  }

  handleChange(field){
    return e => {
      this.setState({ [field]: e.target.value})
    }
  }

  handleSubmit(){
    const { customEmailModal } = this.props;
    if (customEmailModal.type === "waitlist_referral"){
      let payloadRef = {
        type: customEmailModal.type,
        email: customEmailModal.email,
        fname: customEmailModal.fname,
        fromReferralId: this.props.currentUser.id,
        subject: this.state.subject,
        body: this.state.body,
      }
      this.props.registerWaitlistFromReferral(payloadRef)
      .then(() => {
        this.handleClose();
        this.props.removeEmailTemplate();
        this.props.openWaitlist(true);
      })
    } else if (customEmailModal.type === "connected_opportunity"){
      const { opportunities, customEmailModal } = this.props;
      let opp = opportunities[customEmailModal.oppId];

      let payloadOpp = {
        opportunityId: customEmailModal.oppId,
        connectBool: customEmailModal.connectBool,
        subject: this.state.subject,
        body: this.state.body
      }

      this.props.createConnectedOpportunity(payloadOpp)
        .then(() => {
          this.handleClose();
          this.props.removeEmailTemplate();
          let response = {
            oppId: customEmailModal.oppId,
            page: 'sent',
            connectBool: customEmailModal.connectBool
          }
          this.props.openOppCard(response);
        })
    }
  }

  handleClose(){
    if(this.props.emailTemplateErrors.length > 0){
      this.props.clearEmailTemplateErrors();
    }
    this.props.removeEmailTemplate();
    this.props.closeCustomEmail();
    this.setState({ subject: '', body: ''});
  }

  capitalize(str){
    let strArray = str.split(' ');
    for (let i = 0; i < strArray.length; i++) {
      strArray[i] = strArray[i][0].toUpperCase() + strArray[i].slice(1)
    }
    return strArray.join(' ')
  }

  render(){
    const { classes, customEmailModal, emailTemplate,
      currentUser} = this.props;
    const { templateLoaded, email, userName,
      subjectFName } = this.state;
    // let result = mustache(template.string, context)

    let emailTemplateErrors = this.props.emailTemplateErrors.map(error => {
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

    let closeBar = (
      <Grid container justify='center'
        style={{ padding: "10px 0px"}}>
        <Grid item xs={12} container justify='flex-end'>
          <CloseIcon onClick={this.handleClose}
            style={{ color: 'grey', pointer: 'cursor'}}/>
        </Grid>
        <Grid item xs={10} container direction='column'>
          <Typography variant="body1" align='center'
            color="textPrimary" gutterBottom
            data-cy='custom-email-closebar-header'
            style={{ fontSize: 20, fontWeight: 600}}>
            {`Edit Email`}
          </Typography>
        </Grid>
      </Grid>
    )

    let submit = (
      <Grid container justify='space-between' alignItems='center'
        className={classes.submitContainer}>
        <Button onClick={this.resetTemplate(customEmailModal)}
          style={{ textTransform: 'capitalize'}}>
          Reset Template
        </Button>

        <div>
          <Button variant='contained'
            onClick={this.handleClose}
            classes={{ root: classes.actionButton}}
            style={{ marginRight: 10 }}>
            {`Cancel`}
          </Button>
          <Button variant='contained' color='primary'
            data-cy="custom-email-submit"
            onClick={this.handleSubmit}>
            Send
            <SendIcon className={classes.rightIcon} />
          </Button>
        </div>
      </Grid>
    )

    let updateEmail = (
      <div>
        <Grid container
          style={{ padding: "0px 20px 10px" }}>
          {closeBar}
          <Typography align='center' fullWidth
            style={{ fontSize: 13 }}>
            {`We'll add greetings and salutations ("Hi, ${subjectFName}") and
            it will come from "The Bridgekin Team". Change what you'd
            like and we'll send the email exacty as you've instructed.`}
          </Typography>

          <Grid container>
            <TextField
              fullWidth
              multiline
              label="Email Subject"
              data-cy="custom-email-subject"
              value={this.state.subject}
              onChange={this.handleChange("subject")}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </Grid>

          <Grid container>
            <TextField
              fullWidth
              label="Email Body"
              data-cy="custom-email-body"
              value={this.state.body}
              onChange={this.handleChange("body")}
              multiline
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          {submit}
        </Grid>
      </div>
    )

    let modalContent = this.props.emailTemplateErrors.length === 0 ? (
      updateEmail
    ) : (
      <Grid item xs={11} sm={10} md={8} className={classes.grid}
        container justify='flex-start'>
        <Typography variant="h2" id="modal-title" color='textPrimary'
          className={classes.thanksHeader} align='left'>
          You're almost there!
        </Typography>
        <Typography variant="body1" id="simple-modal-description"
          align='left' color='textPrimary'>
          Unfortunately, we weren't able to complete this action because:
        </Typography>
        <List>
          {emailTemplateErrors}
        </List>
        <Grid item xs={12}>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='primary'>
            Close
          </Button>
        </Grid>
      </Grid>
    )

    let modalSetup = templateLoaded ? (
      modalContent
    ) : (<Grid container justify='center' alignItems='center'
      style={{ height: 200, width: 200 }}>
      <Loading />
    </Grid>)

    return (
      <Dialog
        open={customEmailModal.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={this.handleClose}
        className={classes.cardModalWrapper}
        classes={{ paper: classes.modalPaper}}>
        {modalSetup}
        {/*<Badge
          badgeContent={<CloseIcon onClick={this.handleClose}/>}
          classes={{ badge: classes.badge }}
          style={{ width: '100%'}}
          >
        </Badge>*/}
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CustomEmailModal));
