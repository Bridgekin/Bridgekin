import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { updateUserFeature } from '../../../actions/user_feature_actions';
import { updateDraftPosting, updateDraftFlag } from '../../../actions/hiring_actions';
import merge from 'lodash/merge';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  dimensions: state.util.window,
  userFeature: state.entities.userFeature,
  draftPosting: state.entities.hiring.draftPosting,
});

const mapDispatchToProps = dispatch => ({
  updateUserFeature: (payload) => dispatch(updateUserFeature(payload)),
  updateDraftPosting: (posting) => dispatch(updateDraftPosting(posting)),
  updateDraftFlag: (draftFlag) => dispatch(updateDraftFlag(draftFlag))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grid:{
    paddingTop: 64,
    paddingBottom: '10%'
  },
  input:{
    width: '100%'
  },
  searchPaper:{
    padding:"10px 30px",
    width: '100%'
  },
  header:{
    fontSize: 36, 
    fontWeight: 600,
    marginBottom: 40
  },
  subHeader:{
    fontSize: 18
  },
  saveButton:{
    margin: '20px 0px'
  },
  manualButton:{
    margin: '20px 0px',
    textTransform: 'none'
  },
  incHeader:{
    fontSize: 20,
    fontWeight: 600
  },
  incPaper:{
    padding: '5px 10px',
    // width: '100%'
  },
  formPaper:{
    padding: '5px 10px',
    width: '50%'
  }
})

class CreateFlow extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      page: 'AngelList',
      angelListUrl: '',
      posting: {}
    }
    this.getContent = this.getContent.bind(this);
    this.changePage = this.changePage.bind(this);
    this.changePosting = this.changePosting.bind(this);
    this.updateDraftPosting = this.updateDraftPosting.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.redirectToPreview = this.redirectToPreview.bind(this);
  }

  componentDidMount(){
    const { userFeature, draftPosting } = this.props;
    // If first time, flag create flow
    if(!userFeature.initialPostingDate){
      let payload = {
        initialPostingDate: new Date(),
        id: userFeature.id
      }
      this.props.updateUserFeature(payload);
    }
    // Set state to redux 
    let reduxCopyPosting = merge({}, draftPosting)
    this.setState({ posting: reduxCopyPosting})
  }

  changePage(page){
    return e => {
      if(page === 'Incentive'){
        this.updateDraftPosting();
      }
      // this.setState({ page })
      this.props.history.push(`/hiring/create/${page}`)
    }
  }

  changePosting(field){
    return e => {
      let newPosting = merge({}, this.state.posting)
      newPosting[field] = e.target.value
      this.setState({ posting: newPosting })
    }
  }

  handleChange(field){
    return e => {
      this.setState({ [field]: e.target.value })
    }
  }

  updateDraftPosting(){
    const { posting } = this.state;
    this.props.updateDraftPosting(posting)
  }

  redirectToPreview(){
    this.updateDraftPosting();
    this.props.updateDraftFlag(true);
    this.props.history.push('/hiring/show')
  }

  getContent(){
    const { classes, dimensions } = this.props;
    const { posting } = this.state;
    let pathName = this.props.location.pathname.split('/').pop();

    let content = undefined
    switch(pathName){
      case "AngelList":
        content = <Grid container justify='center'
        direction='column' alignItems='center'>
          <Typography color='textPrimary' align='center'
          gutterBottom
          className={classes.header}>
            {`Input AngelList Job URL`}
          </Typography>
          <Grid item xs={10} sm={8} md={6} container>
            <Paper className={classes.searchPaper}>
              <InputBase className={classes.input} placeholder="Input your Angelist url..." 
              onChange={this.handleChange('angelListUrl')}/>
            </Paper>
          </Grid>
          <Button onClick={this.changePage('Manual')}
          className={classes.manualButton}>
            {`Or input manually`}
          </Button>
          <Button variant='contained' color='primary'
          onClick={this.changePage('Incentive')}
          className={classes.saveButton}>
            {`Next`}
          </Button>
        </Grid>
        
        return <Grid container justify='center' alignItems='center' className={classes.grid}
        style={{ minHeight: dimensions.height}}>
          {content}
        </Grid>;
      case "Manual":
        let header = (
          <Grid container alignItems='center'
          style={{ marginLeft: 50, borderBottom: "1px solid grey"}}>
            <Typography color='textSecondary'
            style={{ fontSize: 20, fontWeight: 600}}>
              {`Job Details`}
            </Typography>
          </Grid>
        )

        let formFirst = (
          <Grid container item xs={10} sm={6}
          style={{ padding: 20}}>
            <Grid container justify='space-between'
            style={{ margin: 20 }}>
              <Typography color='textSecondary'
              style={{ fontSize: 16 }}>
                {`Job Title`}
              </Typography>
              <Paper className={classes.formPaper}>
                <InputBase className={classes.input} placeholder="e.g. Software Engineer"
                value={posting.title} 
                onChange={this.changePosting('title')}/>
              </Paper>
            </Grid>

            <Grid container justify='space-between'
            style={{ margin: 20 }}>
              <Typography color='textSecondary'
              style={{ fontSize: 16 }}>
                {`Job Description`}
              </Typography>
              <Paper className={classes.formPaper}>
                <InputBase className={classes.input} placeholder={`Describe the responsibilities of this position. You can change this later.`}
                rows='5' multiline
                value={posting.description} 
                onChange={this.changePosting('description')}/>
              </Paper>
            </Grid>

            <Grid container justify='space-between'
            style={{ margin: 20 }}>
              <Typography color='textSecondary'
              style={{ fontSize: 16 }}>
                {`Type of Position`}
              </Typography>
              <Paper className={classes.formPaper}>
                <InputBase className={classes.input} placeholder="e.g. Full Time Employee"
                value={posting.type} 
                onChange={this.changePosting('type')}/>
              </Paper>
            </Grid>
          </Grid>
        )

        let formSecond = (
          <Grid container item xs={10} sm={6}
          style={{ padding: 20}}>
            <Grid container justify='space-between'
            style={{ margin: 20 }}>
              <Typography color='textSecondary'
              style={{ fontSize: 16 }}>
                {`Company`}
              </Typography>
              <Paper className={classes.formPaper}>
                <InputBase className={classes.input} placeholder="e.g. Bridgekin"
                value={posting.company} 
                onChange={this.changePosting('company')}/>
              </Paper>
            </Grid>

            <Grid container justify='space-between'
            style={{ margin: 20 }}>
              <Typography color='textSecondary'
              style={{ fontSize: 16 }}>
                {`Compensation`}
              </Typography>
              <Paper className={classes.formPaper}>
                <InputBase className={classes.input} placeholder="e.g. 100,000-120,000/yr"
                value={posting.compensation} 
                onChange={this.changePosting('compensation')}/>
              </Paper>
            </Grid>

            <Grid container justify='space-between'
            style={{ margin: 20 }}>
              <Typography color='textSecondary'
              style={{ fontSize: 16 }}>
                {`City`}
              </Typography>
              <Paper className={classes.formPaper}>
                <InputBase className={classes.input} placeholder="e.g. San Francisco"
                value={posting.city} 
                onChange={this.changePosting('city')}/>
              </Paper>
            </Grid>

            <Grid container justify='space-between'
            style={{ margin: 20 }}>
              <Typography color='textSecondary'
              style={{ fontSize: 16 }}>
                {`State`}
              </Typography>
              <Paper className={classes.formPaper}>
                <InputBase className={classes.input} placeholder="e.g. CA"
                value={posting.state} 
                onChange={this.changePosting('state')}/>
              </Paper>
            </Grid>

            <Grid container justify='flex-end'
            style={{ margin: 20 }}>
              <Button color='textSecondary'
              onClick={this.changePage('AngelList')}
              style={{ textTransform: 'none', marginRight: 20}}>
                {`Import from AngelList`}
              </Button>
              <Button variant='contained' color='primary'
              onClick={this.changePage('Incentive')}>
                {`Next`}
              </Button>
            </Grid>

          </Grid>
        )

        content = <Grid container justify='center'
        direction='column' alignItems='center'>
          {header}
          <Grid container
          style={{ marginTop: 30}}>
            {formFirst}
            {formSecond}
          </Grid>
        </Grid>

        
        return <Grid container justify='center'
        alignItems='flex-start'
        className={classes.grid}
        style={{ minHeight: dimensions.height, paddingTop: 114}}>
          {content}
        </Grid>;

      case "Incentive":
        content = <Grid container justify='center'
        direction='column' alignItems='center'>
          <Typography color='textPrimary' align='center'
          gutterBottom
          className={classes.header}>
            {`Set your referral reward`}
          </Typography>
          <Typography color='textPrimary' align='center'
          gutterBottom
          className={classes.subHeader}>
            {`When you decide to interview or hire someone you’ll reward the referer with the amount below`}
          </Typography>

          <Grid container item xs={10} sm={8} alignItems='center' justify='space-around'
          style={{ marginTop: 20}}>
            <Grid item xs={10} sm={3}>
              <Typography color='textPrimary' align='center' gutterBottom fullWidth
              className={classes.incHeader}>
                {`Reward for interview`}
              </Typography>
              <Paper className={classes.incPaper}>
                <InputBase className={classes.input}
                value={posting.interviewIncentive} 
                onChange={this.changePosting('interviewIncentive')}/>
              </Paper>
            </Grid>

            <Grid item xs={10} sm={3}>
              <Typography color='textPrimary' align='center' gutterBottom fullWidth
              className={classes.incHeader}>
                {`Reward for each hire`}
              </Typography>
              <Paper className={classes.incPaper}>
                <InputBase className={classes.input} 
                value={posting.hireIncentive} 
                onChange={this.changePosting('hireIncentive')}/>
              </Paper>
            </Grid>

            <Grid item xs={10} sm={4}>
              <Button color='primary' variant='contained'
              onClick={this.redirectToPreview}>
                {`View Job Posting`}
              </Button>
            </Grid>

          </Grid>
        </Grid>
        return <Grid container justify='center' alignItems='center' className={classes.grid}
        style={{ minHeight: dimensions.height}}>
          {content}
        </Grid>;
      default: 
        return "No Page Selected"
    }
  }

  render(){
    const { classes, dimensions } = this.props;

    return this.getContent()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateFlow));
