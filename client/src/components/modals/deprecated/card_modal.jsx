// import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import { withRouter } from 'react-router-dom';
// // import Modal from '@material-ui/core/Modal';
// import Dialog from '@material-ui/core/Dialog';
// import Button from '@material-ui/core/Button';
// import _ from 'lodash';

// import Grid from '@material-ui/core/Grid';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Img from 'react-image'
// import CircularProgress from '@material-ui/core/CircularProgress';

// // import castlePic from '../../static/castle.jpg';
// import { PickImage } from '../../../static/opportunity_images/image_util.js';
// import { createConnectedOpportunity } from '../../actions/connected_opportunity_actions';
// import { updateTutorialStep } from '../../../actions/user_feature_actions';

// import Badge from '@material-ui/core/Badge';
// import CloseIcon from '@material-ui/icons/CloseSharp';
// import SendIcon from '@material-ui/icons/SendSharp';

// import Typography from '@material-ui/core/Typography';
// // import theme from '../theme';

// import { connect } from 'react-redux';
// import { clearConnectedOpportunityErrors } from '../../../actions/error_actions';
// import { closeOppCard } from '../../../actions/modal_actions';
// import { fetchProfile } from '../../../actions/user_actions';
// import { openCustomEmailOppCard } from '../../../actions/modal_actions';

// const mapStateToProps = state => ({
//   currentUser: state.users[state.session.id],
//   opportunities: state.entities.opportunities,
//   connectedOpportunityErrors: state.errors.connectedOpportunities,
//   oppCardModal: state.modals.oppCard,
//   userFeature: state.entities.userFeature,
// });

// const mapDispatchToProps = dispatch => ({
//   updateTutorialStep: (index) => dispatch(updateTutorialStep(index)),
//   closeOppCard: () => dispatch(closeOppCard()),
//   fetchProfile: (userId) => dispatch(fetchProfile(userId)),
//   openCustomEmailOppCard:(templateType, connectBool, oppId) => (
//     dispatch(openCustomEmailOppCard(templateType, connectBool, oppId))),
//   createConnectedOpportunity: (opportunity) => dispatch(createConnectedOpportunity(opportunity)),
//   clearConnectedOpportunityErrors: () => dispatch(clearConnectedOpportunityErrors())
// });

// const styles = theme => ({
//   // paper: {
//   //   // position: 'absolute',
//   //   margin: 15,
//   //   // height: 'auto',
//   //   backgroundColor: theme.palette.background.paper,
//   //   boxShadow: theme.shadows[5],
//   //   padding: theme.spacing.unit * 4,
//   //   display: 'flex',
//   //   direction: 'column',
//   //   alignItems: 'flex-start',
//   //   justifyContent: 'center'
//   // },
//   cardModalWrapper:{
//     padding: 0,
//     // minWidth: 500,
//   },
//   cover: {
//     height: 150,
//     width: '100%',
//     objectFit: 'cover'
//   },
//   card: {
//     display: 'flex',
//     direction: 'column',
//     alignItems: 'center',
//     minHeight: 440,
//     overflow: 'scroll'
//   },
//   content:{
//     padding: "20px 50px 50px 50px"
//   },
//   cardWrapper:{
//     display: 'flex',
//     justifyContent: 'flex-start',
//     width: '100%',
//     marginTop: 25
//   },
//   cardSubContent:{
//     // fontSize: '1rem',
//     // fontWeight: 500
//   },
//   cardSubHeader:{
//     // fontSize: '0.9rem',
//     // fontWeight: 700

//   },
//   actionButton: {
//     margin: "10px 0px"
//   },
//   postButtons: {
//     marginBottom: 25
//   },
//   section: {
//     marginBottom: 25,
//     fontSize: 16,
//     lineHeight: 1.2
//   },
//   subContentSection :{
//     // minWidth: 175,
//     marginRight: 10
//   },
//   errorHeader:{
//     marginBottom: 30
//   },
//   modalPaper:{
//     margin: 15
//   },
//   cardContent:{
//     margin: "25px 0px"
//   },
//   grid:{
//     margin: '70px 0px'
//   },
//   button:{
//     margin: "10px 0px"
//   },
//   loader:{
//     height:150,
//     width: "100%",
//     background: theme.palette.lightGrey
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
//   rightIcon: {
//     marginLeft: theme.spacing.unit,
//   },
//   submitHeader:{
//     marginBottom: 25
//   },
//   container: { backgroundColor: theme.palette.base3},
//   listText:{
//     color: theme.palette.text.secondary,
//     fontWeight: 400
//   }
// });

// class CardModal extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       connectBool: true,
//       page: 'opportunity',
//       connectLoading: false
//     }
//     this.handleClose = this.handleClose.bind(this);
//     this.handleConnection = this.handleConnection.bind(this);
//     this.handleConfirm = this.handleConfirm.bind(this);
//     this.getContent = this.getContent.bind(this);
//     this.handleConnection = this.handleConnection.bind(this);
//     this.handleConnectionTemplate = this.handleConnectionTemplate.bind(this);
//     this.redirectToSignup = this.redirectToSignup.bind(this);
//   }

//   // componentDidUpdate(prevProps, prevState){
//   //   // if((prevProps.page !== this.props.page ||
//   //   //   prevProps.connectBool !== this.props.connectBool ) &&
//   //   //   (this.state.page !== this.props.page ||
//   //   //   prevProps.connectBool !== this.props.connectBool)) {
//   //   //     this.setState({
//   //   //       page: this.props.page,
//   //   //       connectBool: this.props.connectBool
//   //   //     })
//   //   //   }
//   //   if (prevProps.open !== this.props.open){
//   //     this.setState({
//   //       page: this.props.page,
//   //       connectBool: this.props.connectBool
//   //     })
//   //   }
//   // }

//   shouldComponentUpdate(nextProps, nextState){
//     let nextModal = nextProps.oppCardModal;
//     if (nextModal.open && nextModal.open !== this.props.oppCardModal.open){
//       this.setState({
//         page: nextModal.page,
//         connectBool: nextModal.connectBool
//       })
//       // debugger
//       // if(!nextModal.fake){
//       //   this.props.fetchProfile(this.props.opportunities[nextModal.oppId].ownerId)
//       // }
//     }
//     return true
//   }

//   componentDidUpdate(prevProps, prevState){
//     const prevModal = prevProps.oppCardModal
//     const currentModal = this.props.oppCardModal
//     const { userFeature } = this.props;
//     if(currentModal.open && currentModal.open !== prevModal.open){
//       //If Tutorial Tour is Open,
//       if (!Boolean(userFeature.tutorialTourDate) &&
//         userFeature.tutorialTourStep === 2){
//         let newStep = userFeature.tutorialTourStep + 1
//         this.props.updateTutorialStep(newStep)
//       }
//     }
//   }

//   handleClose(field){
//     return e => {
//       e.preventDefault();
//       if(this.props.connectedOpportunityErrors){
//         this.props.clearConnectedOpportunityErrors();
//       }

//       this.props.closeOppCard();
//       this.setState({ page: 'opportunity' })

//       if(field === 'post'){
//         this.props.history.push('/postopportunity');
//       }
//     }
//   };

//   redirectToSignup(){
//     this.props.closeOppCard();
//     this.props.history.push('/');
//   }

//   handleConnection(){
//     return e => {
//       e.preventDefault();
//       const { connectBool } = this.state;
//       this.setState({ connectLoading: true},
//       () => {
//         let opportunity = {
//           opportunityId: this.props.oppCardModal.oppId,
//           connectBool: this.state.connectBool,
//           permType: this.props.oppCardModal.permType
//         }

//         this.props.createConnectedOpportunity(opportunity)
//         .then(() => {
//           this.setState({
//             sent: true,
//             page: 'sent',
//             connectLoading: false,
//             connectBool: this.state.connectBool
//           })

//           // Track Event
//           if(connectBool){
//             window.amplitudeInstance.logEvent('Connect To An Opportunity (Template)')
//           } else {
//             window.amplitudeInstance.logEvent('Refer To An Opportunity (Template)')
//           }
//         });
//       })
//     }
//   }

//   handleConnectionTemplate(e){
//     const { connectBool } = this.state;
//     this.props.closeOppCard();

//     this.props.openCustomEmailOppCard(
//       "connected_opportunity",
//       connectBool,
//       this.props.oppCardModal.oppId
//     )
    
//     // Track Event
//     if(connectBool){
//       window.amplitudeInstance.logEvent('Open Custom Email - Connect Opportunity')
//     } else {
//       window.amplitudeInstance.logEvent('Open Custom Email - Refer Opportunity')
//     }
//   }

//   handleConfirm(connectBool){
//     return e => {
//       this.setState({ connectBool, page: 'confirm'})
//     }
//   }

//   getContent(){
//     const { classes, opportunities,
//       oppCardModal } = this.props;
//     const { connectBool, page, connectLoading } = this.state;

//     let connectedOpportunityErrors = this.props.connectedOpportunityErrors.map(error => (
//       <ListItem >
//         <ListItemText primary={error}
//           classes={{ primary: classes.listText }}/>
//       </ListItem>
//     ));

//     switch(page) {
//       case "sent":
//         let typeOfSuccess = <Grid container justify='center'
//             style={{ padding: "20px 0px"}}>
//             <Grid item xs={10} container justify='flex-end'>
//               <CloseIcon onClick={this.handleClose(false)}
//                 style={{ color: 'grey', pointer: 'cursor'}}/>
//             </Grid>
//             <Grid item xs={10} container direction='column'>
//               <Typography variant="body1" align='center'
//                 data-cy='card-modal-success-header'
//                 color="textPrimary" gutterBottom
//                 style={{ fontSize: 20, fontWeight: 600}}>
//                 {`Time for business!`}
//               </Typography>
//               <Typography variant="body1" align='center'
//                 color="textSecondary" gutterBottom
//                 style={{ fontSize: 14, margin: 10, maxWidth: 350 }}>
//                 {connectBool ? (`We're as excited about this opportunity as you are! We just sent
//                   an email connecting you to the opportunity owner, so that should
//                   hit your inbox shortly. We'll let you take it from here.`
//                 ) : (
//                   `We're as excited about this opportunity as you are!
//                     We just sent an email connecting you to the opportunity owner
//                     and then you can loop in your trusted contact from there.
//                     We'll let you take it from here.`
//                 )}
//               </Typography>
//               <Grid container justify='center'>
//                 <Button variant="contained" color='primary'
//                   onClick={this.handleClose('find')}
//                   className={classes.button}
//                   style={{ textTransform: 'capitalize'}}>
//                   {`Close`}
//                 </Button>
//               </Grid>
//             </Grid>
//           </Grid>

//         let responseText = this.props.connectedOpportunityErrors.length === 0 ? (
//           typeOfSuccess
//         ) : (
//           <Grid container justify='center' alignItems='center'
//             style={{ padding: "20px 0px"}}>
//             <Grid item xs={10} container justify='flex-end'>
//               <CloseIcon onClick={this.handleClose(false)}
//                 style={{ color: 'grey', pointer: 'cursor'}}/>
//             </Grid>
//             <Grid item xs={10} container direction='column'>
//               <Typography variant="body1" align='center'
//                 color="textPrimary" gutterBottom
//                 style={{ fontSize: 20, fontWeight: 600}}>
//                 {`Hold on there!`}
//               </Typography>
//               <Typography variant="body1" align='left'
//                 color="textSecondary" gutterBottom
//                 style={{ fontSize: 14, margin: 10, maxWidth: 350 }}>
//                 {`Unfortunately, we weren't able to connect you to this
//                   opportunity because:`}
//               </Typography>
//               <Grid container justify='flex-end'>
//                 <Grid item xs={11}>
//                   <List>
//                     {connectedOpportunityErrors}
//                   </List>
//                 </Grid>
//               </Grid>
//               <Grid container justify='center'>
//                 <Button variant="contained" color='primary'
//                   onClick={this.handleClose('find')}
//                   className={classes.button}
//                   style={{ textTransform: 'capitalize'}}>
//                   {`Close`}
//                 </Button>
//               </Grid>
//             </Grid>
//           </Grid>
//         )
//         return responseText;
//       case "confirm":
//         return (
//           <Grid container justify="center" alignItems='center'>
//             <Grid container justify='center'
//               style={{ padding: "20px 0px"}}>
//               <Grid item xs={10} container justify='flex-end'>
//                 <CloseIcon onClick={this.handleClose(false)}
//                   style={{ color: 'grey', pointer: 'cursor'}}/>
//               </Grid>
//               <Grid item xs={10} container direction='column'>
//                 <Typography variant="body1" align='center'
//                   data-cy='card-modal-header'
//                   color="textPrimary" gutterBottom
//                   style={{ fontSize: 20, fontWeight: 600}}>
//                   {connectBool ?
//                     `Connect to this opportunity` :
//                     `Refer a trusted contact to this opportunity`}
//                 </Typography>
//                 <Typography variant="body1" align='center'
//                   color="textSecondary" gutterBottom
//                   style={{ fontSize: 14, margin: 10, maxWidth: 350 }}>
//                   {connectBool ?
//                     `Once you press the send button below you'll receive an
//                     email introducing you to the opportunity owner. We'll
//                     let you work your magic from there.` :
//                     `Once you press the send button below you'll receive an
//                     email introducing you to the opportunity owner. We'll
//                     let you take it from there and loop in your contact.`
//                   }
//                 </Typography>
//                 <Grid container justify='center'>
//                   <Button autoFocus variant='contained' color='primary'
//                     className={classes.button}
//                     data-cy='card-modal-submit-button'
//                     onClick={this.handleConnection()}>
//                     {`Send`}
//                   </Button>
//                 </Grid>
//                 <Grid container justify='center'>
//                   <Button onClick={this.handleConnectionTemplate}
//                     className={classes.button}
//                     data-cy='card-modal-preview-email-button'
//                     style={{ textTransform: 'capitalize'}}>
//                     {`Preview Email`}
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         );
//       default:
//         return ""
//     }
//   }

//   render () {
//     const { classes, opportunities,
//       oppCardModal, currentUser } = this.props;

//     if (!_.isEmpty(opportunities[oppCardModal.oppId]) ||
//       oppCardModal.fake){

//       let externalUserMessage = (
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
//               {`Members Only Action`}
//             </Typography>
//             <Typography variant="body1" align='center'
//               color="textSecondary" gutterBottom
//               style={{ fontSize: 14, margin: 10, maxWidth: 350 }}>
//               {`Only Bridgekin members are able to connect or refer
//                 opportunities. Sign up to join our waitlist below!`}
//             </Typography>
//             <Grid container justify='center'>
//               <Button variant="contained" color='primary'
//                 onClick={this.redirectToSignup}
//                 className={classes.button}>
//                 Sign Up
//               </Button>
//             </Grid>
//             <Grid container justify='center'>
//               <Button variant="contained" color='default'
//                 onClick={this.handleClose('')}
//                 className={classes.button}>
//                 Close
//               </Button>
//             </Grid>
//           </Grid>
//         </Grid>
//       )
//       return (
//         <Dialog
//           open={oppCardModal.open}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//           onClose={this.handleClose('find')}
//           className={classes.cardModalWrapper}
//           classes={{ paper: classes.modalPaper}}>
//           <div className={['send-email-step-tutorial-tour', classes.container].join(' ')}>
//             {currentUser ? this.getContent() : externalUserMessage}
//           </div>
//         </Dialog>
//       )
//     } else {
//       return (
//         <div></div>
//       )
//     }
//   }
// }

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(CardModal))));
