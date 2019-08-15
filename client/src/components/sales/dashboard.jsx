import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ResultCard from './result_card.jsx'
// import Pagination from "react-js-pagination";
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
import merge from 'lodash/merge';
import Loading from '../loading';
import Capitalize from 'capitalize';
import isEmpty from 'lodash/isEmpty';

import { searchContacts, clearContactResults, trackViewByClick } from '../../actions/sales_contacts_actions';
// require("bootstrap/less/bootstrap.less");

const EXAMPLE = {
  1: {
    fname: "Test",
    lname: "Person",
    company: "Bridgekin",
    position: "CEO",
    location: "San Francisco",
    connectedMembers: []
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  dimensions: state.util.window,
  userFeature: state.entities.userFeature,
  results: state.entities.sales.searchContacts,
  networkDetails: state.entities.sales.networkDetails,
  currentDashboardTarget: state.entities.sales.currentDashboardTarget,
  salesUserPermissions: state.entities.sales.salesUserPermissions,
  salesAdminNetworks: state.entities.sales.salesAdminNetworks,
  salesNetworks: state.entities.sales.salesNetworks
});

const mapDispatchToProps = dispatch => ({
  searchContacts: search => dispatch(searchContacts(search)),
  clearContactResults: () => dispatch(clearContactResults()),
  trackViewByClick: () => dispatch(trackViewByClick()),
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    paddingTop: 64+15,
    paddingBottom: '10%'
  },
  iconCredit: {
    position: "absolute", 
    bottom: 35, right:0,
    margin: 0,
    fontSize: 11,
    [theme.breakpoints.up('sm')]: {
      bottom: 0,
      left: 0
    },
  },
  orDivider:{
    margin: "15px 0px",
    [theme.breakpoints.up('sm')]: {
      margin: 0
    },
  }
})

class SalesDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fname: '',
      lname: '',
      company: '',
      position: '',
      location: '',
      search: false,
      loaded: false,
      offset: 0,
      total: 0,
      limit: 10,
      filter: '',
      filterAnchorEl: null,
      unconnectedUser: false,
      limitedUser: false,
      subscriptionExpired: false
    }

    this.connectNetworks = this.connectNetworks.bind(this);
    this.searchByName = this.searchByName.bind(this);
    this.searchByCharacteristic = this.searchByCharacteristic.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.searchData = this.searchData.bind(this);
    this.getResults = this.getResults.bind(this);
    this.handleMenuChange = this.handleMenuChange.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleDashSpaceChange = this.handleDashSpaceChange.bind(this);
    this.isExpiredSub = this.isExpiredSub.bind(this);
  }

  componentDidMount() {
    const { userFeature, currentDashboardTarget, salesUserPermissions, salesNetworks } = this.props;
    
    // if (isEmpty(salesUserPermissions)) {
    //   this.setState({ unconnectedUser: true })
    // } else if (!isEmpty(currentDashboardTarget)) {
    //   this.searchData()
    // }
    this.searchData()

    if (!userFeature.importedSocial && !isEmpty(salesUserPermissions)) {
      this.props.history.push('/sales/connect_social')
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let thisCurrent = this.props.currentUser;
    let nextCurrent = nextProps.currentUser;
    if (nextCurrent && !thisCurrent && thisCurrent !== nextCurrent) {
      this.searchData();
    }
    return true
  }

  componentDidUpdate(prevProps, prevState){
    let thisDashTarget = this.props.currentDashboardTarget;
    let prevDashTarget = prevProps.currentDashboardTarget;
    if (thisDashTarget !== prevDashTarget) {
      // debugger
      this.searchData();
    }
    return true
  }

  isExpiredSub(){
    const { networkDetails, currentDashboardTarget } = this.props;

    if (isEmpty(currentDashboardTarget) ||currentDashboardTarget.permissableType === "User"){ return false }

    let detail = networkDetails[currentDashboardTarget.permissableId];
    return !detail || detail.currentSubEnd === "no sub" || Date.parse(detail.currentSubEnd) < Date.now()
  }

  async searchData(){
    const { offset, limit, filter, fname, lname, position, company, location } = this.state;
    const { networkDetails, currentDashboardTarget, salesUserPermissions } = this.props;

    if (this.isExpiredSub()) {
      this.setState({ subscriptionExpired: true })
    } else {
      this.setState({ loaded: false });
      this.props.clearContactResults();
      let payload = await merge({}, { fname, lname, position, company, location }, { offset, limit, filter }, currentDashboardTarget)
      let total = await this.props.searchContacts(payload)
      await this.setState({ total, loaded: true, unconnectedUser: false, subscriptionExpired: false })
    }
  }

  searchByCharacteristic(){
    this.setState({ offset: 0, fname: '', lname: ''},
      () => this.searchData())
  }

  searchByName(){
    this.setState({ offset: 0, position: '', company: '', location: '' },
      () => this.searchData())
  }

  handlePageChange(offset) {
    console.log(`active page is ${offset}`);
    this.setState({ offset },
      () => {
        const { fname, lname, position, company, location } = this.state;
        let search = { fname, lname, position, company, location }
        this.searchData(search)
      })
  }

  handleMenuClick(anchor) {
    return e => {
      e.stopPropagation();
      const selectedEl = this.state[anchor];
      this.setState({ [anchor]: (selectedEl ? null : e.currentTarget) })
      //Track click
      if (anchor === 'filterAnchorEl') {
        this.props.trackViewByClick()
      }
    }
  }

  handleMenuChange(value) {
    return e => {
      this.setState({
        filter: value,
        filterAnchorEl: null,
        offset: 0
      }, () => {
        const { position, company, location, fname, lname } = this.state;
        let search = { position, company, location, fname, lname }
        this.searchData(search)
      })
    }
  }

  handleDashSpaceChange(choice){
    return e => {
      if(choice){
        let { permissableId, permissableType, memberType } = choice
        this.props.setDashboardTarget({ permissableId, permissableType, memberType })
      } else {
        this.props.setDashboardTarget({})
      }
      this.setState({ dashboardSpaceAnchorEl: null })
    }
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value })
    }
  }

  connectNetworks() {
    this.props.history.push('/sales/connect_social')
  }

  getResults(){
    const { results } = this.props;
    const { loaded, total} = this.state;

    if(!loaded){
      return <Grid style={{ padding: "30px 0px"}}>
          <Loading />
        </Grid>
    }

    let resultArray = Object.values(results);
    let resultCards = resultArray.map((contact, idx) => (
      <ResultCard contact={contact} idx={idx} />
    ))

    let resultsComponent = <Grid container justify='center'>
      <Grid item xs={12} sm={9} container spacing={2}
        data-cy='search-results'
        justify='flex-start'
        style={{ margin: "20px 0px" }}>
        {(resultArray.length > 0) ? (
          resultCards
        ) : (
            <Typography color='textSecondary'
              align='center'>
              {`Use the form above to find potential leads. Results will show here.`}
            </Typography>
          )}
      </Grid>

      <Grid item xs={9} container justify='center'>
        <CssBaseline />
        <Pagination
          limit={this.state.limit}
          offset={this.state.offset}
          total={this.state.total}
          onClick={(e, offset) => this.handlePageChange(offset)}
        />
      </Grid>
    </Grid>

    return resultsComponent
  }

  render() {
    const { classes, dimensions, resultNodes,
      searchContacts, salesUserPermissions,
      salesNetworks,
      currentDashboardTarget } = this.props;
    const { position, company, location,
      fname, lname, search,
      filter, filterAnchorEl, dashboardSpaceAnchorEl,
      loaded, unconnectedUser,
      subscriptionExpired, limitedUser } = this.state;

    let memberType = currentDashboardTarget.memberType || ""

    let dashboardSpaceValues = {
      "": "All",
      "teammates": "My Team's Contacts",
      "mine": "My Contacts",
      "investor": "Investor Contacts",
      "linkedIn": "Contacts From LinkedIn",
      "google": "Contacts From Google"
    }

    let filterValues = {
      "": "All",
      "teammates": "My Team's Contacts",
      "mine": "My Contacts",
      "investor": "Investor Contacts",
      "linkedIn": "Contacts From LinkedIn",
      "google": "Contacts From Google"
    }

    if (subscriptionExpired){
      return <Grid container justify='center' style={{ minHeight: dimensions.height }}>
        <Grid item xs={10} sm={7} md={5}
          container direction='column' justify='center' alignItems='center'>
          <Typography align='center' gutterBottom
            color='textPrimary'
            style={{ fontSize: 38, fontWeight: 600 }}>
            {`Your Subscription has ended`}
          </Typography>
          <Typography align='center'
            color='textSecondary'
            style={{ fontSize: 18 }}>
            {`In order to continue using Bridgekin, please contact your network admin to continue your subscription. You can also reach out to `}<a href=" mailto:admin@bridgekin.com">admin@bridgekin.com</a>{` for any additional questions.`} <br /><br />{`Thanks!`}
          </Typography>
        </Grid>
      </Grid>
    } else if (unconnectedUser) {
      return <Grid container justify='center' style={{ minHeight: dimensions.height }}>
        <Grid item xs={10} sm={7} md={5}
          container direction='column' justify='center' alignItems='center'>
          <Typography align='center' gutterBottom
            color='textPrimary'
            style={{ fontSize: 38, fontWeight: 600 }}>
            {`Features In Progress`}
          </Typography>
          <Typography align='center'
            color='textSecondary'
            style={{ fontSize: 18 }}>
            {`We're in the process of building out this feature, so please check back in shortly. You can also reach out to `} 
            <a href=" mailto:admin@bridgekin.com">admin@bridgekin.com</a>
            {` for any additional questions.`} <br /><br />
            {`Thanks!`}
          </Typography>
        </Grid>
      </Grid>
    } else if (limitedUser){
      return <Grid container justify='center' style={{ minHeight: dimensions.height }}>
        <Grid item xs={10} sm={7} md={5}
          container direction='column' justify='center' alignItems='center'>
          <Typography align='center' gutterBottom
            color='textPrimary'
            style={{ fontSize: 38, fontWeight: 600 }}>
            {`Limited Access`}
          </Typography>
          <Typography align='center'
            color='textSecondary'
            style={{ fontSize: 18 }}>
            {`You don't have access to this feature today. While we're working on a feature for users granted limited-functionality, today, your access is limited to uploading contacts and receiving introduction requests.`}<br /><br /> {`If you're having issues, please reach out to `}
            <a href=" mailto:admin@bridgekin.com">admin@bridgekin.com</a>
            {` for support.`} <br /><br />
            {`Thanks!`}
          </Typography>
        </Grid>
      </Grid>
    } else if (!loaded) {
      return <Grid container justify='center'
        alignItems='center' style={{ minHeight: dimensions.height }}>
        <Loading />
      </Grid>
    } else {
      let searchComponent = <Paper>
        <Grid container justify='center'
        style={{ marginBottom: 30, padding:"20px 0px"}}>
          <Grid container item xs={10} justify='space-around'>
            <Grid item container xs={12} sm={4}direction='column' justify='space-around'>
              <Typography align='center' gutterBottom 
              color='textSecondary'
              style={{ fontSize: 16 }}>
                {`Search by Feature`}
              </Typography>
              <TextField
                data-cy='position-input'
                label="Title/Position"
                className={classes.textField}
                margin="dense"
                variant='outlined'
                value={position}
                onChange={this.handleChange('position')}
                onMouseUp={this.handleChange('position')}
              />
              <TextField
                data-cy='company-input'
                label="Company"
                className={classes.textField}
                margin="dense"
                variant='outlined'
                value={company}
                onChange={this.handleChange('company')}
                onMouseUp={this.handleChange('company')}
              />

              <TextField
                data-cy='location-input'
                label="Location"
                className={classes.textField}
                margin="dense"
                variant='outlined'
                value={location}
                onChange={this.handleChange('location')}
                onMouseUp={this.handleChange('location')}
              />

              <Grid container justify='center'
              style={{ marginTop: 10}}>
                <Button variant='contained' color='primary'
                  data-cy='search-feature-submit'
                  onClick={this.searchByCharacteristic}>
                  {`Search by Feature`}
                </Button>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={2} container alignItems='center' justify='center'
            className={classes.orDivider}>
              <Typography>
                {`OR`}
              </Typography>
            </Grid>

            <Grid item container xs={12} sm={4}
              direction='column' justify='space-between'>
              <Grid container direction='column'>
                <Typography align='center' gutterBottom color='textSecondary'
                  style={{ fontSize: 16 }}>
                  {`Search by Name`}
                </Typography>
                <TextField
                  data-cy='fname-input'
                  label="First Name"
                  className={classes.textField}
                  margin="dense"
                  variant='outlined'
                  value={fname}
                  onChange={this.handleChange('fname')}
                  onMouseUp={this.handleChange('fname')}
                />
                <TextField
                  data-cy='lname-input'
                  label="Last Name"
                  className={classes.textField}
                  margin="dense"
                  variant='outlined'
                  value={lname}
                  onChange={this.handleChange('lname')}
                  onMouseUp={this.handleChange('lname')}
                />
              </Grid>
              <Grid container justify='center'
                style={{ marginTop: 40 }}>
                <Button variant='contained' color='primary'
                  data-cy='search-name-submit'
                onClick={this.searchByName}>
                  {`Search By Name`}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      return <div style={{ minHeight: dimensions.height}}>
        <Grid container justify='center'
          className={classes.grid}>
          <Grid item xs={12} sm={10}>
            <Grid container justify='flex-start'
            style={{ marginBottom: 30, padding: "0px 15px"}}>
              <Button onClick={this.handleMenuClick('filterAnchorEl')}
                data-cy='view-by-button'
              style={{ textTransform: 'none'}}>
                <Typography color='textPrimary'
                style={{ fontSize: 14}}>
                  {`View By: ${filterValues[filter]}`}
                </Typography>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={this.handleMenuClick('filterAnchorEl')}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                getContentAnchorEl={null}>
                {["", "teammates", "mine", "linkedIn", "google"].map(choice => {
                  return <MenuItem onClick={this.handleMenuChange(choice)}
                  data-cy={`view-option-${choice}`}
                  disabled={memberType !== "full" && choice === "teammates"}>
                    <Typography style={{ fontSize: 14}}>
                      {filterValues[choice]}
                    </Typography>
                  </MenuItem>
                })}
              </Menu>
            </Grid>
            {searchComponent}
            <Paper>
              <Grid container justify='center'>
                <Typography gutterBottom color='textSecondary'
                style={{ fontSize: 18, marginTop: 30}}>
                  {`Search Results`}
                </Typography>
              </Grid>
              {this.getResults()}
            </Paper>
          </Grid>
        </Grid>

        {/* <div className={classes.iconCredit}>
          Icons made by <a href="https://www.flaticon.com/authors/elegant-themes" title="Elegant Themes">Elegant Themes</a> and <a href="https://www.flaticon.com/authors/google" title="Google">Google</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
        </div> */}
      </div>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SalesDashboard));
