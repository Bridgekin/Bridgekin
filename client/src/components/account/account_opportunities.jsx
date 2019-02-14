import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route , withRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute} from '../../util/route_util';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import CircularProgress from '@material-ui/core/CircularProgress';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({
});

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  filterCard:{
    marginTop: 18,
    backgroundColor: `${theme.palette.white}`,
    width: '100%',
    borderRadius: 5,
    border: `1px solid ${theme.palette.lightGrey}`
  },
  filterItem:{
    borderTop: `1px solid ${theme.palette.grey1}`,
  },
});


class AccountOpportunities extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render (){
    let classes = this.props.classes;
    let opp_cards = (
      <div>Example</div>
    )

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Grid container justify='center' alignItems='center'>
          <div style={{ overflow: 'scroll', maxHeight: window.innerHeight-150, padding: "0px 0px 150px 0px"}}>
            {opp_cards}
          </div>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountOpportunities));
