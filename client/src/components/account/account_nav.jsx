import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    flexGrow: 1,
    borderBottom: `0.5px solid ${theme.palette.grey1}`,
    backgroundColor: theme.palette.backgroundGrey,
    // height: 0,
    position: 'fixed',
    top: 64,
    zIndex: 10
  },
  acccountMain:{
    marginTop: 50
  },
  accountNavSection:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height: 100
  },
  button: {
    // margin: "0px 7px",
    fontWeight: 500
    // fontSize: 16
  },
  buttonContainer:{
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mobileContainer:{
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },
  dot:{ fontSize: 10},
  navLink: {
    textDecoration: 'none'
  }
});

var ROUTEMAPPING = {
  'My Profile': 'home',
  'Connected Opportunities': 'connected',
  'Posted Opportunities': 'posted',
  'Settings': 'settings'
};

class AccountNav extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      anchorEl: null
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(){

  }

  handleOpen(e){
    this.setState({ anchorEl: e.currentTarget})
  }

  handleClose(field){
    return e => {
      if(field){
        this.props.history.push(`/account/${field}`)
      }
      this.setState({ anchorEl: null })
    }
  }

  render(){
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    let buttonHeaders = ['My Profile', 'Connected Opportunities',
      'Posted Opportunities', 'Settings'];

    let buttons = buttonHeaders.map(header => {
      let path = this.props.hash.split('/')
      let dotPath = ROUTEMAPPING[header];

      let dot = (path.includes(dotPath)) ? (
        <i className={["fas fa-circle", classes.dot].join(' ')} />
      ) : (
        <i className={["far fa-circle", classes.dot].join(' ')} />
      )

      // let dot = (<i className={["fas fa-circle", classes.dot].join(' ')} />)
      return (
        <div className={classes.buttonContainer}>
          {dot}
          <Link to={`/account/${ROUTEMAPPING[header]}`}
            className={classes.navLink}>
            <Button color="secondary" className={classes.button}>
              {header}
            </Button>
          </Link>
        </div>
      )
    });

    return (
      <Grid container className={classes.root}
        justify='space-around' alignItems='center'>
        <Grid item xs={8} sm={2} container justify='center'
          alignItems='center' style={{ height: 100 }}>
          <Typography variant="h5" gutterBottom>
            <strong>My Account</strong>
          </Typography>
        </Grid>
        <Grid item xs={0} md={2}/>
        <Grid item xs={4} sm={10} md={8} container justify='center'
          alignItems='center'>
          {buttons}
          <IconButton
            aria-label="More"
            aria-owns={open ? 'long-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
            className={classes.mobileContainer}
          >
            <MoreVertIcon />
          </IconButton>
        </Grid>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose(null)}
        >
          {buttonHeaders.map(header => (
            <MenuItem
              onClick={this.handleClose(ROUTEMAPPING[header])}>
              <Typography variant="h6" gutterBottom align='left'
                color="textPrimary">
                {header}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    )
  }
}

export default withRouter(withStyles(styles)(AccountNav));
