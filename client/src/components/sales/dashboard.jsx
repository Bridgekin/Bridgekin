import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ResultCard from './result_card.jsx'
// import Pagination from "react-js-pagination";
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
import merge from 'lodash/merge';
import Loading from '../loading';

import { searchContacts } from '../../actions/sales_contacts_actions';
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
  results: state.entities.sales.searchContacts
});

const mapDispatchToProps = dispatch => ({
  searchContacts: search => dispatch(searchContacts(search)),
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    paddingTop: 64,
    paddingBottom: '10%'
  },
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
      limit: 10
    }

    this.connectNetworks = this.connectNetworks.bind(this);
    this.searchByName = this.searchByName.bind(this);
    this.searchByCharacteristic = this.searchByCharacteristic.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.searchData = this.searchData.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  componentDidMount() {
    const { userFeature } = this.props;

    if (!userFeature.importedSocial) {
      this.props.history.push('/sales/connect_social')
    }

    this.searchData()
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

  async searchData(payload){
    const { offset, limit } = this.state;
    this.setState({ loaded: false });
    payload = await merge({}, payload, {offset, limit})
    let total = await this.props.searchContacts(payload)
    await this.setState({ total, loaded: true })
  }

  searchByCharacteristic(){
    const { position, company, location } = this.state;
    let search = { position, company, location}

    this.searchData(search)
  }

  searchByName(){
    const { fname, lname } = this.state;
    let search = { fname, lname }

    this.searchData(search)
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
      return <Loading />
    }

    let resultArray = Object.values(results);
    let resultCards = resultArray.map((contact, idx) => (
      <ResultCard contact={contact} idx={idx} />
    ))

    let resultsComponent = <Grid container justify='center'
      style={{ border: `1px solid grey` }}>
      <Grid item xs={9} container spacing={3}
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
      fname, lname, search } = this.state;

    let searchComponent = <Grid container justify='center'
    style={{ border: `1px solid grey`, marginBottom: 30, padding: "10px 0px"}}>
      <Grid container item xs={10} justify='space-around'>
        <Grid item container xs={4} direction='column' justify='space-around'>
          <Typography align='center'>
            {`Search by Characteristic`}
          </Typography>
          <TextField
            required
            label="Title/Position"
            className={classes.textField}
            margin="dense"
            variant='outlined'
            value={position}
            onChange={this.handleChange('position')}
            onMouseUp={this.handleChange('position')}
          />

          <TextField
            required
            label="Company"
            className={classes.textField}
            margin="dense"
            variant='outlined'
            value={company}
            onChange={this.handleChange('company')}
            onMouseUp={this.handleChange('company')}
          />

          <TextField
            required
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
              {`Search By Characteristic`}
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={2} container alignItems='center' justify='center'>
          <Typography>
            {`OR`}
          </Typography>
        </Grid>

        <Grid item container xs={4}
          direction='column'>
          <Typography align='center'>
            {`Search by Name`}
          </Typography>
          <TextField
            required
            label="First Name"
            className={classes.textField}
            margin="dense"
            variant='outlined'
            value={fname}
            onChange={this.handleChange('fname')}
            onMouseUp={this.handleChange('fname')}
          />

          <TextField
            required
            label="Last Name"
            className={classes.textField}
            margin="dense"
            variant='outlined'
            value={lname}
            onChange={this.handleChange('lname')}
            onMouseUp={this.handleChange('lname')}
          />
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

    return <div style={{ minHeight: dimensions.height }}>
      <Grid container justify='center'
        className={classes.grid}>
        <Grid item xs={10}>
          <Grid container justify='flex-end'
          style={{ marginBottom: 30}}>
            <Button color='primary' variant='contained'
              onClick={this.connectNetworks}>
              {`Connect Your Networks`}
            </Button>
          </Grid>

          {searchComponent}
          {this.getResults()}
        </Grid>
      </Grid>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SalesDashboard));
