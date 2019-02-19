import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route , withRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute} from '../../util/route_util';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import { fade } from '@material-ui/core/styles/colorManipulator';

import AccountHome from './account_home';
import AccountSettings from './account_settings';
import AccountOpportunities from './account_opportunities';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({
});

const styles = {
  root: {
    flexGrow: 1
  },
  grid:{
    position: 'relative',
    // padding: "64px 35px 50px 35px",
    padding: "64px 0px 0px 0px",
    // paddingTop: 64 + 18,
    flexGrow: 1,
    backgroundColor: `${fade(theme.palette.common.black,0.05)}`,
    // backgroundColor: 'white',
    minHeight: window.innerHeight
  },
  column:{
    paddingLeft: 0,
    paddingRight: 0,
    display: 'inline-block'
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
  cardHeader: {
    fontSize: 14,
    fontWeight: 900
  },
  filterHeader:{
    fontSize: 13,
    fontWeight: 500
  },
  rightColumn:{
    paddingLeft: 0,
    paddingRight: 0,
    display: 'none',
    position: 'fixed',
    top:64,
    marginLeft: 20,
    width: 250,
    [theme.breakpoints.up('md')]: {
      display: 'inline-block',
    },
  },
  mainColumn:{
    // display: 'none',
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
      marginLeft: 270,
      width: 500,
      display: 'inline-block',
    },
  },
  navigation:{
    display:'none',
    [theme.breakpoints.up('sm')]: {
      padding: 0,
      display: 'flex',
      width: '100%'
    }
  },
  mobileNavigation:{
    padding: 25,
    backgroundColor: 'white',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  mobileNavHeader:{
    fontSize: 24
  },
  oppFiltersDesktop:{
    padding: 0,
    width: '100%',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    }
  },
  oppFiltersMobile:{
    padding: 0,
    width: '100%',
    height: 84,
    display: 'flex',
    // backgroundColor: `${theme.palette.lightGrey}`,
    backgroundColor: `#fafafa`,
    borderTop: `1px solid ${theme.palette.grey1}`,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  mobileFilterButton:{
    margin: "0px 10px"
  },
  mobileFilterTypo: {
    textTransform: 'capitalize',
    fontSize: 13,
    fontWeight: 400
  },
  bold: {fontWeight: 600 },
  navMDContainer:{
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  navSMContainer:{
    display: 'none',
    [theme.breakpoints.only('sm')]: {
      display: 'flex'
    }
  }
};


class AccountMain extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      oppFilter: 'posted',
      mobileNavAnchorEl: null
    };

    this.handleMobileNavClick = this.handleMobileNavClick.bind(this);
  }

  handleMobileNavClick(path){
    return e => {
      const { mobileNavAnchorEl } = this.state;
      this.setState({ mobileNavAnchorEl: mobileNavAnchorEl ? null : e.currentTarget },
      () => {
        if(path){
          this.props.history.push(path)
        }
      })
    }
  }

  render (){
    let { classes } = this.props;
    let pathName = this.props.location.pathname;
    let { oppFilter, mobileNavAnchorEl } = this.state;

    const mobileNavOpen = Boolean(mobileNavAnchorEl);

    let destinations = [
      {title: 'My Profile', dest: '/account/home'},
      {title: 'Connected/Posted Opportunities', dest: '/account/opportunities'},
      {title: 'Settings', dest: '/account/settings'}
    ]

    let navigation = (
      <Grid container justify='center' alignItems='center'
        className={ classes.navigation }>
        <div className={classes.filterCard}>
          <Typography align='Left'
            className={classes.cardHeader}
            style={{ margin: "10px 15px 0px"}}>
            My Account
          </Typography>

          <List component="nav">
            {destinations.map(item => (
              <ListItem button className={classes.filterItem}
                onClick={() => this.props.history.push(item.dest)}
                selected={pathName === item.dest}>
                <Typography variant="h6" align='left'
                  color="textPrimary" className={classes.filterHeader}>
                  {item.title}
                </Typography>
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>
    )

    let mobileNavigation = (
      <Grid container justify='flex-start' alignItems='center'
        className={classes.mobileNavigation}>
        <Typography align='Left'
          className={classes.mobileNavHeader}
          style={{ marginTop: 15 }}>
          My Account
          <IconButton
            aria-label="More"
            aria-owns={mobileNavOpen ? 'long-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleMobileNavClick()}
            style={{ padding: 6}}
            >
            <MoreVertIcon />
          </IconButton>
        </Typography>

        <Menu
          id="long-menu"
          anchorEl={mobileNavAnchorEl}
          open={mobileNavOpen}
          onClose={this.handleMobileNavClick()}
        >
          {destinations.map(item => (
            <ListItem button className={classes.filterItem}
              onClick={this.handleMobileNavClick(item.dest)}
              selected={pathName === item.dest}>
              <Typography variant="body1" align='left'
                color="textPrimary" className={classes.filterHeader}>
                {item.title}
              </Typography>
            </ListItem>
          ))}
        </Menu>
      </Grid>
    )

    let filtersDesktop = [
      {title: "Opportunities You've Connected To", name: 'connected'},
      {title: "Opportunities You've Referred", name: 'referred'},
      {title: "Opportunities You've Posted", name: 'posted'}
    ]

    let oppFiltersDesktop = (
      <Grid container justify='center' alignItems='center'
        className={classes.oppFiltersDesktop}>
        <div className={classes.filterCard}>
          <Typography align='Left'
            className={classes.cardHeader}
            style={{ margin: "10px 15px 0px"}}>
            Connected Opportunities
          </Typography>

          <List component="nav">
            {filtersDesktop.map(item => (
              <ListItem button className={classes.filterItem}
                onClick={() => this.setState({ oppFilter: item.name })}
                selected={oppFilter === item.name}>
                <Typography variant="h6" align='left'
                  color="textPrimary" className={classes.filterHeader}>
                  {item.title}
                </Typography>
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>
    )

    let oppFiltersMobile = (
      <Grid container justify='flex-start' alignItems='center'
        className={classes.oppFiltersMobile}>
        <div>
          <Typography align='Left'
            className={classes.cardHeader}
            style={{ margin: "10px 15px 10px"}}>
            Opportunities You've
          </Typography>
        </div>
        <Grid container justify='flex-start' >
          {['connected', 'referred', 'posted'].map(option => (
            <Button
              onClick={() => this.setState({ oppFilter: option })}
              className={classes.mobileFilterButton}>
              <Typography variant="h6" align='left'
                color="textPrimary"
                className={oppFilter === option ?
                  [classes.mobileFilterTypo, classes.bold].join(' ') :
                  classes.mobileFilterTypo
                }>
                {option}
              </Typography>
            </Button>
          ))}
        </Grid>
      </Grid>
    )

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Grid container justify='center' className={classes.grid}>
          <div style={{ position: 'relative', margin: '0 auto',
            width:1040, height: '100%'}}>
            <div className={classes.column}
              style={{ position: 'fixed', top:64, width: 250}}>
              <div className={classes.navSMContainer}>
                {navigation}
              </div>
              {pathName === '/account/opportunities' && oppFiltersDesktop}
            </div>
            <div className={classes.mainColumn}>
              {mobileNavigation}
              {pathName === '/account/opportunities' && oppFiltersMobile}
              <Switch>
                <ProtectedRoute path="/account/settings" component={AccountSettings} />
                <ProtectedRoute
                    path="/account/opportunities"
                    component={AccountOpportunities}
                    passedProps={{ oppFilter  }} />
                <ProtectedRoute path="/account/home" component={AccountHome} />
              </Switch>
            </div>
            <div className={classes.rightColumn}>
              <div className={classes.navMDContainer}>
                {navigation}
              </div>
            </div>
          </div>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountMain));
