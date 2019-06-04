import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/CloseSharp';
import CloudUploadIcon from '@material-ui/icons/CloudUploadSharp';

import { connect } from 'react-redux';
import { clearRefApplicationErrors } from '../../actions/error_actions';

import { closeRefApplication } from '../../actions/modal_actions';
import { createRefApplication } from '../../actions/ref_application_actions.js'
import { login } from '../../actions/session_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  refApplicationErrors: state.errors.refApplication,
  refApplicationModal: state.modals.refApplication,
});

const mapDispatchToProps = dispatch => ({
  clearRefApplicationErrors: () => dispatch(clearRefApplicationErrors()),
  createRefApplication: (app) => dispatch(createRefApplication(app)),
  closeRefApplication: () => dispatch(closeRefApplication())
});

const styles = theme => ({
  grid:{
    margin: 50
  },
  thanksHeader:{
    marginBottom: 30,
    color: theme.palette.darkGrey
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
  loginButton: {
    textTransform: 'capitalize',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 400
  },
  form: {
    margin: 30
  },
  forgotPassword: {
    marginTop: 15,
    cursor: 'pointer',
    fontSize: 12
  }
});

class ApplicationModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      answer1: '',
      question1: `Write an intro note. Why would you be a good fit for this position? What excites you about the position?`,
      resume: null,
      resumeUrl: '',
      loading: false,
      type: 'response'
    };
    this.handleClose = this.handleClose.bind(this);
    this.getContent = this.getContent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    const nextModal = nextProps.refApplicationModal;
    const currentModal = this.props.refApplicationModal;
    if(nextModal.open && currentModal.open !== nextModal.open){
      this.setState({ type: nextModal.type })
    }
    return true;
  }

  handleClose(){
    const { refApplicationModal } = this.props;
    if(this.props.refApplicationErrors.length > 0){
      this.props.clearRefApplicationErrors();
    } else if (refApplicationModal.redirect) {
      this.props.history.push(refApplicationModal.redirect)
    }
    this.props.closeRefApplication();
  };

  handleChange(field){
    return e => {
      this.setState({ [field]: e.target.value})
    }
  }

  handleFile(e){
    let resume = e.currentTarget.files[0];
    let fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({ 
        resume: resume,
        resumeUrl: fileReader.result
      })
    }
    if(resume){
      fileReader.readAsDataURL(resume)
    }
  }

  handleSubmit(){
    this.setState({ loading: true },
      () => {
        const { currentUser, refApplicationModal } = this.props;
        const { answer1, question1, resume } = this.state;
        const formData = new FormData();

        // Collect Application
        // let app = { answer1, question1,
        //   refOppId: refApplicationModal.id,
        //   candidateId: currentUser.id,
        //   referralCode: refApplicationModal.referralCode
        // }
        formData.append(`refApplication[answer_1]`, answer1)
        formData.append(`refApplication[question_1]`, question1)
        formData.append(`refApplication[resume]`, resume)
        formData.append(`refApplication[refOppId]`, refApplicationModal.id)
        formData.append(`refApplication[candidateId]`, currentUser.id)
        formData.append(`refApplication[referralCode]`,refApplicationModal.referralCode)

        this.props.createRefApplication(formData)
        .then(() => this.setState({ 
          type: 'response', answer1: '' 
        }))
      })
  }

  getContent(){
    const { classes, refApplicationModal } = this.props;
    const { question1, answer1, type, resumeUrl,
      resume} = this.state;

    switch(type){
      case 'personal':
        let applyHeader = <Grid container 
        justify='space-between'
        style={{ paddingBottom: 30, borderBottom: `1px solid grey`, marginBottom: 20, width: '100%'}}>
          <Typography color='textPrimary'
          style={{ fontSize: 24 }}>
            {`Apply`}
          </Typography>
          <CloseIcon onClick={this.handleClose}
          style={{ color: 'grey', pointer: 'cursor'}}/>
        </Grid>

        let section = <div>
          <Typography color='textSecondary'
          style={{ fontSize: 18 }}>
            {question1}
          </Typography>
          <TextField fullWidth multiline
            rows="5"
            variant="outlined"
            margin="normal"
            onChange={this.handleChange('answer1')}
            value={answer1}
            />

          {resumeUrl ? (
            <a href={resumeUrl} download={resume.name}>{resume.name}</a>
          ) : <Grid container>
            <input
              // accept="image/*"
              style={{ display: 'none'}}
              id="resume-button-file"
              type="file"
              onChange={this.handleFile.bind(this)}
              onClick={(event)=> {
                event.target.value = null
              }}
              />
            <label htmlFor="resume-button-file">
              {<Button component="span">
                {`Upload Resume `}
                <CloudUploadIcon 
                style={{ marginLeft: 5 }}/>
              </Button>}
            </label>
          </Grid>}
          
          <Grid container>
            <Button color='primary' variant='contained'
            style={{ marginTop: 20}}
            onClick={this.handleSubmit}>
              {`Send Application`}
            </Button>
          </Grid>
        </div>

        return <Grid container item xs={11}
        style={{ padding: "20px 0px"}}>
          {applyHeader}
          {section}
        </Grid>;
      default:
        let refApplicationErrors = this.props.refApplicationErrors.map(error => {
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
    
        let failureText = <Grid item xs={11} sm={10} 
        className={classes.grid}>
          <Typography variant="h2" id="modal-title" color='textPrimary'
            className={classes.thanksHeader} align='left'>
            Almost there!
          </Typography>
          <Typography variant="body1" id="simple-modal-description"
            align='left' color='textPrimary'>
            We weren’t able to submit your application because:
          </Typography>
          <List data-cy='login-errors'>
            {refApplicationErrors}
          </List>
    
          <Grid item xs={12} container justify='flex-start'>
            <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
              onClick={this.handleClose} color='primary'>
              Close
            </Button>
          </Grid>
        </Grid>
    
        let successText = <Grid item xs={11} sm={10} 
        className={classes.grid}>
          <Typography variant="h2" id="modal-title" color='textPrimary'
            className={classes.thanksHeader} align='left'>
            Application Submitted
          </Typography>
          <Typography variant="body1" id="simple-modal-description"
            align='left' color='textPrimary'>
            We've sent your application to the job owner. If you're a good fit for a position, you'll receive next steps shortly!
          </Typography>
    
          <Grid item xs={12} container justify='flex-start'>
            <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
              onClick={this.handleClose} color='primary'>
              Close
            </Button>
          </Grid>
        </Grid>
        return this.props.refApplicationErrors.length > 0 ? failureText : successText
    }
  }

  render () {
    const { classes, refApplicationModal } = this.props;
    const { login, email, password } = this.state;

    let closeBar = (
      <Grid container justify='flex-end'>
        <CloseIcon onClick={this.handleClose}
          style={{ color: 'grey', pointer: 'cursor'}}/>
      </Grid>
    )

    return (
      <Dialog
        open={refApplicationModal.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={this.handleClose}
        className={classes.cardModalWrapper}
        classes={{ paper: classes.modalPaper}}>
          <Grid container justify='center' alignItems='center'>
            {this.getContent()}
          </Grid>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(ApplicationModal)));
