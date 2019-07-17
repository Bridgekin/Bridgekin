import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/CloseSharp';

import { closeConnectSocial } from '../../actions/modal_actions';
import { clearWaitlistUserErrors } from '../../actions/error_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  connectSocialModal: state.modals.connectSocial
});

const mapDispatchToProps = dispatch => ({
  closeConnectSocial: () => dispatch(closeConnectSocial())
})

const styles = theme => ({
  grid:{
    margin: '70px 0px 70px 0px'
  },
  thanksHeader:{
    marginBottom: 30,
    // color: theme.palette.darkGrey
  },
  cardModalWrapper:{
    padding: 0,
    // minWidth: 500,
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
  button:{
    margin: 10
  }
});

class ConnectSocialModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {};

    this.handleClose = this.handleClose.bind(this);
    this.backToDashboard = this.backToDashboard.bind(this);
  }

  handleClose(){
    this.props.closeConnectSocial()
  };

  backToDashboard(){
    this.props.closeConnectSocial()
    this.props.history.push('/sales/dashboard')
  }

  render() {
    const { classes, connectSocialModal } = this.props;

    return (
      <Dialog
        open={connectSocialModal.open}
        onClose={this.handleClose}
      >
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
              {"Upload Processing"}
            </Typography>
            <Typography variant="body1" align='center'
              color="textSecondary" gutterBottom
              style={{ fontSize: 14, margin: 10, maxWidth: 350 }}>
              {`We’re in the process of uploading your contacts. This may take up to an hour and you may experience slower page load times while the upload is happening.`}
            </Typography>
            <Grid container justify='center'>
              <Button autoFocus variant='contained' color='primary'
                className={classes.button}
                onClick={this.backToDashboard}>
                {`Back to Dashboard`}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(ConnectSocialModal)));
