import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
// import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import _ from 'lodash';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Img from 'react-image'
import CircularProgress from '@material-ui/core/CircularProgress';

// import castlePic from '../../static/castle.jpg';
import { PickImage } from '../../static/opportunity_images/image_util.js';
import { createConnectedOpportunity } from '../../actions/connected_opportunity_actions';

import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/CloseSharp';
import SendIcon from '@material-ui/icons/SendSharp';

import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { clearConnectedOpportunityErrors } from '../../actions/error_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  connectedOpportunityErrors: state.errors.connectedOpportunities
});

const mapDispatchToProps = dispatch => ({
  createConnectedOpportunity: (opportunity) => dispatch(createConnectedOpportunity(opportunity)),
  clearConnectedOpportunityErrors: () => dispatch(clearConnectedOpportunityErrors())
});

const styles = theme => ({
  paper: {
    // position: 'absolute',
    margin: 15,
    // height: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  cardModalWrapper:{
    padding: 0,
    // minWidth: 500,
  },
  cover: {
    height: 150,
    width: '100%',
    objectFit: 'cover'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 440,
    overflow: 'scroll'
  },
  content:{
    padding: "20px 50px 50px 50px"
  },
  cardWrapper:{
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 25
  },
  cardSubContent:{
    // fontSize: '1rem',
    // fontWeight: 500
  },
  cardSubHeader:{
    // fontSize: '0.9rem',
    // fontWeight: 700

  },
  actionButton: {
    margin: "10px 0px"
  },
  postButtons: {
    marginBottom: 25
  },
  section: {
    marginBottom: 25
  },
  subContentSection :{
    // minWidth: 175,
    marginRight: 10
  },
  errorHeader:{
    marginBottom: 30
  },
  modalPaper:{
    margin: 15
  },
  cardContent:{
    margin: "25px 0px"
  },
  grid:{
    margin: '70px 0px'
  },
  button:{
    margin: "10px 0px"
  },
  loader:{
    height:150,
    width: "100%",
    background: theme.palette.lightGrey
  },
  badge: {
    top: 19,
    right: 19,
    border: `1px solid`,
    borderRadius: '50%',
    height: 'auto',
    color: theme.palette.white,
    backgroundColor: theme.palette.primary.main,
    padding: 5,
    cursor: 'pointer'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class CardModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      connectBool: true,
      page: 'opportunity'
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleConnection = this.handleConnection.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.getContent = this.getContent.bind(this);
    this.handleConnection = this.handleConnection.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    if((prevProps.page !== this.props.page ||
      prevProps.connectBool !== this.props.connectBool) &&
      (this.state.page !== this.props.page ||
      prevProps.connectBool !== this.props.connectBool)) {
        this.setState({
          page: this.props.page,
          connectBool: this.props.connectBool
        })
      }
  }

  handleClose(field){
    return e => {
      e.preventDefault();

      if(this.props.connectedOpportunityErrors){
        this.props.clearConnectedOpportunityErrors();
      }

      this.setState({ page: 'opportunity' },
        () => {
          this.props.handleClose();
          if(field === 'post'){
            this.props.history.push('/postopportunity');
          }
        }
      );
    }
  };

  handleConnection(){
    return e => {
      e.preventDefault()

      const { connectBool } = this.state;

      if(!this.props.demo){
        let opportunity = {
          opportunityId: this.props.opportunity.id,
          connectBool
        }
        this.props.createConnectedOpportunity(opportunity)
        .then(() => {
          this.setState({
            sent: true,
            page: 'sent',
            connectBool
          })
        });
      }
    }
  }

  handleConfirm(connectBool){
    return e => {
      this.setState({ connectBool, page: 'confirm'})
    }
  }

  getContent(){
    const { classes, opportunity } = this.props;
    const { connectBool, page } = this.state;

    let { title, description, industries, opportunityNeed, geography,
      value, networks, pictureUrl, viewType } = opportunity;

    let connectedOpportunityErrors = this.props.connectedOpportunityErrors.map(error => (
      <ListItem >
        <ListItemText primary={error} />
      </ListItem>
    ));

    let loader = (
      <Grid container justify='center' alignItems='center'
        className={classes.loader}>
        <CircularProgress className={classes.progress} />
      </Grid>
    )

    let picture = pictureUrl ? (
      <Img src={pictureUrl}
        className={classes.cover}
        loader={loader}
        />
    ) : (
      <Img src={PickImage(industries[0])}
        className={classes.cover}
        loader={loader}
        />
    )

    switch(page) {
      case "sent":
        let typeOfSuccess = connectBool ? (
          <Grid container justify='center' alignItems='center'
            className={classes.grid}>
            <Grid item xs={11} sm={10} md={8}
              container justify='flex-start' alignItems='center'>
              <Typography variant="h2" id="modal-title" align='left'
                className={classes.section}>
                Time for business!
              </Typography>
              <Typography variant="body2" id="simple-modal-description"
                className={classes.section} align='left'>
                {`We're as excited about this opportunity as you are! We just sent
                  an email connecting you to the opportunity owner, so that should
                  hit your inbox shortly. We'll let you take it from here.`}
              </Typography>
              <Grid item xs={12} className={classes.postButtons}
                style={{ marginBottom: 25 }}>
                <Button variant="contained" color='secondary'
                  onClick={this.handleClose('find')}
                  className={classes.button}
                  style={{ marginRight: 20}}>
                  View More Opportunities
                </Button>
                <Button variant="contained" color='secondary'
                  onClick={this.handleClose('post')}
                  className={classes.button}>
                  Post An Opportunity
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid container justify='center' alignItems='center'
            className={classes.grid}>
            <Grid item xs={11} sm={10} md={8}
              container justify='flex-start' alignItems='center'>
              <Typography variant="h2" id="modal-title" align='left'
                className={classes.section}>
                Time for business!
              </Typography>
              <Typography variant="body2" id="simple-modal-description"
                className={classes.section} align='left'>
                {`We're as excited about this opportunity as you are!
                  We just sent an email connecting you to the opportunity owner
                  and then you can loop in your trusted contact from there.
                  We'll let you take it from here.`}
              </Typography>
              <Grid item xs={12} className={classes.postButtons}>
                <Button variant="contained" color='secondary'
                  onClick={this.handleClose('find')}
                  className={classes.button}
                  style={{ marginRight: 20}}>
                  View More Opportunities
                </Button>
                <Button variant="contained" color='secondary'
                  onClick={this.handleClose('post')}
                  className={classes.button}>
                  Post An Opportunity
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )

        let responseText = this.props.connectedOpportunityErrors.length === 0 ? (
          typeOfSuccess
        ) : (
          <Grid container justify='center' alignItems='center'
            className={classes.grid}>
            <Grid item xs={11} sm={10} md={8}
              container justify='flex-start' alignItems='center'>
              <Typography variant="h1" id="modal-title" align='left'
                className={classes.errorHeader}>
                Hold on there!
              </Typography>
              <Typography variant="body2" id="simple-modal-description" align='left'>
                Unfortunately, we weren't able to connect you to this opportunity because:
              </Typography>
              <Grid item xs={12}>
                <List>
                  {connectedOpportunityErrors}
                </List>
              </Grid>
              <Grid item xs={12} container justify='flex-start'>
                <Button onClick={() => this.setState({page: 'opportunity'})}
                  color="textPrimary" variant='contained'>
                  Back
                </Button>
                <Button variant="contained"
                  onClick={this.handleClose('find')} color='secondary'
                  style={{ marginLeft: 20}}>
                  Close
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )
        return responseText;
      case "confirm":
        return (
          <Grid container justify="center" alignItems='center'>
            <Grid item xs={10} container justify='flex-start'
              style={{ margin: "40px 0px 25px"}}>
              <Typography variant="h5" gutterBottom align='left'
                color="default" style={{ marginBottom: 20}}>
                {connectBool ?
                  `Connect to this opportunity` :
                  `Refer a trusted contact to this opportunity`}
              </Typography>
              <Typography variant="body1" gutterBottom align='left'
                color="default">
                {connectBool ?
                  `Once you press the send button below you'll receive an
                  email introducing you to the opportunity owner. We'll
                  let you work your magic from there.` :
                  `Once you press the send button below you'll receive an
                  email introducing you to the opportunity owner. We'll
                  let you take it from there and loop in your contact.`
                }
              </Typography>

              <Grid container justify='space-between'
                style={{ margin: "25px 0px"}}>
                <Button onClick={() => this.setState({page: 'opportunity'})}
                  color="textPrimary" variant='contained'>
                  Back
                </Button>
                <Button onClick={this.handleConnection()}
                  variant='contained' color='primary'
                  style={{ marginLeft: 20}}>
                  Send
                  <SendIcon className={classes.rightIcon} />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        );
      default:
        return (
          <Grid container justify="center" alignItems='center'>
            {viewType === 'card' && <Grid item xs={12}>
              {picture}
            </Grid>}
            <Grid item xs={11} sm={10} md={8} className={classes.cardContent}
              container justify='center' spacing={16}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom align='left'
                  color="default">
                  {title}
                </Typography>
                {viewType === 'card' && <Typography variant="body2" gutterBottom align='left'
                  color="default">
                  {description}
                </Typography>}
              </Grid>

              {viewType === 'card' && <Grid container justify='flex-start' spacing={24}>
                <Grid item xs={4}>
                  <Typography variant="h6" gutterBottom align='left'
                    className={classes.cardSubHeader}>
                    Geography
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom align='left'
                    color="default" className={classes.cardSubContent}>
                    {geography.join(", ")}
                  </Typography>
                </Grid>

                <Grid item xs={5}>
                  <Typography variant="h6" gutterBottom align='left'
                    className={classes.cardSubHeader}>
                    Industry
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom align='left'
                    color="default" className={classes.cardSubContent}>
                    {industries.join(", ")}
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography variant="h6" gutterBottom align='left'
                    className={classes.cardSubHeader}>
                    Value
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom align='left'
                    color="default" className={classes.cardSubContent}>
                    {value}
                  </Typography>
                </Grid>
              </Grid>}

              <Grid container justify='flex-start'
                style={{ margin: "10px 0px"}}>
                <Button variant="contained" color='secondary'
                  onClick={this.handleConfirm(true)}
                  className={classes.actionButton}
                  style={{marginRight: 20}}>
                  Connect Me
                </Button>

                <Button variant="contained" color='secondary'
                  onClick={this.handleConfirm(false)}
                  className={classes.actionButton}>
                  Refer A Trusted Contact
                </Button>
              </Grid>

              <Typography variant="body2" align='left'
                color="default" style={{ marginBottom: 30 }}>
                Once you connect or refer above, we'll send you an email introducing
                you to the opportunity owner
              </Typography>
            </Grid>
          </Grid>
        )
    }
  }

  render () {
    const { open, classes, opportunity } = this.props;

    if (!_.isEmpty(opportunity)){
      return (
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onClose={this.handleClose('find')}
          className={classes.cardModalWrapper}
          classes={{ paper: classes.modalPaper}}>
          <Badge
            badgeContent={<CloseIcon onClick={this.handleClose('find')}/>}
            classes={{ badge: classes.badge }}
            style={{ width: '100%'}}
            >
            {this.getContent()}
          </Badge>
        </Dialog>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CardModal)));
