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

import { connect } from 'react-redux';
import { closeRequestIntro } from '../../actions/modal_actions';
import { clearSalesIntroErrors } from '../../actions/error_actions';
import { createSalesIntro } from '../../actions/sales_intro_actions.js';
// import theme from './theme';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  requestIntroErrors: state.errors.salesIntro,
  requestIntroModal: state.modals.requestIntro,
  friendMap: state.entities.sales.friendMap,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  closeRequestIntro: () => dispatch(closeRequestIntro()),
  clearSalesIntroErrors: () => dispatch(clearSalesIntroErrors()),
  createSalesIntro: salesIntro => dispatch(createSalesIntro(salesIntro))
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
      target: null,
      introBody: '',
      introSubject: ''
    };

    this.handleClose = this.handleClose.bind(this);
    this.getContent = this.getContent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changePage = this.changePage.bind(this);
    this.handleChangeTarget = this.handleChangeTarget.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const nextModal = nextProps.requestIntroModal;
    const currentModal = this.props.requestIntroModal;
    if (nextModal.open && currentModal.open !== nextModal.open) {
      this.setState({ page: nextModal.page })
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

  handleChangeTarget(e){
    let target = e.target.value;
    const { requestIntroModal, users } = this.props;
    const { contact } = requestIntroModal;

    let targetUser = users[target]
    let introSubject = `I think you’ll appreciate this...`
    let introBody = `Hi ${Capitalize(targetUser.fname)}, \n\nThought of you today and I see you’re still working at ${contact.company || "**Insert Company Name**"}. I think you’d appreciate how we help sales people get into their target accounts through warm introductions. It would be fun to set you up with my friend on the client side who would love your feedback on the product. \n\nLet me know and I’ll make the intro!\n\nCheers,\n${Capitalize(targetUser.fname)}`

    this.setState({ introSubject, introBody, target })
  }

  handleSubmit(){
    const { contact } = this.props.requestIntroModal
    const { message, explaination, referralBonus,
    target, page } = this.state;

    let payload = {message, explaination, referralBonus,
      contactId: contact.id,
      targetId: target
    }

    if(page === 'custom'){

    }

    this.props.createSalesIntro(payload)
    .then(() => this.setState({ page: 'response'}) )
  }

  changePage(page){
    return e => {
      this.setState({ page })
    }
  }

  getContent(){
    const { classes, currentUser, friendMap, 
      requestIntroModal, users } = this.props;
    const { page, message, explaination, 
      referralBonus, target, introSubject,
      introBody } = this.state;
    const { contact } = requestIntroModal;

    if (!requestIntroModal.open){
      return <div></div>
    }

    switch(page){
      case 'request':
        let header = <Grid container
        className={classes.requestHeader}>
          <Typography style={{ fontSize: 18}}>
            {`Intro Details`}
          </Typography>
        </Grid>

        let referralBonus = <Grid item xs={12} sm={5} container>
          <Typography fullWidth align='left'
          color='textSecondary'>
            {`Referral Bonus (Optional)`}
          </Typography>
          <Grid container alignItems='center'>
            <FormControl className={classes.margin}>
              <Input type='number'
                value={referralBonus}
                onChange={this.handleChange('referralBonus')}
                startAdornment={<InputAdornment position="start">%</InputAdornment>}
              />
            </FormControl>
          </Grid>
        </Grid>

        let chooseContact = <Grid item xs={12} sm={5} container>
          {/*friendMap[contact.id].length > 2 ?
          <Select fullWidth
            value={target}
            onClick={(e) => e.stopPropagation()}
            onChange={this.handleChange("target")}>
            {friendMap[contact.id].map(id => {
              let user = users[id];
              return <MenuItem value={user.id}>{`${user.fname} ${user.lname}`}</MenuItem>
            })}
          </Select> : 
          `${users[friendMap[contact.id][0]].fname} ${users[friendMap[contact.id][0]].lname}`
          */}
          <Typography color='textSecondary'
          style={{ fontSize: 14}}>
            {`Select teammate to request intro`}
          </Typography>
          <Select fullWidth
            value={target}
            onClick={(e) => e.stopPropagation()}
            onChange={this.handleChangeTarget}>
            {friendMap[contact.id].map(id => {
              let user = users[id];
              return <MenuItem value={user.id}>{`${user.fname} ${user.lname}`}</MenuItem>
            })}
          </Select>
        </Grid>

        let introResponses = <Grid container>
          <TextField multiline
            rows={5} fullWidth
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
            {referralBonus}
          </Grid>
          {introResponses}
          <Grid container justify="space-between"
            style={{ marginTop: 15 }}>
            <Button color='default'
              disabled={!target}
              onClick={this.changePage("custom")}>
              {`Customize Introduction Email`}
            </Button>

            <Button variant='contained' color='primary'
            disabled={!target}
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
              onClick={this.handleSubmit}>
              {`Send`}
            </Button>
          </Grid>
        </Grid>
        return custom
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
            className={classes.thanksHeader}>
            {`Request Sent`}
          </Typography>
          <Typography variant="body1" 
            id="simple-modal-description"
            data-cy='waitlist-success'
            gutterBottom
            align='left' color='textPrimary'>
            {`We've sent an introduction request to your teammate on behalf of this contact!`}
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
            {`Thanks for referring your trusted contact!`}
          </Typography>
          <Typography variant="body1" align='left'
            id="simple-modal-description"
            gutterBottom
            color='textPrimary'>
            {`It looks like we were unable to add them to the waitlist because:`}
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
