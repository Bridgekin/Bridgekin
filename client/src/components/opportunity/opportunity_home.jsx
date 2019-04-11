import React from 'react';
import { connect } from 'react-redux';

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
import { clearOpportunityErrors } from '../../actions/error_actions';
import OpportunityChangeModal from './opportunity_change_modal';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDownSharp';
import { PickImage } from '../../static/opportunity_images/image_util.js';
import { animateScroll } from 'react-scroll';

import PictureIconSVG from '../../static/opp_feed_icons/picture.svg'
import ShareIconSVG from '../../static/opp_feed_icons/share.svg'
import PrivacyIconSVG from '../../static/opp_feed_icons/privacy.svg'
import PersonIcon from '@material-ui/icons/PersonSharp';

import FeedContainer from '../feed_container';
import FeedCard from '../feed_card';
// import Loading from '../loading';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  waitlistErrors: state.errors.waitlistUsers,
  opportunityErrors: state.errors.opportunities,
  opportunities: state.entities.opportunities,
  networkOpps: state.entities.networkOpps,
  networks: state.entities.networks,
  circles: state.entities.circles,
  workspaceOptions: state.entities.workspaceOptions,
  referral: state.entities.referral,
  siteTemplate: state.siteTemplate,
  workspaces: state.workspaces,
  filter: ownProps.match.params.filter,
});

const mapDispatchToProps = dispatch => ({
  registerWaitlistFromReferral: (user) => dispatch(registerWaitlistFromReferral(user)),
  fetchOpportunities: (workspaceId, option) => dispatch(fetchOpportunities(workspaceId, option)),
  fetchWorkspaceOptions: (workspaceId) => dispatch(fetchWorkspaceOptions(workspaceId)),
  createReferral: (referral) => dispatch(createReferral(referral)),
  clearOpportunityErrors: () => dispatch(clearOpportunityErrors()),
  fetchSavedOpportunities: () => dispatch(fetchSavedOpportunities())
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
    padding: "9px 8px 20px 8px",
    backgroundColor: `${theme.palette.base3}`,
    borderTop: `1px solid ${theme.palette.border.primary}`,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    width: '100%',
    marginBottom: 9,
    [theme.breakpoints.up('sm')]: {
      border: `1px solid ${theme.palette.border.primary}`,
      borderRadius: 5,
      padding: "9px 17px 20px",
    },
  },
  filterCard:{
    // marginTop: 18,
    backgroundColor: `${theme.palette.base3}`,
    width: '100%',
    borderRadius: 5,
    border: `1px solid ${theme.palette.border.primary}`
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
    borderTop: `1px solid ${theme.palette.border.primary}`,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    marginBottom: 9,
    [theme.breakpoints.up('sm')]: {
      border: `1px solid ${theme.palette.border.primary}`,
      borderRadius: 5,
    },
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  referralCard:{
    padding: "9px 8px 20px 8px",
    backgroundColor: `${theme.palette.base3}`,
    borderRadius:0,
    borderTop: `1px solid ${theme.palette.border.primary}`,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    // marginTop: 9,
    [theme.breakpoints.up('sm')]: {
      padding: "10px 17px",
      borderRadius: 5,
      border: `1px solid ${theme.palette.border.primary}`,
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
    border: `1px solid ${theme.palette.border.primary}`
  },
  cover:{
    height: 140,
    width: '100%',
    objectFit: 'cover'
  },
  filterItem:{
    borderTop: `1px solid ${theme.palette.border.secondary}`,
  },
  avatar:{
    height: 55,
    width: 55,
    color: theme.palette.text.primary
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
  createFilterMain:{
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    height: 85
  },
  createFilterButton:{
    textTransform: 'none',
    backgroundColor: theme.palette.base4,
    margin: "5px 10px 5px 0px",
    fontSize: 12
  },
  filterButtonIcon:{
    width: 14,
    marginRight: 3,
    color: '#000000'
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
    fontSize: 26,
    fontWeight: 500,
    margin: 10,
    [theme.breakpoints.up('sm')]: {
      margin: 40,
    },
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
      anchorEl: null
    };

    this.handleModalClose = this.handleModalClose.bind(this);
    // this.handleWaitlistSubmit = this.handleWaitlistSubmit.bind(this);
    this.handleReferralChange = this.handleReferralChange.bind(this);
    this.handleReferralSubmit = this.handleReferralSubmit.bind(this);
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.handleDropdownClose = this.handleDropdownClose.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.resetWorkspace = this.resetWorkspace.bind(this);
    this.handleOpportunityChangeModalOpen = this.handleOpportunityChangeModalOpen.bind(this);
    this.updateNetworkOpps = this.updateNetworkOpps.bind(this);
    this.setFilters = this.setFilters.bind(this);
    this.createMenuItem = this.createMenuItem.bind(this);
    this.createListItem = this.createListItem.bind(this);
    this.getSelectedTitle = this.getSelectedTitle.bind(this);
    this.getFilter = this.getFilter.bind(this);
  }

  componentDidMount(){
    const workspaceId = this.props.siteTemplate.networkId
    if(workspaceId){this.resetWorkspace(workspaceId)}

    this.props.fetchSavedOpportunities();
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
        let filter = this.getFilter();
        // Choose all opportunities for this workspace
        this.props.fetchOpportunities(workspaceId, filter)
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

  getFilter(){
    const { filter } = this.props;
    return filter ? filter : '';
    // if(filter){
    //   switch(filter){
    //     case 'direct-connections':
    //       return 'Direct-Connection'
    //   }
    // } else {
    //   return ''
    // }
    // return filter ? 'Direct-Connection' : ''
  }

  handleModalClose(modal){
    return e => {
      this.setState({ [modal]: false });
    }
  }

  handleOpportunityChangeModalOpen(e){
    e.preventDefault();
    this.setState({ changeModalOpen: true });
  }

  handleReferralChange(e){
    this.setState({ referralNetwork: e.target.value})
  }

  handleReferralSubmit(){
    this.props.createReferral({
      network_id: this.state.referralNetwork
    })
  }

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

  handleDropdownChange(anchor, value){
    return e => {
      e.stopPropagation();
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
          this.setState({
            [anchor]: null,
            opportunitiesLoaded: true
          });
          animateScroll.scrollTo(0);
        })
      })
      this.props.clearOpportunityErrors();
    }
  }

  updateNetworkOpps(){
    const workspaceId = this.props.siteTemplate.networkId
    // const { dropdownFocus } = this.state;
    let filter = this.getFilter();
    this.props.fetchOpportunities(workspaceId, filter)
    .then(() => animateScroll.scrollTo(0) );
  }

  capitalize(str){
    return str[0].toUpperCase() + str.slice(1)
  }

  createMenuItem(item, type){
    const { classes } = this.props;
    // const { dropdownFocus } = this.state;
    let filter = this.getFilter();

    return (
      <MenuItem value={`${item.id}-${type}`}
        className={classes.dropdownMenuItem}
        onClick={this.handleDropdownChange('filterMobileAnchorEl', `${item.id}-${type}`)}
        selected={filter === `${item.id}-${type}`}
        style={{ paddingLeft: 0}}>
        <Grid container alignItems='center'>
          <Checkbox checked={filter === `${item.id}-${type}`}/>
          <div style={{ display: 'inline'}}>
            <Typography variant="h6" align='left'
              color="textPrimary" className={classes.filterMobileHeader}>
              {item.title}
            </Typography>
            <Typography variant="body2" align='left'
              color="textPrimary" className={classes.filterMobileSubtext}>
              {item.subtitle}
            </Typography>
          </div>
        </Grid>
      </MenuItem>
    )
  }

  createListItem(item, type){
    const { classes } = this.props;
    // const { dropdownFocus } = this.state;
    let filter = this.getFilter();

    return (
      <ListItem button value={`${item.id}-${type}`}
        className={classes.filterItem}
        onClick={this.handleDropdownChange('anchorEl', `${item.id}-${type}`)}
        selected={filter === `${item.id}-${type}`}>
        <div>
          <Typography variant="h6" align='left'
            color="textPrimary" className={classes.filterHeader}>
            {item.title}
          </Typography>
          <Typography variant="body2" align='left'
            color="textPrimary" className={classes.filterSubtext}>
            {item.subtitle}
          </Typography>
        </div>
      </ListItem>
    )
  }

  setFilters(setting){
    const { workspaceOptions, networks, circles,
      classes, currentUser } = this.props;
    let optionsArray = [...workspaceOptions]

    let networkHeader = <ListItem disabled
      className={classes.filterItem}>
        {`Networks:`}
      </ListItem>

    let networkItems = optionsArray.filter(x => x.includes('Network'))
      .map(x => networks[x.split('-')[0]])
      .map(network => {
        if (setting === 'List'){
          return this.createListItem(network, 'network')
        } else {
          return this.createMenuItem(network, 'network')
        }
      })

    let circleHeader = <ListItem disabled
      className={classes.filterItem}>
        {`Circles:`}
      </ListItem>

    let circleItems = optionsArray.filter(x => x.includes('Circle'))
      .map(x => circles[x.split('-')[0]])
      .map(circle => {
        if (setting === 'List'){
          return this.createListItem(circle, 'Circle')
        } else {
          return this.createMenuItem(circle, 'Circle')
        }
      })

    if (currentUser.isAdmin){
      return [].concat(networkHeader, networkItems, circleHeader,
        circleItems)
    } else {
      return [].concat(networkHeader, networkItems)
    }
    // return [].concat(networkHeader, networkItems)
  }

  getSelectedTitle(filter){
    const { networks } = this.props;
    // let mapping = {
    //   '': "All Opportunities",
    //   'all-network': "All Networks"
    // }
    // return mapping[filter];
    switch(filter){
      case '': return "All Opportunities";
      case 'all-networks': return "All Networks";
      case 'all-connections': return 'All Connections';
      case 'direct-connection': return "Direct Opportunities";
      case filter.includes('network'):
        return `${networks[filter.split('-').unshift()]}`;
      default:
        return "None"
    }
  }

  render (){
    const { classes, opportunities, networks, workspaceOptions,
      referral, currentUser, networkOpps, siteTemplate,
      workspaces, opportunityErrors } = this.props;

    const { loading, changeModalOpen, referralNetwork,
        dropdownFocus, opportunitiesLoaded,
        filterMobileAnchorEl, networksLoaded } = this.state;

    const networksArray = [...workspaceOptions]
      .filter(x => x.includes('Network'))
      .map(x => networks[x.split('-')[0]])

    // debugger

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
      let filter = this.getFilter()
      const column1 = (
        <Grid container justify='center' alignItems='center'
          style={{ padding: 0, width: '100%' }}>
          <FeedCard contents={
            <div>
              <Typography gutterBottom align='left' color='textPrimary'
                className={classes.cardHeader}
                style={{ marginBottom: 20}}>
                Over $72M in opportunities connected
              </Typography>

              <div className={classes.oppNotification}>
                <Typography align='left' color='textSecondary'
                  className={classes.cardHeader}>
                  {`There are ${networkOpps.size} opportunities for you to checkout`}
                </Typography>
              </div>
            </div>
          }/>

        <FeedCard contents={
            <div>
              <Typography gutterBottom align='left'
                className={classes.cardHeader} color='textSecondary'
                style={{ marginBottom: 20}}>
                Invite your trusted business contacts
              </Typography>

              <OpportunityWaitlist
                currentUser={currentUser}
                />
            </div>
          }/>
        </Grid>
      )

      const genericDropdownOptions = currentUser.isAdmin ? [
        {header: 'All Opportunities' , subHeader: `Everything visible to you and the ${workspaces[siteTemplate.networkId].title} network`,
          value: '', disabled: false},
        {header: 'All Networks' , subHeader: 'Opportunities posted within my networks',
          value: 'all-networks', disabled: false},
        {header: 'All Connections' , subHeader: 'Opportunities posted by my connections',
          value: 'all-connections',disabled: false},
        // {header: 'All Circles' , subHeader: 'Opportunities posted within my circles',
        //   value: 'All-Circle',disabled: false},
        {header: 'Direct Opportunities' , subHeader: 'Opportunities sent directly to me from my connections',
          value: 'direct-connections', disabled: false},
        ] : [
        {header: 'All Opportunities' , subHeader: `Everything visible to you and the ${workspaces[siteTemplate.networkId].title} network`,
        value: '', disabled: false},
        // {header: 'All Networks' , subHeader: 'Opportunities posted within my networks',
        //   value: 'All-Network',disabled: false}
        ]
      // asdfasdfa
      const filterMobile = (
        <Grid container justify='flex-end'
          className={classes.filterMobile}>
          <Button
            aria-owns={filterMobileAnchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleDropdownClick('filterMobileAnchorEl')}
            >
            <Typography variant="subtitle1" align='left'
              color="textPrimary" style={{ fontSize: 12, fontWeight: 300}}>
              {"View By:"}
            </Typography>
            <Typography variant="subtitle1" align='left'
              color="textPrimary"
              style={{ fontWeight: 600, marginLeft: 10, fontSize: 12, textTransform: 'capitalize'}}>
              {this.getSelectedTitle(filter)}
            </Typography>
            <KeyboardArrowDownIcon />
          </Button>

          {opportunitiesLoaded &&
            <Menu
              id="simple-menu"
              anchorEl={filterMobileAnchorEl}
              open={Boolean(filterMobileAnchorEl)}
              onClose={this.handleDropdownClose('filterMobileAnchorEl')}
              style={{ padding: 0 }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              >
              {genericDropdownOptions.map(other => (
                <MenuItem
                  onClick={this.handleDropdownChange('filterMobileAnchorEl', other.value)}
                  className={classes.dropdownMenuItem}
                  disabled={other.disabled}
                  style={{ paddingLeft: 0}}>
                  <Grid container alignItems='center'>
                    <Checkbox checked={filter === other.value}/>
                    <div style={{ display: 'inline'}}>
                      <Typography variant="h6" align='left'
                        color="textPrimary" className={classes.filterMobileHeader}>
                        {other.header}
                      </Typography>
                      <Typography variant="body2" align='left'
                        color="textPrimary" className={classes.filterMobileSubtext}>
                        {other.subHeader}
                      </Typography>
                    </div>
                  </Grid>
                </MenuItem>
              ))}
              {this.setFilters('Menu')}

            </Menu>}
          </Grid>
        )

        const filterDesktop = (
          <Grid container justify='center' alignItems='center'
            className={classes.filter}>
            <div className={classes.filterCard}>
              <Typography align='left'
                className={classes.cardHeader}
                style={{ margin: "10px 20px 0px"}}>
                {`Whose opportunities would you like to see?`}
              </Typography>

              <List component="nav">
                {genericDropdownOptions.map(other => (
                  <ListItem button value={other.value}
                    className={classes.filterItem}
                    onClick={this.handleDropdownChange('anchorEl', other.value)}
                    disabled={other.disabled}
                    selected={filter === other.value}>
                    <div>
                      <Typography variant="h6" align='left'
                        color="textPrimary" className={classes.filterHeader}>
                        {other.header}
                      </Typography>
                      <Typography variant="body2" align='left'
                        color="textPrimary" className={classes.filterSubtext}>
                        {other.subHeader}
                      </Typography>
                    </div>
                  </ListItem>
                ))}
                {networksLoaded && this.setFilters('List')}
              </List>
            </div>
          </Grid>
        )

        const filteredOpps = [...networkOpps].map(id => opportunities[id])
        .filter(o => o.status === "Approved")

        const opportunityCards = filteredOpps.length > 0 ? (
          filteredOpps.map((opportunity, idx) => (
            <OpportunityCardFeed
              opportunity={opportunity}/>
          ))
        ) : (opportunityErrors.length > 0 ? (
            <Typography variant="h3" color="textSecondary" align='center'
              className={classes.emptyOppsText} gutterBottom>
              {opportunityErrors[0]}
            </Typography>
          ) : (
            <Typography variant="h3" color="textSecondary" align='center'
              className={classes.emptyOppsText} gutterBottom>
              {`There aren't any posted opportunities yet. Be the first to post an opportunity above.`}
            </Typography>
          )
        )

      const feed = (
        <Grid container justify='center' alignItems='center'>
          <div style={{ overflow: 'scroll', paddingBottom:50,
            width: '100%'}}>
            <CardActionArea className={classes.feedCard}
              style={{ paddingBottom: 9}}
              onClick={this.handleOpportunityChangeModalOpen}>
              <Typography align='left' gutterBottom
                className={classes.cardHeader}>
                Create Opportunity
              </Typography>

              <Grid container alignItems='center'
                className={classes.createFilterMain}>
                {currentUser.profilePicUrl ? (
                  <Avatar alt="profile-pic"
                    src={currentUser.profilePicUrl}
                    className={classes.avatar} />
                ) : (
                  <AccountCircle className={classes.avatar}/>
                )}

                <Grid container style={{ flexGrow: 1, width: '75%', marginLeft: 10}}
                  alignItems='center'>
                  <Typography align='left' color="textSecondary"
                    className={classes.cardHeader}
                    style={{ padding: "15px 0px"}}>
                    {`What's your most pressing business need or opportunity?`}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container style={{ paddingTop: 17}}>
                <Button className={classes.createFilterButton}>
                  <img src={PictureIconSVG} alt='pic-icon'
                    className={classes.filterButtonIcon}/>
                  Image
                </Button>
                <Button className={classes.createFilterButton}>
                  <PersonIcon className={classes.filterButtonIcon}/>
                  Privacy
                </Button>
                <Button className={classes.createFilterButton}>
                  <img src={ShareIconSVG} alt='share-icon'
                    className={classes.filterButtonIcon}/>
                  {/*`Share with: ${formattedNetworks.length > 0 ? formattedNetworks[0].title : ''}`*/}
                  {`Share`}
                </Button>
              </Grid>
            </CardActionArea>

            <Grid container justify='flex-end'
              className={classes.filterMobileCard}>
              {filterMobile}
            </Grid>

            {opportunitiesLoaded ? opportunityCards :
              (<div style={{ marginTop: 50 }}>
                <Loading/>
              </div>)}


              <div className={classes.waitlistMobileCard}>
                <Typography gutterBottom align='left'
                  className={classes.cardHeader} color='textSecondary'
                  style={{ marginBottom: 20 }}>
                  Invite your trusted business contacts
                </Typography>

                <OpportunityWaitlist
                  handleSubmit={this.handleWaitlistSubmit}
                  loading={loading}
                  currentUser={currentUser}
                  />
              </div>

            {opportunitiesLoaded &&
              this.props.currentUser.isAdmin &&
              <div className={classes.referralCard}>
                <OpportunityReferral
                  referralNetwork={referralNetwork}
                  networks={networksArray}
                  referral={referral}
                  handleChange={this.handleReferralChange}
                  handleSubmit={this.handleReferralSubmit}
                  />
              </div>}
            </div>
          </Grid>
        )

        return (
          <div style={{flexGrow: 1}}>
            <FeedContainer
              column1={column1}
              feed={feed}
              column2={filterDesktop} />

            <OpportunityChangeModal
              open={changeModalOpen}
              handleClose={this.handleModalClose('changeModalOpen')}
              updateNetworkOpps={this.updateNetworkOpps}
              currentUser={currentUser}
              opportunity={DEFAULTSTATE}
              type={'create'} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OpportunityHome));

// <WaitlistModal
//   open={waitlistOpen}
//   handleClose={this.handleModalClose('waitlistOpen')}
//   referred={true}/>
