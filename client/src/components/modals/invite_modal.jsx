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

import { createConnection } from '../../actions/connection_actions';
import { closeInvite } from '../../actions/modal_actions';
import { clearConnectionErrors } from '../../actions/error_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  users: state.users,
  connectionErrors: state.errors.connection,
  inviteModal: state.modals.invite
});

const mapDispatchToProps = dispatch => ({
  closeInvite: () => dispatch(closeInvite()),
  clearConnectionErrors: () => dispatch(clearConnectionErrors()),
  createConnection: connection => dispatch(createConnection(connection))
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
  }
})

class InviteModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      loading: false,
      responsePage: false
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSendInvite = this.handleSendInvite.bind(this);
  }

  // shouldComponentUpdate(){
  //   const { inviteModal } = this.props;
  //
  //
  //   return true
  // }

  handleClose(e){
    e.stopPropagation();
    if(this.props.connectionErrors){
      this.props.clearConnectionErrors();
    }
    this.setState({ email: '', responsePage: false},
    () => this.props.closeInvite());
  };

  handleSendInvite(e){
    const { users, inviteModal } = this.props;
    const { email } = this.state;
    let user = users[inviteModal.userId];

    this.setState({ loading: true },
    () => {
      this.props.createConnection({
        friendId: user.id,
        email
      })
      .then(() => this.setState({
        loading: false, responsePage: true}))
    })
  }

  handleEmailChange(e){
    this.setState({ email: e.target.value})
  }

  capitalize(str){
    let strArray = str.split(' ');
    for (let i = 0; i < strArray.length; i++) {
      strArray[i] = strArray[i][0].toUpperCase() + strArray[i].slice(1)
    }
    return strArray.join(' ')
  }


  render(){
    const { classes, inviteModal, users,
      connectionErrors } = this.props;
    const { loading, email, responsePage } = this.state;

    if(inviteModal.open){
      let user = users[inviteModal.userId];

      let connectionErrorsList = this.props.connectionErrors.map(error => (
        <ListItem >
          <ListItemText primary={error}
            classes={{ primary: classes.listText }}/>
        </ListItem>
      ));

      let profilePic = user.profilePicUrl ? (
        <Avatar
          className={classes.pic}
          src={user.profilePicUrl}
          alt="Account Profile Picture"
          onClick={()=> this.props.history.push('/account/settings/general')}
          />
      ) : (
        <PersonIcon
          className={classes.pic}
          onClick={()=> this.props.history.push('/account/settings/general')}/>
      )

      let invitePage = (
        <Grid container justify='center' alignItems='center'
          style={{ padding: '46px 30px'}} spacing={16}>
          <Grid item sm={3} container justify='center'
            alignItems='flex-start'
            style={{ marginBottom: "10%"}}>
            {profilePic}
          </Grid>

          <Grid item sm={9}>
            <Typography variant="h3" gutterBottom
              color="textPrimary" align='left'
              style={{ fontSize: 25, fontWeight: 600, textTransform: 'capitalize'}}>
              {`${user.fname} ${user.lname}`}
            </Typography>
            <Typography variant="body1" align='left' color="textPrimary"
              noWrap
              style={{ fontSize: 25, fontWeight: 600, textTransform: 'capitalize'}}>
              {user.title && `${user.title} @ `}
              {user.company && `${user.company}`}
            </Typography>
            <Typography variant="body1" gutterBottom
              color="textPrimary" align='left'
              style={{ fontSize: 18 }}>
              {`If John is a trusted contact of yours, enter their email  below to send them a connection request.`}
            </Typography>
            <TextField
              fullWidth
              label='Email'
              className={classes.textField}
              value={email}
              onChange={this.handleEmailChange}
              margin="normal"
              />
            <Grid container justify='flex-end'>
              <Button variant='contained' color='primary'
                disabled={loading}
                onClick={this.handleSendInvite}>
                Invite Now
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )

      let response = connectionErrors.length === 0 ? (
        <Grid item xs={11} sm={10} md={8} className={classes.grid}
          container justify='flex-start'>
          <Typography variant="h2" id="modal-title" color='textPrimary'
            className={classes.thanksHeader} align='left'>
            {`Awesome - You've sent ${this.capitalize(user.fname)} a connection request!`}
          </Typography>
          <Typography variant="body1" id="simple-modal-description"
            align='left' color='textPrimary'>
            {`You can check your current, sent, and received friend requests in the "My Trusted Network" tab`}
          </Typography>
          <Grid item xs={12}>
            <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
              onClick={this.handleClose} color='primary'>
              Close
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={11} sm={10} md={8} className={classes.grid}
          container justify='flex-start'>
          <Typography variant="h2" id="modal-title" color='textPrimary'
            className={classes.thanksHeader} align='left'>
            You're almost there!
          </Typography>
          <Typography variant="body1" id="simple-modal-description"
            align='left' color='textPrimary'>
            It looks like we were unable to send your connection request because:
          </Typography>
          <List>
            {connectionErrorsList}
          </List>
          <Grid item xs={12}>
            <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
              onClick={this.handleClose} color='primary'>
              Close
            </Button>
          </Grid>
        </Grid>
      )

      let modalContent = responsePage ? response : invitePage

      return (
        <Dialog
          open={inviteModal.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onClose={this.handleClose}
          className={classes.cardModalWrapper}
          classes={{ paper: classes.modalPaper}}>
          <Badge
            badgeContent={<CloseIcon onClick={this.handleClose}/>}
            classes={{ badge: classes.badge }}
            style={{ width: '100%'}}
            >
            {modalContent}
          </Badge>
        </Dialog>
      )
    } else {
      return <div></div>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InviteModal));
