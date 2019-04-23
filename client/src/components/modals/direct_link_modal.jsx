import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/PersonSharp';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/CloseSharp';

import { closeDirectLink } from '../../actions/modal_actions';
import { clearDirectLinkErrors } from '../../actions/error_actions';

import copy from 'copy-to-clipboard';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  directLinkErrors: state.errors.directLink,
  directLinkModal: state.modals.directLink,
  directLink: state.entities.directLink
});

const mapDispatchToProps = dispatch => ({
  closeDirectLink: () => dispatch(closeDirectLink()),
  clearDirectLinkErrors: () => dispatch(clearDirectLinkErrors()),
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  cardModalWrapper:{ padding: 0 },
  grid:{
    margin: 70
  },
  modalPaper:{
    margin: 15,
    backgroundColor: theme.palette.base3
  },
  badge: {
    top: 19,
    right: 19,
    border: `1px solid`,
    borderRadius: '50%',
    height: 'auto',
    color: theme.palette.base3,
    backgroundColor: theme.palette.text.primary,
    padding: 5,
    cursor: 'pointer'
  },
  listText:{ color: theme.palette.text.primary},
  pic: { width: 135, height: 135},
  thanksHeader: {
    marginBottom: 20
  },
  closeBar:{
    backgroundColor: theme.palette.base4,
    height: 33,
    padding: "0px 10px",
    [theme.breakpoints.up('sm')]: {
      minWidth: 400,
    }
  },
})

class DirectLinkModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      copied:false
    }

    // this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    // this.handleSendInvite = this.handleSendInvite.bind(this);
  }

  handleCopy(link){
    return () => {
      copy(link);
      this.setState({ copied: true })
    }
  }

  handleClose(e){
    e.stopPropagation();
    if(this.props.directLinkErrors){
      this.props.clearDirectLinkErrors();
    }
    this.props.closeDirectLink();
    this.setState({ copied: false })
  };

  render(){
    const { classes, directLinkModal, users,
      directLinkErrors, directLink } = this.props;
    const { copied } = this.state;

    if(directLinkModal.open){
      let directLinkErrorsList = this.props.directLinkErrors.map(error => (
        <ListItem >
          <ListItemText primary={error}
            classes={{ primary: classes.listText }}/>
        </ListItem>
      ));

      let link = directLink.linkCode ?
      (`${window.location.origin}/shareopportunities/${directLink.linkCode}`) : ('')

      let submit = (
        <Grid container justify='center' alignItems='center'
          direction='column'
          className={classes.submitContainer}>
          <Button variant='contained'
            color={copied ? 'default' : 'primary'}
            onClick={this.handleCopy(link)}
            classes={{ root: classes.actionButton}}>
            {copied ? `Copied` : `Copy`}
          </Button>
          <Button variant='contained'
            onClick={this.handleClose}
            classes={{ root: classes.actionButton}}
            style={{ marginRight: 10 }}>
            {`Close`}
          </Button>
        </Grid>
      )

      let showLink = (
        <Grid container justify='center'
          style={{ padding: "20px 0px"}}>
          <Grid item xs={10} container justify='flex-end'>
            <CloseIcon onClick={this.handleClose}
              style={{ color: 'grey', pointer: 'cursor'}}/>
          </Grid>
          <Grid item xs={10} container direction='column'>
            <Typography variant="body1" align='center'
              color="textPrimary" gutterBottom
              style={{ fontSize: 20, fontWeight: 600}}>
              {`Direct Link`}
            </Typography>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={10}>
              <TextField
                fullWidth
                multiline
                label="Direct Link"
                value={link}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                />
            </Grid>
          </Grid>
          <Grid container justify='center'
            style={{ marginBottom: 10}}>
            <Button variant='contained'
              color={copied ? 'default' : 'primary'}
              onClick={this.handleCopy(link)}
              className={classes.button}>
              {copied ? `Copied` : `Copy`}
            </Button>
          </Grid>
          <Grid container justify='center'>
            <Button variant='contained'
              onClick={this.handleClose}
              className={classes.button}>
              {`Close`}
            </Button>
          </Grid>
        </Grid>
      )

      let modalContent = directLinkErrors.length === 0 ? showLink : (
        <Grid container justify='center' alignItems='center'
          style={{ padding: "20px 0px"}}>
          <Grid item xs={10} container justify='flex-end'>
            <CloseIcon onClick={this.handleClose}
              style={{ color: 'grey', pointer: 'cursor'}}/>
          </Grid>
          <Grid item xs={10} container direction='column'>
            <Typography variant="body1" align='center'
              color="textPrimary" gutterBottom
              style={{ fontSize: 20, fontWeight: 600}}>
              {`You're almost there!`}
            </Typography>
            <Typography variant="body1" align='left'
              color="textSecondary" gutterBottom
              style={{ fontSize: 14, margin: 10, maxWidth: 350 }}>
              {`It looks like we were unable to send your directLink
                request because:`}
            </Typography>
            <Grid container justify='flex-end'>
              <Grid item xs={11}>
                <List>
                  {directLinkErrorsList}
                </List>
              </Grid>
            </Grid>
            <Grid container justify='center'>
              <Button variant="contained" color='primary'
                onClick={this.handleClose}
                className={classes.button}
                style={{ textTransform: 'capitalize'}}>
                {`Close`}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )

      return (
        <Dialog
          open={directLinkModal.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onClose={this.handleClose}
          className={classes.cardModalWrapper}
          classes={{ paper: classes.modalPaper}}>
          {modalContent}
        </Dialog>
      )
    } else {
      return <div></div>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DirectLinkModal));
