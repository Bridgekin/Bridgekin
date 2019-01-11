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
// import castlePic from '../../static/castle.jpg';
import { PickImage } from '../../static/opportunity_images/image_util.js';
import { createConnectedOpportunity } from '../../actions/connected_opportunity_actions'

import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
// import { clearWaitlistUserErrors } from '../actions/error_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  // waitlistErrors: state.errors.waitlistUsers
});

const mapDispatchToProps = dispatch => ({
  createConnectedOpportunity: (opportunity) => dispatch(createConnectedOpportunity(opportunity))
});

const styles = theme => ({
  paper: {
    position: 'absolute',
    // height: 350,
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
    width: '40%',
    top: '10%',
    left: '30%'
  },
  cover: {
    height: 150,
    width: '100%'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  content:{
    padding: 35
  },
  cardWrapper:{
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 40
  },
  cardSubContent:{
    fontSize: '1rem',
    fontWeight: 500
  },
  cardSubHeader:{
    // fontSize: '0.9rem',
    fontWeight: 700
  },
  actionWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 25,
    marginBottom: 25
  },
  actionButton: {
    margin: '0px 10px 0px 10px'
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
    width: '30%'
  }
});

class CardModal extends React.Component {
  constructor(props){
    super(props)
    this.state={
      sent: false
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleConnection = this.handleConnection.bind(this);
  }

  handleClose(field){
    return e => {
      e.preventDefault();

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
        .then(() => this.setState({sent: true}));
      }
    }
  }

  render () {
    const { open, classes, opportunity } = this.props;
    const { sent } = this.state;

    if (!_.isEmpty(opportunity)){
      let { title, description, industries, opportunityNeed, geography,
        value, networks } = opportunity;

      let modalContent = !sent ? (
        <Card className={classes.card}>
          <CardMedia
            className={classes.cover}
            image={PickImage(industries[0])}
            title="OpportunityImage"
          />
          <CardContent className={classes.content}>
            <Typography variant="h5" gutterBottom align='center'
              color="default">
              {title}
            </Typography>
            <Typography variant="body2" gutterBottom align='center'
              color="default">
              {description}
            </Typography>

            <div className={classes.cardWrapper}>
              <div className={classes.subContentSection}>
                <Typography variant="h6" gutterBottom align='center'
                  color="secondary" className={classes.cardSubHeader}>
                  Geography
                </Typography>
                <Typography variant="h6" gutterBottom align='center'
                  color="default" className={classes.cardSubContent}>
                  {geography.join(", ")}
                </Typography>
              </div>

              <div className={classes.subContentSection}>
                <Typography variant="h6" gutterBottom align='center'
                  color="secondary" className={classes.cardSubHeader}>
                  Industry
                </Typography>
                <Typography variant="h6" gutterBottom align='center'
                  color="default" className={classes.cardSubContent}>
                  {industries.join(", ")}
                </Typography>
              </div>

              <div>
                <Typography variant="h6" gutterBottom align='center'
                  color="secondary" className={classes.cardSubHeader}>
                  Value
                </Typography>
                <Typography variant="h6" gutterBottom align='center'
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
              color="default">
              Once you connect or refer above, we'll send you an email introducing
              you to the opportunity owner
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <div className={classes.paper}>
          <Typography variant="h4" id="modal-title" color='secondary'
            className={classes.section}>
            Time for business!
          </Typography>
          <Typography variant="subtitle1" id="simple-modal-description"
            className={classes.section}>
            {"We're as excited about this opportunity as you are! We just sent "+
            "an email connecting you to the opportunity owner, so that should " +
            "hit your inbox shortly. We'll let you take it from here."}
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

      return (
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onClose={this.handleClose('find')}
          className={classes.cardModalWrapper}
          scroll="body">
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
