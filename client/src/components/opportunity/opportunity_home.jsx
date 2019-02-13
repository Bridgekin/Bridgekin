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
    padding: "64px 35px 50px 35px",
    paddingTop: 64 + 34,
    flexGrow: 1,
    backgroundColor: `${fade(theme.palette.common.black,0.05)}`,
    minHeight: window.innerHeight
  },
  column:{
    // border: "1px solid black",
    paddingLeft: 0,
    paddingRight: 0,
    // margin: "20px 17px"
  },
  feedCard:{
    // height: 118,
    padding: "9px 17px 20px",
    backgroundColor: `${theme.palette.white}`,
    marginTop: 18,
    width: '100%',
    borderRadius: 5,
    border: `1px solid ${theme.palette.lightGrey}`
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
  oppStatus:{
    height: 29,
    width: 89,
    textTransform: 'uppercase',
    backgroundColor: `${fade(theme.palette.common.black,0.05)}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
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
  createFilterButton:{
    textTransform: 'none',
    backgroundColor: `${fade(theme.palette.common.black,0.05)}`,
    marginRight: 10,
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
  fieldLabel:{
    fontSize: 12
  }
  // homeheader:{
  //   padding: "20px 0px 20px 0px",
  //   backgroundColor: 'RGBA(196,196,196,0.1)',
  //   borderBottom: `0.5px solid ${theme.palette.grey1}`
  // },
  // headerTypography:{
  //   margin: "25px 0px 25px 0px"
  // },
  // subheaderTypography:{
  //   color: theme.palette.darkGrey,
  //   fontSize: 24,
  //   marginBottom: 20
  // },
  // headerDescriptionTypography:{
  //   // color: theme.palette.grey2,
  //   fontSize: 18,
  //   fontWeight: 300
  // },
  // gridOpp:{
  //   marginBottom: 15,
  //   display: 'flex'
  // },
  // gridItem:{
  //   margin: "15px 0px 15px 0px"
  // },
  // button:{
  //   minWidth: 150
  // },
  // chipContainer:{
  //   marginTop: 40
  // },
  // wrapper: {
  //   display: 'flex',
  //   justifyContent: 'center'
  // },
  // buttonProgress: {
  //   color: '#4067B2',
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   marginLeft: -12,
  // },
  // paper: {
  //   position: 'absolute',
  //   width: '40%',
  //   height: 300,
  //   backgroundColor: theme.palette.background.paper,
  //   boxShadow: theme.shadows[5],
  //   padding: theme.spacing.unit * 4,
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'flex-start',
  //   justifyContent: 'center'
  // },
  // refButton:{
  //   fontSize: 20,
  //   fontWeight: 700,
  //   marginTop: 25,
  //   height: 55,
  //   width: 200
  // },
  // networkPaper: {
  //   marginRight: theme.spacing.unit * 2,
  // },
  // formControl: {
  //   margin: theme.spacing.unit,
  //   minWidth: 120,
  // },
  // dropdownButton:{
  //   display: 'flex'
  // },
  // dropdownMenuItem: {
  //   // width: 150,
  //   height: 'auto',
  //   paddingTop: 3,
  //   paddingBottom: 3,
  //   borderBottom: "1px solid #D3D3D3",
  // },
  // dropdownHeader: { fontWeight: 600, fontSize: '0.85rem' },
  // dropdownSubHeader: { fontWeight: 200, fontSize: '0.6rem' },
  // addOportunityCard:{
  //   height: 390,
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // }
};

const DEFAULTSTATE = {
  opportunityNeed: '',
  geography: [],
  industries: [],
  value: '',
  title: '',
  description: '',
  status: 'Pending',
  picture: null,
  pictureUrl: null,
  networks: [],
  anonymous: false
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

  handleDropdownClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleDropdownClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDropdownChange(type, id){
    return e => {
      if (type === 'Network'){
        this.props.fetchOpportunities(id)
        .then(() => this.setState({
            dropdownFocus: id, anchorEl: null
          })
        )
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
          dropdownFocus, opportunitiesLoaded } = this.state;

    const networksArray = Object.values(networks)

    // opportunities = opportunities.filter(o => o.status === "Approved")

    let column1 = (
      <Grid container justify='center' alignItems='center'
        style={{ padding: 0, width: '100%'}}>
        <div className={classes.feedCard}
          >
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

    let loader = (
      <Grid container justify='center' alignItems='center'
        className={classes.loader}>
        <CircularProgress className={classes.progress} />
      </Grid>
    )

    let opportunityCards = opportunities.map(opportunity => (
      <OpportunityCardFeed
        currentUser={currentUser}
        opportunity={opportunity}
        classes={classes} />
    ));

    let feed = (
      <Grid container justify='center' alignItems='center'
        style={{ padding: "0px 0px 150px 0px",  overflow: 'auto'}}>

        <CardActionArea className={classes.feedCard}
          onClick={this.handleOpportunityChangeModalOpen}>
          <Typography align='Left'
            className={classes.cardHeader}>
            Create Opportunity
          </Typography>

          <Grid container
            style={{ borderBottom: `1px solid ${theme.palette.grey1}`}}>
            <IconButton
              onClick={() => this.props.history.push('/')}
              color="secondary"
            >
              {currentUser.profilePicUrl ? (
                <Avatar alt="profile-pic"
                  src={currentUser.profilePicUrl}
                  className={classes.avatar} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>

            <Grid container style={{ flexGrow: 1, width: 'auto'}}
              alignItems='center'>
              <Typography align='Left' color="textSecondary"
                className={classes.cardHeader}
                style={{ padding: "15px 0px"}}
                onClick={() => console.log('open modal')}>
                What's your most pressing business need or opportunity
              </Typography>
            </Grid>
          </Grid>

          <Grid container style={{ paddingTop: 17}}>
            <Button className={classes.createFilterButton}>
              Image
            </Button>
            <Button className={classes.createFilterButton}>
              Privacy
            </Button>
            <Button className={classes.createFilterButton}>
              {`Share with: Connections`}
            </Button>
          </Grid>
        </CardActionArea>

        {(opportunitiesLoaded) ? opportunityCards : loader}
      </Grid>
    )

    let otherDropdownOptions = [
      {header: 'Connections' , subHeader: 'Your Connections', disabled: true},
      {header: 'Network Circles' , subHeader: 'Your segmented lists of connections', disabled: true},
      {header: 'Custom' , subHeader: 'Include and exclude specific connections', disabled: true}
    ]

    let filter = (
      <Grid container justify='center' alignItems='center'
        style={{ padding: 0, width: '100%'}}>
        <div className={classes.filterCard}
          >
          <Typography align='Left'
            className={classes.cardHeader}
            style={{ margin: "10px 20px 0px"}}>
            What opportunities do you want to see?
          </Typography>

          <List component="nav">
            <ListItem button className={classes.filterItem}
              onClick={this.handleDropdownChange('Network','')}
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
                onClick={this.handleDropdownChange('Network',network.id)}
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

            {otherDropdownOptions.map(other => (
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

    return (
      <MuiThemeProvider theme={theme} style={{flexGrow: 1}}>
        <Grid container justify='center' className={classes.grid}>
          <Grid item lg={9} md={10} sm={11}
            container justify='center' spacing={16}
            style={{ position: 'fixed', top: 64 }}>
            <Grid item sm={3} className={classes.column}
              style={{ position: 'absolute', left: 0}}>
              {column1}
            </Grid>
            <Grid item sm={6} className={classes.column}
              style={{ overflow: 'scroll', maxHeight: window.innerHeight }}>
              {feed}
            </Grid>
            <Grid item sm={3} className={classes.column}
              style={{ position: 'absolute', right: 0}}>
              {filter}
            </Grid>
          </Grid>
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
          availNetworks={networks}
          type={'create'}
          />
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OpportunityHome));
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
