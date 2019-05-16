import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/CloseSharp';

import Capitalize from 'capitalize';

import { closeExternalInvite } from '../../actions/modal_actions';
import { addExternalUser } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  externalInviteModal: state.modals.externalInvite,
  userErrors: state.errors.users,
});

const mapDispatchToProps = dispatch => ({
  closeExternalInvite: () => dispatch(closeExternalInvite()),
  addExternalUser: (user) => dispatch(addExternalUser(user))
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
  listText:{
    color: theme.palette.text.secondary,
    fontWeight: 400
  },
  pic: { width: 100, height: 100},
  thanksHeader: {
    marginBottom: 20
  },
  textField: {
    margin: "10px 0px"
  }
})

class ExternalInvite extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      fname: '',
      loading: false,
      responsePage: false
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSendInvite = this.handleSendInvite.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    // const { nextProps } = this.props;
    const nextModal = nextProps.externalInviteModal;
    const currentModal = this.props.externalInviteModal;
    if(nextModal.open && currentModal.open !== nextModal.open){
      this.setState({ email: nextModal.email })
    }
    return true;
  }

  handleChange(field){
    return e => {
      this.setState({ [field]: e.target.value })
    }
  }

  handleSendInvite(e){
    e.stopPropagation();
    const { email, fname, loading } = this.state;
    this.setState({ loading: true },
    () => {
      this.props.addExternalUser({ email, fname })
      .then(() => this.setState({ loading: false, responsePage: true }))
    })
  }

  handleClose(e){
    e.stopPropagation();
    this.setState({ email: '', fname: '', responsePage: false},
    () => this.props.closeExternalInvite());
  };

  render(){
    const { classes, externalInviteModal, userErrors } = this.props;
    const { email, fname, loading, responsePage } = this.state;

    if(externalInviteModal.open){

      let userErrorsList = userErrors.map(error => (
        <ListItem >
          <ListItemText primary={error}
            classes={{ primary: classes.listText }}/>
        </ListItem>
      ));

      let externalInvitePage = (
        <Grid container justify='center' alignItems='center'
          style={{ padding: "10px 0px 20px", maxWidth: 350}}>
          <Grid item xs={10} container justify='flex-end'>
            <CloseIcon onClick={this.handleClose}
              style={{ color: 'grey', pointer: 'cursor'}}/>
          </Grid>
          <Grid container item xs={10} justify='center'>
            <Typography gutterBottom fullWidth
              color='textSecondary' align='center'
              style={{ fontSize: 17, fontWeight: 600}}>
              {`Invite your trusted contact to join`}
            </Typography>
            <Typography gutterBottom fullWidth
              color='textSecondary' align='center'
              style={{ fontSize: 12}}>
              {`While, today, Bridgekin is a private, invite-only community,
                you can invite your trusted contact through this portal`}
            </Typography>
            <TextField
              fullWidth
              label='First Name'
              className={classes.textField}
              value={fname}
              onChange={this.handleChange('fname')}
              />
            <TextField
              fullWidth
              label='Email'
              className={classes.textField}
              value={email}
              onChange={this.handleChange('email')}
              />
          </Grid>


          <Grid container item xs={10}
            direction='column' alignItems='center'>
            <Button variant='contained' color='primary'
              disabled={loading || (!fname || !email)}
              onClick={this.handleSendInvite}
              style={{ margin: "15px 0px"}}>
              Invite to Bridgekin
            </Button>
          </Grid>
        </Grid>
      )

      let response = userErrors.length === 0 ? (
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
              {`We've invited ${Capitalize(fname)} to join Bridgekin!`}
            </Typography>
            <Typography variant="body1" align='center'
              color="textSecondary" gutterBottom
              style={{ fontSize: 14, margin: 10, maxWidth: 350 }}>
              {`When they signup to join Bridgekin, you'll automatically
                be added as a connection`}
            </Typography>
            <Grid item xs={12} container justify='center'>
              <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
                onClick={this.handleClose} color='primary'>
                Close
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container justify='center' alignItems='center'
          style={{ padding: "20px 0px"}}>
          <Grid item xs={10} container justify='flex-end'>
            <CloseIcon onClick={this.handleClose}
              style={{ color: 'grey', pointer: 'cursor'}}/>
          </Grid>
          <Grid item xs={10} container direction='column'
            justify='center' alignItems='center'>
            <Typography variant="body1" align='center'
              color="textPrimary" gutterBottom
              style={{ fontSize: 20, fontWeight: 600}}>
              {`We're missing a few things`}
            </Typography>
            <Typography variant="body1" align='center'
              color="textSecondary" gutterBottom
              style={{ fontSize: 14, margin: 10, maxWidth: 350 }}>
              {`It looks like we were unable to invite your contact because:`}
            </Typography>
            <Grid container justify='flex-end'>
              <Grid item xs={11}>
                <List>
                  {userErrorsList}
                </List>
              </Grid>
            </Grid>
            <Grid item xs={12} container justify='center'>
              <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
                onClick={this.handleClose} color='primary'>
                Close
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )

      let modalContent = responsePage ? response : externalInvitePage

      return (
        <Dialog
          open={externalInviteModal.open}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ExternalInvite));
