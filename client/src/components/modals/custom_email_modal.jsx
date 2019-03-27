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
import { closeCustomEmail } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  customEmailModal: state.modals.customEmail
});

const mapDispatchToProps = dispatch => ({
  closeCustomEmail: () => dispatch(closeCustomEmail()),
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

class CustomEmailModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      subject: '',
      body: '',
      loading: false,
      responsePage: false
    }
  }

  capitalize(str){
    let strArray = str.split(' ');
    for (let i = 0; i < strArray.length; i++) {
      strArray[i] = strArray[i][0].toUpperCase() + strArray[i].slice(1)
    }
    return strArray.join(' ')
  }

  render(){
    const { classes, customEmailModal, template} = this.props;
    // const { loading, email, responsePage } = this.state;
    // let result = mustache(template.string, context)

    let modalContent = (<div>Custom Email Modal</div>)

    return (
      <Dialog
        open={customEmailModal.open}
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
          {`asdfasdfasdf`}
        </Badge>
      </Dialog>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CustomEmailModal));
