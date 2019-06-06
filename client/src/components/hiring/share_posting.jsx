import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';

import Loading from '../loading.jsx';
import { fetchRefOpp } from
'../../actions/ref_opportunity_actions.js';
import queryString from 'query-string'

import ReferralLink from './referral_link';
import { createRefApplication } from '../../actions/ref_application_actions.js'
import { openRefAppModal } from '../../actions/modal_actions';
import { createRefLink } from '../../actions/ref_link_actions';
import MaskedInput from 'react-text-mask';

const mapStateToProps = (state, ownProps) => {
  const values = queryString.parse(ownProps.location.search)
  return {
  currentUser: state.users[state.session.id],
  id: ownProps.match.params.id,
  postings: state.entities.hiring.refOpps,
  referralCode: values.referralCode,
  refApplicationErrors: state.errors.refApplication
}};

const mapDispatchToProps = dispatch => ({
  fetchRefOpp: (id) => dispatch(fetchRefOpp(id)),
  createRefApplication: (app) => dispatch(createRefApplication(app)),
  openRefAppModal: (payload) => dispatch(openRefAppModal(payload)),
  createRefLink: id => dispatch(createRefLink(id))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grid:{
    paddingTop: 64,
    paddingBottom: '10%'
  },
  headerGrid:{
    paddingBottom: 30, borderBottom: `1px solid grey`, marginBottom: 20, width: '100%'
  },
  inputPaper:{
    padding: '5px 10px',
    width: '50%'
  },
  input:{
    width: '100%'
  },
  textField:{
    width: '50%'
  },
  inputLabel:{ fontSize: 15 }
})

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

class SharePosting extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      loading: false,
      fname: '',
      lname: '',
      email: '',
      answer1: '',
      phoneNumber: '',
      question1: `Tell us why the candidate would be a good fit for this position`,
      resume: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.back = this.back.bind(this);
  }

  componentDidMount(){
    // Set Referral Opp
    this.props.fetchRefOpp(this.props.id)
    .then(() => {
      this.setState({ loaded: true }) 
    })

    this.props.createRefLink(this.props.id)
  }

  back(){
    const { id } = this.props;
    this.props.history.push(`/hiring/show/${id}`)
  }

  handleChange(field){
    return e => {
      this.setState({ [field]: e.target.value})
    }
  }

  handleSubmit(){
    this.setState({ loading: true },
    () => {
      const { currentUser, referralCode, id } = this.props;
      const { fname, lname, email, answer1, question1,
        phoneNumber, resume } = this.state;
      
      // Collect Application
      let app = { fname, lname, email, answer1,
        question1, 
        directReferrerId: currentUser.id,
        refOppId: id,
        phoneNumber: phoneNumber.replace(/[ ()-]/g,"")
      }
      // Set referral Code if one is in the url
      referralCode && (app[referralCode] = referralCode);

      const formData = new FormData();

        // Collect Application
        // let app = { answer1, question1,
        //   refOppId: refApplicationModal.id,
        //   candidateId: currentUser.id,
        //   referralCode: refApplicationModal.referralCode
        // }
        formData.append(`refApplication[fname]`, fname)
        formData.append(`refApplication[email]`, email)
        formData.append(`refApplication[answer_1]`, answer1)
        formData.append(`refApplication[question_1]`, question1)
        formData.append(`refApplication[directReferrerId]`, currentUser.id)
        formData.append(`refApplication[refOppId]`,id)
        formData.append(`refApplication[phoneNumber]`,phoneNumber.replace(/[ ()-]/g,""))

        if(referralCode){
          formData.append(`refApplication[referralCode]`, referralCode)
        }

        if(resume){
          formData.append(`refApplication[resume]`, resume)
        }

      this.props.createRefApplication(formData)
      .then(() => this.props.openRefAppModal({
        redirect: `/hiring/show/${id}`,
        type: 'referral'
      }))
    })
  }

  render(){
    const { classes, postings, id,
      currentUser } = this.props;
    const { loaded, question1, loading } = this.state;

    if(loaded){
      let posting = postings[id];

      let header = <div className={classes.headerGrid}>
        <Typography color='textSecondary' fullWidth
        style={{ fontSize: 30 }}>
          {`Refer Job Posting`}
        </Typography>
      </div>

      let referralDetails = <Grid container 
        justify='space-between'
        className={classes.headerGrid}>
        <Grid item xs={12} sm={6}>
          <Typography color='textSecondary' fullWidth
          gutterBottom
          style={{ fontSize: 18 }}>
            {`Your Referral Rewards`}
          </Typography>
          <Typography color='textPrimary' fullWidth
          style={{ fontSize: 18 }}>
            <b>{`Interview: `}</b>
            {posting.interviewIncentive}
          </Typography>
          <Typography color='textPrimary' fullWidth
          style={{ fontSize: 18 }}>
            <b>{`Hire: `}</b>
            {posting.hireIncentive}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <ReferralLink refOppId={id}/>
        </Grid>
      </Grid>

      let formApplication = <Grid container>
        <Grid item xs={12} sm={11} md={9}>
          <Typography
          style={{ fontSize: 16 }}>
            {`Submit Your Candidate Information Below`}
          </Typography>

          <Grid container justify='space-between'
          alignItems='center'
          style={{ margin: '10px 0px'}}>
            <Typography color='textSecondary'
            className={classes.inputLabel}>
              {`First Name`}
            </Typography>
            <TextField
            required
            variant='outlined'
            placeholder="e.g. John"
            className={classes.textField}
            value={this.state.fname}
            onChange={this.handleChange('fname')}
            onMouseUp={this.handleChange('fname')}
            />
          </Grid>

          <Grid container justify='space-between'
          alignItems='center'
          style={{ margin: '10px 0px'}}>
            <Typography color='textSecondary'
            className={classes.inputLabel}>
              {`Email`}
            </Typography>
            <TextField
            required
            variant='outlined'
            placeholder="e.g. john.doe@gmail.com"
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange('email')}
            onMouseUp={this.handleChange('email')}
            />
          </Grid>

          <Grid container justify='space-between'
          alignItems='center'
          style={{ margin: '10px 0px'}}>
            <Typography color='textSecondary'
            className={classes.inputLabel}>
              {`Mobile Number`}
            </Typography>
            <TextField
            required
            variant='outlined'
            className={classes.textField}
            value={this.state.phoneNumber}
            onChange={this.handleChange('phoneNumber')}
            onMouseUp={this.handleChange('phoneNumber')}
            InputProps={{
              inputComponent: TextMaskCustom,
            }}/>
          </Grid>

          <Grid container justify='space-between'
          alignItems='center'
          style={{ margin: '10px 0px'}}>
            <Typography color='textSecondary'
            className={classes.inputLabel}>
              {`Candidate Description`}
            </Typography>
            <TextField
            required
            variant='outlined'
            placeholder="e.g. John"
            rows="6"
            multiline
            className={classes.textField}
            value={this.state.answer1}
            onChange={this.handleChange('answer1')}
            onMouseUp={this.handleChange('answer1')}
            />
          </Grid>

          {false && <Grid container>
            <Button>
              Upload Resume
            </Button>
          </Grid>}

          <Grid container justify='center'
          style={{ marginTop: 20 }}>
            <Button variant='contained' color='primary'
            style={{ textTransform: 'capitalize'}}
            disabled={currentUser.id === posting.ownerId}
            onClick={this.handleSubmit}>
              {`Refer Candidate`}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      let backButton = <Grid container justify='flex-start'>
        <Button onClick={this.back}>
          {`Back`}
        </Button>
      </Grid>

      return <Grid container justify='center'
      alignItems='flexStart'
      className={classes.grid}>
        <Grid item xs={11} sm={10}
        style={{ padding: "40px 0px"}}>
          {backButton} 
          {header}
          {referralDetails}
          {formApplication}
        </Grid>
      </Grid>
    } else {
      return <Grid container>
        <Loading />
      </Grid>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SharePosting));
