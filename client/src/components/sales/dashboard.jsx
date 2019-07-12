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

import { searchContacts, clearContactResults } from '../../actions/sales_contacts_actions';
import { fetchUserNetworks } from '../../actions/sales_network_actions'
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
  salesUserNetworks: state.entities.sales.salesUserNetworks,
  networkDetails: state.entities.sales.networkDetails,
  currentSalesNetworkId: state.entities.sales.currentSalesNetwork
});

const mapDispatchToProps = dispatch => ({
  searchContacts: search => dispatch(searchContacts(search)),
  clearContactResults: () => dispatch(clearContactResults()),
  fetchUserNetworks: () => dispatch(fetchUserNetworks())
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
    bottom: 0,
    margin: 10,
    fontSize: 11
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
    this.isExpiredSub = this.isExpiredSub.bind(this);
  }

  componentDidMount() {
    const { userFeature } = this.props;
    if (!userFeature.importedSocial) {
      this.props.history.push('/sales/connect_social')
    }
    this.searchData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    let thisCurrent = this.props.currentUser;
    let nextCurrent = nextProps.currentUser;
    if (nextCurrent && !thisCurrent && thisCurrent !== nextCurrent) {
      this.searchData();
    }
    return true
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
    }
  }

  handleMenuChange(value){
    return e => {
      this.setState({ 
        filter: value, 
        filterAnchorEl: null,
        offset: 0
      }, () => {
          const { position, company, location, fname, lname } = this.state;
          let search = { position, company, location, fname, lname  }
          this.searchData(search)
        })
    }
  }

  isExpiredSub(){
    const { networkDetails, currentSalesNetworkId } = this.props;

    return networkDetails[currentSalesNetworkId].current_sub_end === "no sub" || Date.parse(networkDetails[currentSalesNetworkId].current_sub_end) < Date.now()
  }

  async searchData(payload = {}){
    const { offset, limit, filter } = this.state;
    const { networkDetails, currentSalesNetworkId } = this.props;

    if(!currentSalesNetworkId){
      this.setState({ unconnectedUser: true })
    } else if(this.isExpiredSub()){
      this.setState({ subscriptionExpired: true})
    } else {
      this.setState({ loaded: false });
      this.props.clearContactResults();
      payload = await merge({}, payload, { offset, limit, filter, currentSalesNetworkId })
      let total = await this.props.searchContacts(payload)
      await this.setState({ total, loaded: true })
    }
  }

  searchByCharacteristic(){
    const { fname, lname, position, company, location } = this.state;
    let search = { position, company, location}

    this.setState({ offset: 0 },
      () => {
        this.searchData(search)
        .then(() => {
          this.setState({ fname: '', lname: '' })
        })
      })
  }

  searchByName(){
    const { fname, lname, position, company, location } = this.state;
    let search = { fname, lname }

    this.setState({ offset: 0 },
      () => {
        this.searchData(search)
          .then(() => {
            this.setState({ position: '', company: '', location: '' })
          })
        })
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
      <Grid item xs={9} container spacing={2}
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
      searchContacts } = this.props;
    const { position, company, location,
      fname, lname, search,
      filter, filterAnchorEl,
      loaded, unconnectedUser,
      subscriptionExpired } = this.state;

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
        <Grid item xs={6} sm={5} md={4}
          container direction='column' justify='center' alignItems='center'>
          <Typography align='center' gutterBottom
            color='textPrimary'
            style={{ fontSize: 38, fontWeight: 600 }}>
            {`Your Subscription has ended`}
          </Typography>
          <Typography align='center'
            color='textSecondary'
            style={{ fontSize: 18 }}>
            {`In order to continue using Bridgekin, please contact your network admin to continue your subscription. Thanks!`}
          </Typography>
        </Grid>
      </Grid>
    } else if (unconnectedUser) {
      return <Grid container justify='center' style={{ minHeight: dimensions.height }}>
        <Grid item xs={6} sm={5} md={4}
          container direction='column' justify='center' alignItems='center'>
          <Typography align='center' gutterBottom
            color='textPrimary'
            style={{ fontSize: 38, fontWeight: 600 }}>
            {`Features In Progress`}
          </Typography>
          <Typography align='center'
            color='textSecondary'
            style={{ fontSize: 18 }}>
            {`We're building this feature out right now, so check back in shortly to experience our new dashboard.`}
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
        style={{ marginBottom: 30, padding: "20px 0px"}}>
          <Grid container item xs={10} justify='space-around'>
            <Grid item container xs={4} direction='column' justify='space-around'
            style={{ height: "100%"}}>
              <Typography align='center' gutterBottom 
              color='textSecondary'
              style={{ fontSize: 16 }}>
                {`Search by Feature`}
              </Typography>
              <TextField
                label="Title/Position"
                className={classes.textField}
                margin="dense"
                variant='outlined'
                value={position}
                onChange={this.handleChange('position')}
                onMouseUp={this.handleChange('position')}
              />

              <TextField
                label="Company"
                className={classes.textField}
                margin="dense"
                variant='outlined'
                value={company}
                onChange={this.handleChange('company')}
                onMouseUp={this.handleChange('company')}
              />

              <TextField
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
                  onClick={this.searchByCharacteristic}>
                  {`Search by Feature`}
                </Button>
              </Grid>
            </Grid>

            <Grid item xs={2} container alignItems='center' justify='center'>
              <Typography>
                {`OR`}
              </Typography>
            </Grid>

            <Grid item container xs={4}
              direction='column' justify='space-between'
              style={{ height: "100%" }}>
              <Grid container direction='column'>
                <Typography align='center' gutterBottom color='textSecondary'
                  style={{ fontSize: 16 }}>
                  {`Search by Name`}
                </Typography>
                <TextField
                  label="First Name"
                  className={classes.textField}
                  margin="dense"
                  variant='outlined'
                  value={fname}
                  onChange={this.handleChange('fname')}
                  onMouseUp={this.handleChange('fname')}
                />

                <TextField
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
          <Grid item xs={10}>
            <Grid container justify='space-between'
            style={{ marginBottom: 30}}>
              <Button onClick={this.handleMenuClick('filterAnchorEl')}
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
                  return <MenuItem onClick={this.handleMenuChange(choice)}>
                    <Typography style={{ fontSize: 14}}>
                      {filterValues[choice]}
                    </Typography>
                  </MenuItem>
                })}
              </Menu>
              <Button color='primary' variant='contained'
                onClick={this.connectNetworks}>
                {`Connect Your Networks`}
              </Button>
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

        <div className={classes.iconCredit}>
          Icons made by <a href="https://www.flaticon.com/authors/elegant-themes" title="Elegant Themes">Elegant Themes</a> and <a href="https://www.flaticon.com/authors/google" title="Google">Google</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
        </div>
      </div>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SalesDashboard));
