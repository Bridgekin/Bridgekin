// import React from 'react';
// import { withStyles } from '@material-ui/core/styles';

// import Grid from '@material-ui/core/Grid';
// import Modal from '@material-ui/core/Modal';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

// import Typography from '@material-ui/core/Typography';

// import Badge from '@material-ui/core/Badge';
// import CloseIcon from '@material-ui/icons/CloseSharp';

// import { connect } from 'react-redux';
// import { fetchUserOpportunities,
//   deleteOpportunity } from '../../actions/opportunity_actions';
// import { closeRefAppStatus } from '../../../actions/modal_actions';
// import { updateRefAppStatus } from '../../actions/ref_application_actions';
// // import theme from './theme';

// const mapStateToProps = state => ({
//   currentUser: state.users[state.session.id],
//   refAppStatusModal: state.modals.refAppStatus
// });

// const mapDispatchToProps = dispatch => ({
//   closeRefAppStatus: () => dispatch(closeRefAppStatus()),
//   fetchUserOpportunities: () => dispatch(fetchUserOpportunities()),
//   deleteOpportunity: (id) => dispatch(deleteOpportunity(id)),
//   updateRefAppStatus: (payload) => dispatch(updateRefAppStatus(payload))
// });

// const styles = theme => ({
//   grid:{
//     margin: '70px 0px 70px 0px'
//   },
//   thanksHeader:{
//     marginBottom: 30,
//     // color: theme.palette.darkGrey
//   },
//   cardModalWrapper:{
//     padding: 0,
//     // minWidth: 500,
//   },
//   modalPaper:{
//     margin: 15,
//     backgroundColor: theme.palette.base3
//   },
//   badge: {
//     top: 19,
//     right: 19,
//     border: `1px solid`,
//     borderRadius: '50%',
//     height: 'auto',
//     color: theme.palette.base3,
//     backgroundColor: theme.palette.text.primary,
//     padding: 5,
//     cursor: 'pointer'
//   },
//   listText:{ color: theme.palette.text.primary},
//   button:{
//     margin: 10
//   }
// });

// class RepAppStatusModal extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       email: '',
//       fname: '',
//       lname: '',
//       loading: false,
//       success: false,
//       open: false
//     };

//     this.handleClose = this.handleClose.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleSubmit(e){
//     e.stopPropagation();
//     const { refAppStatusModal } = this.props;
//     debugger
//     let payload = {
//       status: refAppStatusModal.newStatus,
//       id: refAppStatusModal.refAppId
//     }
//     this.props.updateRefAppStatus(payload)
//     this.props.closeRefAppStatus();
//   }

//   handleClose(e){
//     e.stopPropagation()
//     this.props.closeRefAppStatus();
//   };

//   render() {
//     const { classes, refAppStatusModal } = this.props;

//     return (
//       <Dialog
//         open={refAppStatusModal.open}
//         onClose={this.handleClose}
//       >
//         <Grid container justify='center'
//           style={{ padding: "20px 0px"}}>
//           <Grid item xs={10} container justify='flex-end'>
//             <CloseIcon onClick={this.handleClose}
//               style={{ color: 'grey', pointer: 'cursor'}}/>
//           </Grid>
//           <Grid item xs={10} container direction='column'>
//             <Typography variant="body1" align='center'
//               color="textPrimary" gutterBottom
//               style={{ fontSize: 20, fontWeight: 600}}>
//               {"Change Application Status"}
//             </Typography>
//             <Typography variant="body1" align='center'
//               color="textSecondary" gutterBottom
//               style={{ fontSize: 14, margin: 10, maxWidth: 350 }}>
//               {`You're about to update the application status. When you do so, the applicant will be notified of this change.
              
//               Would you like to continue?`}
//             </Typography>
//             <Grid container justify='center'>
//               <Button autoFocus variant='contained' color='primary'
//                 className={classes.button}
//                 onClick={this.handleSubmit}>
//                 Update Application status
//               </Button>
//             </Grid>
//             <Grid container justify='center'>
//               <Button onClick={this.handleClose}
//                 className={classes.button}>
//                 Cancel
//               </Button>
//             </Grid>
//           </Grid>
//         </Grid>
//         {/*<DialogTitle>{"Delete Your Opportunity"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             {`You about to delete your opportunity permanently.
//               You can not undo this action. Do you still want to continue?`}
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={this.handleClose(false)}>
//             Cancel
//           </Button>
//           <Button autoFocus variant='contained'
//             className={classes.delete}
//             onClick={this.handleClose(true)}>
//             Delete
//           </Button>
//         </DialogActions>*/}
//       </Dialog>
//     )
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RepAppStatusModal));
