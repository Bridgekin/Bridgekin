// import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
// // import Modal from '@material-ui/core/Modal';
// import Dialog from '@material-ui/core/Dialog';
// import Button from '@material-ui/core/Button';
// import _ from 'lodash';
// import { fade } from '@material-ui/core/styles/colorManipulator';

// import Grid from '@material-ui/core/Grid';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Img from 'react-image'
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';

// import AccountCircle from '@material-ui/icons/AccountCircle';
// import IconButton from '@material-ui/core/IconButton';
// import Avatar from '@material-ui/core/Avatar';
// import Popover from '@material-ui/core/Popover';

// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import Chip from '@material-ui/core/Chip';
// import Input from '@material-ui/core/Input';
// import Menu from '@material-ui/core/Menu';

// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from '../../theme';
// import withWidth from '@material-ui/core/withWidth';

// // import castlePic from '../../static/castle.jpg';
// import { PickImage } from '../../../static/opportunity_images/image_util.js';
// import { createConnectedOpportunity } from '../../actions/connected_opportunity_actions';
// import { createOpportunity,
//   updateOpportunity } from '../../actions/opportunity_actions';
// import { fetchOppPermissions } from '../../actions/opp_permission_actions';
// import { clearConnectedOpportunityErrors } from '../../../actions/error_actions';

// import Badge from '@material-ui/core/Badge';
// import CloseIcon from '@material-ui/icons/CloseSharp';
// import InfoIcon from '@material-ui/icons/InfoSharp';
// import SendIcon from '@material-ui/icons/SendSharp';
// import PersonIcon from '@material-ui/icons/PersonSharp';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDownSharp';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUpSharp';
// import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeftSharp';
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRightSharp';
// import Checkbox from '@material-ui/core/Checkbox';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// // import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// // import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
// import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// // import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

// import SvgIcon from '@material-ui/core/SvgIcon';
// import PictureIconSVG from '../../static/opp_feed_icons/picture.svg'
// import ShareIconSVG from '../../static/opp_feed_icons/share.svg'
// import PrivacyIconSVG from '../../static/opp_feed_icons/privacy.svg'

// // import ImageCropModal from '../image_upload_modal';
// import SharePanel from './share_panel'

// import { needsChoices, industryChoices, geographyChoices,
//   valueChoices } from '../../../util/choices';

// import { fetchOpportunities } from '../../actions/opportunity_actions';
// import { fetchShareOptions, removeShareOptions } from '../../actions/opp_permission_actions';
// import { closeOppChange, openImageCrop, openSubmitOpp } from '../../../actions/modal_actions';
// import { fetchConnections } from '../../actions/connection_actions';
// import { updateTutorialStep } from '../../../actions/user_feature_actions';
// // import { clearConnectionErrors } from '../../actions/error_actions';

// // import SubmitModal from '../opportunity/submit_modal';
// // import ShareModal from '../opportunity/share_modal';
// import RSelect from 'react-select'
// import merge from 'lodash/merge';
// import { animateScroll } from 'react-scroll';
// import {ReactHeight} from 'react-height';

// const ExpansionPanel = withStyles({
//   root: {
//     borderTop: '1px solid rgba(0,0,0,.125)',
//     boxShadow: 'none',
//     '&:not(:last-child)': {
//       borderBottom: 0,
//     },
//     '&:before': {
//       display: 'none',
//     },
//   },
//   expanded: {
//     margin: 'auto',
//   },
// })(MuiExpansionPanel);

// const ExpansionPanelSummary = withStyles({
//   root: {
//     // backgroundColor: 'rgba(0,0,0,.03)',
//     // borderBottom: '1px solid rgba(0,0,0,.125)',
//     marginBottom: -1,
//     minHeight: 56,
//     '&$expanded': {
//       minHeight: 56,
//     },
//   },
//   content: {
//     '&$expanded': {
//       margin: '12px 0',
//     },
//   },
//   expanded: {},
// })(props => <MuiExpansionPanelSummary {...props} />);

// ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

// const mapStateToProps = (state, ownProps) => ({
//   currentUser: state.users[state.session.id],
//   opportunityErrors: state.errors.opportunities,
//   permissions: state.entities.oppPermissions,
//   oppChangeModal: state.modals.oppChange,
//   source: ownProps.match.params.source,
//   networks: state.entities.networks,
//   circles: state.entities.circles,
//   connections: state.entities.connections,
//   users: state.users,
//   siteTemplate: state.siteTemplate,
//   userFeature: state.entities.userFeature,
//   tourSession: state.util.tourSession.tutorialTour,
// });

// const mapDispatchToProps = dispatch => ({
//   updateTutorialStep: (index) => dispatch(updateTutorialStep(index)),
//   fetchShareOptions: () => dispatch(fetchShareOptions()),
//   fetchConnections: () => dispatch(fetchConnections()),
//   closeOppChange: () => dispatch(closeOppChange()),
//   openSubmitOpp: mode => dispatch(openSubmitOpp(mode)),
//   openImageCrop: payload => dispatch(openImageCrop(payload)),
//   createOpportunity: (opp) => dispatch(createOpportunity(opp)),
//   updateOpportunity: (opp) => dispatch(updateOpportunity(opp)),
//   fetchOppPermissions: (id) => dispatch(fetchOppPermissions(id)),
//   fetchOpportunities: (workspaceId, option) => dispatch(fetchOpportunities(workspaceId, option)),
//   removeShareOptions: () => dispatch(removeShareOptions())
// });

// const styles = theme => ({
//   cardModalWrapper:{
//     padding: 0
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
//   closeBar:{
//     backgroundColor: theme.palette.base4,
//     height: 33,
//     padding: "0px 10px",
//     [theme.breakpoints.up('sm')]: {
//       minWidth: 400,
//     }
//   },
//   avatar:{
//     width: "100%",
//     height: 'auto',
//     color: theme.palette.text.primary
//   },
//   createFilterButton:{
//     textTransform: 'none',
//     backgroundColor: theme.palette.base4,
//     margin: "5px 10px 5px 0px",
//     borderRadius: 10,
//   },
//   createFilterSelectedButton:{
//     textTransform: 'none',
//     margin: "5px 10px 5px 0px",
//     borderRadius: 10,
//   },
//   postButton:{
//     textTransform: 'none',
//   },
//   infoButton:{
//     marginLeft: 0,
//     position: 'absolute',
//     top: 0, right: '-13%'
//   },
//   infoIconButton:{
//     padding: 0
//   },
//   popoverPaper:{
//     padding: 3,
//     maxWidth: 230,
//     backgroundColor: theme.palette.base4
//   },
//   descriptionField:{
//     // height: 122,
//     // paddingTop: 28,
//     // paddingTop: 20,
//     // paddingBottom: 20,
//     // borderBottom: `1px solid ${theme.palette.grey1}`
//   },
//   descriptionTextField: {
//     width: '100%'
//   },
//   fieldButton:{
//     textTransform: 'capitalize'
//   },
//   fieldSelectNeed:{ width: 150 },
//   fieldSelectIndustry:{ width: 130 },
//   modalWrapper:{
//     padding: 0,
//     // minWidth: 500,
//   },
//   modalPaper:{
//     margin: 0,
//     position: 'fixed',
//     borderRadius: 0,
//     top: 64, //64,
//     width: '95%',
//     [theme.breakpoints.up('sm')]: {
//       top: 108,
//       width: 425 //350
//     },
//   },
//   postErrorText:{
//     fontSize: 10,
//     color: '#E88262',
//     width: 150,
//     position: 'absolute',
//     right: 5,
//     // [theme.breakpoints.up('sm')]: {
//     //   top: 84,
//     // }
//   },
//   filterButtonIcon:{
//     width: 14,
//     marginRight: 3
//   },
//   textListSecondary:{
//     fontSize: 10
//   },
//   xbutton:{
//     cursor: 'pointer',
//     color: theme.palette.text.primary
//   },
//   contentContainer:{
//     padding: "0px 20px",
//     backgroundColor: theme.palette.base3
//   },
//   filterButton:{
//     color: 'black',
//     backgroundColor: 'white',
//     border: '1px solid black',
//     margin: 5,
//     padding: "3px 5px",
//     textTransform: 'capitalize',
//     height: 32
//   },
//   selectFilterButton:{
//     padding: "10px 8px",
//     fontSize: 12,
//     // width: '100%'
//   },
//   selectSelect:{
//     "&:focus": {
//       background: 'white'
//     }
//   },
//   // selectRoot:{
//   //   width: '100%'
//   // },
//   notchedOutline:{
//     border: '1px solid black',
//   },
//   selectFocused:{ backgroundColor: 'white'},
//   selectedButton:{
//     color: 'white',
//     background: 'black',
//     '&:hover':{
//       color: 'white',
//       background: '#505050',
//     }
//   },
//   textListPrimary: { fontSize: 12 },
//   submitBar:{
//     padding: 12,
//     borderTop:  `1px solid ${theme.palette.border.secondary}`
//   },
//   outlinedInput:{
//     border: '1px solid black',
//     height: 32
//   },
//   sharePanel: {
//     boxShadow: 'none'
//   },
//   sharePanelSummaryContentExpanded:{
//     '&$expanded': {
//       margin: "0px"
//     }
//   },
//   sharePanelSummary:{
//     '&$expanded': {
//       margin: "0px"
//     },
//     "& > :last-child": {
//       paddingRight: 0
//     }
//   },
//   sharePanelDetails:{
//     padding: 0
//   }
// });

// const DEFAULTSTATE = {
//   // activeStep: 0,
//   // modalOpen: false,
//   // pictureUrl: null,
//   sendingProgress: false,
//   infoAnchorEl: null,
//   privacyAnchorEl: null,
//   shareAnchorEl: null,
//   needsChoices,
//   industryChoices,
//   geographyChoices,
//   valueChoices,
//   mobileImageCropPending: false,
//   imageModalOpen: false,
//   shareModalOpen: false,
//   permissions: [],
//   showFilters: false,
//   sharePanelExpanded: false,
//   contextLoaded: false,
//   formDimensions: 0,
//   exPanSummmaryDimensions: 0
//   // share: []
// }

// class OpportunityChangeModal extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = merge({}, DEFAULTSTATE, this.props.opportunity);

//     this.toggleOpp = this.toggleOpp.bind(this);
//     this.handleMenuClick = this.handleMenuClick.bind(this);
//     this.handleMenuClose = this.handleMenuClose.bind(this);
//     this.handlePrivacyClose = this.handlePrivacyClose.bind(this);
//     this.handleClose = this.handleClose.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.checkErrors = this.checkErrors.bind(this);
//     this.clearFields = this.clearFields.bind(this);
//     this.handleSubmitModalClose = this.handleSubmitModalClose.bind(this);
//     this.handleShareClick = this.handleShareClick.bind(this);
//     this.handleUpdatePermissions = this.handleUpdatePermissions.bind(this);
//     this.handleRemovePermissions = this.handleRemovePermissions.bind(this);
//     this.updateNetworkOpps = this.updateNetworkOpps.bind(this);
//     this.toggleDetails = this.toggleDetails.bind(this);
//     this.handleExpandShare = this.handleExpandShare.bind(this);
//     this.getTitle = this.getTitle.bind(this);
//     this.handleSaveCroppedImage = this.handleSaveCroppedImage.bind(this);
//     this.refCallback = this.refCallback.bind(this);
//   }

//   // componentDidMount(){
//   //   const { type } = this.props;
//   //   debugger
//   //   if(type === 'create'){
//   //     this.setState({ permissions: ["-Network"]});
//   //   } else {
//   //     this.props.fetchOppPermissions(this.props.opportunity.id)
//   //     .then(() => {
//   //       const { permissions } = this.props;
//   //       this.setState({ permissions });
//   //     })
//   //   }
//   // }
//   componentDidMount(){
//     this.props.fetchShareOptions()
//     // this.props.fetchConnections()
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     const nextModal = nextProps.oppChangeModal
//     const currentModal = this.props.oppChangeModal
//     const { userFeature } = this.props;

//     if(!Boolean(userFeature.tutorialTourSession) &&
//       !Boolean(userFeature.tutorialTourDate) &&
//       this.props.userFeature.tutorialTourStep === 7 &&
//       nextProps.userFeature.tutorialTourStep === 6){
//       this.setState({ sharePanelExpanded: false })
//     }

//     if(nextModal.open && nextModal.open !== currentModal.open){
//       // Refresh Share Options
//       // this.props.removeShareOptions();
//       this.props.fetchShareOptions()
//       .then(() => {
//         if(nextModal.mode === 'create'){
//           this.setState(merge({}, DEFAULTSTATE,
//             nextModal.opportunity,
//             { permissions: ["-Everyone"], contextLoaded: true,
//               justOpened: true }
//             // sharePanelExpanded: Boolean(nextModal.sharePanelExpanded),
//           ));
//           return true;
//         } else {
//           this.props.fetchOppPermissions(nextModal.opportunity.id)
//           .then(() => {
//             const { permissions } = this.props;
//             this.setState(merge({}, DEFAULTSTATE,
//               nextModal.opportunity,
//               { permissions, contextLoaded: true }
//                 // sharePanelExpanded: Boolean(nextModal.sharePanelExpanded)
//             ))
//               return true;
//             })
//         }
//       })
//     } else {
//       return true
//     }
//   }

//   componentDidUpdate(prevProps, prevState){
//     const prevModal = prevProps.oppChangeModal
//     const currentModal = this.props.oppChangeModal
//     const { userFeature } = this.props;
//     // debugger
//     if(this.state.justOpened){
//       //If Tutorial Tour is Open,
//       if (!Boolean(userFeature.tutorialTourSession) &&
//         !Boolean(userFeature.tutorialTourDate) &&
//         userFeature.tutorialTourStep === 4){
//         let newStep = userFeature.tutorialTourStep + 1
//         this.props.updateTutorialStep(newStep)
//       }
//       this.setState({ justOpened: false })
//     }
//   }

//   getSource(){
//     const { source } = this.props;
//     return source ? source : '';
//   }

//   updateNetworkOpps(){
//     const { siteTemplate } = this.props;
//     const workspaceId = siteTemplate.networkId
//     this.props.fetchOpportunities(workspaceId, this.getSource())
//     .then(() => animateScroll.scrollTo(0) );
//   }

//   handleSubmit(e){
//     e.stopPropagation();
//     this.setState({ sendingProgress: true },
//     () => {
//       // Base Fields
//       let fields = ['geography', 'industries', 'value', 'title',
//         'description', 'opportunityNeed', 'picture', 'anonymous',
//         'viewType', 'permissions'];
//       // const { share }= this.state;
//       const formData = new FormData();

//       for (let i = 0; i < fields.length; i++){
//         if(this.state[fields[i]] || fields[i] === 'anonymous'){
//           formData.append(`opportunity[${fields[i]}]`, this.state[fields[i]]);
//         }
//       }

//       const { oppChangeModal } = this.props;
//       let mode = oppChangeModal.mode;
//       let openSubmitModal = () => {
//         let payload = {
//           modalType: mode,
//           handleClose: this.handleSubmitModalClose
//         }
//         this.props.openSubmitOpp(payload)
//       };

//       if(mode === 'create'){
//         this.props.createOpportunity(formData)
//         .then(() => {
//           if(this.props.opportunityErrors.length !== 0){
//             this.setState({
//               sendingProgress: false,
//               // submitModalOpen: true
//             }, openSubmitModal);
//           } else {
//             this.setState({
//               sendingProgress: false
//             });
//             this.handleClose();
//             this.updateNetworkOpps();
//           }
//           // this.handleClose();
//         })
//       } else {
//         formData.append(`opportunity[id]`, oppChangeModal.opportunity.id);
//         this.props.updateOpportunity(formData)
//         .then(() => {
//           if(this.props.opportunityErrors.length !== 0){
//             this.setState({
//               sendingProgress: false,
//               // submitModalOpen: true
//             }, openSubmitModal);
//           } else {
//             this.setState({
//               sendingProgress: false
//             });
//             this.handleClose();
//           }
//           // this.clearFields();
//         })
//       }
//     });
//   };

//   handleClose(){
//     // e.preventDefault();
//     this.clearFields();
//     this.props.closeOppChange();
//     // this.props.handleClose();
//     // this.setState({ share: permissions });
//   }

//   handleSubmitModalClose(closeChangeModal){
//     return e => {
//       if (closeChangeModal){
//         this.clearFields();
//         this.handleClose();
//       }
//     }
//   }

//   clearFields(){
//     this.setState(merge({}, DEFAULTSTATE, this.props.opportunity))
//   }

//   handleChange(field){
//     return e => {
//       // e.preventDefault();
//       let option = e.target.value;

//       if ((['industries', 'geography'].includes(field) &&
//         option.length <= 3) ||
//         (field === 'title' && option.length <= 90) ||
//         !['industries', 'geography','title'].includes(field)) {
//           this.setState({ [field]: option})
//       }
//     }
//   }

//   handleMenuClick(anchor){
//     return e => {
//       e.stopPropagation();
//       this.setState({ [anchor]: e.currentTarget });
//     }
//   };

//   handleMenuClose(anchor){
//     return e => {
//       e.stopPropagation();
//       this.setState({ [anchor]: null });
//     }
//   };

//   handlePrivacyClose(bool){
//     return e => {
//       e.preventDefault();
//       this.setState({ anonymous: bool, privacyAnchorEl: null })
//     }
//   }

//   // handleShareClose(choice){
//   //   return e => {
//   //     e.preventDefault();
//   //     let { share } = this.state;
//   //     let indexOfChoice = share.indexOf(choice)
//   //     if (indexOfChoice > -1){
//   //       share.splice(indexOfChoice, 1)
//   //     } else {
//   //       share.push(choice);
//   //     }
//   //     this.setState({ share })
//   //   }
//   // }

//   toggleOpp(e){
//     e.preventDefault();
//     const { viewType } = this.state;
//     this.setState({ viewType: (viewType === 'post' ? 'card' : 'post') })
//   }

//   getSecondaryText(choice){
//     switch(choice){
//       case 'Find':
//         return `properties, companies, or products`;
//       case 'Sell':
//         return `properties, companies, or products`;
//       case 'Discover':
//         return `new team members or join a team`;
//       default:
//         return ``;
//     }
//   }

//   handleFile(e){
//     // debugger
//     let file = e.currentTarget.files[0];
//     if (this.props.width !== 'xs'){
//       this.handleFileHelper(file, true, false);
//     } else {
//       this.handleFileHelper(file, false, true);
//     }
//   }

//   handleSaveCroppedImage(newFile){
//     if(newFile){
//       this.handleFileHelper(newFile, false, false)
//     }
//     // if(newFile && this.props.width !== 'xs'){
//     //   // normal screens
//     //   this.handleFileHelper(newFile, false, false)
//     // } else if (newFile && this.props.width === 'xs'){
//     //   //mobile screens
//     //   this.handleFileHelper(newFile, false, false)
//     // } else {
//     //   this.setState({ imageModalOpen: false})
//     // }
//   }

//   handleFileHelper(file, bool, mobilePendingBool){
//     let fileReader = new FileReader();

//     fileReader.onloadend = () => {
//       this.setState({
//         picture: file,
//         pictureUrl: fileReader.result,
//         mobileImageCropPending: mobilePendingBool
//       },
//       () => {
//         if(bool){
//           let payload = {
//             ratio: (2.3/1),
//             fileUrl: fileReader.result,
//             handleDelete: this.handleRemoveFile.bind(this),
//             handleSave: this.handleSaveCroppedImage.bind(this)
//           }
//           this.props.openImageCrop(payload);
//         }
//       })
//     }

//     if(file){
//       fileReader.readAsDataURL(file)
//     }
//   }

//   handleRemoveFile(e){
//     if (e){
//       e.preventDefault();
//       e.stopPropagation();
//     }
//     this.setState({
//       picture: 'delete',
//       pictureUrl: null,
//     })
//   }

//   handleShareClick(e){
//     const { shareModalOpen } = this.state;
//     this.setState({ shareModalOpen: !shareModalOpen });
//   }

//   handleUpdatePermissions(permissions){
//     this.setState({ permissions })
//   }

//   handleRemovePermissions(e){
//     e.stopPropagation();
//     this.setState({ permissions: [] })
//   }

//   checkErrors(){
//     const { title, permissions } = this.state;
//     return permissions.length ===  0 || title === ''
//     // const { title, description, industries, opportunityNeed, geography,
//     //   value, viewType, permissions } = this.state;
//     // if (viewType === 'card'){
//     //   let opp = { title, description, industries, opportunityNeed, value,
//     //     geography, permissions };
//     //   let keys = Object.keys(opp);
//     //   let errors = [];
//     //   for (let i = 0; i < keys.length; i++){
//     //     console.log(keys[i]);
//     //     if(opp[keys[i]] === null ||
//     //       opp[keys[i]] === '' ||
//     //       opp[keys[i]].length === 0){
//     //       let formatted = this.capitalize(keys[i].replace(/([A-Z])/g, ' $1'));
//     //       errors.push(`${formatted} is blank`);
//     //     }
//     //   }
//     //   return errors.length > 0;
//     // } else {
//     //   // debugger
//     //   return permissions.length === 0 || title === ''
//     // }
//   }

//   // getFilterButton(option){
//   //   const { classes } = this.props;
//   //
//   //   let optionMapping = {
//   //     'opportunityNeed': {choices: needsChoices, anchor:'needAnchor', title: 'Need'},
//   //     'geography': {choices: geographyChoices, anchor:'geoAnchor', title: 'Geography'},
//   //     'industries': {choices: industryChoices, anchor:'industryAnchor', title: 'Industry'},
//   //     'value': {choices: valueChoices, anchor:'valueAnchor', title: 'Value'}
//   //   }
//   //   let subject = optionMapping[option];
//   //   let options = [];
//   //
//   //   if (option === 'geography' || option === 'industries'){
//   //     options = subject.choices.map(option => (
//   //
//   //     ))
//   //   } else {
//   //     options = subject.choices.map(option => (
//   //       <MenuItem onChange={this.handleChange('industries')}>
//   //         <Checkbox checked={!this.state.anonymous} />
//   //         <ListItemText primary={`Post with Name & Picture`} />
//   //       </MenuItem>
//   //     ))
//   //   }
//   //
//   //   let buttonCombo = (
//   //     <div>
//   //       <Button
//   //         className={classes.filterButton}
//   //         onClick={this.handleMenuClick(subject.anchor)}>
//   //         {subject.title}
//   //       </Button>
//   //       <Menu
//   //         id="simple-menu"
//   //         anchorEl={this.state[subject.anchor]}
//   //         open={Boolean(this.state[subject.anchor])}
//   //         onClose={this.handleMenuClose(subject.anchor)}
//   //         >
//   //         {options}
//   //       </Menu>
//   //     </div>
//   //   )
//   //
//   //   return buttonCombo
//   // }

//   toggleDetails(){
//     this.setState({ showFilters: !this.state.showFilters })
//   }

//   handleExpandShare(){
//     const { userFeature } = this.props;
//     if (!Boolean(userFeature.tutorialTourSession) &&
//       !Boolean(userFeature.tutorialTourDate) &&
//       userFeature.tutorialTourStep === 6){
//       let newStep = userFeature.tutorialTourStep + 1
//       this.props.updateTutorialStep(newStep)
//     }
//     this.setState({ sharePanelExpanded: !this.state.sharePanelExpanded})
//   }

//   getTitle(perm){
//     const { connections, circles, networks,
//       users, currentUser } = this.props;
//     let [typeId, type] = perm.split('-');
//     if(typeId === ''){
//       if (type === 'Everyone'){
//         return 'Everyone on Bridgekin'
//       }
//       return `Your ${type}s`
//     } else if (type === 'Network'){
//       return `The ${networks[typeId].title} Network`;
//     } else if (type === 'Circle'){
//       return circles[typeId].title;
//     } else if (type === 'Connection'){
//       // debugger
//       let connection = connections[typeId]
//       let friendId = (currentUser.id !== connection.userId) ?
//       connection.userId : connection.friendId
//       let friend = users[friendId];
//       return `${friend.fname} ${friend.lname}`
//     }
//   }

//   capitalize(str){
//     return str[0].toUpperCase() + str.slice(1)
//   }

//   handleSelectChange(field){
//     return optionSelected => {
//       // e.preventDefault();
//       let option = optionSelected.value;
//       this.setState({ [field]: option})

//       // if ((['industries', 'geography'].includes(field) &&
//       //   option.length <= 3) ||
//       //   (field === 'title' && option.length <= 90) ||
//       //   !['industries', 'geography','title'].includes(field)) {
//       //     this.setState({ [field]: option})
//       // }
//     }
//   }

//   refCallback(name){
//     return height => {
//       if (height) {
//         this.setState({ [name]: height});
//       }
//     }
//   };

//   render () {
//     const { open, classes,
//       availNetworks, flow, currentUser,
//       oppChangeModal, userFeature } = this.props;

//     const { viewType, infoAnchorEl, needsChoices,
//       industryChoices, geographyChoices, valueChoices,
//       privacyAnchorEl, shareAnchorEl,
//       mobileImageCropPending, imageModalOpen, picture,
//       pictureUrl, title, submitModalOpen, anonymous,
//       sendingProgress, shareModalOpen, permissions,
//       showFilters, sharePanelExpanded,
//       contextLoaded } = this.state;

//     const infoOpen = Boolean(infoAnchorEl);
//     let opportunity = oppChangeModal.opportunity;

//     const otherConnectionOptions = [
//       {title: 'Connections', type: 'connection'},
//       {title: 'Network Circles', type: 'circle'},
//       {title: 'Custom', type: 'other'}]

//     // debugger
//     if(opportunity && contextLoaded){
//       const isError = this.checkErrors();

//       let oppForm = (
//         <Grid container alignItems='center'>
//           <Grid item xs={2}>
//             {currentUser.profilePicUrl && !anonymous ? (
//               <Avatar alt="profile-pic"
//                 src={currentUser.profilePicUrl}
//                 className={classes.avatar} />
//             ) : (
//               <AccountCircle className={classes.avatar}/>
//             )}
//           </Grid>
//           <Grid item xs={10} alignItems='center'>
//             <Typography align='left' color="textPrimary"
//               variant='body1' style={{ fontSize: 15, marginLeft: 10, textTransform: 'capitalize' }}>
//               {anonymous ? 'Anonymous' : `${currentUser.fname} ${currentUser.lname}`}
//             </Typography>
//           </Grid>
//           <Grid container
//             style={{ padding: 20}}>
//             <TextField
//               multiline
//               rows={this.props.width === 'xs' ? "2" : "1" }
//               rowsMax="3"
//               fullWidth
//               required
//               data-cy='opp-change-title'
//               placeholder={ `What’s your business opportunity or need?`}
//               value={this.state.title}
//               onChange={this.handleChange('title')}
//               className={classes.descriptionTextField}
//               style={{ marginBottom: 20 }}
//               InputLabelProps={{
//                 shrink: true
//               }}
//               />
//             <TextField
//               id="outlined-multiline-static"
//               multiline
//               fullWidth
//               required
//               rowsMax="4"
//               data-cy='opp-change-description'
//               helperText="Optional"
//               placeholder={`Additional details`}
//               value={this.state.description}
//               onChange={this.handleChange('description')}
//               className={classes.descriptionTextField}
//               />
//           </Grid>
//         </Grid>
//       )

//       let filterOptions = ['opportunityNeed','geography', 'industries', 'value']

//       // const options = [
//       //   { value: 'chocolate', label: 'Chocolate' },
//       //   { value: 'strawberry', label: 'Strawberry' },
//       //   { value: 'vanilla', label: 'Vanilla' }
//       // ]

//       const options = needsChoices.map(choice => ({
//         value: choice, label: choice
//       }))

//       let customSelectStyles = {
//         container: (base, state) => ({
//           ...base,
//           width: '90%',
//           border: '1px solid black',
//           borderRadius: 5
//         })
//       }

//       let filters = (
//         <Grid container>
//           <input
//             accept="image/*"
//             style={{ display: 'none'}}
//             id="contained-button-file"
//             type="file"
//             onChange={this.handleFile.bind(this)}
//             onClick={(event)=> {
//               event.target.value = null
//             }}
//             />
//           <label htmlFor="contained-button-file">
//             <Button
//               className={pictureUrl ?
//                 ([classes.filterButton, classes.selectedButton].join(' ')) :
//                 (classes.filterButton)
//               }
//               component="span">
//               { !pictureUrl && <img src={PictureIconSVG} alt='pic-icon'
//               className={classes.filterButtonIcon}/>}
//               Image
//               { pictureUrl &&
//                 <IconButton
//                   onClick={this.handleRemoveFile.bind(this)}
//                   classes={{ root: classes.infoIconButton}}>
//                   <CloseIcon style={{ color: 'white', fontSize: 20}}/>
//                 </IconButton>
//               }
//             </Button>
//           </label>

//           <Button
//             className={classes.filterButton}
//             data-cy='opp-change-privacy-button'
//             onClick={this.handleMenuClick('privacyAnchorEl')}>
//             {this.state.anonymous ?
//               <img src={PrivacyIconSVG} alt='privacy-icon'
//                 className={classes.filterButtonIcon}/> :
//               <PersonIcon className={classes.filterButtonIcon}/>
//             }
//             Privacy
//           </Button>
//           <Menu
//             id="simple-menu"
//             anchorEl={privacyAnchorEl}
//             open={Boolean(privacyAnchorEl)}
//             onClose={this.handleMenuClose('privacyAnchorEl')}
//             >
//             <MenuItem onClick={this.handlePrivacyClose(false)}>
//               <Checkbox checked={!this.state.anonymous} />
//               <ListItemText primary={`Post with Name & Picture`} />
//             </MenuItem>
//             <MenuItem onClick={this.handlePrivacyClose(true)}
//               data-cy='opp-change-anonymous-menu-item'>
//               <Checkbox checked={this.state.anonymous} />
//               <ListItemText primary={`Post anonymously`} />
//             </MenuItem>
//           </Menu>

//           <Button
//             className={classes.filterButton}
//             data-cy='opp-change-toggle-filter-button'
//             onClick={this.toggleDetails}>
//             {showFilters ? `Remove Details` : `Add Details`}
//             {showFilters ? <KeyboardArrowLeftIcon /> :
//               <KeyboardArrowRightIcon />
//             }
//           </Button>
//           {/*showFilters && filterOptions.map(option => this.getFilterButton(option))*/}
//           {showFilters &&
//           <Grid container justify='space-between' alignItems='center'
//             spacing={1}>
//             <Grid item xs={6} container justify='flex-start' direction='column'>
//               <Typography variant='body1' align='left'
//                 color="textSecondary"
//                 style={{ fontSize: 10}}>
//                 {`Business Need`}
//               </Typography>
//               <FormControl className={classes.formControl}>
//                 <Select
//                   fullWidth
//                   value={this.state.opportunityNeed}
//                   onChange={this.handleChange('opportunityNeed')}
//                   name="opportunityNeed"
//                   inputProps={{
//                     id: 'opportunityNeed-required',
//                     name: 'opportunityNeed'
//                   }}
//                   renderValue={selected => selected}
//                   className={classes.fieldSelectNeed}
//                   input={
//                     <OutlinedInput
//                       data-cy='opp-change-need-select'
//                       inputProps={{
//                         root: classes.filterButton
//                       }}
//                       classes={{
//                         //notchedOutline: classes.notchedOutline,
//                         // root: classes.selectRoot,
//                         focuse: classes.selectSelect,
//                         input: classes.selectFilterButton
//                       }}
//                     />
//                   }>
//                   {needsChoices.map(choice => (
//                     <MenuItem value={choice} key={choice}
//                       data-cy='opp-change-need-choice'
//                       style={{ textTransform: 'capitalize'}}>
//                       <ListItemText
//                         primary={choice}
//                         secondary={this.getSecondaryText(choice)}
//                         classes={{
//                           primary: classes.textListPrimary,
//                           secondary: classes.textListSecondary
//                         }}/>
//                       </MenuItem>
//                     ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={6} container justify='flex-start'
//               direction='column'>
//               <Typography variant='body1' align='left'
//                 color="textSecondary"
//                 style={{ fontSize: 10}}>
//                 {`Industries`}
//               </Typography>
//               <FormControl className={classes.formControl}>
//                 <Select
//                   multiple
//                   fullWidth
//                   value={this.state.industries}
//                   onChange={this.handleChange('industries')}
//                   name="industries"
//                   renderValue={selected => selected.join(', ')}
//                   className={classes.fieldSelectIndustry}
//                   input={
//                     <OutlinedInput
//                       inputProps={{
//                         root: classes.filterButton
//                       }}
//                       classes={{
//                         //notchedOutline: classes.notchedOutline,
//                         // root: classes.selectRoot,
//                         focuse: classes.selectSelect,
//                         input: classes.selectFilterButton
//                       }}
//                     />
//                   }>
//                   {industryChoices.map(choice => (
//                     <MenuItem value={choice} key={choice}
//                       style={{ textTransform: 'capitalize'}}>
//                       <Checkbox checked={this.state.industries.indexOf(choice) > -1} />
//                       <ListItemText primary={choice}
//                         classes={{
//                           primary: classes.textListPrimary
//                         }}/>
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={6} container justify='flex-start'
//               direction='column'>
//               <Typography variant='body1' align='left'
//                 color="textSecondary"
//                 style={{ fontSize: 10}}>
//                 {`Location`}
//               </Typography>
//               <FormControl className={classes.formControl}>
//                 <Select
//                   multiple
//                   fullWidth
//                   value={this.state.geography}
//                   onChange={this.handleChange('geography')}
//                   name="geography"
//                   renderValue={selected => selected.join(', ')}
//                   className={classes.fieldSelectIndustry}
//                   input={
//                     <OutlinedInput
//                       inputProps={{
//                         root: classes.filterButton
//                       }}
//                       classes={{
//                         //notchedOutline: classes.notchedOutline,
//                         // root: classes.selectRoot,
//                         focuse: classes.selectSelect,
//                         input: classes.selectFilterButton
//                       }}
//                     />
//                   }>
//                   {geographyChoices.map(choice => (
//                     <MenuItem value={choice} key={choice}
//                       style={{ textTransform: 'capitalize'}}>
//                       <Checkbox checked={this.state.geography.indexOf(choice) > -1} />
//                       <ListItemText primary={choice}
//                         classes={{
//                           primary: classes.textListPrimary
//                         }}/>
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={6} container justify='flex-start' direction='column'>
//               <Typography variant='body1' align='left'
//                 color="textSecondary"
//                 style={{ fontSize: 10}}>
//                 {`Opportunity Size`}
//               </Typography>
//               <FormControl className={classes.formControl}>
//                 <Select
//                   fullWidth
//                   value={this.state.value}
//                   onChange={this.handleChange('value')}
//                   name="value"
//                   inputProps={{
//                     id: 'value-required',
//                     name: 'value'
//                   }}
//                   className={classes.fieldSelectIndustry}
//                   input={
//                     <OutlinedInput
//                       inputProps={{
//                         root: classes.filterButton
//                       }}
//                       classes={{
//                         //notchedOutline: classes.notchedOutline,
//                         // root: classes.selectRoot,
//                         focuse: classes.selectSelect,
//                         input: classes.selectFilterButton
//                       }}
//                     />
//                   }>
//                   {valueChoices.map(choice => (
//                     <MenuItem value={choice}
//                       style={{ textTransform: 'capitalize'}}>
//                       <ListItemText
//                         primary={choice}
//                         classes={{ primary: classes.textListPrimary }}/>
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>}
//         </Grid>
//       )

//       // let tutorialPermissions

//       let sharePanel = (
//         <ExpansionPanel
//           expanded={sharePanelExpanded}
//           onChange={this.handleExpandShare}
//           className='share-panel-step-tutorial-tour'
//           classes={{ root: classes.sharePanel}}
//         >
//           <ExpansionPanelSummary
//             classes={{
//               content: classes.sharePanelSummary,
//               expanded: classes.sharePanelSummaryContentExpanded
//             }}>
//             <Grid container>
//               <Grid item xs={7}>
//                 <Typography variant='body1' align='left'
//                   color="textSecondary"
//                   style={{ fontSize: 12}}>
//                   {`Share with:`}
//                 </Typography>
//                 <Grid container alignItems='flex-end'>
//                   <Typography variant='body1' align='left'
//                     color="textPrimary"
//                     style={{ fontSize: 13}}>
//                     <b>{[...permissions].map(perm => this.capitalize(this.getTitle(perm)))
//                         .join(', ')}</b>
//                   </Typography>
//                   {sharePanelExpanded ?
//                     <KeyboardArrowDownIcon
//                       style={{ fontSize: 20 }}/> :
//                     <KeyboardArrowUpIcon
//                       style={{ fontSize: 20 }}/>}
//                 </Grid>
//               </Grid>
//               <Grid item xs={5} container justify='flex-end'
//                 alignItems='center'>
//                 <Button className={classes.postButton}
//                   color='primary' variant='contained'
//                   data-cy='opp-change-submit'
//                   onClick={this.handleSubmit}
//                   disabled={ isError || sendingProgress ||
//                     sharePanelExpanded ||
//                     (!Boolean(userFeature.tutorialTourSession) &&
//                     !Boolean(userFeature.tutorialTourDate))}>
//                   {`Post`}
//                   {/*oppChangeModal.mode === 'create' ? `Post` : `Update`*/}
//                 </Button>
//               </Grid>
//             </Grid>
//           </ExpansionPanelSummary>
//           <ExpansionPanelDetails
//             className='share-expanded-step-tutorial-tour'
//             classes={{ root: classes.sharePanelDetails}}>
//             <SharePanel
//               formHeight={this.state.formDimensions}
//               summaryHeight={this.state.exPanSummaryDimensions}
//               permissions={permissions}
//               handleClose={this.handleExpandShare}
//               handleChange={this.handleUpdatePermissions}/>
//           </ExpansionPanelDetails>
//         </ExpansionPanel>
//       )

//       let formContainer = (
//         <ReactHeight onHeightReady={this.refCallback('formDimensions')}>
//           <Grid container
//             className='create-details-step-tutorial-tour'
//             style={{ padding: 12 }}>
//             {oppForm}
//             {filters}
//           </Grid>
//         </ReactHeight>
//       )

//       return (
//         <Dialog
//           open={oppChangeModal.open}
//           onClose={this.handleClose}
//           data-cy='opp-create-dialog'
//           className={classes.cardModalWrapper}
//           classes={{ paper: classes.modalPaper}}>
//           <Grid container>
//             {formContainer}
//             {sharePanel}
//           </Grid>
//         </Dialog>
//       )
//     } else {
//       return <div></div>
//     }
//   }
// }

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withWidth()(OpportunityChangeModal))));
