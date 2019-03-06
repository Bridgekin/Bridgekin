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
import WaitlistModal from '../waitlist_modal';
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

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  waitlistErrors: state.errors.waitlistUsers,
  opportunities: state.entities.opportunities,
  networkOpps: state.entities.networkOpps,
  networks: state.entities.networks,
  workspaceOptions: state.entities.workspaceOptions,
  referral: state.entities.referral,
  siteTemplate: state.siteTemplate
});

const mapDispatchToProps = dispatch => ({
  registerWaitlistFromReferral: (user) => dispatch(registerWaitlistFromReferral(user)),
  fetchOpportunities: (workspaceId, option) => dispatch(fetchOpportunities(workspaceId, option)),
  fetchWorkspaceOptions: (workspaceId) => dispatch(fetchWorkspaceOptions(workspaceId)),
  createReferral: (referral) => dispatch(createReferral(referral))
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
    // borderTop: `1px solid ${theme.palette.lightGrey}`,
    border: `1px solid ${theme.palette.border.primary}`,
    width: '100%',
    marginBottom: 9,
    [theme.breakpoints.up('sm')]: {
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
    marginBottom: 9,
    [theme.breakpoints.up('sm')]: {
      borderRadius: 5,
      border: `1px solid ${theme.palette.border.primary}`,
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
    fontSize: 30,
    fontWeight: 500,
    margin: 20
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
  // permissions: []
}

class OpportunityHome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      opportunitiesLoaded: false,
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
      dropdownFocus: '',
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
  }

  componentDidMount(){
    const workspaceId = this.props.siteTemplate.networkId
    if(workspaceId){this.resetWorkspace(workspaceId)}
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.siteTemplate !== this.props.siteTemplate){
      this.setState({ opportunitiesLoaded: false },
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
        // Choose all opportunities for this workspace
        this.props.fetchOpportunities(workspaceId, '')
        .then(() => {
          this.setState({
            opportunitiesLoaded: true,
            referralNetwork})
          });
      }
    })
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
      // if (value.includes('Network')){
        const workspaceId = this.props.siteTemplate.networkId
        this.props.fetchOpportunities(workspaceId, value)
        .then(() => {
          this.setState({
            dropdownFocus: value, [anchor]: null
          });
          animateScroll.scrollTo(0);
        })
      // }
    }
  }

  updateNetworkOpps(){
    const workspaceId = this.props.siteTemplate.networkId
    const { dropdownFocus } = this.state;
    this.props.fetchOpportunities(workspaceId, dropdownFocus)
    .then(() => animateScroll.scrollTo(0) );
  }

  capitalize(str){
    return str[0].toUpperCase() + str.slice(1)
  }

  createMenuItem(item, type){
    const { classes } = this.props;
    const { dropdownFocus } = this.state;

    if(type === 'Network'){
      return (<MenuItem value={`${item.id}-Network`}
        className={classes.dropdownMenuItem}
        onClick={this.handleDropdownChange('filterMobileAnchorEl', `${item.id}-Network`)}
        selected={dropdownFocus === `${item.id}-Network`}
        style={{ paddingLeft: 0}}>
        <Grid container alignItems='center'>
          <Checkbox checked={dropdownFocus === `${item.id}-Network`}/>
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
      </MenuItem>)
    }
  }

  createListItem(item, type){
    const { classes } = this.props;
    const { dropdownFocus } = this.state;

    if (type === 'Network'){
      return (
        <ListItem button value={`${item.id}-Network`}
          className={classes.filterItem}
          onClick={this.handleDropdownChange('anchorEl', `${item.id}-Network`)}
          selected={dropdownFocus === `${item.id}-Network`}>
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
  }

  setFilters(setting){
    const { workspaceOptions, networks } = this.props;
    let optionsArray = [...workspaceOptions]
    let networkItems = optionsArray.filter(x => x.includes('Network'))
      .map(x => networks[x.split('-')[0]])
      .map(network => {
        if (setting === 'List'){
          return this.createListItem(network, 'Network')
        } else {
          return this.createMenuItem(network, 'Network')
        }
      })
    return networkItems
  }

  getSelectedTitle(dropdownFocus){
    const { networks } = this.props;
    switch(dropdownFocus){
      case '':
        return "All Opportunities";
      case dropdownFocus.includes('Direct'):
        return "Direct Opportunities";
      case dropdownFocus.includes('All'):
        return `All-${dropdownFocus.split('-').pop()}s`;
      case dropdownFocus.includes('Network'):
        return `${networks[dropdownFocus.split('-').unshift()]}`;
      default:
        return "None"
    }
  }

  render (){
    const { classes, opportunities, networks, workspaceOptions,
      referral, currentUser, networkOpps } = this.props;

    const { loading, changeModalOpen, referralNetwork,
        dropdownFocus, opportunitiesLoaded,
        filterMobileAnchorEl } = this.state;

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

    if(opportunitiesLoaded){

      const column1 = (
        <Grid container justify='center' alignItems='center'
          style={{ padding: 0, width: '100%' }}>
          <FeedCard contents={
              <div>
                <Typography gutterBottom align='Left' color='textPrimary'
                  className={classes.cardHeader}
                  style={{ marginBottom: 20}}>
                  Over $71M in opportunities connected
                </Typography>

                <div className={classes.oppNotification}>
                  <Typography align='Left' color='textSecondary'
                    className={classes.cardHeader}>
                    {`There are ${networkOpps.size} opportunities for you to checkout`}
                  </Typography>
                </div>
              </div>
            }/>

          <FeedCard contents={
            <div>
              <Typography gutterBottom align='Left'
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

      const genericDropdownOptions = [
        {header: 'Direct Opportunities' , subHeader: 'Opportunities sent directly to me from my connections',
          value: 'Direct-Connection', disabled: false},
        {header: 'All Connections' , subHeader: 'Opportunities posted by my connections',
          value: 'All-Connection',disabled: false},
        {header: 'All Opportunities' , subHeader: 'Your segmented lists of connections',
          value: '',disabled: false},
      ]

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
              {this.getSelectedTitle(dropdownFocus)}
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
                <MenuItem onClick={this.handleDropdownChange('filterMobileAnchorEl', other.values)}
                  className={classes.dropdownMenuItem}
                  disabled={other.disabled}
                  style={{ paddingLeft: 0}}>
                  <Grid container alignItems='center'>
                    <Checkbox checked={dropdownFocus === other.value}/>
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

      const filter = (
        <Grid container justify='center' alignItems='center'
          className={classes.filter}>
          {opportunitiesLoaded && <div className={classes.filterCard}>
            <Typography align='Left'
              className={classes.cardHeader}
              style={{ margin: "10px 20px 0px"}}>
              {`Whose opportunities would you like to see?`}
            </Typography>

            <List component="nav">
              {currentUser.isAdmin && genericDropdownOptions.map(other => (
                <ListItem button value={other.value}
                  className={classes.filterItem}
                  onClick={this.handleDropdownChange('anchorEl', other.value)}
                  disabled={other.disabled}
                  selected={dropdownFocus === other.value}>
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

              {this.setFilters('List')}
            </List>
          </div>}
        </Grid>
      )

      const filteredOpps = [...networkOpps].map(id => opportunities[id])
        .filter(o => o.status === "Approved")

      const opportunityCards = filteredOpps.length > 0 ? (
          filteredOpps.map((opportunity, idx) => (
          <OpportunityCardFeed
            currentUser={currentUser}
            opportunity={opportunity}/>
        ))
      ) : (
        <Typography variant="h3" gutterBottom color="textSecondary"
          align='center' className={classes.emptyOppsText}>
          {`There aren't any posted opportunities yet. Be the first to post an opportunity above.`}
        </Typography>
      )

      const feed = (
        <Grid container justify='center' alignItems='center'>
          <div style={{ overflow: 'scroll', paddingBottom:50,
            width: '100%'}}>
            <CardActionArea className={classes.feedCard}
              style={{ paddingBottom: 9}}
              onClick={this.handleOpportunityChangeModalOpen}>
              <Typography align='Left' gutterBottom
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
                  <Typography align='Left' color="textSecondary"
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

            {opportunityCards}

            <Card className={classes.waitlistMobileCard}>
              <Typography gutterBottom align='Left'
                className={classes.cardHeader} color='textSecondary'
                style={{ marginBottom: 20 }}>
                Invite your trusted business contacts
              </Typography>

              <OpportunityWaitlist
                handleSubmit={this.handleWaitlistSubmit}
                loading={loading}
                currentUser={currentUser}
                />
            </Card>

            {this.props.currentUser.isAdmin &&
              <div className={classes.referralCard}>
                <OpportunityReferral
                  referralNetwork={referralNetwork}
                  networks={networksArray}
                  referral={referral}
                  handleChange={this.handleReferralChange}
                  handleSubmit={this.handleReferralSubmit}
                  />
              </div>
            }
          </div>
        </Grid>
      )

      return (
        <div style={{flexGrow: 1}}>
          <FeedContainer
            column1={column1}
            feed={feed}
            column2={filter} />

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
