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

import { clearConnectionErrors } from '../../actions/error_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  users: state.users,
  connectionErrors: state.errors.connection
});

const mapDispatchToProps = dispatch => ({
  clearConnectionErrors: () => dispatch(clearConnectionErrors())
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  cardModalWrapper:{ padding: 0 },
  grid:{
    margin: '70px 0px 70px 0px'
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
  pic: { width: 135, height: 135}
})

class InviteModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: ''
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(e){
    e.stopPropagation();
    if(this.props.waitlistErrors){
      this.props.clearConnectionErrors();
    }
    this.props.handleClose();
  };

  handleSendInvite(){
  }

  handleEmailChange(e){
    this.setState({ email: e.target.value})
  }

  render(){
    const { classes, userId, open, users } = this.props;
    let user = users[userId];

    let connectionErrors = this.props.connectionErrors.map(error => (
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

    // let invite = (
    //
    // )

    let modalContent = (
      <Grid container justify='center' alignItems='center'
        style={{ padding: '46px 30px'}} spacing={16}>
        <Grid item sm={3} container justify='center' alignItems='flex-start'>
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
            value={this.state.name}
            onChange={this.handleEmailChange}
            margin="normal"
          />
          <Grid container justify='flex-end'>
            <Button variant='contained' color='primary'>
              Invite Now
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )

    return (
      <Dialog
        open={open}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InviteModal));
