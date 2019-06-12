import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/CloseSharp';
import CloudUploadIcon from '@material-ui/icons/CloudUploadSharp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import { updateUserFeature } from '../../actions/user_feature_actions';
import { connectSocial } from '../../actions/sales_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  dimensions: state.util.window,
  userFeature: state.entities.userFeature,
});

const mapDispatchToProps = dispatch => ({
  updateUserFeature: (payload) => dispatch(updateUserFeature(payload)),
  connectSocial: (payload) => dispatch(connectSocial(payload))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    paddingTop: 64,
    paddingBottom: '10%'
  },
  socialComp: {
    padding: "20px 0px",
    border: `1px solid grey`,
    margin: "30px 0px"
  },
  importHeader:{
    fontSize: 14,
  },
  importButton: { marginTop: 30 },
  learnMore: { textTransform: 'capitalize'}
})

const ExpansionPanel = withStyles({
  root: {
    border: 'none',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
  },
  expanded: {},
})(MuiExpansionPanel);


class ConnectSocial extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      linkedInUpload: null,
      linkedInUploadUrl: '',
      googleUpload: null,
      googleUploadUrl: '',
      facebookUpload: null,
      facebookUploadUrl: '',
    }

    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    const { userFeature, draftPosting } = this.props;
    // If first time, flag create flow
    if (!userFeature.importSocial){
      let payload = {
        importSocial: new Date(),
        id: userFeature.id
      }
      this.props.updateUserFeature(payload);
    }
  }

  handleFile(upload, uploadUrl) {
    return e => {
      let file = e.currentTarget.files[0];
      let fileReader = new FileReader();
  
      fileReader.onloadend = () => {
        this.setState({
          [upload]: file,
          [uploadUrl]: fileReader.result
        })
      }
      if (file) {
        fileReader.readAsDataURL(file)
      }
    }
  }

  handleSubmit(){
    const { currentUser } = this.props;
    const formData = new FormData();

    ['linkedInUpload', 'googleUpload', 'facebookUpload'].map(upload => {
      if(this.state[upload]){
        formData.append(`connectSocial[${upload}]`, this.state[upload])
      }
    })

    this.props.connectSocial(formData)
    // .then(() => )
  }

  render() {
    const { classes, dimensions } = this.props;
    const { linkedInUploadUrl, linkedInUpload,
      googleUploadUrl, googleUpload, facebookUploadUrl, facebookUpload } = this.state;

    let header = <Grid container justify='center'
    style={{ marginTop: 30}}>
      <Grid item xs={10}>
        <Typography fullWidth gutterBottom
        align='center'
        style={{ fontSize: 24}}>
          {`Make referrals and help you and your company grow`}
        </Typography>
        <Typography fullWidth gutterBottom
        align='center'
        style={{ fontSize: 16}}>
          {`Nobody will be able to reach out to your contacts without your permission on a case by case basis.`}
        </Typography>
      </Grid>
    </Grid>

    let linkedInComp = <Grid item xs={12} sm={3} md={3} 
    container justify='center' 
    className={classes.socialComp}>
      <Grid item xs={10} container justify='center'>
        <Typography color='textSecondary' 
        align='center' fullWidth
        className={classes.importHeader}>
          <u>{`Upload Your LinkedIn CSV`}</u>
        </Typography>

        <Grid container justify='center'>
          {linkedInUploadUrl ? (
            <a href={linkedInUploadUrl} download={linkedInUpload.name}>{linkedInUpload.name}</a>
          ) : <div>
            <input
              style={{ display: 'none' }}
              id="resume-button-file"
              type="file"
              onChange={this.handleFile('linkedInUpload', 'linkedInUploadUrl').bind(this)}
              onClick={(event) => {
                event.target.value = null
              }}
            />
            <label htmlFor="resume-button-file">
              {<Button variant='contained'
                component="span"
                className={classes.importButton}
                style={{ backgroundColor: '#455894', color: 'white' }}>
                {`Upload`}
                <CloudUploadIcon
                  style={{ marginLeft: 5 }} />
              </Button>
              }
            </label>
          </div>}
        </Grid>
      </Grid>

      <ExpansionPanel
        style={{ marginTop: 10 }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography color='textSecondary'
          align='center' fullWidth
          style={{ fontSize: 14}}>
            {`Learn More`}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography color='textSecondary'
          style={{ fontSize: 12}}>
            {`Steps:`} <br /><br />
            {`1) Login to your linkedIn profile`} <br/><br/>
            {`2) Click "Settings and Privacy" in the account dropdown menu`} <br/><br/>
            {`3) Toward the bottom, under the "How LinkedIn uses your data" header, you'll see an option to download your data.`} <br /><br />
            {`4) Pick and choose only "connections" and press download. It may take about 10-15 min.`}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Grid>

    let googleComp = <Grid item xs={12} sm={4} md={4}
    container justify='center'
    className={classes.socialComp}>
      <Grid item xs={10} container justify='center'>
        <Typography color='textSecondary' 
          align='center' fullWidth
          className={classes.importHeader}>
          <u>{`Upload Your Gmail Address Book`}</u>
        </Typography>
        
        <Grid container justify='center'>
          {googleUploadUrl ? (
            <a href={googleUploadUrl} download={googleUpload.name}>{googleUpload.name}</a>
          ) : <div>
            <input
              style={{ display: 'none' }}
              id="resume-button-file"
              type="file"
              onChange={this.handleFile('googleUpload', 'googleUploadUrl').bind(this)}
              onClick={(event) => {
                event.target.value = null
              }}
            />
            <label htmlFor="resume-button-file">
              {<Button variant='contained'
                component="span"
                className={classes.importButton}
                style={{ backgroundColor: '#B2363C', color: 'white' }}>
                {`Upload`}
                <CloudUploadIcon
                  style={{ marginLeft: 5 }} />
              </Button>
              }
            </label>
          </div>}
        </Grid>
      </Grid>

      <ExpansionPanel
        style={{ marginTop: 10 }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography color='textSecondary'
            align='center' fullWidth
            style={{ fontSize: 14 }}>
            {`Learn More`}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography color='textSecondary'
            style={{ fontSize: 12 }}>
            {`Steps:`} <br /><br />
            {`1) Login to your linkedIn profile`} <br /><br />
            {`2) Click "Settings and Privacy" in the account dropdown menu`} <br /><br />
            {`3) Toward the bottom, under the "How LinkedIn uses your data" header, you'll see an option to download your data.`} <br /><br />
            {`4) Pick and choose only "connections" and press download. It may take about 10-15 min.`}
            {`5) Once downloaded, open the zip file and upload the "Connection.csv" doc`}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Grid>

    let facebookComp = <Grid item xs={12} sm={3} md={3}
      container justify='center'
      className={classes.socialComp}>
      <Grid item xs={10} container justify='center'>
        <Typography color='textSecondary' 
          align='center' fullWidth
          className={classes.importHeader}>
          <u>{`Upload Your Facebook Friends`}</u>
        </Typography>
        
        <Grid container justify='center'>
          {facebookUploadUrl ? (
            <a href={facebookUploadUrl} download={facebookUpload.name}>{facebookUpload.name}</a>
          ) : <div>
            <input
              style={{ display: 'none' }}
              id="resume-button-file"
              type="file"
              onChange={this.handleFile('facebookUpload', 'facebookUploadUrl').bind(this)}
              onClick={(event) => {
                event.target.value = null
              }}
            />
            <label htmlFor="resume-button-file">
              {<Button variant='contained'
                component="span"
                className={classes.importButton}
                style={{ backgroundColor: '#455894', color: 'white' }}>
                {`Upload`}
                <CloudUploadIcon
                  style={{ marginLeft: 5 }} />
              </Button>
              }
            </label>
          </div>}
        </Grid>
      </Grid>

      <ExpansionPanel
        style={{ marginTop: 10 }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography color='textSecondary'
            align='center' fullWidth
            style={{ fontSize: 14 }}>
            {`Learn More`}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography color='textSecondary'
            style={{ fontSize: 12 }}>
            {`Steps:`} <br /><br />
            {`1) Login to your linkedIn profile`} <br /><br />
            {`2) Click "Settings and Privacy" in the account dropdown menu`} <br /><br />
            {`3) Toward the bottom, under the "How LinkedIn uses your data" header, you'll see an option to download your data.`} <br /><br />
            {`4) Pick and choose only "connections" and press download. It may take about 10-15 min.`}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Grid>

    let submitBar = <Grid container justify='center'
    style={{ marginTop: 30}}>
      <Button variant='contained' color='primary'
        disabled={!linkedInUpload && !googleUpload && !facebookUpload }
      onClick={this.handleSubmit}>
        {`Submit Connections`}
      </Button>
    </Grid>

    return <div style={{ minHeight: dimensions.height }}>
      <Grid container justify='center'
        className={classes.grid}>
        <Grid item xs={10}>
          {header}

          <Grid container justify='space-around'>
            {linkedInComp}
            {googleComp}
            {facebookComp}
          </Grid>
          
          {submitBar}
        </Grid>
      </Grid>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ConnectSocial));
