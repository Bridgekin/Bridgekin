import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import castlePic from '../../static/castle.jpg';

import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
// import { clearWaitlistUserErrors } from '../actions/error_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  // waitlistErrors: state.errors.waitlistUsers
});

const mapDispatchToProps = dispatch => ({
  // clearWaitlistUserErrors: () => dispatch(clearWaitlistUserErrors())
});

const styles = theme => ({
  paper: {
    position: 'absolute',
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
    width: '40%',
    top: '15%',
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
    fontSize: 16,
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
  }
});

class CardModal extends React.Component {
  constructor(props){
    super(props)
    this.state={
      sent: false
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleConnectMe = this.handleConnectMe.bind(this);
    this.handleConnectFriend = this.handleConnectFriend.bind(this);
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
    // if(this.props.waitlistErrors){
    //   this.props.clearWaitlistUserErrors();
    // }
  };

  handleConnectMe(e){
    e.preventDefault()

    if(!this.props.demo){
      this.setState({sent: true})
    }
  }

  handleConnectFriend(e){
    e.preventDefault()

    if(!this.props.demo){
      this.setState({sent: true})
    }
  }

  render () {
    const { open, classes, opportunity } = this.props;
    const { sent } = this.state;
    const { title, description, industry, need, geography,
      value, networks } = opportunity;

    let modalContent = !sent ? (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={castlePic}
          title="CastlePicture"
        />
        <CardContent className={classes.content}>
          <Typography variant="h5" gutterBottom align='center'
            color="default">
            {title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom align='center'
            color="default">
            {description}
          </Typography>

          <div className={classes.cardWrapper}>
            <div>
              <Typography variant="h2" gutterBottom align='center'
                color="secondary" className={classes.cardSubContent}>
                Geography
              </Typography>
              <Typography variant="h2" gutterBottom align='center'
                color="default" className={classes.cardSubContent}>
                {geography}
              </Typography>
            </div>

            <div>
              <Typography variant="h2" gutterBottom align='center'
                color="secondary" className={classes.cardSubContent}>
                Industry
              </Typography>
              <Typography variant="h2" gutterBottom align='center'
                color="default" className={classes.cardSubContent}>
                {industry}
              </Typography>
            </div>

            <div>
              <Typography variant="h2" gutterBottom align='center'
                color="secondary" className={classes.cardSubContent}>
                Value
              </Typography>
              <Typography variant="h2" gutterBottom align='center'
                color="default" className={classes.cardSubContent}>
                {value}
              </Typography>
            </div>
          </div>

          <div className={classes.actionWrapper}>
            <Button variant="contained" color='secondary'
              className={classes.actionButton}
              onClick={this.handleConnectMe}>
              Connect Me
            </Button>

            <Button variant="contained" color='secondary'
              className={classes.actionButton}
              onClick={this.handleConnectFriend}>
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
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        disableAutoFocus={true}
        onClose={this.handleClose('find')}
        className={classes.cardModalWrapper}>

        {modalContent}
      </Modal>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CardModal)));
