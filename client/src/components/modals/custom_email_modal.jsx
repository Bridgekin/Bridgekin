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

import Loading from '../loading';
import { closeCustomEmail } from '../../actions/modal_actions';
import { fetchWaitlistReferralTemplate,
  fetchEmailTemplate } from '../../actions/email_template_actions';
import { registerWaitlistFromReferral } from '../../actions/waitlist_user_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  customEmailModal: state.modals.customEmail,
  emailTemplates: state.entities.emailTemplates
});

const mapDispatchToProps = dispatch => ({
  closeCustomEmail: () => dispatch(closeCustomEmail()),
  fetchEmailTemplate: (type) => dispatch(fetchEmailTemplate(type)),
  fetchWaitlistReferralTemplate: (email) => dispatch(fetchWaitlistReferralTemplate(email)),
  registerWaitlistFromReferral: (user) => dispatch(registerWaitlistFromReferral(user))
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
  }
})

class CustomEmailModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      subject: '',
      body: '',
      templateLoaded: false,
      loading: false,
      responsePage: false
    }

    this.saveTemplateLocally = this.saveTemplateLocally.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let next = nextProps.customEmailModal
    let current = this.props.customEmailModal
    if(next.open && next.open !== current.open){
      switch(next.type){
        case "waitlist_referral":
          this.props.fetchWaitlistReferralTemplate(next.email)
          .then(() => this.saveTemplateLocally(next.type))
          break;
        default:
          this.props.fetchEmailTemplate(next.type)
          .then(() => this.saveTemplateLocally(next.type))
          break;
      }
    }
    return true
  }

  saveTemplateLocally(type){
    const { template } = this.props.emailTemplates[type];
    this.setState({
      templateLoaded: true,
      subject: template.subject,
      body: template.body
    })
  }

  handleChange(field){
    return e => {
      this.setState({ [field]: e.target.value})
    }
  }

  handleSubmit(){
    const { customEmailModal } = this.props;

    switch(customEmailModal.type){
      case "waitlist_referral":
        let payload = {
          type: customEmailModal.type,
          email: customEmailModal.email,
          fname: customEmailModal.fname,
          fromReferralId: this.props.currentUser.id,
          subject: this.state.subject,
          body: this.state.body,
        }
        this.props.registerWaitlistFromReferral(payload)
        break;
      default:
        return;
    }

  }

  capitalize(str){
    let strArray = str.split(' ');
    for (let i = 0; i < strArray.length; i++) {
      strArray[i] = strArray[i][0].toUpperCase() + strArray[i].slice(1)
    }
    return strArray.join(' ')
  }

  render(){
    const { classes, customEmailModal, template} = this.props;
    const { templateLoaded } = this.state;
    // let result = mustache(template.string, context)

    let modalContent = templateLoaded ? (
      <div>Custom Email Modal</div>
    ) : (<div style={{ height: 200, width: 200 }}>
      <Loading />
    </div>)

    return (
      <Dialog
        open={customEmailModal.open}
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
          {modalContent}
          {`asdfasdfasdf`}
        </Badge>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CustomEmailModal));
