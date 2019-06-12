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

  render() {
    const { classes, dimensions } = this.props;

    let searchComponent = <Grid container
    style={{ border: `1px solid grey`, marginBottom: 30}}>
      Search component
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
