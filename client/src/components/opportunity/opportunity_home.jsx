import React from 'react';
import { connect } from 'react-redux';

//Import Material Components
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//Import CSS and theme
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import './opportunity_home.css'

//Import Local Components
import OpportunityCard from './opportunity_card';
import OpportunityReferral from './opportunity_referral';
import WaitlistModal from '../waitlist_modal';
import CardModal from './card_modal';

//Imported Actions
import { registerWaitlistUser } from '../../actions/waitlist_user_actions';
import { fetchOpportunities } from '../../actions/opportunity_actions';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
  waitlistErrors: state.errors.waitlistUsers,
  opportunities: Object.values(state.entities.opportunities)
});

const mapDispatchToProps = dispatch => ({
  registerWaitlistUser: (user) => dispatch(registerWaitlistUser(user)),
  fetchOpportunities: () => dispatch(fetchOpportunities())
});

const styles = theme => ({
  jumboRoot: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1,
    margin: "15px 0px 15px 0px"
  },
  homeheader:{
    minHeight: 350
  },
  headerTypography:{
    margin: "25px 0px 25px 0px"
  },
  grid:{
    borderBottom: "1px solid #D3D3D3",
    margin: "15px 0px 15px 0px"
  },
  gridOpp:{
    borderBottom: "1px solid #D3D3D3",
    margin: "15px 0px 15px 0px",
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
  }
});


class OpportunityHome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      opportunitiesLoaded: false,
      referralLink: '',
      network: '',
      fname: '',
      lname: '',
      email: '',
      loaded: false,
      success: false,
      waitlistOpen: false,
      cardOpen: false,
      focusedOpportunity: {}
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

    this.handleChange = this.handleChange.bind(this);
    this.handleWaitlistSubmit = this.handleWaitlistSubmit.bind(this);
    // this.handleReferralChange = this.handleReferralChange.bind(this);
    this.handleCardOpen = this.handleCardOpen.bind(this);
    this.handleCardClose = this.handleCardClose.bind(this);
  }

  componentDidMount(){
    this.props.fetchOpportunities()
      .then(() => {
        this.setState({ opportunitiesLoaded: true})
      });
  }

  handleChange(field){
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
      lname: this.state.lname
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
                lname: ''
              })
            })
      })
    }
  }

  handleCardOpen(focusedOpportunity){
    this.setState({ cardOpen: true, focusedOpportunity });
  }

  handleCardClose(){
    this.setState({ cardOpen: false });
  }

  render (){
    let classes = this.props.classes;
    const { loading, success, waitlistOpen,
          cardOpen, focusedOpportunity } = this.state;

    let header = (
      <Grid container className={classes.root}
        justify="center" alignItems="center">

        <Grid item xs={8} justify="center" alignItems="center"
          className={[classes.homeheader, classes.grid].join(' ')}>
          <Typography variant="h2" gutterBottom align='center'
            color="secondary" className={classes.headerTypography}>
            Welcome, {this.props.currentUser.fname}
          </Typography>

          <Typography variant="h4" gutterBottom align='center'>
            There are 1500 opportunities for you to check out
          </Typography>

          <Typography variant="p" gutterBottom align='center'
            color="secondary">
            Connect with the opportunities that may be perfect for
            you or a trusted contact in your network
          </Typography>

          <Grid container justify="space-around" alignItems="center"
            className={[classes.root, classes.chipContainer].join(' ')}>

            <Grid item xs={10} sm={3} justify='center'>
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
                    New Opportunities
                </p>
              </Button>
            </Grid>

            <Grid item xs={10} sm={3} justify='center'>
              <Button variant="contained" color='primary'
                className={classes.button}>
                <p className='fc-header-p'>
                  <span className='fc-header-number'><strong>35</strong></span>
                    New Opportunities
                </p>
              </Button>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    )

    let opportunities = this.props.opportunities.map(opportunity => (
      <Grid item xs={6} justify="center" alignItems="center"
        className={classes.gridItem}>
        <OpportunityCard opportunity={opportunity}
          classes={classes}
          handleCardOpen={this.handleCardOpen} />
      </Grid>
    ));

    let opportunityGrid = (
      <Grid container className={classes.root}
        justify="center" alignItems="center" spacing={24}>

        <Grid item xs={10} sm={8}  justify="flex-end" alignItems="center">
          <Typography variant="p" gutterBottom align='right'
            color="secondary">
            All Opportunities
          </Typography>
        </Grid>

        <Grid item xs={10} sm={10} className={classes.gridOpp} >
          <Grid container className={classes.root}
            justify="center" alignItems="center" spacing={24}>
            {opportunities}
          </Grid>
        </Grid>
      </Grid>
    )

    if(this.props.currentUser){
      return (
        <MuiThemeProvider theme={theme} className={classes.root}>
          <Grid container className={classes.root}>
            {header}
            {opportunityGrid}
            <OpportunityReferral
              handleChange={this.handleChange}
              handleSubmit={this.handleWaitlistSubmit}
              loading={loading}
            />
          </Grid>
          <WaitlistModal open={waitlistOpen}
            handleClose={this.handleWaitlistClose}/>
          <CardModal open={cardOpen}
            handleClose={this.handleCardClose}
            opportunity={focusedOpportunity}
            demo={false}/>
        </MuiThemeProvider>
      )
    }
    return <div></div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OpportunityHome));
