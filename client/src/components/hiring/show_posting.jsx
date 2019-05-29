import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';

import merge from 'lodash/merge';
import { SocialIcon } from 'react-social-icons';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  draftFlag: state.entities.hiring.draftFlag,
  draftPosting: state.entities.hiring.draftPosting,
  dimensions: state.util.window
});

const mapDispatchToProps = dispatch => ({

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
  }
})

class ShowPosting extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      edit: false
    }

    this.changePostingValue = this.changePostingValue.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentDidMount(){
    this.setState({ posting: this.getPosting() })
  }

  getPosting(){
    const { postings, postingId, draftFlag, 
      draftPosting } = this.props;
    if (draftFlag){
      return draftPosting;
    } else if (postings && postingId) {
      return postings[postingId]
    }
    return undefined
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
    this.setState({ edit: !this.state.edit })
  }

  handleSave(){
    if(this.props.draftFlag){
      // create posting
    } else {
      // update posting
    }
  }

  render(){
    const { classes, currentUser, draftFlag, 
      dimensions, draftPosting, postingId, postings } = this.props;
    
    const { posting, edit } = this.state;
    // let posting = draftFlag ? draftPosting : this.getPosting();

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
          disabled={draftFlag}>
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
            {posting.type}
          </Typography> :
          <InputBase 
            className={classes.formInput}
            value={posting.type}
            placeholder="e.g. Full Time"
            onChange={this.changePostingValue('type')}
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

        <Grid container>
          {(draftFlag || (!draftFlag && posting && posting.ownerId === currentUser.id))  && 
          <Button color={(edit ? 'primary' : 'default')}variant='contained'
          onClick={this.toggleEdit}>
            {edit ? `Preview` : `Edit`}
          </Button>}
        </Grid>
      </div>
    )
    let referInfo = (
      <div style={{ flexGrow: 1}}>
        {this.makeHeader('Refer Job Posting')}

        <Grid container direction='column'
        style={{ paddingBottom: 20, borderBottom: '1px solid grey', marginBottom: 30}}>
          <Typography color='textPrimary' gutterBottom
          fullWidth
          style={{ fontSize: 18}}>
            {`Your Referral Rewards`}
          </Typography>
          <Typography color='textPrimary' fullWidth
          style={{ fontSize: 18}}>
            <b>Interview: </b>
            {!edit ? `${posting.interviewIncentive}` : 
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
            {!edit ? `${posting.hireIncentive}` : 
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
        <Grid style={{ marginBottom: 30}}>
          <Typography color='textPrimary' gutterBottom
          fullWidth
          style={{ fontSize: 18}}>
            {`Your Referral Rewards`}
          </Typography>

          <Typography color='textSecondary' gutterBottom
          fullWidth style={{ fontSize: 14 }}>
            <i>{draftFlag ?'Set on posting creation...': 'bridgekin.com/hiring/HGJKFK42'}</i>
          </Typography>
        </Grid>

        <Grid container style={{ marginBottom: 30}}>
          <Typography color='textPrimary' gutterBottom
          fullWidth
          style={{ fontSize: 18}}>
            {`Share Referral link to your network`}
          </Typography>
          <Grid container justify='space-around'
          item xs={8}>
            <SocialIcon network="email"/>
            <SocialIcon url="http://linkedin.com/" 
            network="linkedin"/>
            <SocialIcon url="http://facebook.com/" 
            network="facebook"/>
            <SocialIcon url="http://twitter.com/" network="twitter"/>
          </Grid>
        </Grid>

        <Grid container>
          {draftFlag ? 
          <Button variant='contained' color='primary'
          disabled={edit}
          handleSave={this.handleSave}>
            {`Save`}
          </Button> : 
          <Button variant='contained' color='primary'
          handleSave={this.handleSave}>
            {`Submit a specific candidate`}
          </Button>}
        </Grid>
      </div>
    )

    return <Grid container justify='center'
    alignItems='flexStart'
    className={classes.grid}>
      <Grid item xs={10} sm={5} container
      style={{ padding: 40}}>
        {jobDescription}
      </Grid>
      <Grid item xs={1}/>
      <Grid item xs={10} sm={5} container
      direction='column'
      style={{ padding: 40}}>
        {referInfo}
        {referComponent}
      </Grid>
    </Grid>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShowPosting));
