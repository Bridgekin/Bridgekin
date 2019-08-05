import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';

// import blackLogo from '../../static/Bridgekin_Logo.png';
import blackLogo from '../../static/Bridgekin_Logo_fake_transp.png';
import blackLogoMobile from '../../static/apple-touch-icon.png';
import isEmpty from 'lodash/isEmpty';

import { login, logout } from '../../actions/session_actions';
import { openLogin } from '../../actions/modal_actions';
import { setDashboardTarget } from '../../actions/sales_network_actions';

const mapStateToProps = (state, ownProps) => {
  let onHomePage = false;
  if (ownProps.location.pathname === "/sales" || ownProps.location.pathname === "/"){
    onHomePage = true;
  }
  return {
  currentUser: state.users[state.session.id],
  siteTemplate: state.siteTemplate,
  onHomePage,
  networkDetails: state.entities.sales.networkDetails,
  currentSalesNetworkId: state.entities.sales.currentSalesNetwork,
  currentDashboardTarget: state.entities.sales.currentDashboardTarget,
  salesUserPermissions: state.entities.sales.salesUserPermissions,
  salesNetworks: state.entities.sales.salesNetworks
}};

const mapDispatchToProps = dispatch => ({
  login: (payload) => dispatch(login(payload)),
  logout: () => dispatch(logout()),
  openLogin: (login) => dispatch(openLogin(login)),
  setDashboardTarget: (target) => dispatch(setDashboardTarget(target))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  logoLink: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: 25,
    },
    // '&:hover': {
    //   backgroundColor: 'none'
    // },
    // '&:click': {
    //   backgroundColor: theme.palette.base1
    // },
    // padding: "12px 0px"
    padding: 0,
    cursor: 'pointer'
    // height: '100%'
  },
  logoDesktop: {
    height: 26,
    maxWidth: 228,
    width: '100%',
    objectFit: 'cover',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    },
  },
  logoMobile: {
    width: 26,
    height: 26,
    objectFit: 'cover',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
  },
  topNav:{
    // backgroundImage: "linear-gradient(rgb(255, 255, 255, 0), rgb(255, 255, 255, 1))",
    backgroundColor: 'none',
    // color: 'black',
    width: '100%',
    boxShadow: 'none',
    position: 'fixed',
    top: 0
  },
  navHome:{
    backgroundColor: 'rgb(255, 255, 255, 0)',
    transition: '0.2s',
    width: '100%',
    boxShadow: 'none',
    position: 'fixed',
    top: 0
  },
  nav: {
    backgroundColor: 'white',
    color: 'black',
    width: '100%',
    boxShadow: 'none',
    position: 'fixed',
    top: 0,
    transition: '0.2s',
    borderBottom: `1px solid #F2F1F1`,
  },
  textFieldLabel: {
    '&$cssFocused': {
      color: theme.palette.text.tertiary
    }
  },
  textfieldResize: {
    padding: "8px 12px",
    fontSize: 14,
    // padding: "4px 12px",
    // color: 'black', //theme.palette.text.tertiary,
    // borderColor:  'black'//`${theme.palette.text.tertiary} !important`
  },
  textFieldShrink: {
    fontSize: 14,
    color: 'black',//theme.palette.text.tertiary
  },
  textFieldRoot: {
    // padding: "2px 5px",
    '&$cssFocused $notchedOutline': {
      borderColor: 'black',//`${theme.palette.text.tertiary} !important`
    }
  },
  cssFocused: {},
  notchedOutline: {
    borderColor: 'black',//`${theme.palette.text.tertiary} !important`
  },
  navItem: {
    fontSize: 14, fontWeight: 400
  },
  
})

class SalesNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isTop: true,
      accountAnchorEl: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isExpiredSub = this.isExpiredSub.bind(this);
    this.getCurrentDashboardSpaceName = this.getCurrentDashboardSpaceName.bind(this);
    this.handleDashSpaceChange = this.handleDashSpaceChange.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentDidMount() {
    if (this.props.onHomePage){
      document.addEventListener('scroll', () => {
        const isTop = window.scrollY < 40;
        if (isTop !== this.state.isTop) {
          this.setState({ isTop })
        }
      });
    }
  }

  handleChange(field) {
    return (e) => {
      e.preventDefault();
      this.setState({ [field]: e.target.value });
    }
  }

  handleSubmit() {
    const { currentUser } = this.props;
    if (currentUser) {
      this.setState({ accountAnchorEl: null })
      this.props.logout()
      .then(() => {
        this.props.history.push('/')
      })
    } else {
      this.props.history.push('/sales/login')
    }
  }

  handleMenuClick(anchor) {
    return e => {
      e.stopPropagation();
      const selectedEl = this.state[anchor];
      this.setState({ [anchor]: (selectedEl ? null : e.currentTarget) })
    }
  }

  handleDashSpaceChange(choice, anchor) {
    return e => {
      if (choice) {
        let { permissableId, permissableType, memberType } = choice
        this.props.setDashboardTarget({ permissableId, permissableType, memberType })
      } else {
        this.props.setDashboardTarget({})
      }
      this.setState({ [anchor]: null })
    }
  }

  isExpiredSub() {
    const { networkDetails, currentDashboardTarget } = this.props;

    if (isEmpty(currentDashboardTarget) || currentDashboardTarget.permissableType === "User") { return false }

    let detail = networkDetails[currentDashboardTarget.permissableId];
    return !detail || detail.currentSubEnd === "no sub" || Date.parse(detail.currentSubEnd) < Date.now()
  }

  getCurrentDashboardSpaceName() {
    const { currentDashboardTarget, salesNetworks } = this.props;
    if (currentDashboardTarget.permissableType === "SalesNetwork") {
      return salesNetworks[currentDashboardTarget.permissableId].title
    } else if (currentDashboardTarget.permissableType === "User") {
      return "Users not implemented yet"
    } else {
      return "Personal"
    }
  }

  render() {
    const { classes, siteTemplate, currentUser,
    networkDetails, currentSalesNetworkId,
      onHomePage, salesUserPermissions, salesNetworks } = this.props;
    const { isTop, accountAnchorEl } = this.state;

    const logo = <div
      className={classes.logoLink}
      onClick={() => this.props.history.push('/sales/dashboard')}>
      <img alt='logo' className={classes.logoDesktop}
        src={siteTemplate.navLogo || blackLogo} />
      <img alt='logo' className={classes.logoMobile}
        src={siteTemplate.navLogoMobile || blackLogoMobile} />
    </div>

    const logoComp = <div style={{ display: 'flex'}}>
      {logo}
    </div>

    let dashboardSpaceName = this.getCurrentDashboardSpaceName()

    const session = <Grid item style={{ display: 'flex'}}>
      {currentUser && <Button style={{ textTransform: 'capitalize' }}
        onClick={() => this.props.history.push('/sales/dashboard')}>
        <Typography color='textSecondary'
          className={classes.navItem}>
          {`My Dashboard`}
        </Typography>
      </Button>}
      {currentUser &&
        !this.isExpiredSub() && <Button style={{ textTransform: 'capitalize' }}
        onClick={() => this.props.history.push('/sales/stats')}>
        <Typography color='textSecondary'
          className={classes.navItem}>
          {`My Stats`}
        </Typography>
      </Button>}
      {currentUser && (window.publicEnv !== 'production' 
      || currentUser.email === 'joe@bridgekin.com' 
      || currentUser.email === 'admin@bridgekin.com') &&
        !this.isExpiredSub() && <Button 
        data-cy='invite-button'
        style={{ textTransform: 'capitalize' }}
        onClick={() => this.props.history.push(`/sales/invite`)}>
          <Typography color='textSecondary'
            className={classes.navItem}>
            {`Invite`}
          </Typography>
        </Button>}
      {currentUser &&
        !this.isExpiredSub() && <Button style={{ textTransform: 'capitalize' }}
          onClick={() => this.props.history.push(`/sales/connect_social`)}>
          <Typography color='textSecondary'
            className={classes.navItem}>
            {`Import Contacts`}
          </Typography>
        </Button>}
      {currentUser &&
        <IconButton
        onClick={this.handleMenuClick('accountAnchorEl')}
          className={classes.navButtonText}>
          <AccountCircle />
        </IconButton>}
      <Menu
        id="simple-menu"
        anchorEl={accountAnchorEl}
        open={Boolean(accountAnchorEl)}
        onClose={this.handleMenuClick('accountAnchorEl')}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        getContentAnchorEl={null}>
        {!isEmpty(salesUserPermissions) && Object.values(salesUserPermissions).map(choice => {
          let name = "";
          if (choice.permissableType === 'User') {

          } else if (choice.permissableType === 'SalesNetwork') {
            let network = salesNetworks[choice.permissableId]
            name = network ? network.title : "No Network Name Found"
          }
          return <MenuItem onClick={this.handleDashSpaceChange(choice, 'accountAnchorEl')}
            data-cy={`dashboard-option-${choice.permissionType}-${choice.permissionId}`}>
            <Typography style={{ fontSize: 14 }}>
              {name}
            </Typography>
          </MenuItem>
        })}

        {!isEmpty(salesUserPermissions) && <MenuItem onClick={this.handleDashSpaceChange("", 'accountAnchorEl')}
          data-cy={`dashboard-option-`}>
          <Typography style={{ fontSize: 14 }}>
            {`Personal`}
          </Typography>
        </MenuItem>}

        <MenuItem onClick={this.handleSubmit}
          data-cy={`logout-button`}>
          <Typography style={{ fontSize: 14 }}>
            {`Logout`}
          </Typography>
        </MenuItem>
      </Menu>
      
    </Grid>

    return <div>
      <AppBar position="static" 
        className={(isTop && onHomePage) ? classes.navHome : classes.nav}>
        <Toolbar className={classes.toolbar}>
          <Grid container alignItems='center' justify='space-between'>
            {logoComp}
            <div style={{ flexGrow: 1 }} />
            {session}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(SalesNav)));
