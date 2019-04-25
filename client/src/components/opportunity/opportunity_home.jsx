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
import { clearOpportunityErrors } from '../../actions/error_actions';
import { openOppChange, closeOppChange } from '../../actions/modal_actions';
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
import merge from 'lodash/merge';

import Tour from 'reactour';
import Joyride, { ACTIONS, EVENTS, LIFECYCLE, STATUS } from 'react-joyride';
import ExampleCard from './example_card';
import BridgekinLogo from '../../static/Bridgekin_Logo.png'
// import Loading from '../loading';

const mapStateToProps = (state, ownProps) => ({
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
});

const mapDispatchToProps = dispatch => ({
  openOppChange: (payload) => dispatch(openOppChange(payload)),
  openOppChangeAsync: (payload) => {
    return Promise.resolve(dispatch(openOppChange(payload)))
  },
  updateTutorialStep: (index) => dispatch(updateTutorialStep(index)),
  closeOppChange: () => dispatch(closeOppChange()),
  registerWaitlistFromReferral: (user) => dispatch(registerWaitlistFromReferral(user)),
  fetchOpportunities: (workspaceId, option) => dispatch(fetchOpportunities(workspaceId, option)),
  fetchWorkspaceOptions: (workspaceId) => dispatch(fetchWorkspaceOptions(workspaceId)),
  fetchCurrentUserMetrics: () => dispatch(fetchCurrentUserMetrics()),
  // createReferral: (referral) => dispatch(createReferral(referral)),
  clearOpportunityErrors: () => dispatch(clearOpportunityErrors()),
  fetchSavedOpportunities: () => dispatch(fetchSavedOpportunities()),
  fetchPassedOpportunities: () => dispatch(fetchPassedOpportunities()),
  updateUserFeature: (payload) => dispatch(updateUserFeature(payload))
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

const openOppChangeClosure = () => {
  let payload = {
    opportunity: DEFAULTSTATE,
    mode: 'create'
  }
  debugger
  openOppChange(payload);
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
      beenToModal: false
    };

    this.tutorial_steps = [
      {
        target: '.first-step-tutorial-tour',
        content: (
          <React.Fragment>
            <Grid container direction='column' alignItems='center'>
              <Img src={BridgekinLogo} alt='logo'
                style={{ height: 24, width: 'auto', marginBottom: 15}}/>
              <Typography color='textSecondary'
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
        title: 'Your Feed',
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
        title: 'Connect',
        target: '.connect-step-tutorial-tour',
        content:(
          <React.Fragment>
            <Typography color='textSecondary'
              style={{ fontSize: 15}}>
              {`If you see an opportunity that’s right for you, press
              connect and you’ll get introduced to the opportunity owner via
              email.`}
            </Typography>
          </React.Fragment>
        ),
        placement: 'top'
      },
      {
        title: 'Refer A Trusted Contact',
        target: '.refer-step-tutorial-tour',
        content: (
          <React.Fragment>
            <Typography color='textSecondary' gutterBottom
              style={{ fontSize: 15}}>
              {`If the opportunity may be right for a trusted contact in
              your network, press refer and you’ll get introduced via email and can
              then loop in your contact accordingly.`}
            </Typography>
            <Typography color='textSecondary'
              style={{ fontSize: 15}}>
              {`Whether connecting or referring you can always preview the email prior to sending.`}
            </Typography>
          </React.Fragment>
        ),
        placement: 'top'
      },
      {
        title: 'Create Your Opportunity',
        target: '.create-open-step-tutorial-tour',
        content:(
          <React.Fragment>
            <Typography color='textSecondary'
              style={{ fontSize: 15}}>
              {`You can create your own opportunity by clicking above. Go ahead, click!`}
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
        title: 'Add Details',
        target: '.create-details-step-tutorial-tour',
        content:(
          <React.Fragment>
            <Typography color='textSecondary'
              style={{ fontSize: 15}}>
              {`Insert a title and any additional information you’d like to share. You
              can do things like post anonymously or add detailed filter criteria.`}
            </Typography>
          </React.Fragment>
        ),
        disableBeacon: true,
        spotlightClicks: true,
        placement: 'auto'
      },
      {
        title: 'Share',
        target: '.share-panel-step-tutorial-tour',
        content:(
          <React.Fragment>
            <Typography color='textSecondary'
              style={{ fontSize: 15}}>
              {`Click here to privately share your opportunity with specific contacts,
              trusted groups or all Bridgekin users.`}
            </Typography>
          </React.Fragment>
        ),
        disableBeacon: true,
        spotlightClicks: true,
        hideFooter: true,
        placement: 'auto'
      },
      {
        title: 'Share',
        target: '.share-expanded-step-tutorial-tour',
        content:(
          <React.Fragment>
            <Typography color='textSecondary'
              style={{ fontSize: 15}}>
              {`You can choose the right audience to share your opportunity,
              whether they be networks or specific connctions. Your selections
              will show up the top of the panel.`}
            </Typography>
          </React.Fragment>
        ),
        placement: 'top'
      },
      {
        title: 'Discreet Search',
        target: '.search-bar-step-tutorial-tour',
        content:(
          <React.Fragment>
            <Typography color='textSecondary'
              style={{ fontSize: 15}}>
              {`Using the search bar above, find and connect to contacts
              you know on Bridgekin by entering their name here. We’ll ask you
              to verify their email address prior to sending an invite to help
              avoid unknown connection requests.`}
            </Typography>
          </React.Fragment>
        ),
        placement: 'bottom',

      },
      {
        title: 'Invite',
        target: '.invite-step-tutorial-tour',
        content:(
          <React.Fragment>
            <Typography color='textSecondary'
              style={{ fontSize: 15}}>
              {`To help ensure trust, privacy and relevancy Bridgekin
              is invite only. You have 3 invitations, get the most value from
              the platform by inviting your trusted contact now.`}
            </Typography>
          </React.Fragment>
        ),
        placement: 'left'
      },
    ]

    this.handleModalClose = this.handleModalClose.bind(this);
    // this.handleWaitlistSubmit = this.handleWaitlistSubmit.bind(this);
    // this.handleReferralChange = this.handleReferralChange.bind(this);
    // this.handleReferralSubmit = this.handleReferralSubmit.bind(this);
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.handleDropdownClose = this.handleDropdownClose.bind(this);
    // this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.resetWorkspace = this.resetWorkspace.bind(this);
    // this.handleOpportunityChangeModalOpen = this.handleOpportunityChangeModalOpen.bind(this);
    // this.updateNetworkOpps = this.updateNetworkOpps.bind(this);
    // this.setSources = this.setSources.bind(this);
    // this.createMenuItem = this.createMenuItem.bind(this);
    // this.createListItem = this.createListItem.bind(this);
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
  }

  componentDidMount(){
    const { userFeature } = this.props;
    const workspaceId = this.props.siteTemplate.networkId
    if(workspaceId){this.resetWorkspace(workspaceId)}

    this.props.fetchSavedOpportunities();
    this.props.fetchCurrentUserMetrics();
    this.props.fetchPassedOpportunities();

    // Something with ReactTour
    this.setState({
      tutorialTourStep: userFeature.tutorialTourStep,
      tutorialTourOpen: !Boolean(userFeature.tutorialTourDate)
    })
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.siteTemplate !== this.props.siteTemplate){
      this.setState({
        opportunitiesLoaded: false,
        networksLoaded: false
      },
      () => {
        const workspaceId = nextProps.siteTemplate.networkId
        this.resetWorkspace(workspaceId);
      })
    }
    return true
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
            referralNetwork})
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

  getOpportunities(){
    const { networkOppPerms, opportunities,
      passedOpps, opportunityErrors, classes } = this.props;

    let uniqPerms = Object.values(networkOppPerms).reduce((acc, perm) => {
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

    let direct_perms = Object.values(uniqPerms)
      .filter(uniqPerm => uniqPerm.sharePerms.direct.length > 0 )

    let indirect_perms = Object.values(uniqPerms)
      .filter(uniqPerm => (
        uniqPerm.sharePerms.direct.length === 0 &&
        uniqPerm.sharePerms.indirect.length > 0
      ))

    let network_perms = Object.values(uniqPerms)
      .filter(uniqPerm => (
        uniqPerm.sharePerms.direct.length === 0 &&
        uniqPerm.sharePerms.indirect.length === 0 &&
        uniqPerm.sharePerms.network.length > 0
      ))

    let dividerMessages = {
      'direct':'Shared Directly With You',
      'indirect':'From Your Connections',
      'network':'Shared To The Bridgekin Network',
    }

    let results = [{perms: direct_perms, type: 'direct'},
      {perms: indirect_perms, type: 'indirect'},
      {perms: network_perms, type: 'network'}]
      .map(({perms, type}) => {
        perms = perms.filter(this.filterOpportunities)
        return {perms, type}
      })
      .filter(({perms, type}) => perms.length > 0)
      .map(({perms, type}) => {
        let divider = <Grid container alignItems='center'
          style={{ marginBottom: 5}}>
          <div style={{ borderTop: `1px solid grey`, width: 10}}/>
          <Typography variant="body" color="textPrimary" align='center'
            style={{ fontSize: 11, textTransform:'uppercase', margin: "0px 7px" }}>
            {dividerMessages[type]}
          </Typography>
          <div style={{ borderTop: `1px solid grey`, flexGrow: 1}}/>
        </Grid>

        let cards = perms.map(perm => ({
            opp: opportunities[perm.opportunityId],
            perm
          }))
          .sort((a,b) => (new Date(b.opp.createdAt)) - (new Date(a.opp.createdAt)))
          .map(({ opp, perm }) => <OpportunityCardFeed
            opportunity={opp}
            permission={perm}
            permType={type}
            showPerms={true}/>
          )

        return (
          <div>
            {cards.length > 0 && divider}
            {cards}
          </div>
        )
      })

    if (results.length > 0){
      return results
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
    // let mapping = {
    //   '': "All Opportunities",
    //   'all-network': "All Networks"
    // }
    // return mapping[filter];
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
      // Need to set our running state to false, so we can restart if we click start again.
      this.setState({ tutorialTourOpen: false },
      () => {
        const { userFeature } = this.props;
        let tutorialTourDate = (
          userFeature.tutorialTourStep === this.tutorial_steps.length ||
          action === 'skip') ?
          new Date() : null
        // debugger
        let payload = {
          tutorialTourDate,
          id: userFeature.id
        }
        this.props.updateUserFeature(payload);
        this.props.updateTutorialStep(0);
      });
    } else if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)){
      // Update state to advance the tour
      this.incrementStep(index, action)
      if (index === 7 ){
        this.props.closeOppChange()
      }
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

  capitalize(str){
    return str[0].toUpperCase() + str.slice(1)
  }

  render (){
    const { classes, opportunities, networks, workspaceOptions,
      referral, currentUser, networkOpps, siteTemplate,
      workspaces, opportunityErrors, userMetrics,
      userFeature} = this.props;

    const { loading, changeModalOpen, referralNetwork,
        dropdownFocus, opportunitiesLoaded,
        filterMobileAnchorEl, networksLoaded,
        filters, editHover, tutorialTourOpen,
        tutorialTourStep} = this.state;

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

    if(networksLoaded){
      let source = this.getSource();

      let tourStrings = {
        back: 'Back', close: 'Close', last: 'Finish',
        next: 'Next', skip: 'Skip Tutorial'
      }

      let tutorialTour =
        <div style={{ outline: 'none'}}>
          {this.props.width &&
          <Joyride
            callback={this.handleJoyrideCallback}
            steps={this.tutorial_steps}
            run={tutorialTourOpen}
            stepIndex={userFeature.tutorialTourStep}
            spotlightClicks={true}
            continuous={true}
            locale={tourStrings}
            showSkipButton
            styles={{
              options: {
                arrowColor: '#000',
                backgroundColor: '#FFF',
                primaryColor: '#000',
                zIndex: 10000000,
                fontSize: 10,
                outline: 'none'
              },
            }}
          />}
        </div>

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
                  {`Opportunities sent to you`}
                </Typography>
                <Typography align='center' color='textPrimary'
                  style={{ fontSize: 16, fontWeight: 600}}>
                  {`${userMetrics.receivedOpps || 0}`}
                </Typography>
              </Grid>
              <Grid item xs={12} container justify='space-between'
                alignItems='center'>
                <Typography align='center' color='textSecondary'
                  style={{ fontSize: 12, textTransform: 'uppercase'}}>
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

      // const genericDropdownOptions = currentUser.isAdmin ? [
      //   {header: 'All Opportunities' , subHeader: `Everything visible to you and the ${workspaces[siteTemplate.networkId].title} network`,
      //     value: '', disabled: false},
      //   {header: 'All Networks' , subHeader: 'Opportunities posted within my networks',
      //     value: 'all-networks', disabled: false},
      //   {header: 'All Connections' , subHeader: 'Opportunities posted by my connections',
      //     value: 'all-connections',disabled: false},
      //   // {header: 'All Circles' , subHeader: 'Opportunities posted within my circles',
      //   //   value: 'All-Circle',disabled: false},
      //   {header: 'Direct Opportunities' , subHeader: 'Opportunities sent directly to me from my connections',
      //     value: 'direct-connections', disabled: false},
      //   ] : [
      //   {header: 'All Opportunities' , subHeader: `Everything visible to you and the ${workspaces[siteTemplate.networkId].title} network`,
      //   value: '', disabled: false},
      //   // {header: 'All Networks' , subHeader: 'Opportunities posted within my networks',
      //   //   value: 'All-Network',disabled: false}
      //   ]

      // const filterMobile = (
      //   <Grid container justify='flex-end'
      //     className={classes.filterMobile}>
      //     <Button
      //       aria-owns={filterMobileAnchorEl ? 'simple-menu' : undefined}
      //       aria-haspopup="true"
      //       onClick={this.handleDropdownClick('filterMobileAnchorEl')}
      //       >
      //       <Typography variant="subtitle1" align='left'
      //         color="textPrimary" style={{ fontSize: 12, fontWeight: 300}}>
      //         {"View By:"}
      //       </Typography>
      //       <Typography variant="subtitle1" align='left'
      //         color="textPrimary"
      //         style={{ fontWeight: 600, marginLeft: 10, fontSize: 12, textTransform: 'capitalize'}}>
      //         {this.getSelectedTitle(source)}
      //       </Typography>
      //       <KeyboardArrowDownIcon />
      //     </Button>
      //
      //     {opportunitiesLoaded &&
      //       <Menu
      //         id="simple-menu"
      //         anchorEl={filterMobileAnchorEl}
      //         open={Boolean(filterMobileAnchorEl)}
      //         onClose={this.handleDropdownClose('filterMobileAnchorEl')}
      //         style={{ padding: 0 }}
      //         anchorOrigin={{
      //           vertical: 'bottom',
      //           horizontal: 'right',
      //         }}
      //         transformOrigin={{
      //           vertical: 'top',
      //           horizontal: 'right',
      //         }}
      //         >
      //         {genericDropdownOptions.map(other => (
      //           <MenuItem
      //             onClick={this.handleDropdownChange('filterMobileAnchorEl', other.value)}
      //             className={classes.dropdownMenuItem}
      //             disabled={other.disabled}
      //             style={{ paddingLeft: 0}}>
      //             <Grid container alignItems='center'>
      //               <Checkbox checked={source === other.value}/>
      //               <div style={{ display: 'inline'}}>
      //                 <Typography variant="h6" align='left'
      //                   color="textPrimary" className={classes.filterMobileHeader}>
      //                   {other.header}
      //                 </Typography>
      //                 <Typography variant="body2" align='left'
      //                   color="textPrimary" className={classes.filterMobileSubtext}>
      //                   {other.subHeader}
      //                 </Typography>
      //               </div>
      //             </Grid>
      //           </MenuItem>
      //         ))}
      //         {this.setSources('Menu')}
      //
      //       </Menu>}
      //     </Grid>
      //   )

      // const filterDesktop = (
      //   <Grid container justify='center' alignItems='center'
      //     className={classes.filter}>
      //     <div className={classes.filterCard}>
      //       <Typography align='left'
      //         className={classes.cardHeader}
      //         style={{ margin: "10px 20px 0px"}}>
      //         {`Whose opportunities would you like to see?`}
      //       </Typography>
      //
      //       <List component="nav">
      //         {genericDropdownOptions.map(other => (
      //           <ListItem button value={other.value}
      //             className={classes.filterItem}
      //             onClick={this.handleDropdownChange('anchorEl', other.value)}
      //             disabled={other.disabled}
      //             selected={source === other.value}>
      //             <div>
      //               <Typography variant="h6" align='left'
      //                 color="textPrimary" className={classes.filterHeader}>
      //                 {other.header}
      //               </Typography>
      //               <Typography variant="body2" align='left'
      //                 color="textPrimary" className={classes.filterSubtext}>
      //                 {other.subHeader}
      //               </Typography>
      //             </div>
      //           </ListItem>
      //         ))}
      //         {networksLoaded && this.setSources('List')}
      //       </List>
      //     </div>
      //   </Grid>
      // )

      const column2 = (
        <Grid container justify='center' alignItems='center'
          style={{ padding: 0, width: '100%' }}>
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
        </Grid>
      )

      const opportunityCards = tutorialTourOpen ? <ExampleCard />:
        this.getOpportunities();

      const feed = (
        <Grid container justify='center' alignItems='center'
          className='feed-tutorial-tour'>
          <div style={{ overflow: 'scroll', paddingBottom:50,
            width: '100%'}}>
            <CreateOppButton />
            <div className='first-step-tutorial-tour'/>
            {/*<Grid container justify='flex-end'
              className={classes.filterMobileCard}>
              {filterMobile}
            </Grid>*/}

            {opportunitiesLoaded ? opportunityCards :
              (<div style={{ marginTop: 50 }}>
                <Loading/>
              </div>)}

            <div className={['invite-step-tutorial-tour', classes.waitlistMobileCard].join(' ')}>
              <OpportunityWaitlist
                handleSubmit={this.handleWaitlistSubmit}
                loading={loading}
                currentUser={currentUser}
                />
            </div>

            {opportunitiesLoaded &&
              this.props.currentUser.isAdmin &&
              <div className={classes.waitlistMobileCard}>
                <OpportunityReferral />
                {/*<OpportunityReferral
                  referralNetwork={referralNetwork}
                  referral={referral}
                  networks={networksArray}
                  handleChange={this.handleReferralChange}
                  handleSubmit={this.handleReferralSubmit}
                  />*/}
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

            {/*<OpportunityChangeModal
              open={changeModalOpen}
              handleClose={this.handleModalClose('changeModalOpen')}
              updateNetworkOpps={this.updateNetworkOpps}
              currentUser={currentUser}
              opportunity={DEFAULTSTATE}
              type={'create'} />*/}
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
