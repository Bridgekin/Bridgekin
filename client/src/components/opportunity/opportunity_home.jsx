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

//Imported Actions
import { registerWaitlistUser } from '../../actions/waitlist_user_actions';
import { fetchOpportunities } from '../../actions/opportunity_actions';
import { fetchNetworks } from '../../actions/network_actions';
import { createReferral } from '../../actions/referral_actions';

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
  homeheader:{
    padding: "20px 0px 50px 0px",
    backgroundColor: 'RGBA(196,196,196,0.1)',
    borderBottom: `0.5px solid ${theme.palette.grey1}`
  },
  headerTypography:{
    margin: "25px 0px 25px 0px"
  },
  subheaderTypography:{
    color: theme.palette.darkGrey,
    fontSize: 24,
    marginBottom: 20
  },
  headerDescriptionTypography:{
    // color: theme.palette.grey2,
    fontSize: 18,
    fontWeight: 300
  },
  gridOpp:{
    marginBottom: 15,
    display: 'flex'
  },
  gridItem:{
    margin: "15px 0px 15px 0px"
  },
  button:{
    minWidth: 150
  },
  chipContainer:{
    marginTop: 40
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  buttonProgress: {
    color: '#4067B2',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -12,
  },
  paper: {
    position: 'absolute',
    width: '40%',
    height: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  refButton:{
    fontSize: 20,
    fontWeight: 700,
    marginTop: 25,
    height: 55,
    width: 200
  },
  networkPaper: {
    marginRight: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  dropdownButton:{
    display: 'flex'
  },
  dropdownMenuItem: {
    // width: 150,
    height: 'auto',
    paddingTop: 3,
    paddingBottom: 3,
    borderBottom: "1px solid #D3D3D3",
  },
  dropdownHeader: { fontWeight: 600, fontSize: '0.85rem' },
  dropdownSubHeader: { fontWeight: 200, fontSize: '0.6rem' },
  addOportunityCard:{
    height: 390,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
};


class OpportunityHome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      opportunitiesLoaded: false,
      referralLink: '',
      network: '',
      fname: '',
      email: '',
      loaded: false,
      success: false,
      waitlistOpen: false,
      cardOpen: false,
      dropdownOpen: false,
      dropdownFocus: '',
      referralNetwork: null,
      anchorEl: null
    };

    this.opportunities = [
      {
        title: `Tuscan Castle surrounded by 30+ acres of vineyards and olive
        groves seekings buyer`,
        description: `Historically refurbished 33,000 sq ft castle in the heart
        of the Tuscan countryside. Off the market property considered
        the Crown of Ireland!`,
        geography: 'Italy',
        industry: 'Real Estate and Housing',
        value: 'Over 25M',
        need: 'Raise Capital',
        networks: 'All Bridgekin'
      },
      {
        title: 'Test house',
        description: 'This is a second test house where you can also see blah blah',
        geography: 'Romania',
        industry: 'Real Estate and Housing',
        value: 'Over 500k',
        need: 'Raise Capital',
        networks: 'All Bridgekin'
      },
    ];

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
      let referralNetwork = Object.values(this.props.networks)[0].id;
      this.props.fetchOpportunities(this.state.dropdownFocus)
        .then(() => {
          this.setState({
            opportunitiesLoaded: true,
            referralNetwork})
        });
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

  handleWaitlistSubmit(e){
    e.preventDefault();

    let user = {
      email: this.state.email,
      fname: this.state.fname,
      fromReferralId: this.props.currentUser.id
    }

    if (!this.state.loading) {
      this.setState({ success: false, loading: true },
        () => {
          this.props.registerWaitlistUser(user)
            .then(res => {
              this.setState({
                loading: false,
                success: true,
                waitlistOpen: true,
                email: '',
                fname: '',
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

  // handleDropdownToggle(){
  //   this.setState({ dropdownOpen: !this.state.dropdownOpen})
  // }

  handleDropdownClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleDropdownClose = () => {
    this.setState({ anchorEl: null });
 };

 handleDropdownChange(type, id){
  return e => {
    debugger
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
          dropdownFocus } = this.state;

    const networksArray = Object.values(networks)

    opportunities = opportunities.filter(o => o.status === "Approved")

    let headerChips = (
      <Grid container justify="space-around" alignItems="center"
        className={[classes.root, classes.chipContainer].join(' ')}>

        <Grid item xs={10} sm={3} justify='center'>
          <Button variant="contained" color='primary'
            className={classes.button}>
            <p className='fc-header-p'>
              <span className='fc-header-number'><strong>35</strong></span>
                New Members
            </p>
          </Button>
        </Grid>

        <Grid item xs={10} sm={4} justify='center'>
          <Button variant="contained" color='primary'
            className={classes.button}>
            <p className='fc-header-p'>
              <span className='fc-header-number'><strong>35</strong></span>
                New Opportunities
            </p>
          </Button>
        </Grid>

        <Grid item xs={10} sm={3} justify='center'>
          <Button variant="contained" color='primary'
            className={classes.button}>
            <p className='fc-header-p'>
              <span className='fc-header-number'><strong>35</strong></span>
                New connections
            </p>
          </Button>
        </Grid>

      </Grid>
    )

    let header = (
      <Grid container className={[classes.homeheader, classes.root].join(' ')}
        justify="center" alignItems="center">

        <Grid item xs={10} justify="center" alignItems="center"
          className={classes.headerItem}>
          <Typography variant="h1" gutterBottom align='center'
            className={classes.headerTypography}>
            {`Welcome ${currentUser.fname}`.toUpperCase()}
          </Typography>

          <Typography variant="h4" gutterBottom align='center'
            className={classes.subheaderTypography}>
            There are {opportunities.length} opportunities for you to check out
          </Typography>

          <Typography variant="p" gutterBottom align='center'
            className={classes.headerDescriptionTypography}
            color="textPrimary">
            Connect with the opportunities that may be perfect for
            you or a trusted contact in your network
          </Typography>
        </Grid>
      </Grid>
    )

    let otherDropdownOptions = [
      {header: 'Connections' , subHeader: 'Your Connections', disabled: true},
      {header: 'Network Circles' , subHeader: 'Your segmented lists of connections', disabled: true},
      {header: 'Custom' , subHeader: 'Include and exclude specific connections', disabled: true}
    ]

    let dropdown = (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleDropdownClick}
          className={classes.dropdownButton}
          style={{ display: 'flex'}}
        >
          <Typography variant="subtitle1" align='left'
            color="textPrimary" style={{ fontSize: 12, fontWeight: 300}}>
            {"View By:"}
          </Typography>
          <Typography variant="subtitle1" align='left'
            color="textPrimary"
            style={{ fontWeight: 600, marginLeft: 10, fontSize: 12}}>
            {dropdownFocus === "" ? "All Opportunties" : networks[dropdownFocus].title}
          </Typography>
        </Button>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleDropdownClose}
          style ={{ padding: 0 }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={this.handleDropdownChange('Network', '')}
            className={classes.dropdownMenuItem}
            selected={dropdownFocus === ''}>
            <div>
              <Typography variant="h6" align='left'
                color="textPrimary" className={classes.dropdownHeader}>
                {'All Opportunities'}
              </Typography>
              <Typography variant="body2" align='left'
                color="textPrimary" className={classes.dropdownSubHeader}>
                {'Everything visible to you and the Bridgekin network'}
              </Typography>
            </div>
          </MenuItem>

          {networksArray.map(network => (
            <MenuItem value={network.id}
              className={classes.dropdownMenuItem}
              onClick={this.handleDropdownChange('Network',network.id)}
              selected={dropdownFocus === `${network.id}`}>
              <div>
                <Typography variant="h6" align='left'
                  color="textPrimary" className={classes.dropdownHeader}>
                  {network.title}
                </Typography>
                <Typography variant="body2" align='left'
                  color="textPrimary" className={classes.dropdownSubHeader}>
                  {network.subtitle}
                </Typography>
              </div>
            </MenuItem>
          ))}

          {otherDropdownOptions.map(other => (
            <MenuItem onClick={this.handleDropdownClose}
              className={classes.dropdownMenuItem}
              disabled={other.disabled}
              >
              <div>
                <Typography variant="h6" align='left'
                  color="textPrimary" className={classes.dropdownHeader}>
                  {other.header}
                </Typography>
                <Typography variant="body2" align='left'
                  color="textPrimary" className={classes.dropdownSubHeader}>
                  {other.subHeader}
                </Typography>
              </div>
            </MenuItem>
          ))}
        </Menu>
      </div>
    )

    let opportunityCards = opportunities.map(opportunity => (
      <Grid item xs={12} sm={6} md={4} justify="center" alignItems="center"
        className={classes.gridItem}>
        <OpportunityCard opportunity={opportunity}
          classes={classes} />
      </Grid>
    ));

    let opportunityGrid = (
      <Grid container className={classes.root} style={{padding: "30px 0px"}}
        justify="center" alignItems="center">

        <Grid item xs={11}  justify="flex-end"
          alignItems="center" style={{paddingTop: 0, paddingBottom: 0}}>
          {dropdown}
        </Grid>

        <Grid item xs={11} className={classes.gridOpp}
          container justify="flex-start" alignItems="center" spacing={24}>
          {opportunityCards}

          <Grid item xs={12} sm={6} md={4} justify="center"
            alignItems="center" >
            <Card>
              <CardActionArea className={classes.addOportunityCard}
                onClick={() => this.props.history.push('/postopportunity')}
                disableRipple>
                <AddIcon style={{ fontSize: 150 }}/>
                <Typography variant="h3" gutterBottom align='center'>
                  Add Opportunity
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>

        </Grid>
      </Grid>
    )

    if(this.props.currentUser){
      return (
        <MuiThemeProvider theme={theme} style={{flexGrow: 1}}>
          <Grid container style={{flexGrow: 1}}>
            {header}
            {opportunityGrid}
            <OpportunityWaitlist
              handleChange={this.handleWaitlistChange}
              handleSubmit={this.handleWaitlistSubmit}
              loading={loading}
              email={this.state.email}
              fname={this.state.fname}
            />
          {this.props.currentUser.isAdmin &&
              <OpportunityReferral
                referralNetwork={referralNetwork}
                networks={networksArray}
                referral={referral}
                handleChange={this.handleReferralChange}
                handleSubmit={this.handleReferralSubmit}
              />
            }
          </Grid>
          <WaitlistModal open={waitlistOpen}
            handleClose={this.handleWaitlistClose}/>
        </MuiThemeProvider>
      )
    }
    return <div></div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OpportunityHome));
