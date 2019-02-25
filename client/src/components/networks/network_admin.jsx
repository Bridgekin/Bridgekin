import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
// import { Link, NavLink, withRouter } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { fetchManagedNetworks,
  fetchManagedUsers, } from '../../actions/network_admin_actions';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import { fade } from '@material-ui/core/styles/colorManipulator';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  managedNetworks: state.entities.managedNetworks,
});

const mapDispatchToProps = dispatch => ({
  fetchManagedNetworks: () => dispatch(fetchManagedNetworks()),
  fetchManagedUsers: () => dispatch(fetchManagedUsers())
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grid:{
    position: 'relative',
    padding: "64px 0px 0px 0px",
    flexGrow: 1,
    backgroundColor: `${fade(theme.palette.common.black,0.05)}`,
    minHeight: window.innerHeight,
  },
});

class NetworkAdmin extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false
    };
  }

  componentDidMount(){
    this.props.fetchManagedNetworks()
    // .thn(() => )
    .then(() => this.setState({ loaded: true }))
  }

  handleChooseNetwork(e){
    let option = e.target.value;
    // this.props.fetchNetworkDetails()
  }

  render () {
    const { classes, managedNetworks } = this.props;
    const { loaded } = this.state;

    if (loaded) {

      return (
        <MuiThemeProvider theme={theme} className={classes.root}>
          <Grid container justify="center" alignItems="flex-start"
            className={classes.grid}>
            <Grid item md={10} sm={11} xs={12} container
              style={{ border: `1px solid red`, paddingTop: 20}}>
              <Grid container justify='flex-end'
                style={{ paddingBottom: 40 }}>
                <Grid item sm={6} container justify='center'>
                  <Typography variant="h2" align='left' color="textPrimary" >
                    Manage your networks
                  </Typography>
                </Grid>

                <Grid item sm={3} container justify='center'
                  flexDirection='column'>
                  <Typography variant="body1" align='left' color="textPrimary" >
                    Choose a network
                  </Typography>
                  <Select
                    value={this.state.defaultNetworkId}
                    onChange={this.handleDefaultWorkspaceChange}
                    inputProps={{
                      name: 'defaultNetworkId',
                      id: 'defaultNetworkId-simple',
                    }}
                    renderValue={selected => managedNetworks[selected].title}
                  >
                    {Object.values(managedNetworks).map(workspace => (
                      <MenuItem value={workspace.id}>
                        {workspace.title}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={6} container
                  style={{ border: `1px solid blue`}}>
                  {/* Users table */}
                </Grid>
                <Grid item xs={6} container
                  style={{ border: `1px solid blue`}}>
                  {/* Connected Opportunities table */}
                  <Grid container>
                  </Grid>

                  {/* Referred Opportunities table */}
                  <Grid container>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MuiThemeProvider>
      )
    } else {
      return <div> Loading </div>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NetworkAdmin));
