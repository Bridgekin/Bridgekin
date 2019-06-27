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
import { connectSocial, presignedUrl, uploadToS3 } from '../../actions/sales_contacts_actions';
import { openConnectSocial } from '../../actions/modal_actions';
import ImportGoogle from '../google/import_contacts';
import CircularProgress from '@material-ui/core/CircularProgress';
import Loading from '../loading';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  dimensions: state.util.window,
  userFeature: state.entities.userFeature,
});

const mapDispatchToProps = dispatch => ({
  updateUserFeature: (payload) => dispatch(updateUserFeature(payload)),
  connectSocial: (payload) => dispatch(connectSocial(payload)),
  openConnectSocial: (payload) => dispatch(openConnectSocial(payload)),
  presignedUrl: (filename, fileType) => dispatch(presignedUrl(filename, fileType)),
  uploadToS3: (response, formData) => dispatch(uploadToS3(response, formData))
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
    margin: "30px 0px",
    minHeight: 205
  },
  importHeader:{
    fontSize: 14,
  },
  importButton: { marginTop: 30 },
  learnMore: { textTransform: 'capitalize'},
  buttonProgress: {
    position: 'absolute',
    left: '50%',
  },
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
      linkedInUploading: false,
      googleUsersArray: null,
      googleUploading: false,
      facebookUpload: null,
      facebookUploadUrl: '',
      loading: false,
      linkedInWarning: false
    }

    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.receiveGoogleUsers = this.receiveGoogleUsers.bind(this);
    this.getContent = this.getContent.bind(this);
  }

  componentDidMount(){
    const { userFeature, draftPosting } = this.props;
    // If first time, flag create flow
    if (!userFeature.importSocial){
      let payload = {
        importedSocial: new Date(),
        id: userFeature.id
      }
      this.props.updateUserFeature(payload);
    }
  }

  handleFile(upload, uploadUrl) {
    return e => {
      let file = e.currentTarget.files[0];
      if (file.name.split(".").pop() === 'csv'){
        let fileReader = new FileReader();
    
        fileReader.onloadend = () => {
          this.processFile(file, "linkedInUploading", "linkedInKey", "text/csv")
          // this.setState({
          //   [upload]: file,
          //   [uploadUrl]: fileReader.result
          // })
        }
        if (file) {
          fileReader.readAsDataURL(file)
        }
      } else {
        // Show warning to user that they must upload a csv
        this.setState({ linkedInWarning: true})
      }
    }
  }

  receiveGoogleUsers(googleUsersArray) {
    this.setState({ googleUsersArray },
      () => {
        // Turn into a json object with type
        // application/json

      })
  }

  async processFile(file, loading, dest_key, fileType){
    this.setState({ [loading]: true})
    let urlResponse = await this.props.presignedUrl(file.name, fileType)

    const formData = await new FormData();
    await formData.append(`file`, file)
    let awsResponse = await this.props.uploadToS3(urlResponse, formData)
    if(awsResponse){
      await this.setState({ 
        [loading]: false,
        [dest_key]: urlResponse.key
      })
    } else {
      await this.setState({ [loading]: false })
    }
  }

  handleSubmit(){
    this.setState({ loading: true },
      () => {
        const { currentUser } = this.props;
        const formData = new FormData();
    
        ['linkedInKey', 'googleUsersArray', 'facebookUpload'].map(upload => {
          if (this.state[upload]) {
            if (upload === 'googleUsersArray') {
              formData.append(`connectSocial[${upload}]`, JSON.stringify(this.state[upload]))
            } else {
              formData.append(`connectSocial[${upload}]`, this.state[upload])
            }
          }
        })
        this.props.connectSocial(formData)
          .then(() => {
            this.props.openConnectSocial()
            this.setState({ loading: false })
          })
      })
  }

  getContent(type){
    return () => {
      const { classes } = this.props;
      const { linkedInUploadUrl, linkedInUpload,
        googleUsersArray, facebookUploadUrl, facebookUpload, loading,
        linkedInWarning, linkedInKey,
        linkedInUploading } = this.state;
      // debugger
      if(type === "linkedIn"){
        if (linkedInKey){
          return <Typography>
            {`Ready for upload`}
          </Typography>
        } else if (linkedInUploading) {
          return <Loading />
        } else {
          return <Grid container justify='center'>
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

            {linkedInWarning && <Typography
              style={{ fontSize: 12, color: 'red', marginTop: 10 }}>
              {`Note* Your file must be type csv`}
            </Typography>}
          </Grid>
        }
      }
    }
  }

  render() {
    const { classes, dimensions } = this.props;
    const { linkedInUploadUrl, linkedInUpload,
      googleUsersArray, facebookUploadUrl, facebookUpload, loading,
      linkedInWarning, linkedInKey } = this.state;

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

    let linkedInComp = <Grid item xs={12} sm={3} md={3}> 
      <Grid container justify='center'
        className={classes.socialComp}>
        <Grid item xs={10} container justify='center'>
          <Typography color='textSecondary' 
          align='center' fullWidth
          className={classes.importHeader}>
            <u>{`Upload Your LinkedIn CSV`}</u>
          </Typography>

          {this.getContent("linkedIn")()}
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
              {`1) Login to your LinkedIn profile`} <br/><br/>
              {`2) In the navigation bar click on your profile image and click “Settings and Privacy” in the account dropdown menu`} <br/><br/>
              {`3) On the left of the page click “How LinkedIn uses your data”. Once it directs you to that section click the second line item that says “Download your data`} <br /><br/>
              {`4) Under “Pick and choose” click the checkbox next to “Connections” and press download. It may take about 10-15 minutes, at which point you’ll get notified via email by LinkedIn.`}<br/><br/>
              {`5) Once downloaded, unzip the file. You should see a "connections.csv" file. Upload the "connections.csv" file (Not the entire folder or any other files in that folder)`}<br /><br />
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </Grid>

    let googleComp = <Grid item xs={12} sm={4} md={4}>
      <Grid container justify='center'
      className={classes.socialComp}>
        <Grid item xs={10} container justify='center'>
          <Typography color='textSecondary' 
            align='center' fullWidth
            className={classes.importHeader}>
            <u>{`Upload Your Gmail Address Book`}</u>
          </Typography>
          
          <Grid container justify='center'
            className={classes.importButton}>
            {googleUsersArray ? <Typography align='center'
            color='textSecondary'
            style={{ fontSize: 14}}>
              {`Contacts Ready for Upload`}
            </Typography> : <ImportGoogle salesImport
            receiveGoogleUsers={this.receiveGoogleUsers}
            connectSocial
            />}
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
              {`1) Use the button above to verify your google login`} <br /><br />
              {`2) Accept the permissions page and your all set!`} <br /><br />
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </Grid>

    let facebookComp = <Grid item xs={12} sm={3} md={3}>
      <Grid container justify='center'
        className={classes.socialComp}>
        <Grid item xs={10}>
          <Typography
          style={{ fontSize: 11, color: 'red'}}>
            {`Currently Disabled`}
          </Typography>
        </Grid>
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
                  component="span" disabled
                  className={classes.importButton}
                  style={{ backgroundColor: 'grey', color: 'white' }}>
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
    </Grid>

    let submitBar = <Grid container justify='center'
    style={{ marginTop: 30}}>
      <Button variant='contained' color='primary'
        disabled={(!linkedInKey && !googleUsersArray && !facebookUpload) || loading }
        onClick={this.handleSubmit}>
        {`Submit Connections`}
        {loading && <CircularProgress size={24}
          className={classes.buttonProgress} />}
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
