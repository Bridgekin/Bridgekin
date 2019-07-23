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
// import { closeDeleteOpp } from '../../../actions/modal_actions';
// import { clearWaitlistUserErrors } from '../../../actions/error_actions';
// // import theme from './theme';

// const mapStateToProps = state => ({
//   currentUser: state.users[state.session.id],
//   deleteModal: state.modals.deleteOpp
// });

// const mapDispatchToProps = dispatch => ({
//   closeDeleteOpp: () => dispatch(closeDeleteOpp()),
//   fetchUserOpportunities: () => dispatch(fetchUserOpportunities()),
//   deleteOpportunity: (id) => dispatch(deleteOpportunity(id)),
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

// class DeleteModal extends React.Component {
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
//   }

//   handleClose(deleteBool){
//     return e => {
//       const { deleteModal} = this.props
//       this.props.closeDeleteOpp();
//       if(deleteBool){
//         if(deleteModal.type === 'hiring'){
//           this.props.deleteRefOpp(this.props.deleteModal.oppId)
//         } else {
//           this.props.deleteOpportunity(this.props.deleteModal.oppId)
//           .then(() => this.props.fetchUserOpportunities())
//         }
//       }
//     }
//   };

//   render() {
//     const { classes, deleteModal } = this.props;

//     return (
//       <Dialog
//         open={deleteModal.open}
//         onClose={this.handleClose(false)}
//       >
//         <Grid container justify='center'
//           style={{ padding: "20px 0px"}}>
//           <Grid item xs={10} container justify='flex-end'>
//             <CloseIcon onClick={this.handleClose(false)}
//               style={{ color: 'grey', pointer: 'cursor'}}/>
//           </Grid>
//           <Grid item xs={10} container direction='column'>
//             <Typography variant="body1" align='center'
//               color="textPrimary" gutterBottom
//               style={{ fontSize: 20, fontWeight: 600}}>
//               {"Delete Your Opportunity"}
//             </Typography>
//             <Typography variant="body1" align='center'
//               color="textSecondary" gutterBottom
//               style={{ fontSize: 14, margin: 10, maxWidth: 350 }}>
//               {`You about to delete your opportunity permanently.
//                 You can not undo this action. Do you still want to continue?`}
//             </Typography>
//             <Grid container justify='center'>
//               <Button autoFocus variant='contained' color='primary'
//                 className={classes.button}
//                 onClick={this.handleClose(true)}>
//                 Delete Opportunity
//               </Button>
//             </Grid>
//             <Grid container justify='center'>
//               <Button onClick={this.handleClose(false)}
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

// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DeleteModal));
