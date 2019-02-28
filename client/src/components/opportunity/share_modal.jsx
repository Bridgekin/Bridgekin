import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/CloseSharp';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import { fade } from '@material-ui/core/styles/colorManipulator';

import { fetchShareOptions } from '../../actions/opp_permission_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  networks: state.entities.networks,
  users: state.entities.users,
  shareOptions: state.entities.shareOptions
});

const mapDispatchToProps = dispatch => ({
  fetchShareOptions: () => dispatch(fetchShareOptions()),
});

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  closeBar:{
    backgroundColor:`${fade(theme.palette.common.black,0.05)}`,
    height: 33,
    padding: "0px 10px",
    [theme.breakpoints.up('sm')]: {
      minWidth: 400,
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.grey1}`,
    width: '100%',
    height: 33,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.darkGrey,
    top: 0, right: 0
  },
  inputRoot: {
    color: theme.palette.darkGrey,
    width: '100%',
    fontSize: 15,
    fontWeight: 500,
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  listItem: {
    textTransform: 'capitalize',
    height: 40
  },
  resultsContainer:{
    paddingBottom: 5,
    borderBottom: `1px solid ${theme.palette.lightGrey}`,
  },
  listHeader:{ fontSize: 14, fontWeight: 600 },
  submitContainer:{
    height: 50,
    borderTop: `1px solid ${theme.palette.lightGrey}`,
  }
});

class ShareModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      permissions: new Set([...this.props.permissions]),
      loaded: false
    };
    this.handleSave = this.handleSave.bind(this);
    this.getItem = this.getItem.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.open && nextProps.open !== this.props.open){
      this.props.fetchShareOptions()
      .then(() => this.setState({
        permissions: new Set([...this.props.permissions]),
        loaded: true
      }) )
    }
    return true
  }

  handleSave(){
    this.props.handleChange([...this.state.permissions]);
    this.props.handleClose();
  }

  getItem(perm){
    if(this.state.loaded){
      const { networks } = this.props;
      let [typeId, type] = perm.split('-');

      switch(type) {
        case "Network":
        let network = networks[typeId]
        return (
          <Grid container
            style={{ flexGrow: 1}}>
            {network.title}
          </Grid>
        )
        default:
        return <div></div>
      }
    }
  }

  render(){
    const { classes, open, type, shareOptions } = this.props;
    const { permissions, loaded } = this.state;

    // let filteredOptions = ();

    let search = (
      <Grid item xs={12} sm={11}
        className={classes.search}>
        <InputBase
          placeholder="Search by name"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={this.handleSearchChange}
        />
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
      </Grid>
    )

    let results = (
      <Grid item xs={12} sm={11} container justify='center'
        style={{ overflow: 'scroll', height: 200}}>
        <Grid container className={classes.resultsContainer}>
          {permissions.size > 0 && [...permissions].map(perm => (
            <ListItem key={perm} className={classes.listItem}>
              {this.getItem(perm)}
              <Checkbox checked={permissions.has(perm)} />
            </ListItem>
          ))}
        </Grid>
        <Grid container justify='flex-start'
          style={{ marginTop: 10 }}>
          <Typography gutterBottom align='Left'
            className={classes.listHeader}>
            Networks
          </Typography>
          {[...shareOptions].filter(opt => opt.includes('Network'))
            .map(option => (
              <ListItem key={option} className={classes.listItem}>
                {this.getItem(option)}
                <Checkbox checked={permissions.has(option)} />
              </ListItem>
            ))}
        </Grid>
      </Grid>
    )

    let loading = (
      <Grid container justify='center' alignItems='center'
        style={{ height: 100 }}>
        <CircularProgress size={24} />
      </Grid>
    )

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onClose={this.props.handleClose}
          className={classes.cardModalWrapper}
          classes={{ paper: classes.modalPaper}}
          >
            <Grid container justify='space-between' alignItems='center'
              className={classes.closeBar}>
              {`How do you want to share this opportunty?`}
              <CloseIcon
                onClick={this.props.handleClose}
                style={{ cursor: 'pointer'}}/>
            </Grid>

            <Grid container justify='center'
              style={{ padding: 12 }}>
              <Grid container justify='center'
                style={{ height: 250}}>
                {search}
                {loaded ? results : loading}
              </Grid>

              <Grid container justify='flex-end' alignItems='center'
                className={classes.submitContainer}>
                <Button variant='contained'
                  onClick={this.props.handleClose}
                  style={{ marginRight: 10 }}>
                  {`Cancel`}
                </Button>
                <Button color='primary' variant='contained'
                  onClick={this.handleSave}>
                  {`Save`}
                </Button>
              </Grid>
            </Grid>
        </Dialog>
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShareModal));
