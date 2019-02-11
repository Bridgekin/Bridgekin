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

//Import CSS and theme
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import './opportunity_home.css'

//Import Local Components
import OpportunityCard from './opportunity_card';
import OpportunityReferral from './opportunity_referral';
import OpportunityWaitlist from './opportunity_waitlist';
import WaitlistModal from '../waitlist_modal';
import Loading from '../loading';

//Imported Actions
import { registerWaitlistUser } from '../../actions/waitlist_user_actions';
import { fetchOpportunities } from '../../actions/opportunity_actions';
import { fetchNetworks } from '../../actions/network_actions';
import { createReferral } from '../../actions/referral_actions';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDownSharp';

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
    padding: "64px 35px 0px 35px",
    paddingTop: 64 + 34,
    flexGrow: 1,
    backgroundColor: `${theme.palette.lightGrey}`,
    minHeight: window.innerHeight
  },
  column:{
    // border: "1px solid black",
    paddingLeft: 17,
    paddingRight: 17,
    // margin: "20px 17px"
  },
  insightCard:{
    // height: 118,
    padding: "9px 17px 20px",
    backgroundColor: 'white',
    margin: "18px 0px"
  },
  oppNotification:{
    borderRadius: 10,
    padding: "8px 10px",
    backgroundColor: `${theme.palette.lightGrey}`
  },
  waitlistCard:{
    padding: "9px 17px 20px",
    backgroundColor: 'white'
  },
  typography:{
    cardHeader: {
      fontSize: 14,
      fontWeight: 500
    },
    cardHeader2: {
      fontSize: 13,
      fontWeight: 500
    },
    filterHeader:{
      fontSize: 14,
      fontWeight: 600
    },
    filterSubtext:{
      fontSize: 10,
      fontWeight: 300
    },
    fieldLabel:{
      fontSize: 12
    }
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
      cardOpen: false,
      dropdownOpen: false,
      dropdownFocus: '',
      referralNetwork: null,
      anchorEl: null
    };

    this.handleWaitlistChange = this.handleWaitlistChange.bind(this);
    this.handleWaitlistSubmit = this.handleWaitlistSubmit.bind(this);
    this.handleReferralChange = this.handleReferralChange.bind(this);
    this.handleReferralSubmit = this.handleReferralSubmit.bind(this);
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.handleDropdownClose = this.handleDropdownClose.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
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

  handleWaitlistChange(field){
    return e => {
      e.preventDefault();
      this.setState({ [field]: e.target.value})
    }
  }

  handleWaitlistClose = () => {
    this.setState({ waitlistOpen: false });
  };

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

    const { loading, waitlistOpen,
          referralNetwork, anchorEl,
          dropdownFocus, opportunitiesLoaded } = this.state;

    const networksArray = Object.values(networks)

    opportunities = opportunities.filter(o => o.status === "Approved")

    let column1 = (
      <Grid container justify='center' alignItems='center'
        style={{ padding: 0}}>
        <div className={classes.insightCard}>
          <Typography gutterBottom align='Left'
            className={classes.typography.cardHeader}
            style={{ marginBottom: 20}}>
            Over $71M in opportunities connected
          </Typography>

          <div className={classes.oppNotification}>
            <Typography align='Left'
              className={classes.typography.cardHeader}
              style={{ color: theme.palette.darkGrey}}>
              There are 10 opportunities for you to checkout
            </Typography>
          </div>
        </div>

        <div className={classes.waitlistCard}>
          <Typography gutterBottom align='Left'
            className={classes.typography.cardHeader}
            style={{ marginBottom: 20, color: theme.palette.darkGrey}}>
            Invite your trusted business contacts
          </Typography>

          <OpportunityWaitlist
            handleSubmit={this.handleWaitlistSubmit}
            loading={loading}
            currentUser={this.props.currentUser}
            />
        </div>
      </Grid>
    )

    let feed = <div></div>
    let filter = (
      <Grid container justify='center' alignItems='center'
        style={{ padding: 0}}>
      </Grid>
    )

    return (
      <MuiThemeProvider theme={theme} style={{flexGrow: 1}}>
        <Grid container justify='center' className={classes.grid}>
          <Grid item lg={12} md={12}
            container justify='space-between'>
            <Grid item sm={3} className={classes.column}>
              {column1}
            </Grid>
            <Grid item sm={6} className={classes.column}>
              {feed}
            </Grid>
            <Grid item sm={3} className={classes.column}>
              {filter}
            </Grid>
          </Grid>
        </Grid>

        <WaitlistModal open={waitlistOpen}
          handleClose={this.handleWaitlistClose}
          referred={true}/>
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
