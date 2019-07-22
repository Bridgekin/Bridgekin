import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';

import ReferralLink from './referral_link';
import merge from 'lodash/merge';
import { SocialIcon } from 'react-social-icons';
import { fetchRefOpp, createRefOpp, updateRefOpp } from
'../../actions/ref_opportunity_actions.js';
import queryString from 'query-string';
import { openRefAppModal, openSignup } from '../../actions/modal_actions';
import { createRefLink } from '../../actions/ref_link_actions';
import { fetchRefApplications } from '../../actions/ref_application_actions';
import { updateDraftFlag, resetDraftPosting } from '../../actions/hiring_actions';

const mapStateToProps = (state, ownProps) => {
  const values = queryString.parse(ownProps.location.search)
  return {
  currentUser: state.users[state.session.id],
  draftFlag: state.entities.hiring.draftFlag,
  draftPosting: state.entities.hiring.draftPosting,
  dimensions: state.util.window,
  id: ownProps.match.params.id,
  postings: state.entities.hiring.refOpps,
  referralCode: values.referralCode,
  submittedApps: state.entities.hiring.submittedApps,
  refApps: state.entities.hiring.refApps,
}};

const mapDispatchToProps = dispatch => ({
  fetchRefOpp: (id) => dispatch(fetchRefOpp(id)),
  fetchRefApplications: () => dispatch(fetchRefApplications()),
  createRefOpp: (refOpp) => dispatch(createRefOpp(refOpp)),
  updateRefOpp: (refOpp) => dispatch(updateRefOpp(refOpp)),
  openRefAppModal: (payload) => dispatch(openRefAppModal(payload)),
  openSignup: (payload) => dispatch(openSignup(payload)),
  createRefLink: id => dispatch(createRefLink(id)),
  resetDraftPosting: () => dispatch(resetDraftPosting()),
  updateDraftFlag: (flag) => dispatch(updateDraftFlag(flag))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grid:{
    paddingTop: 64,
    paddingBottom: '10%'
  },
  formLabel:{
    fontSize: 16
  },
  formItem:{
    margin: '20px 0px'
  },
  currentValue:{
    margin: '10px 0px'
  },
  infoMessage:{
    color: 'blue', 
    fontSize: 13,
    fontStyle: 'italic'
  }
})

class ShowPosting extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      edit: false,
      loading: false,
      loaded: false
    }

    this.changePostingValue = this.changePostingValue.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleApplication = this.handleApplication.bind(this);
    this.isApplyDisabled = this.isApplyDisabled.bind(this);
  }

  componentDidMount(){
    const { id } = this.props
    if(id){
      this.props.fetchRefOpp(id)
      .then(() => {
        const { postings } = this.props;
        this.setState({ posting: postings[id] });
      })

      this.props.createRefLink(this.props.id)
      this.props.fetchRefApplications()
    }
    // debugger
    if(this.props.draftFlag){
      let draftCopy = this.props.draftPosting;
      this.setState({ posting: draftCopy })
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    let thisCurrent = this.props.currentUser;
    let nextCurrent = nextProps.currentUser;
    if(nextCurrent && thisCurrent !== nextCurrent){
      // this.props.fetchRefOpp(id)
      this.props.fetchRefApplications()
      this.props.createRefLink(this.props.id)
    }

    if(!nextCurrent && thisCurrent !== nextCurrent){
      this.props.fetchRefOpp(nextProps.id)
      .then(() => {
        const { postings, id } = nextProps;
        this.setState({ posting: postings[id] });
      })
    }
    return true
  }

  isApplyDisabled(posting){
    const { draftFlag, currentUser, submittedApps, refApps, id } = this.props;

    if(draftFlag || (!draftFlag && posting && currentUser && posting.ownerId === currentUser.id)){
      return true
    }
    // Find submitted Apps
    let prevApplication = submittedApps.filter(x => {
      let app = refApps[x];
      if(currentUser.id === app.candidateId &&
        parseInt(id) === app.refOppId){ return true }
      return false
    })
    if(prevApplication.length > 0){ return true }
    return false
  }

  // getPosting(){
  //   const { postings, id, draftFlag, 
  //     draftPosting } = this.props;
  //   if (draftFlag){
  //     return posting
  //   } else if (postings && id) {
  //     return postings[id]
  //   }
  //   return undefined
  // }

  getInfoMessage(){
    const { classes, draftFlag } = this.props;

    if(draftFlag){
      return <Grid item xs={11}
      style={{ marginTop: 30, paddingLeft: 40 }}>
        <Typography className={classes.infoMessage}>
          {`Note* This is a draft posting. To finalize this posting, press the save button below`}
        </Typography>
      </Grid>
    }
    return <div />
  }

  makeHeader(phrase){
    return <div
    style={{ paddingBottom: 30, borderBottom: `1px solid grey`, marginBottom: 20, width: '100%'}}>
      <Typography color='textPrimary' fullWidth
      style={{ fontSize: 24, fontWeight: 600 }}>
        {phrase}
      </Typography>
    </div>
  }

  changePostingValue(field){
    return e => {
      const posting = merge({}, this.state.posting)
      posting[field] = e.target.value
      this.setState({ posting })
    }
  }

  toggleEdit(){
    const { edit } = this.state;
    this.setState({ edit: !edit })
  }

  handleSave(){
    const { currentUser } = this.props;
    const { posting, loading } = this.state;
    if(this.props.draftFlag){
      // create posting
      let payload = merge({}, posting, {ownerId: currentUser.id})
      this.props.createRefOpp(payload)
      .then((refOpp) => {
        this.props.resetDraftPosting();
        this.props.updateDraftFlag(false);
        this.props.history.push(`/hiring/show/${refOpp.id}`)
      })
    } else {
      this.setState({ loading: true },
      () => {
        // update posting
        let payload = merge({}, posting)
        this.props.updateRefOpp(payload)
        .then(() => this.setState({ edit: false, loading: false }))
      })
    }
  }

  handleShare(){
    const { currentUser, referralCode, id} = this.props;
    if(currentUser){
      this.props.history.push(`/hiring/share/${this.props.id}?referralCode=${referralCode}`)
    } else {
      let payload = {
        page: 'new', id,
        message: `Quick signup to refer for this position`,
        type: 'refer',
      }
      referralCode && (payload.referralCode = referralCode);
      this.props.openSignup(payload)
    }
  }

  handleApplication(){
    const { currentUser, referralCode, id } = this.props;
    if(currentUser){
      let payload = { type: 'personal', id }
      referralCode && (payload.referralCode = referralCode);
      this.props.openRefAppModal(payload)
    } else {
      //Sign user in
      let payload = {
        page: 'new', id,
        message: `Quick signup to apply for this position`,
        type: 'personal',
      }
      referralCode && (payload.referralCode = referralCode);
      this.props.openSignup(payload)
    }
  }

  render(){
    const { classes, currentUser, draftFlag, 
    dimensions, draftPosting, postingId, postings,
    id } = this.props;
    
    const { posting, edit, loading } = this.state;
    // let posting = draftFlag ? draftPosting : this.getPosting()

    if(!posting){
      return <Grid container justify='center'
      alignItems='flexStart'
      className={classes.grid}>
        {'No Posting found'}
      </Grid>
    }

    let jobDescription = (
      <div style={{ flexGrow: 1}}>
        {this.makeHeader('Job Description')}
        <Grid container
        style={{ margin: '20px 0px'}}>
          <Button color='primary' variant='contained'
          disabled={this.isApplyDisabled(posting)}
          onClick={this.handleApplication}>
            {'Apply'}
          </Button>
        </Grid>

        <Grid container justify='space-between'
        className={classes.formItem}>
          <Typography color='textSecondary'
          className={classes.formLabel}>
            {`Job Title`}
          </Typography>

          {!edit ? <Typography color='textPrimary'
          className={classes.currentValue}>
            {posting.title}
          </Typography> :
          <InputBase 
            className={classes.formInput}
            value={posting.title}
            placeholder="e.g. Software Engineer"
            onChange={this.changePostingValue('title')}
          style={{ width: '50%'}}/> }
        </Grid>

        <Grid container justify='space-between'
        className={classes.formItem}>
          <Typography color='textSecondary'
          className={classes.formLabel}>
            {`Job Description`}
          </Typography>

          {!edit ? <Typography color='textPrimary'>
            {posting.description}
          </Typography> :
          <InputBase 
            className={classes.formInput}
            value={posting.description}
            rows={5}
            multiline
            placeholder="e.g. Software Engineer"
            onChange={this.changePostingValue('description')}
            style={{ width: '50%'}}/>}
        </Grid>

        <Grid container justify='space-between'
        className={classes.formItem}>
          <Typography color='textSecondary'
          className={classes.formLabel}>
            {`Type of Position`}
          </Typography>

          {!edit ? <Typography color='textPrimary'>
            {posting.typeOfPosition}
          </Typography> :
          <InputBase 
            className={classes.formInput}
            value={posting.typeOfPosition}
            placeholder="e.g. Full Time"
            onChange={this.changePostingValue('typeOfPosition')}
            style={{ width: '50%'}}/>}
        </Grid>

        <Grid container justify='space-between'
        className={classes.formItem}>
          <Typography color='textSecondary'
          className={classes.formLabel}>
            {`Company`}
          </Typography>

          {!edit ? <Typography color='textPrimary'>
            {posting.company}
          </Typography> :
          <InputBase 
            className={classes.formInput}
            value={posting.company}
            placeholder="e.g. Bridgekin"
            onChange={this.changePostingValue('company')}
            style={{ width: '50%'}}/>}
        </Grid>

        <Grid container justify='space-between'
        className={classes.formItem}>
          <Typography color='textSecondary'
          className={classes.formLabel}>
            {`Compensation`}
          </Typography>

          {!edit ? <Typography color='textPrimary'>
            {posting.compensation}
          </Typography> :
          <InputBase 
            className={classes.formInput}
            value={posting.compensation}
            placeholder="e.g. 100,000-120,000/yr"
            onChange={this.changePostingValue('compensation')}
            style={{ width: '50%'}}/>}
        </Grid>

        <Grid container justify='space-between'
        className={classes.formItem}>
          <Typography color='textSecondary'
          className={classes.formLabel}>
            {`City`}
          </Typography>

          {!edit ? <Typography color='textPrimary'>
            {posting.city}
          </Typography> :
          <InputBase 
            className={classes.formInput}
            value={posting.city}
            placeholder="e.g. San Francisco"
            onChange={this.changePostingValue('city')}
            style={{ width: '50%'}}/>}
        </Grid>


        <Grid container justify='space-between'
        className={classes.formItem}>
          <Typography color='textSecondary'
          className={classes.formLabel}>
            {`State`}
          </Typography>

          {!edit ? <Typography color='textPrimary'>
            {posting.state}
          </Typography> :
          <InputBase 
            className={classes.formInput}
            value={posting.state}
            placeholder="e.g. 100,000-120,000/yr"
            onChange={this.changePostingValue('state')}
            style={{ width: '50%'}}/>}
        </Grid>

        {(draftFlag || (!draftFlag && posting &&
          currentUser && posting.ownerId === currentUser.id)) && <Grid container>
          {edit ? <Button color='primary' variant='contained'
          disable={loading}
          onClick={id ? this.handleSave : this.toggleEdit}>
            {id ? `Save` : `Preview`}
          </Button> : 
          <Button color='default' variant='contained'
          onClick={this.toggleEdit}>
            {`Edit`}
          </Button>}
        </Grid>}
      </div>
    )
    let referInfo = (
      <div style={{ flexGrow: 1}}>
        {this.makeHeader('Refer Job Posting')}

        <Grid container direction='column'
        style={{ paddingBottom: 20, borderBottom: '1px solid grey'}}>
          <Typography color='textPrimary' gutterBottom
          fullWidth
          style={{ fontSize: 18}}>
            {`Your Referral Rewards`}
          </Typography>
          <Typography color='textPrimary' fullWidth
          style={{ fontSize: 18}}>
            <b>Interview: </b>
            {!edit ? `$${posting.interviewIncentive}` : 
            <InputBase 
            className={classes.textField}
            value={posting.interviewIncentive}
            placeholder="e.g. $100"
            onChange={this.changePostingValue('interviewIncentive')}
            style={{ flexGrow: 1}}/>}
          </Typography>
          <Typography color='textPrimary' fullWidth
          style={{ fontSize: 18}}>
            <b>Hire: </b>
            {!edit ? `$${posting.hireIncentive}` : 
            <InputBase 
            className={classes.textField}
            value={posting.hireIncentive}
            placeholder="e.g. $100"
            onChange={this.changePostingValue('hireIncentive')}
            style={{ flexGrow: 1}}/>}
          </Typography>
        </Grid>
      </div>
    )

    let referComponent = (
      <div style={{ flexGrow: 1}}>
        {currentUser && <ReferralLink show refOppId={id}/>}

        <Grid container
        style={{ marginTop: 30}}>
          {draftFlag ? 
          <Button variant='contained' color='primary'
          disabled={edit}
          onClick={this.handleSave}>
            {`Save`}
          </Button> : 
          <Button variant='contained' color='primary'
          onClick={this.handleShare}>
            {currentUser ? `Submit A Specific Candidate` : `Refer A Candidate New`}
          </Button>}
        </Grid>
      </div>
    )

    let backToDashboard = <Grid item xs={10}
    style={{ paddingTop: 30}}>
      {currentUser && <Button
      onClick={() => this.props.history.push('/hiring/dashboard')}>
        {`Back to Dashboard`}
      </Button>}
    </Grid>

    return <Grid container justify='center'
    alignItems='flexStart'
    className={classes.grid}>
      {this.getInfoMessage()}
      {backToDashboard}
      <Grid item xs={10} sm={5} container
      style={{ padding: 40}}>
        {jobDescription}
      </Grid>
      <Grid item xs={1}/>
      <Grid item xs={10} sm={5}
      style={{ padding: 40}}>
        {referInfo}
        {referComponent}
      </Grid>
    </Grid>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShowPosting));
