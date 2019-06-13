import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  dimensions: state.util.window,
  userFeature: state.entities.userFeature,
});

const mapDispatchToProps = dispatch => ({

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
    this.state = {}
  }

  componentDidMount() {
    const { userFeature } = this.props;
    // debugger
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

  render() {
    const { classes, dimensions } = this.props;
    const { title, location, company,
    fname, lname } = this.state;

    let searchComponent = <Grid container justify='center'
    style={{ border: `1px solid grey`, marginBottom: 30, padding: "10px 0px"}}>
      <Grid container item xs={11}>
        <Grid item container xs={5} direction='column' justify='space-around'>
          <Typography align='center'>
            {`Search by Characteristic`}
          </Typography>
          <TextField
            required
            label="Title"
            className={classes.textField}
            margin="dense"
            variant='outlined'
            value={title}
            onChange={this.handleChange('title')}
            onMouseUp={this.handleChange('title')}
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
        </Grid>

        <Grid item xs={2} container alignItems='center' justify='center'>
          <Typography>
            {`OR`}
          </Typography>
        </Grid>

        <Grid item container xs={5}
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
        </Grid>
      </Grid>

      <Grid container item xs={11} justify='center'
      style={{ margin: "10px 0px"}}>
        <Button variant='contained' color='primary'>
          {`Search Network Contacts`}
        </Button>
      </Grid>
    </Grid>

    let resultsComponent = <Grid container
      style={{ border: `1px solid grey` }}>
      Results component
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
