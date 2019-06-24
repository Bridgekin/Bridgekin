import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ResultCard from './result_card.jsx'

import { searchByName, searchByCharacteristic } from '../../actions/sales_contacts_actions';

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
  resultNodes: EXAMPLE,
  searchContacts: state.entities.sales.searchContacts
});

const mapDispatchToProps = dispatch => ({
  searchByName: search => dispatch(searchByName(search)),
  searchByCharacteristic: search => dispatch(searchByCharacteristic(search))
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
      search: false
    }

    this.connectNetworks = this.connectNetworks.bind(this);
    this.searchByName = this.searchByName.bind(this);
    this.searchByCharacteristic = this.searchByCharacteristic.bind(this);
  }

  componentDidMount() {
    const { userFeature } = this.props;

    if (!userFeature.importedSocial) {
      this.props.history.push('/sales/connect_social')
    }
  }

  connectNetworks(){
    this.props.history.push('/sales/connect_social')
  }

  handleChange(field){
    return e => {
      this.setState({ [field]: e.target.value })
    }
  }

  searchByCharacteristic(){
    const { title, company, position } = this.state;
    let search = { title, company, position }

    this.setState({ search: false },
      () => {
        this.props.searchByCharacteristic(search)
          .then(() => this.setState({ search: true }));
      })
  }

  searchByName(){
    const { fname, lname } = this.state;
    let search = { fname, lname }

    this.setState({ search: false },
      () => {
        this.props.searchByName(search)
          .then(() => this.setState({ search: true }));
      })
  }

  render() {
    const { classes, dimensions, resultNodes,
      searchContacts } = this.props;
    const { position, company, location,
      fname, lname, search } = this.state;

    let resultArray = Object.values(searchContacts);
    let resultCards = resultArray.map(contact => (
      <ResultCard contact={contact} />
    ))

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

    let resultsComponent = <Grid container justify='center'
    style={{ border: `1px solid grey`}}>
      <Grid container justify='flex-start' item xs={9}
        spacing={2} style={{ margin: "20px 0px"}}>
        {(resultArray.length > 0 && search) ? (
          resultCards
        ): (
          <Typography color='textSecondary'
          align='center'>
            {`Use the form above to find potential leads. Results will show here.`}
          </Typography>
        )}
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
          {resultsComponent}
        </Grid>
      </Grid>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SalesDashboard));
