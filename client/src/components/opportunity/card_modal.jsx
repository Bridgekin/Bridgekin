import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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
    width: '40%',
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
    alignItems: 'center',
    paddingBottom: 50
  },
  content:{
    padding: 25
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
  }
});

class CardModal extends React.Component {
  constructor(props){
    super(props)

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(e){
    e.preventDefault();
    // if(this.props.waitlistErrors){
    //   this.props.clearWaitlistUserErrors();
    // }
    this.props.handleClose();
  };

  render () {
    const { open, classes } = this.props;

    // let cardErrors = this.props.waitlistErrors.map(error => {
    //   error = error.replace(/(Fname|Lname)/g, (ex) => {
    //     return ex === 'Fname' ? 'First name' : 'Last name';
    //   });
    //   return (
    //     <ListItem >
    //       <ListItemText primary={error} />
    //     </ListItem>
    //   )
    // })

    // debugger

    // let modalText = this.props.waitlistErrors.length === 0 ? (
    //   <div style={{top:'25%', left: '30%'}} className={classes.paper}>
    //     <Typography variant="h4" id="modal-title" color='secondary' className={classes.thanksHeader}>
    //       Thanks for signing up!
    //     </Typography>
    //     <Typography variant="subtitle1" id="simple-modal-description">
    //       Today, Bridgekin is invite-only. However, you'll be the first to know when we begin accepting new users!
    //     </Typography>
    //     <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
    //       onClick={this.handleClose} color='secondary'>
    //       Close
    //     </Button>
    //   </div>
    // ) : (
    //   <div style={{top:'25%', left: '30%'}} className={classes.paper}>
    //     <Typography variant="h4" id="modal-title" color='secondary' className={classes.thanksHeader}>
    //       Thanks for your interest in Bridgekin!
    //     </Typography>
    //     <Typography variant="subtitle1" id="simple-modal-description">
    //       Apologies, but we weren't able to sign you up because:
    //     </Typography>
    //     <List>
    //     </List>
    //     <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
    //       onClick={this.handleClose} color='secondary'>
    //       Close
    //     </Button>
    //   </div>
    // )

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        disableAutoFocus={true}
        onClose={this.handleClose}
        className={classes.cardModalWrapper}>

        <Card className={classes.card}>
          <CardMedia
            className={classes.cover}
            image={castlePic}
            title="CastlePicture"
          />
          <CardContent className={classes.content}>
            <Typography variant="h5" gutterBottom align='center'
              color="default">
              Tuscan Castle surrounded by 30+ acres of vineyards and olive
              groves seekings buyer
            </Typography>
            <Typography variant="subtitle1" gutterBottom align='center'
              color="default">
              Historically refurbished 33,000 sq ft castle in the heart
              of the Tuscan countryside. Off the market property considered
              the Crown of Ireland!
            </Typography>

            <div className={classes.cardWrapper}>
              <div>
                <Typography variant="h2" gutterBottom align='center'
                  color="secondary" className={classes.cardSubContent}>
                  Geography
                </Typography>
                <Typography variant="h2" gutterBottom align='center'
                  color="default" className={classes.cardSubContent}>
                  Italy
                </Typography>
              </div>

              <div>
                <Typography variant="h2" gutterBottom align='center'
                  color="secondary" className={classes.cardSubContent}>
                  Industry
                </Typography>
                <Typography variant="h2" gutterBottom align='center'
                  color="default" className={classes.cardSubContent}>
                  Real Estate & Housing
                </Typography>
              </div>

              <div>
                <Typography variant="h2" gutterBottom align='center'
                  color="secondary" className={classes.cardSubContent}>
                  Value
                </Typography>
                <Typography variant="h2" gutterBottom align='center'
                  color="default" className={classes.cardSubContent}>
                  Over 25M
                </Typography>
              </div>
            </div>

            <div className={classes.actionWrapper}>
              <Button variant="contained" color='secondary'
                className={classes.actionButton}>
                Connect Me
              </Button>

              <Button variant="contained" color='secondary'
                className={classes.actionButton}>
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
      </Modal>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CardModal));
