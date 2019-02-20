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
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import './opportunity_home.css'
import { fade } from '@material-ui/core/styles/colorManipulator';

//Import Local Components
import OpportunityCard from './opportunity_card';
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
import { registerWaitlistUser } from '../../actions/waitlist_user_actions';
import { fetchOpportunities } from '../../actions/opportunity_actions';
import { fetchNetworks } from '../../actions/network_actions';
import { createReferral } from '../../actions/referral_actions';
import OpportunityChangeModal from './opportunity_change_modal';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDownSharp';
import { PickImage } from '../../static/opportunity_images/image_util.js';
import { animateScroll } from 'react-scroll';

import PictureIconSVG from '../../static/opp_feed_icons/picture.svg'
import ShareIconSVG from '../../static/opp_feed_icons/share.svg'
import PrivacyIconSVG from '../../static/opp_feed_icons/privacy.svg'
import PersonIcon from '@material-ui/icons/PersonSharp';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  waitlistErrors: state.errors.waitlistUsers,
  opportunities: Object.values(state.entities.opportunities).reverse(),
  networks: state.entities.networks,
  referral: state.entities.referral
});

const mapDispatchToProps = dispatch => ({
  registerWaitlistUser: (user) => dispatch(registerWaitlistUser(user)),
  fetchOpportunities: (networkId) => dispatch(fetchOpportunities(networkId)),
  fetchNetworks: () => dispatch(fetchNetworks()),
  createReferral: (referral) => dispatch(createReferral(referral))
});

const styles = {
  jumboRoot: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1,
  },
  grid:{
    position: 'relative',
    padding: "64px 0px 0px 0px",
    // paddingTop: 64 + 34,
    flexGrow: 1,
    backgroundColor: `${fade(theme.palette.common.black,0.05)}`,
    // backgroundColor: 'white',
    minHeight: window.innerHeight
  },
  feedContainer:{
    width: '100%',
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
      width: 1040,
      height: '100%'
    },
  },
  mainColumn:{
    [theme.breakpoints.up('sm')]: {
      marginLeft: 265,
      width: 500,
      position: 'relative',
      paddingLeft: 0,
      paddingRight: 0,
      display: 'inline-block'
    },
  },
  sideColumn:{
    paddingLeft: 0,
    paddingRight: 0,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline-block'
    }
  },
  feedCard:{
    // height: 118,
    padding: "9px 8px 20px 8px",
    backgroundColor: `${theme.palette.white}`,
    // borderTop: `1px solid ${theme.palette.lightGrey}`,
    border: `1px solid ${theme.palette.lightGrey}`,
    width: '100%',
    marginBottom: 9,
    [theme.breakpoints.up('sm')]: {
      borderRadius: 5,
      padding: "9px 17px 20px",
    },
  },
  waitlistMobileCard:{
    padding: "9px 8px 20px 8px",
    backgroundColor: `${theme.palette.white}`,
    borderRadius:0,
    borderTop: `1px solid ${theme.palette.lightGrey}`,
    // marginTop: 9,
    [theme.breakpoints.up('sm')]: {
      borderRadius: 5,
      border: `1px solid ${theme.palette.lightGrey}`,
    },
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  oppNotification:{
    borderRadius: 5,
    padding: "8px 10px",
    backgroundColor: `${fade(theme.palette.common.black,0.05)}`
  },
  filterCard:{
    marginTop: 18,
    backgroundColor: `${theme.palette.white}`,
    width: '100%',
    borderRadius: 5,
    border: `1px solid ${theme.palette.lightGrey}`
  },
  opportunityCard:{
    marginTop: 18,
    backgroundColor: `${theme.palette.white}`,
    width: '100%',
    borderRadius: 5,
    border: `1px solid ${theme.palette.lightGrey}`
  },
  // oppStatus:{
  //   // height: 29,
  //   width: 89,
  //   textTransform: 'uppercase',
  //   backgroundColor: `${fade(theme.palette.common.black,0.05)}`,
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  cover:{
    height: 140,
    width: '100%',
    objectFit: 'cover'
  },
  filterItem:{
    borderTop: `1px solid ${theme.palette.grey1}`,
  },
  avatar:{
    height: 55,
    width: 55
  },
  loader:{
    marginTop: 50
  },
  createFilterMain:{
    borderBottom: `1px solid ${theme.palette.lightGrey}`,
    height: 85
  },
  createFilterButton:{
    textTransform: 'none',
    backgroundColor: `${fade(theme.palette.common.black,0.05)}`,
    margin: "5px 10px 5px 0px",
    fontSize: 12
  },
  filterButtonIcon:{
    width: 14,
    marginRight: 3
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
    borderTop: `1px solid ${theme.palette.lightGrey}`,
    marginTop: 10,
    paddingTop: 9,
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  filterMobileCard:{
    // marginTop: 18,
    backgroundColor: `${theme.palette.white}`,
    width: '100%',
    borderTop: `1px solid ${theme.palette.lightGrey}`,
    [theme.breakpoints.up('sm')]: {
      borderRadius: 5,
      border: `1px solid ${theme.palette.lightGrey}`,
    },
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  filter:{
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    },
    padding: 0,
    width: '100%'
  },
  // filterButtonIcon:{
  //   width: 14,
  //   marginRight: 3
  // },
};

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
  viewType: 'post'
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
      loaded: false,
      success: false,
      waitlistOpen: false,
      changeModalOpen: false,
      cardOpen: false,
      dropdownOpen: false,
      dropdownFocus: '',
      referralNetwork: null,
      anchorEl: null
    };

    // this.handleWaitlistChange = this.handleWaitlistChange.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleWaitlistSubmit = this.handleWaitlistSubmit.bind(this);
    this.handleReferralChange = this.handleReferralChange.bind(this);
    this.handleReferralSubmit = this.handleReferralSubmit.bind(this);
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.handleDropdownClose = this.handleDropdownClose.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleOpportunityChangeModalOpen = this.handleOpportunityChangeModalOpen.bind(this);
  }

  componentDidMount(){
    this.props.fetchNetworks()
    .then(() => {
      if(Object.values(this.props.networks).length > 0){
        let referralNetwork = Object.values(this.props.networks)[0].id;
        this.props.fetchOpportunities(this.state.dropdownFocus)
        .then(() => {
          this.setState({
            opportunitiesLoaded: true,
            referralNetwork})
          });
      }
    })
  }

  // handleWaitlistChange(field){
  //   return e => {
  //     e.preventDefault();
  //     this.setState({ [field]: e.target.value})
  //   }
  // }

  handleModalClose(modal){
    return e => {
      this.setState({ [modal]: false });
    }
  }

  handleOpportunityChangeModalOpen(e){
    e.preventDefault();
    this.setState({ changeModalOpen: true });
  }

  handleWaitlistSubmit(user){

    if (!this.state.loading) {
      this.setState({ success: false, loading: true },
        () => {
          this.props.registerWaitlistUser(user)
            .then(res => {
              this.setState({
                loading: false,
                success: true,
                waitlistOpen: true,
              })
            })
      })
    }
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

  handleDropdownChange(anchor, type, id){
    return e => {
      e.stopPropagation();
      if (type === 'Network'){
        this.props.fetchOpportunities(id)
        .then(() => {
          this.setState({
            dropdownFocus: id, [anchor]: null
          });
          // window.scrollTo(0, 0);
          animateScroll.scrollTo(0);
        })
      }
    }
  }

  capitalize(str){
    return str[0].toUpperCase() + str.slice(1)
  }

  render (){
    let { classes, opportunities, networks,
        referral, currentUser } = this.props;

    const { loading, waitlistOpen, changeModalOpen,
        referralNetwork, anchorEl,
        dropdownFocus, opportunitiesLoaded,
        filterMobileAnchorEl } = this.state;

    const networksArray = Object.values(networks);
    const formattedNetworks = networksArray.map(network => (
      Object.assign({}, network, {type: 'network'})
    ))

    debugger

    opportunities = opportunities.filter(o => o.status === "Approved")

    let column1 = (
      <Grid container justify='center' alignItems='center'
        style={{ padding: 0, width: '100%', marginTop: 18}}>
        <div className={classes.feedCard}>
          <Typography gutterBottom align='Left'
            className={classes.cardHeader}
            style={{ marginBottom: 20}}>
            Over $71M in opportunities connected
          </Typography>

          <div className={classes.oppNotification}>
            <Typography align='Left'
              className={classes.cardHeader}
              style={{ color: theme.palette.darkGrey}}>
              There are 10 opportunities for you to checkout
            </Typography>
          </div>
        </div>

        <div className={classes.feedCard}>
          <Typography gutterBottom align='Left'
            className={classes.cardHeader}
            style={{ marginBottom: 20, color: theme.palette.darkGrey}}>
            Invite your trusted business contacts
          </Typography>

          <OpportunityWaitlist
            handleSubmit={this.handleWaitlistSubmit}
            loading={loading}
            currentUser={currentUser}
            />
        </div>
      </Grid>
    )

    let otherDropdownOptions = [
      {header: 'Connections' , subHeader: 'Your Connections', disabled: true},
      {header: 'Network Circles' , subHeader: 'Your segmented lists of connections', disabled: true},
      {header: 'Custom' , subHeader: 'Include and exclude specific connections', disabled: true}
    ]

    let filterMobile = (
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
            {dropdownFocus === "" ? "All Opportunities" : networks[dropdownFocus].title}
          </Typography>
          <KeyboardArrowDownIcon />
        </Button>

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
          <MenuItem onClick={this.handleDropdownChange('filterMobileAnchorEl','Network', '')}
            className={classes.dropdownMenuItem}
            selected={dropdownFocus === ''}
            style={{ paddingLeft: 0}}>
            <Grid container alignItems='center'>
              <Checkbox checked={dropdownFocus === ''}/>
              <div style={{ display: 'inline'}}>
                <Typography variant="h6" align='left'
                  color="textPrimary" className={classes.filterMobileHeader}>
                  {'All Opportunities'}
                </Typography>
                <Typography variant="body2" align='left'
                  color="textPrimary" className={classes.filterMobileSubtext}>
                  {'Everything visible to you and the Bridgekin network'}
                </Typography>
              </div>
            </Grid>
          </MenuItem>

          {networksArray.map(network => (
            <MenuItem value={network.id}
              className={classes.dropdownMenuItem}
              onClick={this.handleDropdownChange('filterMobileAnchorEl', 'Network',network.id)}
              selected={dropdownFocus === network.id}
              style={{ paddingLeft: 0}}>
              <Grid container alignItems='center'>
                <Checkbox checked={dropdownFocus === network.id}/>
                <div style={{ display: 'inline'}}>
                  <Typography variant="h6" align='left'
                    color="textPrimary" className={classes.filterMobileHeader}>
                    {network.title}
                  </Typography>
                  <Typography variant="body2" align='left'
                    color="textPrimary" className={classes.filterMobileSubtext}>
                    {network.subtitle}
                  </Typography>
                </div>
              </Grid>
            </MenuItem>
          ))}

          {otherDropdownOptions.map(other => (
            <MenuItem onClick={this.handleDropdownClose('filterMobileAnchorEl')}
              className={classes.dropdownMenuItem}
              disabled={other.disabled}
              style={{ paddingLeft: 0}}>
              <Grid container alignItems='center'>
                <Checkbox checked={false}/>
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
        </Menu>
      </Grid>
    )

    let filter = (
      <Grid container justify='center' alignItems='center'
        className={classes.filter}>
        <div className={classes.filterCard}>
          <Typography align='Left'
            className={classes.cardHeader}
            style={{ margin: "10px 20px 0px"}}>
            {`Whose opportunities would you like to see?`}
          </Typography>

          <List component="nav">
            <ListItem button className={classes.filterItem}
              onClick={this.handleDropdownChange('anchorEl','Network','')}
              selected={dropdownFocus === ''}>
              <div>
                <Typography variant="h6" align='left'
                  color="textPrimary" className={classes.filterHeader}>
                  {'All Opportunities'}
                </Typography>
                <Typography variant="body2" align='left'
                  color="textPrimary" className={classes.filterSubtext}>
                  {'Everything visible to you and the Bridgekin network'}
                </Typography>
              </div>
            </ListItem>

            {networksArray.map(network => (
              <ListItem button value={network.id}
                className={classes.filterItem}
                onClick={this.handleDropdownChange('anchorEl','Network',network.id)}
                selected={dropdownFocus === network.id}>
                <div>
                  <Typography variant="h6" align='left'
                    color="textPrimary" className={classes.filterHeader}>
                    {network.title}
                  </Typography>
                  <Typography variant="body2" align='left'
                    color="textPrimary" className={classes.filterSubtext}>
                    {network.subtitle}
                  </Typography>
                </div>
              </ListItem>
            ))}

            {currentUser.isAdmin && otherDropdownOptions.map(other => (
              <ListItem button
                className={classes.filterItem}
                disabled={other.disabled}
                >
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
          </List>
        </div>
      </Grid>
    )

    let loader = (
      <Grid container justify='center' alignItems='center'
        className={classes.loader}>
        <CircularProgress className={classes.progress} />
      </Grid>
    )

    let opportunityCards = opportunities.map((opportunity, idx) => (
      <OpportunityCardFeed
        currentUser={currentUser}
        opportunity={opportunity}/>
    ));

    let feed = (
      <Grid container justify='center' alignItems='center'>
        <div style={{ overflow: 'scroll', padding: "18px 0px 50px 0px",
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
                {`Share with: ${formattedNetworks.length > 0 ? formattedNetworks[0].title : ''}`}
              </Button>
            </Grid>
            {filterMobile}
          </CardActionArea>

          {(opportunitiesLoaded) ? opportunityCards : loader}

          <Card className={classes.waitlistMobileCard}>
            <Typography gutterBottom align='Left'
              className={classes.cardHeader}
              style={{ marginBottom: 20, color: theme.palette.darkGrey}}>
              Invite your trusted business contacts
            </Typography>

            <OpportunityWaitlist
              handleSubmit={this.handleWaitlistSubmit}
              loading={loading}
              currentUser={currentUser}
              />
          </Card>
        </div>
      </Grid>
    )

    return (
      <MuiThemeProvider theme={theme} style={{flexGrow: 1}}>
        <Grid container justify='center' className={classes.grid}>
          <div className={classes.feedContainer}>
            <div className={classes.sideColumn}
              style={{ position: 'fixed', top:64, width: 250}}>
              {column1}
            </div>
            <div className={classes.mainColumn}>
              {feed}
            </div>
            <div className={classes.sideColumn}
              style={{ position: 'fixed', top:64, marginLeft: 15, width: 250}}>
              {filter}
            </div>
          </div>
        </Grid>

        <WaitlistModal
          open={waitlistOpen}
          handleClose={this.handleModalClose('waitlistOpen')}
          referred={true}/>

        <OpportunityChangeModal
          open={changeModalOpen}
          handleClose={this.handleModalClose('changeModalOpen')}
          currentUser={currentUser}
          opportunity={DEFAULTSTATE}
          availNetworks={Object.values(formattedNetworks)}
          type={'create'}
          />
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OpportunityHome));

// <Grid container justify='center' className={classes.grid}>
//   <div style={{ position: 'fixed', top: 64, width:1040 }}>
//     <div className={classes.column}
//       style={{ position: 'static', marginRight: 20, width: 250}}>
//       {column1}
//     </div>
//     <div className={classes.column}
//       style={{ position: 'static', maxHeight: window.innerHeight, width: 500 }}>
//       {feed}
//     </div>
//     <div className={classes.column}
//       style={{ position: 'static', marginLeft: 20, width: 250}}>
//       {filter}
//     </div>
//   </div>
// </Grid>
//

//
// <Grid container className={classes.grid}>
//   {header}
//   {opportunitiesLoaded ? opportunityGrid : (
//     <div style={{ padding: "114px 20px 50px", width: '100%' }}>
//       <Loading />
//     </div>
//   )}
//   <OpportunityWaitlist
//     handleSubmit={this.handleWaitlistSubmit}
//     loading={loading}
//     currentUser={this.props.currentUser}
//     />
//   {this.props.currentUser.isAdmin &&
//     <OpportunityReferral
//       referralNetwork={referralNetwork}
//       networks={networksArray}
//       referral={referral}
//       handleChange={this.handleReferralChange}
//       handleSubmit={this.handleReferralSubmit}
//       />
//   }
// </Grid>
