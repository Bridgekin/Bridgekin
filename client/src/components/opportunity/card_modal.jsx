import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
// import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import _ from 'lodash';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// import castlePic from '../../static/castle.jpg';
import { PickImage } from '../../static/opportunity_images/image_util.js';
import { createConnectedOpportunity } from '../../actions/connected_opportunity_actions'

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
    height: 350,
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
    minWidth: 500,
  },
  cover: {
    height: 150,
    width: '100%',
    // objectFit: 'cover'
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
  actionWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 25,
    marginBottom: 25
  },
  actionButton: {
    marginRight: 50
  },
  postButtons: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 25
  },
  section: {
    marginBottom: 25
  },
  subContentSection :{
    minWidth: 175,
    marginRight: 10
  },
  errorHeader:{
    marginBottom: 30
  }
});

class CardModal extends React.Component {
  constructor(props){
    super(props)
    this.state={
      sent: false,
      connectBool: true,
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleConnection = this.handleConnection.bind(this);
  }

  handleClose(field){
    return e => {
      e.preventDefault();

      if(this.props.connectedOpportunityErrors){
        this.props.clearConnectedOpportunityErrors();
      }

      this.setState({ sent: false },
        () => {
          this.props.handleClose();
          if(field === 'post'){
            this.props.history.push('/postopportunity');
          }
        }
      );
    }
  };

  handleConnection(connectBool){
    return e => {
      e.preventDefault()

      if(!this.props.demo){
        let opportunity = {
          opportunityId: this.props.opportunity.id,
          connectBool
        }
        this.props.createConnectedOpportunity(opportunity)
        .then(() => {
          this.setState({
            sent: true,
            connectBool
          })
        });
      }
    }
  }

  render () {
    const { open, classes, opportunity, connectedOpportunityErrors } = this.props;
    const { sent, connectBool } = this.state;

    if (!_.isEmpty(opportunity)){
      let { title, description, industries, opportunityNeed, geography,
        value, networks, pictureUrl } = opportunity;

      let connectedOpportunityErrors = this.props.connectedOpportunityErrors.map(error => (
        <ListItem >
          <ListItemText primary={error} />
        </ListItem>
      ));

      let typeOfSuccess = connectBool ? (
        <div className={classes.paper}>
          <Typography variant="h2" id="modal-title"
            className={classes.section}>
            Time for business!
          </Typography>
          <Typography variant="body1" id="simple-modal-description"
            className={classes.section}>
            {`We're as excited about this opportunity as you are! We just sent
            an email connecting you to the opportunity owner, so that should
            hit your inbox shortly. We'll let you take it from here.`}
          </Typography>
          <div className={classes.postButtons}>
            <Button variant="contained" color='secondary'
              onClick={this.handleClose('find')}>
              View More Opportunities
            </Button>
            <Button variant="contained" color='secondary'
              onClick={this.handleClose('post')}>
              Post An Opportunity
            </Button>
          </div>
        </div>
      ) : (
        <div className={classes.paper}>
          <Typography variant="h2" id="modal-title"
            className={classes.section}>
            Time for business!
          </Typography>
          <Typography variant="body1" id="simple-modal-description"
            className={classes.section}>
            {`We're as excited about this opportunity as you are!
              We just sent an email connecting you to the opportunity owner
              and then you can loop in your trusted contact from there.
              We'll let you take it from here.`}
          </Typography>
          <div className={classes.postButtons}>
            <Button variant="contained" color='secondary'
              onClick={this.handleClose('find')}>
              View More Opportunities
            </Button>
            <Button variant="contained" color='secondary'
              onClick={this.handleClose('post')}>
              Post An Opportunity
            </Button>
          </div>
        </div>
      )

      let responseText = this.props.connectedOpportunityErrors.length === 0 ? (
        typeOfSuccess
      ) : (
        <div className={classes.paper}>
          <Typography variant="h1" id="modal-title"
            className={classes.errorHeader}>
            Hold on there!
          </Typography>
          <Typography variant="body1" id="simple-modal-description">
            Apologies, but we weren't able to connect you to this opportunity because:
          </Typography>
          <List>
            {connectedOpportunityErrors}
          </List>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose('find')} color='secondary'>
            Close
          </Button>
        </div>
      )

      let picture = pictureUrl ? pictureUrl : (PickImage(industries[0]))

      let modalContent = !sent ? (
        <Card className={classes.card}>
          <CardMedia
            className={classes.cover}
            image={picture}
            title="OpportunityImage"
            />
          <CardContent className={classes.content}>
            <Typography variant="h5" gutterBottom align='left'
              color="default">
              {title}
            </Typography>
            <Typography variant="body2" gutterBottom align='left'
              color="default">
              {description}
            </Typography>

            <div className={classes.cardWrapper}>
              <div className={classes.subContentSection}>
                <Typography variant="h6" gutterBottom align='left'
                  className={classes.cardSubHeader}>
                  Geography
                </Typography>
                <Typography variant="subtitle1" gutterBottom align='left'
                  color="default" className={classes.cardSubContent}>
                  {geography.join(", ")}
                </Typography>
              </div>

              <div className={classes.subContentSection}>
                <Typography variant="h6" gutterBottom align='left'
                  className={classes.cardSubHeader}>
                  Industry
                </Typography>
                <Typography variant="subtitle1" gutterBottom align='left'
                  color="default" className={classes.cardSubContent}>
                  {industries.join(", ")}
                </Typography>
              </div>

              <div>
                <Typography variant="h6" gutterBottom align='left'
                  className={classes.cardSubHeader}>
                  Value
                </Typography>
                <Typography variant="subtitle1" gutterBottom align='left'
                  color="default" className={classes.cardSubContent}>
                  {value}
                </Typography>
              </div>
            </div>

            <div className={classes.actionWrapper}>
              <Button variant="contained" color='secondary'
                className={classes.actionButton}
                onClick={this.handleConnection(true)}>
                Connect Me
              </Button>

              <Button variant="contained" color='secondary'
                className={classes.actionButton}
                onClick={this.handleConnection(false)}>
                Refer A Trusted Contact
              </Button>
            </div>

            <Typography variant="body2" align='left'
              color="default" style={{ marginBottom: 40 }}>
              Once you connect or refer above, we'll send you an email introducing
              you to the opportunity owner
            </Typography>
          </CardContent>
        </Card>
      ) : responseText

      // autoDetectWindowHeight={true}
      // autoScrollBodyContent={true}
      // repositionOnUpdate={true}
      // contentStyle={{
      //   width:'90%',
      //   height: '90%'
      // }}>

      return (
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onClose={this.handleClose('find')}
          className={classes.cardModalWrapper}>
          {modalContent}
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
