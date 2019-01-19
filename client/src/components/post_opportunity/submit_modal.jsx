import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { clearOpportunityErrors } from '../../actions/error_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  opportunityErrors: state.errors.opportunities
});

const mapDispatchToProps = dispatch => ({
  clearOpportunityErrors: () => dispatch(clearOpportunityErrors())
});

const styles = theme => ({
  grid:{
    margin: '70px 0px 70px 0px'
  },
  thanksHeader:{
    marginBottom: 30,
    color: theme.palette.darkGrey
  },
  actionButton: {
    margin: '0px 10px 0px 10px'
  },
  actionWrapper: {
    // display: 'flex',
    // justifyContent: 'flex-start',
    // width: '100%',
    marginTop: 25,
    marginBottom: 25
  },
  modalWrapper:{
    padding: 0,
    // minWidth: 500,
  },
  modalPaper:{
    margin: 15
  }
});

class SubmitModal extends React.Component {
  constructor(props){
    super(props)

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(field){
    return () => {
      if(this.props.opportunityErrors){
        this.props.clearOpportunityErrors();
      }

      this.props.handleClose();
      if (field === 'post' && this.props.modalType === 'create'){
        this.props.handleReset();
      } else if (field === 'post' && this.props.modalType !== 'create'){
        this.props.history.push('/postopportunity')
      } else if (field === 'find'){
        this.props.history.push('/findandconnect')
      }
    }
  };

  render () {
    const { open, classes, modalType } = this.props;

    let opportunityErrors = this.props.opportunityErrors.map(error => {
      error = error.replace(/(Fname|Lname)/g, (ex) => {
        return ex === 'Fname' ? 'First name' : 'Last name';
      });
      return (
        <ListItem >
          <ListItemText primary={error} />
        </ListItem>
      )
    })

    let successText = modalType === 'create' ? (
      <Grid className={classes.grid}
        container justify='center'>
        <Grid item xs={11} sm={10} md={8} container justify='center'
          spacing={16}>
          <Typography variant="h2" id="modal-title" color='secondary' className={classes.thanksHeader}>
            Thanks For Posting!
          </Typography>
          <Typography variant="body1" id="simple-modal-description">
            {`Thanks for sharing your opportunity! Our team is doing a quick review
              and your post will go live within 24 hours.`}
          </Typography>

        <Grid item xs={10} md={6} className={classes.actionWrapper}>
          <Button variant="contained" color='secondary'
            className={classes.actionButton}
            onClick={this.handleClose('post')}>
            Post An Opportunity
          </Button>
        </Grid>

        <Grid item xs={10} md={6} className={classes.actionWrapper}>
          <Button variant="contained" color='secondary'
            className={classes.actionButton}
            onClick={this.handleClose('find')}>
            View Opportunities
          </Button>
        </Grid>
      </Grid>
    </Grid>
    ) : (
      <Grid className={classes.grid}
        container justify='center'>
        <Grid item xs={11} sm={10} md={8} container justify='center'
          spacing={16}>

          <Typography variant="h2" id="modal-title" color='secondary' className={classes.thanksHeader}>
            Thanks For Updating Your Opportunity
          </Typography>
          <Typography variant="body1" id="simple-modal-description">
            {`You've successfully updated your opportunity, you can visit
              your account page to see it live!`}
          </Typography>

          <Grid item xs={10} md={6} className={classes.actionWrapper}>
            <Button variant="contained" color='secondary'
              className={classes.actionButton}
              onClick={this.handleClose('post')}>
              Post An Opportunity
            </Button>
          </Grid>

          <Grid item xs={10} md={6} className={classes.actionWrapper}>
            <Button variant="contained" color='secondary'
              className={classes.actionButton}
              onClick={this.handleClose('find')}>
              View Opportunities
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )

    let modalText = this.props.opportunityErrors.length === 0 ? (
        successText
      ) : (
        <Grid className={classes.grid}
          container justify='center'>
          <Grid item xs={11} sm={10} md={8} container justify='center'
            spacing={16}>
            <Typography variant="h2" id="modal-title" color='secondary' className={classes.thanksHeader}>
              You're almost there!
            </Typography>
            <Typography variant="body1" id="simple-modal-description">
              You've got a few pieces to correct before submitting your opportunity, listed below:
            </Typography>
            <List>
              {opportunityErrors}
            </List>
            <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
              onClick={this.handleClose('')} color='secondary'>
              Close
            </Button>
          </Grid>
        </Grid>
      )

    return (
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={this.props.opportunityErrors.length === 0 ?
          (this.handleClose('find')) : (this.handleClose(''))}
        className={classes.cardModalWrapper}
        classes={{ paper: classes.modalPaper}}>
        <Grid container justify='center' alignItems='center'>
          {modalText}
        </Grid>
      </Dialog>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SubmitModal)));
