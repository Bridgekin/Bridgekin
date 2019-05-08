import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withWidth from '@material-ui/core/withWidth';

//Import Material Components
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import AddIcon from '@material-ui/icons/AddSharp';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

//Import CSS and theme
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from '../theme';
import './opportunity_home.css'
import { fade } from '@material-ui/core/styles/colorManipulator';

//Import Local Components
// import OpportunityCard from './opportunity_card';
import OpportunityCardFeed from './opportunity_card_feed';
import OpportunityReferral from './opportunity_referral';
import OpportunityWaitlist from './opportunity_waitlist';
// import WaitlistModal from '../waitlist_modal';
import Loading from '../loading';
import Checkbox from '@material-ui/core/Checkbox';

import Img from 'react-image'
import CircularProgress from '@material-ui/core/CircularProgress';
import VisibilitySensor from 'react-visibility-sensor';
import LinesEllipsis from 'react-lines-ellipsis';

//Imported Actions
import { registerWaitlistFromReferral } from '../../actions/waitlist_user_actions';
import { fetchOpportunities } from '../../actions/opportunity_actions';
import { fetchWorkspaceOptions } from '../../actions/network_actions';
import { createReferral } from '../../actions/referral_actions';
import { fetchSavedOpportunities } from '../../actions/saved_opportunity_actions';
import { fetchPassedOpportunities } from '../../actions/passed_opportunity_actions';
import { fetchCurrentUserMetrics } from '../../actions/user_metric_actions';
import { updateUserFeature, updateTutorialStep } from '../../actions/user_feature_actions';
import { consumeTutorialSession } from '../../actions/util_actions';
import { clearOpportunityErrors } from '../../actions/error_actions';
import { closeOppChange, closeOppCard } from '../../actions/modal_actions';
// import OpportunityChangeModal from './opportunity_change_modal';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDownSharp';
import { PickImage } from '../../static/opportunity_images/image_util.js';
import { animateScroll } from 'react-scroll';

import PictureIconSVG from '../../static/opp_feed_icons/picture.svg'
import ShareIconSVG from '../../static/opp_feed_icons/share.svg'
import PrivacyIconSVG from '../../static/opp_feed_icons/privacy.svg'
import PersonIcon from '@material-ui/icons/PersonSharp';
import EditIcon from '@material-ui/icons/EditSharp';
import CreateOppButton from './create_opp_button';

import HomeImage from '../../static/Login_Background_Image.jpg'
import FeedContainer from '../feed_container';
import FeedCard from '../feed_card';
import FilterBar from './filters/filter_bar';
import ExampleCard from './example_card';
import BridgekinLogo from '../../static/Bridgekin_Logo.png'

import merge from 'lodash/merge';
import queryString from 'query-string'
import Tour from 'reactour';
import Joyride, { ACTIONS, EVENTS, LIFECYCLE, STATUS } from 'react-joyride';
import NotificationSystem from 'react-notification-system';

// import Loading from '../loading';

const mapStateToProps = (state, ownProps) => {
  const values = queryString.parse(ownProps.location.search)
  return {
  currentUser: state.users[state.session.id],
  waitlistErrors: state.errors.waitlistUsers,
  opportunityErrors: state.errors.opportunities,
  opportunities: state.entities.opportunities,
  // networkOpps: state.entities.networkOpps,
  networkOppPerms: state.entities.networkOppPermissions,
  networks: state.entities.networks,
  circles: state.entities.circles,
  workspaceOptions: state.entities.workspaceOptions,
  referral: state.entities.referral,
  siteTemplate: state.siteTemplate,
  workspaces: state.workspaces,
  source: ownProps.match.params.source,
  userMetrics: state.entities.userMetrics,
  userFeature: state.entities.userFeature,
  passedOpps: state.entities.passedOpportunities,
  oppChangeModal: state.modals.oppChange,
  sessionOpportunities: state.entities.sessionOpportunities,
  focusedOpportunityId: values.focusedOppId
}};

const mapDispatchToProps = dispatch => ({
  closeOppChange: () => dispatch(closeOppChange()),
  closeOppCard: () => dispatch(closeOppCard()),
  registerWaitlistFromReferral: (user) => dispatch(registerWaitlistFromReferral(user)),
  fetchOpportunities: (workspaceId, option) => dispatch(fetchOpportunities(workspaceId, option)),
  fetchWorkspaceOptions: (workspaceId) => dispatch(fetchWorkspaceOptions(workspaceId)),
  fetchCurrentUserMetrics: () => dispatch(fetchCurrentUserMetrics()),
  // createReferral: (referral) => dispatch(createReferral(referral)),
  clearOpportunityErrors: () => dispatch(clearOpportunityErrors()),
  fetchSavedOpportunities: () => dispatch(fetchSavedOpportunities()),
  fetchPassedOpportunities: () => dispatch(fetchPassedOpportunities()),
  updateTutorialStep: (index) => dispatch(updateTutorialStep(index)),
  updateUserFeature: (payload) => dispatch(updateUserFeature(payload)),
  consumeTutorialSession: () => dispatch(consumeTutorialSession())
});

const styles = theme => ({
  jumboRoot: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1,
  },
  feedCard:{
    // height: 118,
    padding: "10px 8px 12px",
    backgroundColor: `${theme.palette.base3}`,
    borderTop: `1px solid ${theme.palette.border.secondary}`,
    borderBottom: `1px solid ${theme.palette.border.secondary}`,
    width: '100%',
    marginBottom: 9,
    [theme.breakpoints.up('sm')]: {
      border: `1px solid ${theme.palette.border.secondary}`,
      // borderRadius: 5,
      padding: "10px 17px 12px",
    },
  },
  filterCard:{
    // marginTop: 18,
    backgroundColor: `${theme.palette.base3}`,
    width: '100%',
    // borderRadius: 5,
    border: `1px solid ${theme.palette.border.secondary}`
  },
  filter:{
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    },
    padding: 0,
    width: '100%'
  },
  waitlistMobileCard:{
    padding: "9px 8px 20px 8px",
    backgroundColor: `${theme.palette.base3}`,
    borderRadius:0,
    borderTop: `1px solid ${theme.palette.border.secondary}`,
    borderBottom: `1px solid ${theme.palette.border.secondary}`,
    marginBottom: 9,
    [theme.breakpoints.up('sm')]: {
      border: `1px solid ${theme.palette.border.secondary}`,
      // borderRadius: 5,
    },
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  referralCard:{
    padding: "9px 8px 20px 8px",
    backgroundColor: `${theme.palette.base3}`,
    borderRadius:0,
    borderTop: `1px solid ${theme.palette.border.secondary}`,
    borderBottom: `1px solid ${theme.palette.border.secondary}`,
    // marginTop: 9,
    [theme.breakpoints.up('sm')]: {
      padding: "10px 17px",
      // borderRadius: 5,
      border: `1px solid ${theme.palette.border.secondary}`,
    },
  },
  oppNotification:{
    borderRadius: 5,
    padding: "8px 10px",
    backgroundColor: `${theme.palette.base4}`
  },
  opportunityCard:{
    marginTop: 18,
    backgroundColor: `${theme.palette.base1}`,
    width: '100%',
    borderRadius: 5,
    border: `1px solid ${theme.palette.border.secondary}`
  },
  cover:{
    height: 140,
    width: '100%',
    objectFit: 'cover'
  },
  filterItem:{
    borderTop: `1px solid ${theme.palette.border.secondary}`,
  },
  loader:{
    padding: "164px 0px 0px 0px",
    position: 'relative',
    backgroundColor: `${theme.palette.base2}`,
    minHeight: window.innerHeight
  },
  progress:{
    color: `${theme.palette.primary.main}`
  },
  cardHeader: {
    fontSize: 14,
    fontWeight: 600
  },
  cardHeader2: {
    fontSize: 13,
    fontWeight: 600
  },
  filterHeader:{
    fontSize: 13,
    fontWeight: 600
  },
  filterSubtext:{
    fontSize: 10,
    fontWeight: 300
  },
  filterMobileHeader:{
    fontSize: 11,
    fontWeight: 600
  },
  filterMobileSubtext:{
    fontSize: 9,
    fontWeight: 300
  },
  fieldLabel:{
    fontSize: 12
  },
  filterMobile:{
    // borderTop: `1px solid ${theme.palette.lightGrey}`,
    marginTop: -9,
    // paddingTop: 9,
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  filterMobileCard:{
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  emptyOppsText:{
    fontSize: 20,
    fontWeight: 500,
    margin: 10,
    [theme.breakpoints.up('sm')]: {
      margin: 30,
    },
  },
  metric: { fontSize: 20, fontWeight: 600, color: '#404040'},
  metricName: {
    fontSize: 13,
    color: 'grey',
    textTransform: 'capitalize'
  },
  avatar:{
    height: 64,
    width: 64,
    objectFit: 'cover',
    border: `1px solid white`,
    boxShadow: `0px 1px 5px 0px rgba(0,0,0,0.2),
      0px 2px 2px 0px rgba(0,0,0,0.14),
      0px 3px 1px -2px rgba(0,0,0,0.12)`,
    backgroundColor: 'white',
    borderRadius: '50%'
  },
  column1:{
    padding: 0, width: '100%'
  },
  accountCard:{
    border: `1px solid ${theme.palette.border.secondary}`, backgroundColor: 'white'
  },
  userMetrics:{
    padding: 20, borderTop: `1px solid ${theme.palette.border.secondary}`
  },
  userName:{ fontSize: 16, fontWeight: 600, textTransform: 'capitalize' },
  profileHeader:{
    padding: 20,
    height: 150,
    backgroundImage: `url(${HomeImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative'
  },
  divider: {
    position: 'absolute',
    height: 75,
    top: 0,
    borderBottom: `1px solid ${theme.palette.border.secondary}`,
    width: 298,
    backgroundImage: "linear-gradient(rgb(128,128,128,0.4),rgb(255,255,255,0.4))"
  },
  editHover:{
    position: 'absolute',
    top: 1, left: 1,
    width: 64, height: 64,
    backgroundColor: "rgb(128,128,128,0.4)",
    borderRadius: '50%'
  },
  editHoverIcon:{
    color: 'white', width: 22, height: 22,
    borderRadius: '50%',
    backgroundColor: 'grey',
    padding: 8
  }
});

const DEFAULTSTATE = {
  opportunityNeed: '',
  geography: [],
  industries: [],
  value: '',
  title: '',
  description: '',
  // status: 'Pending',
  picture: null,
  pictureUrl: null,
  // networks: [],
  anonymous: false,
  viewType: 'post',
  // permissions: ['-Network']
}

class OpportunityHome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      opportunitiesLoaded: false,
      networksLoaded: false,
      referralLink: '',
      network: '',
      // fname: '',
      // email: '',
      // loading: false,
      success: false,
      // waitlistOpen: false,
      changeModalOpen: false,
      cardOpen: false,
      dropdownOpen: false,
      // dropdownFocus: '',
      referralNetwork: null,
      anchorEl: null,
      editHover: false,
      filters: {
        opportunityNeed: new Set(),
        industries: new Set(),
        geography: new Set(),
        value: new Set()
      },
      tutorialTourStep: 0,
      tutorialTourOpen: false,
      beenToModal: false,
      countOppsFeed: 0,
      realTimeNotificationsShown:{
        passedFocused: false
      }
    };

    this.notificationSystem = React.createRef();

    this.tutorial_steps = [
      {
        target: '.first-step-tutorial-tour',
        content: (
          <React.Fragment>
            <Grid container direction='column' alignItems='center'>
              <Img src={BridgekinLogo} alt='logo'
                style={{ height: 24, width: 'auto', marginBottom: 15}}/>
              <Typography color='textSecondary'
                data-cy='tutorial-start'
                style={{ fontSize: 15}}>
                {`Welcome to our quick tutorial. Let's get started!`}
              </Typography>
            </Grid>
          </React.Fragment>
        ),
        disableBeacon: true,
        placement: 'center'
        // content: `Welcome to our quick tutorial. Let's get started!`
      },
      {
        // title: 'Your Feed',
        target: '.feed-tutorial-tour',
        content: (
          <React.Fragment>
            <Typography color='textSecondary'
              style={{ fontSize: 15}}>
              {`This is your opportunity feed. We’ll always prioritize
                opportunities sent to you by your connections to help
                ensure relevancy.`}
            </Typography>
          </React.Fragment>
        ),
        placement: 'auto'
      },
      {
        // title: 'Connect',
        target: '.connect-step-tutorial-tour',
        content:(
          <React.Fragment>
            <Typography color='textSecondary'
              style={{ fontSize: 15}}>
              {`If you see an opportunity that’s right for you press
                connect and you’ll be connected to the opportunity owner
                via email. You’ll have the option to preview or adjust the
                email copy prior to sending.`}
            </Typography>
          </React.Fragment>
        ),
        placement: 'top',
        spotlightPadding: 0,
      },
      // {
      //   // title: 'Send Email',
      //   target: '.send-email-step-tutorial-tour',
      //   content:(
      //     <React.Fragment>
      //       <Typography color='textSecondary'
      //         style={{ fontSize: 15}}>
      //         {`By pressing send you’ll get connected with the opportunity
      //           owner via email. You can always preview and adjust the
      //           email copy.`}
      //       </Typography>
      //     </React.Fragment>
      //   ),
      //   placement: 'auto',
      //   spotlightClicks: false,
      // },
      {
        // title: 'Refer A Trusted Contact',
        target: '.refer-step-tutorial-tour',
        content: (
          <React.Fragment>
            <Typography color='textSecondary' gutterBottom
              style={{ fontSize: 15}}>
              {`You can also refer an opportunity to your trusted contact.
                Similarly you’ll get connected via email and can loop in
                your contact from there.`}
            </Typography>
          </React.Fragment>
        ),
        placement: 'top',
        spotlightPadding: 0
      },
      {
        // title: 'Create Your Opportunity',
        target: '.create-open-step-tutorial-tour',
        content:(
          <React.Fragment>
            <Typography color='textSecondary'
              style={{ fontSize: 15}}>
              {`Now let’s show you how to create your own opportunity.
                We’ll show you the steps now and you’ll be able to create
                a real opportunity after the tutorial. Click the highlighted
                area to advance.`}
            </Typography>
          </React.Fragment>
        ),
        placement: 'left',
        disableBeacon: true,
        spotlightClicks: true,
        hideFooter: true,
        // disableOverlayClose: true,
        // hideCloseButton: true,
      },
      {
        // title: 'Add Details',
        target: '.create-details-step-tutorial-tour',
        content:(
          <React.Fragment>
            <Typography color='textSecondary'
              style={{ fontSize: 15}}>
              {`Here you’ll insert a title and any additional information
                you’d like to share. You can do things like post anonymously
                or add detailed filter criteria.`}
            </Typography>
          </React.Fragment>
        ),
        disableBeacon: true,
        spotlightClicks: true,
        placement: 'auto'
      },
      {
        // title: 'Share',
        target: '.share-panel-step-tutorial-tour',
        content:(
          <React.Fragment>
            <Typography color='textSecondary'
              style={{ fontSize: 15}}>
              {`Now you’ll select who you’d like to privately share your
                opportunity with, such as specific contacts, trusted groups
                or all Bridgekin users. Click the highlighted area below to
                advance`}
            </Typography>
          </React.Fragment>
        ),
        disableBeacon: true,
        spotlightClicks: true,
        hideFooter: true,
        placement: 'auto'
      },
      {
        // title: 'Share',
        target: '.share-expanded-step-tutorial-tour',
        content:(
          <React.Fragment>
            <Typography color='textSecondary'
              style={{ fontSize: 15}}>
              {`Lastly you will select who you’d like to share with, press
                save and then post your opportunity.`}
            </Typography>
          </React.Fragment>
        ),
        placement: 'auto'
      },
      {
        // title: 'Discreet Search',
        target: '.search-bar-step-tutorial-tour',
        content:(
          <React.Fragment>
            <Typography color='textSecondary'
              style={{ fontSize: 15}}>
              {`You can find and connect to contacts you know on Bridgekin
                above. We’ll ask you to verify their email prior to sending
                an invite to help avoid unknown connection requests.`}
            </Typography>
          </React.Fragment>
        ),
        placement: 'bottom',

      },
      {
        // title: 'Invite',
        target: '.invite-step-tutorial-tour',
        content:(
          <React.Fragment>
            <Typography color='textSecondary'
              style={{ fontSize: 15}}>
              {`Remember Bridgekin is invite only to help ensure trust,
                privacy and relevancy. Get the most value from our platform
                by sending your 3 invitations to your most trusted contacts now.`}
            </Typography>
          </React.Fragment>
        ),
        placement: 'left'
      },
    ]

    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.handleDropdownClose = this.handleDropdownClose.bind(this);
    this.resetWorkspace = this.resetWorkspace.bind(this);
    this.getSelectedTitle = this.getSelectedTitle.bind(this);
    this.getSource = this.getSource.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
    this.filterOpportunities = this.filterOpportunities.bind(this);
    this.updateSource = this.updateSource.bind(this);
    this.getOpportunities = this.getOpportunities.bind(this);
    this.handleEditHover = this.handleEditHover.bind(this);
    this.sendToAccountSettings = this.sendToAccountSettings.bind(this);
    this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this);
    this.incrementStep = this.incrementStep.bind(this);
    this.getFeedCards = this.getFeedCards.bind(this);
    this.getUniqPerms = this.getUniqPerms.bind(this);
    this.getFeedCards = this.getFeedCards.bind(this);
    this.getSessionOppCards = this.getSessionOppCards.bind(this);
    this.countOppsInFeed = this.countOppsInFeed.bind(this);
    this.addNotification = this.addNotification.bind(this);
  }

  componentDidMount(){
    const { userFeature } = this.props;
    const workspaceId = this.props.siteTemplate.networkId
    if(workspaceId){this.resetWorkspace(workspaceId)}

    this.props.fetchSavedOpportunities();
    this.props.fetchCurrentUserMetrics();
    this.props.fetchPassedOpportunities();

    // const values = queryString.parse(this.props.location.search)

    // Something with ReactTour
    this.setState({
      // focusedOpportunityId: values.focusedOppId,
      tutorialTourStep: userFeature.tutorialTourStep,
      tutorialTourOpen: !Boolean(userFeature.tutorialTourDate)
    })
  }

  shouldComponentUpdate(nextProps, nextState){
    const { realTimeNotificationsShown } = this.state;

    if(nextProps.siteTemplate !== this.props.siteTemplate ||
      nextProps.source !== this.props.source ||
      nextProps.focusedOpportunityId !== this.props.focusedOpportunityId){
      // nextProps.location.search !== this.props.location.search){

      const values = queryString.parse(nextProps.location.search)
      this.setState({
        // focusedOpportunityId: values.focusedOppId,
        realTimeNotificationsShown:{
          passedFocused: false
        },
        opportunitiesLoaded: false,
        networksLoaded: false
      },
      () => {
        const workspaceId = nextProps.siteTemplate.networkId
        this.resetWorkspace(workspaceId);
      })
    }
    // if(nextState.opportunitiesLoaded &&
    //   nextState.opportunitiesLoaded !== this.props.opportunitiesLoaded){
    //   debugger
    //   // if(prevProps.passedOpps === this.props.passedOpps){
    //   // }
    //   this.addNotification();
    //   let newRTShown = Object.assign({}, realTimeNotificationsShown)
    //   newRTShown.passedFocused = true;
    //   this.setState({ realTimeNotificationsShown: newRTShown})
    // }
    return true
  }

  componentDidUpdate(prevProps, prevState){
    const { networksLoaded, realTimeNotificationsShown } = this.state;
    const { passedOpps, focusedOpportunityId } = this.props;
    // debugger
    if(this.state.opportunitiesLoaded &&
      prevState.opportunitiesLoaded !== this.state.opportunitiesLoaded &&
      passedOpps.has(parseInt(focusedOpportunityId)) &&
      !realTimeNotificationsShown.passedFocused){
      debugger
      if(prevProps.passedOpps === this.props.passedOpps){
        this.addNotification();
      }
      let newRTShown = Object.assign({}, realTimeNotificationsShown)
      newRTShown.passedFocused = true;
      this.setState({ realTimeNotificationsShown: newRTShown})
    }
  }

  resetWorkspace(workspaceId){
    this.props.fetchWorkspaceOptions(workspaceId)
    .then(() => {
      const { networks } = this.props;
      const networksArray = Object.values(networks);
      if(networksArray.length > 0){
        // Set network for referral component
        let referralNetwork = networksArray[0].id;
        let source = this.getSource();
        // Choose all opportunities for this workspace
        this.props.fetchOpportunities(workspaceId, source)
        .then(() => {
          this.setState({
            opportunitiesLoaded: true,
            networksLoaded: true,
            referralNetwork
          })
        });
      }
    })
    this.props.clearOpportunityErrors();
  }

  getSource(){
    const { source } = this.props;
    return source ? source : '';
  }

  filterOpportunities(perm){
    const { filters } = this.state;
    const { opportunities, passedOpps } = this.props;
    let opp = opportunities[perm.opportunityId]
    let keys = Object.keys(filters);

    if(!opp || passedOpps.has(opp.id)){
      return false
    }

    for(let i = 0; i < keys.length; i++){
      let key = keys[i];
      let params = filters[key];
      if (key === "geography" || key === "industries"){
        if (params.size !== 0 &&
          new Set(opp[key].filter(x => params.has(x))).size === 0){
          return false
        }
      } else {
        if (params.size !== 0 && !params.has(opp[key])){
          return false
        }
      }
    }
    return true
  }

  getDivider(type){
    switch(type){
      case "direct":
        return;
      default:
        return;
    }
  }

  getUniqPerms(){
    const { networkOppPerms } = this.props;
    return Object.values(networkOppPerms).reduce((acc, perm) => {
      if (acc[perm.opportunityId]){
        let hash = acc[perm.opportunityId];
        if (perm.shareableType === 'Connection' && !perm.mass){
          hash.sharePerms.direct.push(perm.shareableId)
        } else if (perm.shareableType === 'Connection' && perm.mass){
          hash.sharePerms.indirect.push(perm.shareableId)
        } else if (perm.shareableType === 'Network'){
          hash.sharePerms.network.push(perm.shareableId)
        }

      } else {
        let value = merge({}, perm);
        if (perm.shareableType === 'Connection' && !perm.mass){
          value.sharePerms = merge({},{'direct':[value.shareableId], 'indirect':[], 'network':[] });
        } else if (perm.shareableType === 'Connection' && perm.mass){
          value.sharePerms = merge({}, {'indirect':[value.shareableId], 'direct':[], 'network':[] });
        } else if (perm.shareableType === 'Network'){
          value.sharePerms = merge({}, {'network':[value.shareableId], 'indirect':[], 'direct':[] });
        }
        acc[perm.opportunityId] = value;
      }
      return acc
    },{})
  }

  getFocusedCard(focusedOppPerm, focusedOpportunityId, uniqPerms){
    const { opportunities } = this.props;
    let opp = opportunities[focusedOpportunityId];
    let permType = '';

    if (focusedOppPerm.sharePerms.direct.length > 0){
      permType = 'direct'
    } else if (focusedOppPerm.sharePerms.indirect.length > 0){
      permType = 'indirect'
    } else { permType = 'network'}

    return (<div style={{ borderLeft: "2px solid gold", borderRight: "2px solid gold"}}>
      <OpportunityCardFeed
        opportunity={opp}
        permission={focusedOppPerm}
        permType={permType}
        showPerms={true}/>
    </div>)
  }

  getSessionOppCards(){
    const { sessionOpportunities } = this.props;
    let sessionOppCards = Object.values(sessionOpportunities)
      .sort((a,b) => (new Date(b.createdAt)) - (new Date(a.createdAt)))
      .map(opp => (
      <OpportunityCardFeed
        opportunity={opp}/>
    ))
    let newOppDivider = (<Grid container alignItems='center'
      style={{ marginBottom: 5}}>
      <div style={{ borderTop: `1px solid grey`, width: 10}}/>
        <Typography variant="body" color="textPrimary" align='center'
          style={{ fontSize: 11, textTransform:'uppercase', margin: "0px 7px" }}>
          {`Opportunities You've Created Recently`}
        </Typography>
      <div style={{ borderTop: `1px solid grey`, flexGrow: 1}}/>
    </Grid>)

    if(sessionOppCards.length > 0){
      return [newOppDivider, ...sessionOppCards]
    }
    return []
  }

  getFeedCards(uniqPerms){
    const { opportunities } = this.props;

    let dividerMessages = {
      'direct':'Shared Directly With You',
      'indirect':'From Your Connections',
      'network':'Shared To The Bridgekin Network'}

    let direct_perms = Object.values(uniqPerms)
      .filter(uniqPerm => uniqPerm.sharePerms.direct.length > 0 )

    let indirect_perms = Object.values(uniqPerms)
      .filter(uniqPerm => (
        uniqPerm.sharePerms.direct.length === 0 &&
        uniqPerm.sharePerms.indirect.length > 0 ))

    let network_perms = Object.values(uniqPerms)
      .filter(uniqPerm => (
        uniqPerm.sharePerms.direct.length === 0 &&
        uniqPerm.sharePerms.indirect.length === 0 &&
        uniqPerm.sharePerms.network.length > 0 ))

    // let countOpps = 0;

    let results = [{perms: direct_perms, type: 'direct'},
      {perms: indirect_perms, type: 'indirect'},
      {perms: network_perms, type: 'network'}]
      .map(({perms, type}) => {
        perms = perms.filter(this.filterOpportunities)
        return {perms, type}
      })
      .filter(({perms, type}) => perms.length > 0)
      .map(({perms, type}) => {
        let divider = (
          <Grid container alignItems='center'
            style={{ marginBottom: 5}}>
            <div style={{ borderTop: `1px solid grey`, width: 10}}/>
            <Typography variant="body" color="textPrimary" align='center'
              style={{ fontSize: 11, textTransform:'uppercase', margin: "0px 7px" }}>
              {dividerMessages[type]}
            </Typography>
            <div style={{ borderTop: `1px solid grey`, flexGrow: 1}}/>
          </Grid>)

        let cards = perms.map(perm => ({
            opp: opportunities[perm.opportunityId],
            perm
          }))
          .sort((a,b) => (new Date(b.opp.createdAt)) - (new Date(a.opp.createdAt)))
          .map(({ opp, perm }) => <OpportunityCardFeed
            opportunity={opp}
            permission={perm}
            permType={type}
            showPerms={true}/> )

        // countOpps += cards.length;
        return (<div>
            {cards.length > 0 && divider}
            {cards}
          </div>)
      })
    return results
  }

  countOppsInFeed(){
    const { focusedOpportunityId, sessionOpportunities } = this.props;
    let uniqPerms = this.getUniqPerms();
    let countOpps = 0;

    if(uniqPerms[focusedOpportunityId]){
      countOpps += 1;
    }
    countOpps += Object.values(sessionOpportunities).length
    countOpps += Object.values(uniqPerms).filter(this.filterOpportunities).length
    return countOpps;
  }

  getOpportunities(){
    const { networkOppPerms, opportunities,
      passedOpps, opportunityErrors, focusedOpportunityId,
      classes } = this.props;
    const { realTimeNotificationsShown } = this.state;

    let uniqPerms = this.getUniqPerms();
    let focusedOppId = parseInt(focusedOpportunityId)

    // Check for a focused Opportunity
    let focusedOppPerm = uniqPerms[focusedOppId];
    let focusedOppCard = ''

    if (focusedOppPerm && !passedOpps.has(focusedOppId)){
      focusedOppCard = this.getFocusedCard(focusedOppPerm, focusedOppId);
      delete uniqPerms[focusedOppId];
    }
    // debugger
    // if(passedOpps.has(focusedOppId)){
    //   this.addNotification();
    //   // realTimeNotificationsShown.passed = true;
    //   // this.setState({ realTimeNotificationsShown })
    //   // setTimeout(this.addNotification, 100);
    // }
    // Get Session Cards
    let sessionOppCards = this.getSessionOppCards();
    // Get remaining feed cards
    let remainingFeedCards = this.getFeedCards(uniqPerms);

    // Update countOpps
    // countOpps += (sessionOppCards.length + (focusedOppPerm ? 1 : 0))

    if (remainingFeedCards.length > 0){
      return [focusedOppCard, ...sessionOppCards, ...remainingFeedCards]
    } else {
      let noOppMessage = opportunityErrors.length > 0 ? (
        <Typography variant="h3" color="textSecondary" align='center'
          className={classes.emptyOppsText} gutterBottom>
          {opportunityErrors[0]}
        </Typography>
      ) : (
        <Typography variant="h3" color="textSecondary" align='center'
          className={classes.emptyOppsText} gutterBottom>
          {`There are no new opportunities for you to view`}
        </Typography>
      )
      return noOppMessage
    }
  }

  updateFilters(key){
    return (params) => {
      let filters = { ...this.state.filters };
      filters[key] = new Set([...params]);
      this.setState({ filters })
    }
  }

  updateSource(value){
    this.setState({ opportunitiesLoaded: false },
    () => {
      const workspaceId = this.props.siteTemplate.networkId
      this.props.fetchOpportunities(workspaceId, value)
      .then(() => {
        if(value !== ''){
          this.props.history.push(`/findandconnect/${value}`)
        } else {
          this.props.history.push('/findandconnect')
        }
        this.setState({ opportunitiesLoaded: true });
        animateScroll.scrollTo(0);
      })
    })
    this.props.clearOpportunityErrors();
  }

  // handleDropdownChange(anchor, value){
  //   return e => {
  //     e.stopPropagation();
  //     this.setState({ opportunitiesLoaded: false },
  //     () => {
  //       const workspaceId = this.props.siteTemplate.networkId
  //       this.props.fetchOpportunities(workspaceId, value)
  //       .then(() => {
  //         if(value !== ''){
  //           this.props.history.push(`/findandconnect/${value}`)
  //         } else {
  //           this.props.history.push('/findandconnect')
  //         }
  //         this.setState({
  //           [anchor]: null,
  //           opportunitiesLoaded: true
  //         });
  //         animateScroll.scrollTo(0);
  //       })
  //     })
  //     this.props.clearOpportunityErrors();
  //   }
  // }

  // updateNetworkOpps(){
  //   const workspaceId = this.props.siteTemplate.networkId
  //   // const { dropdownFocus } = this.state;
  //   let source = this.getSource();
  //   this.props.fetchOpportunities(workspaceId, source)
  //   .then(() => animateScroll.scrollTo(0) );
  // }

  // createMenuItem(item, type){
  //   const { classes } = this.props;
  //   // const { dropdownFocus } = this.state;
  //   let source = this.getSource();
  //
  //   return (
  //     <MenuItem value={`${item.id}-${type}`}
  //       className={classes.dropdownMenuItem}
  //       onClick={this.handleDropdownChange('filterMobileAnchorEl', `${item.id}-${type}`)}
  //       selected={source === `${item.id}-${type}`}
  //       style={{ paddingLeft: 0}}>
  //       <Grid container alignItems='center'>
  //         <Checkbox checked={source === `${item.id}-${type}`}/>
  //         <div style={{ display: 'inline'}}>
  //           <Typography variant="h6" align='left'
  //             color="textPrimary" className={classes.filterMobileHeader}>
  //             {item.title}
  //           </Typography>
  //           <Typography variant="body2" align='left'
  //             color="textPrimary" className={classes.filterMobileSubtext}>
  //             {item.subtitle}
  //           </Typography>
  //         </div>
  //       </Grid>
  //     </MenuItem>
  //   )
  // }

  // createListItem(item, type){
  //   const { classes } = this.props;
  //   // const { dropdownFocus } = this.state;
  //   let source = this.getSource();
  //
  //   return (
  //     <ListItem button value={`${item.id}-${type}`}
  //       className={classes.filterItem}
  //       onClick={this.handleDropdownChange('anchorEl', `${item.id}-${type}`)}
  //       selected={source === `${item.id}-${type}`}>
  //       <div>
  //         <Typography variant="h6" align='left'
  //           color="textPrimary" className={classes.filterHeader}>
  //           {item.title}
  //         </Typography>
  //         <Typography variant="body2" align='left'
  //           color="textPrimary" className={classes.filterSubtext}>
  //           {item.subtitle}
  //         </Typography>
  //       </div>
  //     </ListItem>
  //   )
  // }
  //
  // setSources(setting){
  //   const { workspaceOptions, networks, circles,
  //     classes, currentUser } = this.props;
  //   let optionsArray = [...workspaceOptions]
  //
  //   let networkHeader = <ListItem disabled
  //     className={classes.filterItem}>
  //       {`Networks:`}
  //     </ListItem>
  //
  //   let networkItems = optionsArray.filter(x => x.includes('Network'))
  //     .map(x => networks[x.split('-')[0]])
  //     .map(network => {
  //       if (setting === 'List'){
  //         return this.createListItem(network, 'network')
  //       } else {
  //         return this.createMenuItem(network, 'network')
  //       }
  //     })
  //
  //   let circleHeader = <ListItem disabled
  //     className={classes.filterItem}>
  //       {`Circles:`}
  //     </ListItem>
  //
  //   let circleItems = optionsArray.filter(x => x.includes('Circle'))
  //     .map(x => circles[x.split('-')[0]])
  //     .map(circle => {
  //       if (setting === 'List'){
  //         return this.createListItem(circle, 'Circle')
  //       } else {
  //         return this.createMenuItem(circle, 'Circle')
  //       }
  //     })
  //
  //   if (currentUser.isAdmin){
  //     return [].concat(networkHeader, networkItems, circleHeader,
  //       circleItems)
  //   } else {
  //     return [].concat(networkHeader, networkItems)
  //   }
  //   // return [].concat(networkHeader, networkItems)
  // }

  getSelectedTitle(source){
    const { networks } = this.props;
    switch(source){
      case '': return "All Opportunities";
      case 'all-networks': return "All Networks";
      case 'all-connections': return 'All Connections';
      case 'direct-connection': return "Direct Opportunities";
      case source.includes('network'):
        return `${networks[source.split('-').unshift()]}`;
      default:
        return "None"
    }
  }

  handleModalClose(modal){
    return e => {
      this.setState({ [modal]: false });
    }
  }

  // handleOpportunityChangeModalOpen(e){
  //   e.preventDefault();
  //   this.setState({ changeModalOpen: true });
  // }

  // handleReferralChange(e){
  //   this.setState({ referralNetwork: e.target.value})
  // }

  // handleReferralSubmit(){
  //   this.props.createReferral({
  //     network_id: this.state.referralNetwork
  //   })
  // }

  handleDropdownClick(anchor){
    return e => {
      e.stopPropagation();
      this.setState({ [anchor]: e.currentTarget });
    }
  };

  handleDropdownClose(anchor){
    return e => {
      e.stopPropagation();
      this.setState({ [anchor]: null });
    }
  };

  handleEditHover(open){
    return e => {
      e.stopPropagation();
      this.setState({ editHover: open})
    }
  }

  handleJoyrideCallback(data){
    const { action, index, status, type } = data;
    // debugger
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status) ||
      action === 'close') {
      const { userFeature } = this.props;
      let tutorialTourDate = (
        userFeature.tutorialTourStep === this.tutorial_steps.length ||
        action === 'skip') ?
        new Date() : null
      // debugger
      let payload = {
        tutorialTourDate,
        tutorialTourSession: new Date(),
        id: userFeature.id
      }
      this.props.updateUserFeature(payload);
      this.props.closeOppCard()
      this.props.closeOppChange()
    } else if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)){
      // Update state to advance the tour
      if ((action === 'next' && index === 7) ||
        (action === 'prev' && index === 5)){
        this.props.closeOppChange()
      }
      this.incrementStep(index, action)
    }
  }

  incrementStep(index, action){
    let newIndex = index + (action === ACTIONS.PREV ? -1 : 1)
    this.props.updateTutorialStep(newIndex)
  }

  sendToAccountSettings(e){
    e.stopPropagation();
    this.props.history.push('/account/settings');
  }

  addNotification(){
    // e.preventDefault();
    const notification = this.notificationSystem.current;
    let { realTimeNotificationsShown } = this.state;

    if(!realTimeNotificationsShown.passed){
      notification.addNotification({
        title: `Already Passed`,
        message: `You've already passed on this opportunity. To find it, head
        to Account > Connected/Posted Opportunities to see opportunities you've passed.`,
        level: 'error',
        position: `tc`,
        autoDismiss: 5
      });
    }
  };

  capitalize(str){
    return str[0].toUpperCase() + str.slice(1)
  }

  render (){
    const { classes, opportunities, networks, workspaceOptions,
      referral, currentUser, networkOpps, siteTemplate,
      workspaces, opportunityErrors, userMetrics,
      userFeature } = this.props;

    const { loading, changeModalOpen, referralNetwork,
        dropdownFocus, opportunitiesLoaded,
        filterMobileAnchorEl, networksLoaded,
        filters, editHover, tutorialTourOpen,
        tutorialTourStep, focusedOpportunityId} = this.state;

    const networksArray = [...workspaceOptions]
      .filter(x => x.includes('Network'))
      .map(x => networks[x.split('-')[0]])

    // const workspaceId = siteTemplate.networkId;
    // const formattedNetworks = networksArray.map(network => (
    //   Object.assign({}, network, {type: 'network'})
    // ))

    // const loader = (
    //   <Grid container justify='center' alignItems='center'
    //     className={classes.loader}>
    //     <CircularProgress className={classes.progress} />
    //   </Grid>
    // )
    // let notificationSystem = <NotificationSystem ref={this.notificationSystem} />
    let notificationSystem = <NotificationSystem ref={this.notificationSystem} />

    if(networksLoaded){
      let source = this.getSource();

      let tourStrings = {
        back: 'Back', close: 'Close', last: 'Finish',
        next: 'Next', skip: 'Skip Tutorial'
      }

      let tutorialTour = <div style={{ outline: 'none'}}>
        {this.props.width &&
        <Joyride
          callback={this.handleJoyrideCallback}
          steps={this.tutorial_steps}
          run={!Boolean(userFeature.tutorialTourSession) &&
            !Boolean(userFeature.tutorialTourDate)}
          stepIndex={userFeature.tutorialTourStep}
          spotlightClicks={true}
          continuous={true}
          locale={tourStrings}
          showSkipButton
          styles={{
            options: {
              arrowColor: '#FFF',
              backgroundColor: '#FFF',
              primaryColor: '#000',
              zIndex: 10000000,
              fontSize: 10,
              outline: 'none',
              borderRadius: 0
            },
          }}
        />}
      </div>

      const opportunityCards = (!Boolean(userFeature.tutorialTourSession) && !Boolean(userFeature.tutorialTourDate)) ?
        <ExampleCard /> :
        this.getOpportunities();

      const column1 = (
        <Grid container justify='center' alignItems='center'
          className={classes.column1}>
          <Grid container className={classes.accountCard}>

            <Grid container justify='center'
              className={classes.profileHeader}>

              <div className={classes.divider} />

              <Grid container direction='column' alignItems='center'
                style={{ width: 300, position: 'absolute', top: 30}}>
                <div
                  style={{ position: 'relative'}}
                  onMouseEnter={this.handleEditHover(true)}
                  onMouseLeave={this.handleEditHover(false)}>
                  {currentUser.profilePicUrl ? (
                    <Avatar alt="profile-pic"
                      src={currentUser.profilePicUrl}
                      className={classes.avatar} />
                  ) : (
                    <AccountCircle className={classes.avatar}/>
                  )}
                  {editHover && <Grid container justify='center'
                    alignItems='center'
                    onClick={this.sendToAccountSettings}
                    className={classes.editHover}>
                    <EditIcon className={classes.editHoverIcon}/>
                  </Grid>}
                </div>
                <Grid item xs={8} container justify='center'>
                  <Typography align='center' color='textPrimary'
                    className={classes.userName}>
                    {`${currentUser.fname} ${currentUser.lname}`}
                  </Typography>
                </Grid>
                <Grid item xs={8} container justify='center'>
                  <Typography variant="body1" align='center' color="textSecondary"
                    style={{ fontSize: 10, fontWeight: 400, width:'100%', textTransform: 'capitalize'}}>
                    {currentUser.title && `${currentUser.title} @ `}
                    {currentUser.company && `${currentUser.company}`}
                  </Typography>
                </Grid>
              </Grid>

            </Grid>

            <Grid container justify='space-between'
              className={classes.userMetrics}>
              <Grid item xs={12} container justify='space-between'
                alignItems='center'>
                <Typography align='center' color='textSecondary'
                  style={{ fontSize: 12, textTransform: 'uppercase'}}>
                  {`Opportunities in your feed`}
                </Typography>
                <Typography align='center' color='textPrimary'
                  style={{ fontSize: 16, fontWeight: 600}}>
                  {/*`${userMetrics.receivedOpps || 0}`*/}
                  {this.countOppsInFeed()}
                </Typography>
              </Grid>
              <Grid item xs={12} container justify='space-between'
                alignItems='center'>
                <Typography align='center' color='textSecondary'
                  onClick={() => this.props.history.push('/account/opportunities?oppFilter=connected')}
                  style={{ fontSize: 12, textTransform: 'uppercase', cursor: 'pointer'}}>
                  {`Opportunity connections made`}
                </Typography>
                <Typography align='center' color='textPrimary'
                  style={{ fontSize: 16, fontWeight: 600}}>
                  {`${userMetrics.connectedOpps || 0}`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )

      const column2 = (<Grid container justify='center'
        alignItems='center' style={{ padding: 0, width: '100%' }}>
          <div className={['invite-step-tutorial-tour', classes.feedCard].join(' ')}
            style={{ padding: "10px 17px" }}>
            <OpportunityWaitlist
              currentUser={currentUser}
              />
          </div>

          {this.props.currentUser.isAdmin &&
            <div className={classes.feedCard}>
              <OpportunityReferral />
            </div>}

          <div style={{ height: 50, width: '100%'}}/>
        </Grid>)

      const feed = (
        <Grid container justify='center' alignItems='center'>
          <div style={{ overflow: 'scroll', paddingBottom:50,
            width: '100%'}}>
            <CreateOppButton />
            <div className='first-step-tutorial-tour'/>
            <div className='feed-tutorial-tour'>
              {/* Tutorial Line Break */}
              {(!Boolean(userFeature.tutorialTourSession) &&
                !Boolean(userFeature.tutorialTourDate)) &&
                <Grid container alignItems='center'
                  style={{ marginBottom: 5}}>
                  <div style={{ borderTop: `1px solid grey`, width: 10}}/>
                  <Typography variant="body" color="textPrimary" align='center'
                    style={{ fontSize: 11, textTransform:'uppercase', margin: "0px 7px" }}>
                    {`Shared Directly With You`}
                  </Typography>
                  <div style={{ borderTop: `1px solid grey`, flexGrow: 1}}/>
                </Grid>}
              {opportunitiesLoaded ? opportunityCards :
                (<div style={{ marginTop: 50 }}>
                  <Loading/>
                </div>)}
            </div>

            <div className={classes.waitlistMobileCard}>
              <OpportunityWaitlist
                className='invite-step-tutorial-tour'
                handleSubmit={this.handleWaitlistSubmit}
                loading={loading}
                currentUser={currentUser}
                />
            </div>

            {opportunitiesLoaded &&
              this.props.currentUser.isAdmin &&
              <div className={classes.waitlistMobileCard}>
                <OpportunityReferral />
              </div>}
            </div>
          </Grid>
        )

        return (
          <div style={{flexGrow: 1}}>
            {tutorialTour}
            <FilterBar
              updateSource={this.updateSource}
              updateFilters={this.updateFilters}
              filters={filters}/>
            <FeedContainer
              column1={column1}
              feed={feed}
              column2={column2}
              home={true}/>
            {notificationSystem}
          </div>
        )
    } else {
      return (
        <Grid container justify='center' alignItems='flex-start'
          className={classes.loader}>
          <CircularProgress className={classes.progress} />
        </Grid>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(withWidth()(OpportunityHome))));

// <WaitlistModal
//   open={waitlistOpen}
//   handleClose={this.handleModalClose('waitlistOpen')}
//   referred={true}/>
