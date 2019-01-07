import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

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
  thanksHeader:{
    marginBottom: 30
  },
  actionButton: {
    margin: '0px 10px 0px 10px'
  },
  actionWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 25,
    marginBottom: 25
  },
});

class SubmitModal extends React.Component {
  constructor(props){
    super(props)

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(field){
    if(this.props.waitlistErrors){
      this.props.clearOpportunityErrors();
    }
    return () => {
      this.props.handleClose();
      if (field === 'post'){
        this.props.handleReset();
      } else {
        this.props.history.push('/findandconnect')
      }
    }
  };

  render () {
    const { open, classes } = this.props;

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

    let modalText = this.props.opportunityErrors.length === 0 ? (
      <div style={{top:'25%', left: '30%'}} className={classes.paper}>
        <Typography variant="h4" id="modal-title" color='secondary' className={classes.thanksHeader}>
          Thanks For Posting!
        </Typography>
        <Typography variant="subtitle1" id="simple-modal-description">
          Thanks for sharing your opportunity! Our team is doing a quick review
          and your post will go live within 24 hours.
        </Typography>

        <div className={classes.actionWrapper}>
          <Button variant="contained" color='secondary'
            className={classes.actionButton}
            onClick={this.handleClose('post')}>
            Post Another Opportunity
          </Button>

          <Button variant="contained" color='secondary'
            className={classes.actionButton}
            onClick={this.handleClose('find')}>
            View Opportunities
          </Button>
        </div>
      </div>
      ) : (
        <div style={{top:'25%', left: '30%'}} className={classes.paper}>
          <Typography variant="h4" id="modal-title" color='secondary' className={classes.thanksHeader}>
            You're almost there!
          </Typography>
          <Typography variant="subtitle1" id="simple-modal-description">
            You've got a few pieces to correct before submitting your opportunity, listed below:
          </Typography>
          <List>
            {opportunityErrors}
          </List>
          <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
            onClick={this.handleClose} color='secondary'>
            Close
          </Button>
        </div>
      )

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        disableAutoFocus={true}
        onClose={this.handleClose('find')}>
        {modalText}
      </Modal>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SubmitModal)));
