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
import CloseIcon from '@material-ui/icons/CloseSharp';
import TextField from '@material-ui/core/TextField';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Capitalize from 'capitalize';
import Switch from '@material-ui/core/Switch';

import { connect } from 'react-redux';
import { closeRequestIntro } from '../../actions/modal_actions';
import { clearSalesIntroErrors } from '../../actions/error_actions';
import { createSalesIntro, customizeIntroEmail } from '../../actions/sales_intro_actions.js';
import { fetchRequestTemplates, createRequestTemplate, deleteRequestTemplate } from '../../actions/request_templates_actions';
import { clearRequestTemplateErrors } from '../../actions/error_actions'
// import theme from './theme';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  requestIntroErrors: state.errors.salesIntro,
  requestIntroModal: state.modals.requestIntro,
  friendMap: state.entities.sales.friendMap,
  users: state.users,
  requestTemplates: state.entities.sales.requestTemplates,
  requestTemplateErrors: state.errors.requestTemplate
});

const mapDispatchToProps = dispatch => ({
  closeRequestIntro: () => dispatch(closeRequestIntro()),
  clearSalesIntroErrors: () => dispatch(clearSalesIntroErrors()),
  createSalesIntro: salesIntro => dispatch(createSalesIntro(salesIntro)),
  customizeIntroEmail: () => dispatch(customizeIntroEmail()),
  createRequestTemplate: payload => dispatch(createRequestTemplate(payload)),
  fetchRequestTemplates: () => dispatch(fetchRequestTemplates()),
  clearRequestTemplateErrors: () => dispatch(clearRequestTemplateErrors()),
  deleteRequestTemplate: (id) => dispatch(deleteRequestTemplate(id))
});

const styles = theme => ({
  // grid:{
  //   margin: '70px 0px 70px 0px'
  // },
  // thanksHeader:{
  //   marginBottom: 30,
  //   // color: theme.palette.darkGrey
  // },
  // cardModalWrapper:{
  //   padding: 0,
  //   // minWidth: 500,
  // },
  modalPaper:{
    margin: 15,
    // padding: 20,
    backgroundColor: theme.palette.base3
  },
  container:{
    padding: "20px 0px"
  },
  listText:{ color: theme.palette.text.primary},
  requestHeader:{
    paddingBottom: 25,
    borderBottom: `1px solid grey`,
    marginBottom: 25
  },
  actionComp:{
    margin: "10px 0px"
  }
});

class RequestIntroModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      page: 'response',
      message: '', 
      explaination: '',
      referralBonus: 0,
      referralUnit: "$",
      target: null,
      introBody: '',
      introSubject: '',
      newTemplateSubject: '',
      newTemplateBody: '',
      newTemplateName: '',
      savingTemplate: false,
      templateId: 'default'
    };

    this.handleClose = this.handleClose.bind(this);
    this.getContent = this.getContent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changePage = this.changePage.bind(this);
    this.handleChangeTarget = this.handleChangeTarget.bind(this);
    this.handleSaveTemplate = this.handleSaveTemplate.bind(this)
    this.handleChangeTemplate = this.handleChangeTemplate.bind(this);
    this.handleDeleteTemplate = this.handleDeleteTemplate.bind(this);
    this.resetCustomEmail = this.resetCustomEmail.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const nextModal = nextProps.requestIntroModal;
    const currentModal = this.props.requestIntroModal;
    if (nextModal.open && currentModal.open !== nextModal.open) {
      this.props.fetchRequestTemplates()
      .then(() => {
        this.setState({ page: nextModal.page, target: null })
      })
    }
    return true;
  }

  handleClose(){
    if (this.props.requestIntroErrors){
      this.props.clearSalesIntroErrors();
    }
    this.props.closeRequestIntro();
    this.setState({
      message:'', 
      explaination:'', 
      referralBonus:''
    })
  };

  handleChange(field) {
    return (e) => {
      e.preventDefault();
      this.setState({ [field]: e.target.value });
    }
  }

  handleChangeTemplate(e){
    const { requestTemplates } = this.props;
    let templateId = e.target.value;
    if (templateId === 'default'){
      this.resetCustomEmail()
    } else {
      let { subject, body } = requestTemplates[templateId]
      this.setState({ introSubject: subject, introBody: body, templateId })
    }
  }

  resetCustomEmail(){
    const { target } = this.state
    const { requestIntroModal, users } = this.props;
    const { contact } = requestIntroModal;

    let targetUser = users[target]
    let introSubject = `I think you’ll appreciate this...`
    let introBody = `Hi ${Capitalize(contact.fname)}, \n\nThought of you today and I see you’re still working at ${contact.company || "**Insert Company Name**"}. I think you’d appreciate how we help sales people get into their target accounts through warm introductions. It would be fun to set you up with my friend on the client side who would love your feedback on the product. \n\nLet me know and I’ll make the intro!\n\nCheers,\n${Capitalize(targetUser.fname)}`
    this.setState({ introSubject, introBody, templateId: 'default' })
  }

  handleCheckedChange(field) {
    return e => {
      let checked = e.target.checked;
      this.setState({ [field]: checked ? '%' : '$' })
    }
  }

  handleChangeTarget(e){
    let target = e.target.value;
    this.setState({ target },
      () => {
        const { requestTemplates } = this.props;
        const { templateId } = this.state;
        if (templateId === 'default') {
          this.resetCustomEmail(templateId)
        } else {
          let { subject, body } = requestTemplates[templateId]
          this.setState({ introSubject: subject, introBody: body })
        }
      })
  }

  handleSubmit(){
    const { contact } = this.props.requestIntroModal
    const { message, explaination, referralBonus,
      target, page, introBody, introSubject,
      referralUnit } = this.state;

    let payload = {
      message, explaination, referralBonus, introBody, introSubject, referralUnit,
      contactId: contact.id,
      targetId: target,
    }

    this.props.createSalesIntro(payload)
    .then(() => this.setState({ page: 'response'}) )
  }

  handleDeleteTemplate(){
    this.props.deleteRequestTemplate(this.state.templateId)
    .then(() => this.resetCustomEmail('default'))
  }

  handleSaveTemplate(){
    this.props.clearRequestTemplateErrors()
    this.setState({ savingTemplate: true},
      () => {
        const { newTemplateSubject, newTemplateBody, newTemplateName} = this.state;
        let payload = {
          name: newTemplateName,
          subject: newTemplateSubject,
          body: newTemplateBody
        }
        // debugger
        this.props.createRequestTemplate(payload)
          .then((newTemplate) => {
          if (this.props.requestTemplateErrors.length > 0){
            this.setState({
              savingTemplate: false,
            })
          } else {
            this.setState({ 
              savingTemplate: false,
              page: "custom",
              templateId: newTemplate.id,
              subject: newTemplate.subject,
              body: newTemplate.body,
              newTemplateSubject: '',
              newTemplateBody: '',
              newTemplateName: '',
            })
          }
        })
      })
  }

  changePage(page){
    return e => {
      if (page === 'custom'){
        this.props.customizeIntroEmail()
      }
      this.setState({ page })
    }
  }

  getContent(){
    const { classes, currentUser, friendMap, 
      requestIntroModal, users,
      requestTemplates} = this.props;
    const { page, message, explaination, 
      referralBonus, target, introSubject,
      introBody, referralUnit, templateId,
      newTemplateSubject, newTemplateBody,
      newTemplateName, savingTemplate } = this.state;
    const { contact } = requestIntroModal;

    if (!requestIntroModal.open){
      return <div></div>
    }

    switch(page){
      case 'request':
        let header = <Grid container
        className={classes.requestHeader}>
          <Typography style={{ fontSize: 18}}
            data-cy='request-intro-header'>
            {`Intro Details`}
          </Typography>
        </Grid>

        let referralBonusComp = <Grid item xs={12} sm={5} container className={classes.actionComp}>
          <Typography align='left'color='textSecondary'  
            style={{ fontSize: 14 }}>
            {`Referral Bonus (Optional)`}
          </Typography>
          <Grid container alignItems='center'>
            <FormControl className={classes.margin} fullWidth>
              <Input type='number'
                data-cy='referral-bonus-input'
                value={referralBonus}
                onChange={this.handleChange('referralBonus')}
                startAdornment={<InputAdornment position="start">{referralUnit}</InputAdornment>}
              />
            </FormControl>
          </Grid>
        </Grid>

        let chooseContact = <Grid item xs={12} sm={5} container className={classes.actionComp}>
          <Typography color='textSecondary'
          style={{ fontSize: 14}}>
            {`Select teammate to request intro`}
          </Typography>
          <Select fullWidth
            value={target}
            data-cy='select-target-button'
            onClick={(e) => e.stopPropagation()}
            onChange={this.handleChangeTarget}>
            {friendMap[contact.id].map(id => {
              let user = users[id];
              return <MenuItem value={user.id}
              data-cy='select-target-option'>
                {`${user.fname} ${user.lname}`}
              </MenuItem>
            })}
          </Select>
        </Grid>

        let introResponses = <Grid container>
          <TextField multiline
            rows={5} fullWidth
            data-cy='message-input'
            placeholder={`Message to teammate (optional)`}
            className={classes.textField}
            margin="normal"
            variant='outlined'
            value={message}
            onChange={this.handleChange('message')}
            onMouseUp={this.handleChange('message')}
          />
          <TextField multiline
            rows={5} fullWidth
            data-cy='explaination-input'
            placeholder={`Why our solution would be a good fit for them (optional)`}
            className={classes.textField}
            margin="normal"
            variant='outlined'
            value={explaination}
            onChange={this.handleChange('explaination')}
            onMouseUp={this.handleChange('explaination')}
          />
        </Grid>

        let content = <Grid item xs={11} sm={10}
          className={classes.grid} container>
          {header}
          <Grid container justify='space-around'>
            {chooseContact}
            {referralBonusComp}
          </Grid>
          <Grid container justify='flex-end' alignItems='center'>
              <Typography color='textSecondary'
                style={{ fontSize: 12 }}>
                {`Base Dollar`}
              </Typography>
              <Switch
                data-cy='toggle-referral-type'
                checked={referralUnit === '%'}
                onChange={this.handleCheckedChange('referralUnit')}
                value="referralUnit"
              />
              <Typography color='textSecondary'
                style={{ fontSize: 12 }}>
                {`Percentage`}
              </Typography>
          </Grid>
          {introResponses}
          <Grid container justify="space-between"
            style={{ marginTop: 15 }}>
            <Button color='default'
              disabled={!target}
              data-cy='custom-page-button'
              onClick={this.changePage("custom")}>
              {`Customize Introduction Email`}
            </Button>

            <Button variant='contained' color='primary'
              disabled={!target}
              data-cy='submit-request'
              onClick={this.handleSubmit}>
              {`Send Request`}
            </Button>
          </Grid>
        </Grid>

        return content
      case "custom":
        let custom = <Grid item xs={10}>
          <Typography fullWidth color='textPrimary'
          gutterBottom align='center'
          style={{ fontSize: 24 }}>
            {`Customize Introduction Email`}
          </Typography>
          <Typography fullWidth color='textSecondary'
            gutterBottom align='center'
            style={{ fontSize: 12, marginBottom: 20}}>
            {`Customize the email template that your teammate will send to their contact. Note* Your teammate will still be able to make further changes to this template later`}
          </Typography>
          <Grid container justify='space-between'>
            <Grid item xs={12} sm={6}
            alignItems='flex-end'>
              <Button data-cy='add-template-button'
              style={{ fontSize: 14, fontWeight: 400, textTransform: 'none'}}
                onClick={this.changePage("new template")}>
                {`Add Custom Template`}
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              {Object.values(requestTemplates).length > 0 &&
                <FormControl fullWidth 
                className={classes.formControl}>
                  <InputLabel>{`Choose Template`}</InputLabel>
                  <Select value={templateId} fullWidth
                    data-cy='choose-template-button'
                    onClick={(e) => e.stopPropagation()}
                    onChange={this.handleChangeTemplate}>
                    <MenuItem value={'default'}>{`Default`}</MenuItem>
                    {Object.values(requestTemplates).map(template => {
                      return <MenuItem 
                        data-cy='template-option'
                        value={template.id}>{template.name}</MenuItem>
                    })}
                  </Select>
                </FormControl>}
            </Grid>
          </Grid>
          
          { templateId !== 'default' &&
          <Grid container justify='flex-end'>
            <Button color='default'
              onClick={this.handleDeleteTemplate}
            style={{ textTransform: 'none', fontWeight: 400, fontSize: 13}}>
              {`Delete Template`}
            </Button>
          </Grid>}

          <TextField
            fullWidth
            label = "Subject"
            variant = 'outlined'
            value = {introSubject}
            margin="normal"
            onChange = {this.handleChange('introSubject') }
          />
          {/* <Typography gutterBottom
            style={{ fontSize: 14, margin: "20px 0px 10px" }}>
            {`Suggested Text (Feel free to edit)`}
          </Typography> */}
          <TextField
            fullWidth
            multiline
            rows="12"
            label="Body"
            margin="normal"
            variant='outlined'
            value={introBody}
            onChange={this.handleChange('introBody')}
          />
          <Grid container justify="space-between"
            style={{ marginTop: 15 }}>
            <Button variant='contained' color='default'
              onClick={this.changePage("request")}>
              {`Back`}
            </Button>

            <Button variant='contained' color='primary'
              data-cy='submit-request'
              onClick={this.handleSubmit}>
              {`Send`}
            </Button>
          </Grid>
        </Grid>
        return custom
      case "new template":
        let newTemplate = <Grid item xs={10}>
          <Typography fullWidth color='textPrimary'
            gutterBottom align='center'
            style={{ fontSize: 24 }}>
            {`Create Custom Template`}
          </Typography>
          <Typography fullWidth color='textSecondary'
            gutterBottom align='center'
            style={{ fontSize: 12, marginBottom: 20 }}>
            {`Use this template in any future requests`}
          </Typography>
          {this.props.requestTemplateErrors.length > 0 && <Typography style={{ fontSize: 13, color: 'red'}}>
            {`Errors:`} <br/>
            <ul>
            {this.props.requestTemplateErrors.map(error => <li>{error}</li> )}
            </ul>
          </Typography>}
          <TextField
            data-cy='template-name-input'
            fullWidth
            label="Custom Template Name"
            variant='outlined'
            value={newTemplateName}
            margin="normal"
            onChange={this.handleChange('newTemplateName')}
          />
          <TextField
            data-cy='template-subject-input'
            fullWidth
            label="Subject"
            variant='outlined'
            value={newTemplateSubject}
            margin="normal"
            onChange={this.handleChange('newTemplateSubject')}
          />
          <TextField
            data-cy='template-body-input'
            fullWidth
            multiline
            rows="12"
            label="Body"
            margin="normal"
            variant='outlined'
            value={newTemplateBody}
            onChange={this.handleChange('newTemplateBody')}
          />
          <Grid container justify='space-between'>
            <Button variant='contained' color='default'
              onClick={this.changePage("custom")}>
              {`Back`}
            </Button>

            <Button color='primary' variant='contained'
              disabled={!newTemplateSubject || !newTemplateBody || !newTemplateName || savingTemplate}
              data-cy='save-template'
              onClick={this.handleSaveTemplate}>
              {`Save New Template`}
            </Button>
          </Grid>
        </Grid>
        return newTemplate
      default:
        let requestIntroErrors = this.props.requestIntroErrors.map(error => {
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

        let modalText = this.props.requestIntroErrors.length === 0 ? <Grid item xs={11} sm={10} md={9} 
          className={classes.grid}
          container justify='flex-start'>
          <Typography variant="h2" id="modal-title" 
            color='textPrimary' align='left'
            gutterBottom
            data-cy='success-response-header'
            className={classes.thanksHeader}>
            {`Introduction Request Sent`}
          </Typography>
          <Typography variant="body1" 
            id="simple-modal-description"
            data-cy='waitlist-success'
            gutterBottom
            align='left' color='textPrimary'>
            {`We’ve sent an introduction request to your teammate! You’ll be notified once your teammate responds.`}
          </Typography>
          <Grid item xs={12}>
            <Button variant="contained" style={{ margin: '0 auto', marginTop: 30 }}
              onClick={this.handleClose} color='primary'>
              {`Close`}
            </Button>
          </Grid>
        </Grid> : <Grid item xs={11} sm={10} md={9} 
          className={classes.grid}
          container justify='flex-start'>
          <Typography variant="h2" id="modal-title"     
            color='textPrimary' align='left'
            gutterBottom
            className={classes.thanksHeader} >
            {`Request Wasn't Sent`}
          </Typography>
          <Typography variant="body1" align='left'
            id="simple-modal-description"
            gutterBottom
            color='textPrimary'>
            {`It looks like we were unable to send your introduction request because:`}
          </Typography>
          <List data-cy='waitlist-errors'>
              {requestIntroErrors}
          </List>
          <Grid item xs={12}>
            <Button variant="contained" 
              style={{ margin: '0 auto', marginTop: 30 }}
              onClick={this.handleClose} color='primary'>
              Close
            </Button>
          </Grid>
        </Grid>

        return modalText
    }
  }

  render() {
    const { open, classes, requestIntroModal } = this.props;
    
    let closeBar = <Grid container justify='center'
    style={{ marginBottom: 10}}>
      <Grid item xs={10} container justify='flex-end'>
        <CloseIcon onClick={this.handleClose}
          style={{ color: 'grey', pointer: 'cursor' }} />
      </Grid>
    </Grid>

    return (
      <Dialog
        classes={{ paper: classes.modalPaper }}
        open={requestIntroModal.open}
        onClose={this.handleClose}>
        <Grid container justify='center'
        className={classes.container}>
          {closeBar}
          {this.getContent()}
        </Grid>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RequestIntroModal));
