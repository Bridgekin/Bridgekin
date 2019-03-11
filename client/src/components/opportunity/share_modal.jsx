import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Badge from '@material-ui/core/Badge';
import InputBase from '@material-ui/core/InputBase';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';

import CloseIcon from '@material-ui/icons/CloseSharp';
import PersonIcon from '@material-ui/icons/PersonSharp';
import SearchIcon from '@material-ui/icons/Search';
import GroupWorkIcon from '@material-ui/icons/GroupWorkOutlined';
import Img from 'react-image';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import { fade } from '@material-ui/core/styles/colorManipulator';
import defaultNetworkIcon from '../../static/favicon_default.ico';

import { fetchShareOptions } from '../../actions/opp_permission_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  networks: state.entities.networks,
  connections: state.entities.connections,
  users: state.users,
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
    backgroundColor: theme.palette.base4,
    height: 33,
    padding: "0px 10px",
    [theme.breakpoints.up('sm')]: {
      minWidth: 400,
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.border.secondary}`,
    width: '100%',
    height: 33,
    // display: 'none',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'flex'
    // },
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
    color: theme.palette.text.secondary,
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
  listItemHeader: {
    textTransform: 'capitalize',
    height: 30,
    padding: "5px 16px 5px 0px",
    color: theme.palette.text.primary
  },
  listItem: {
    textTransform: 'capitalize',
    height: 30,
    padding: "5px 16px",
    color: theme.palette.text.primary
  },
  resultsGrid:{
    overflow: 'scroll',
    height: 250,
    marginTop: 10
  },
  chosenResults:{
    paddingBottom: 5,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
  },
  listHeader:{ fontSize: 14, fontWeight: 600 },
  emptyList: { fontSize: 14, fontWeight: 400, fontStyle: 'italic' },
  submitContainer:{
    height: 60,
    borderTop: `1px solid ${theme.palette.border.primary}`,
  },
  actionButton: { fontSize: 12 },
  xbutton:{
    cursor: 'pointer',
    color: theme.palette.text.primary
  },
  contentContainer:{
    padding: 12,
    backgroundColor: theme.palette.base3
  },
  shareIcon: {
    marginRight: 8,
    width: 20, height: 20
  },
  shareItemHeader:{ fontSize: 14, fontWeight: 600 },
  shareItemText:{
    fontSize: 14
  }
});

class ShareModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      permissions: new Set([...this.props.permissions]),
      searchInput: '',
      loaded: false
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.getItem = this.getItem.bind(this);
    this.filterItem = this.filterItem.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
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

  handleUpdate(value){
    return e => {
      let { permissions } = this.state;
      if(permissions.has(value)){
        permissions.delete(value);
      } else if (value.includes('Network')){
        if(value === "-Network" && [...permissions].filter(x => x.includes('Network')).length > 0){
          // Do nothing
        } else if((!permissions.has("-Network") && value.includes("Network"))
          || (permissions.has("-Network") && !value.includes("Network")) ) {
          permissions.add(value);
        }
      } else if (value.includes('Connection')){
        if(value === "-Connection" && [...permissions].filter(x => x.includes('Connection')).length > 0){
          // Do nothing
        } else if((!permissions.has("-Connection") && value.includes("Connection"))
          || (permissions.has("-Connection") && !value.includes("Connection")) ) {
          permissions.add(value);
        }
      }

      // } else if(value === "-Network" && [...permissions].filter(x => x.includes('Network')).length > 0){
      //   // permissions.add(value);
      // } else if (value === "-Connection" && [...permissions].filter(x => x.includes('Connection')).length > 0){
      //   // permissions.add(value);
      // } else if((!permissions.has("-Network") && value.includes("Network"))
      //   || (permissions.has("-Network") && !value.includes("Network"))){
      //   permissions.add(value);
      // } else if((!permissions.has("-Connection") && value.includes("Connection"))
      //   || (permissions.has("-Connection") && !value.includes("Connection"))) {
      //   permissions.add(value);
      // }
      this.setState({ permissions });
    }
  }

  handleSave(){
    this.props.handleChange([...this.state.permissions]);
    this.props.handleClose();
  }

  handleSearchChange(e){

    this.setState({ searchInput: e.target.value })
  }

  getItem(perm){
    if(this.state.loaded){
      const { networks, classes, connections,
        users, currentUser } = this.props;
      let [typeId, type] = perm.split('-');
      if(typeId === ''){
        return (<Grid container alignItems='center' style={{ flexGrow: 1}}>
          <Typography align='Left'
            className={classes.shareItemHeader}>
            {`All ${type}s`}
          </Typography>
        </Grid>)
      } else {
        switch(type) {
          case "Network":
            let network = networks[typeId]
            return (
              <Grid container alignItems='center' style={{ flexGrow: 1}}>
                {false && network.pictureUrl ?
                  <Img src={network.pictureUrl}
                    className={classes.shareIcon}/> :
                    <Img src={defaultNetworkIcon}
                      className={classes.shareIcon}/>}
                <Typography align='Left'
                  className={classes.shareItemText}>
                  {network.title}
                </Typography>
              </Grid>
            )
          case 'Connection':
            let connection = connections[typeId]
            let friendId = (currentUser.id !== connection.userId) ?
            connection.userId : connection.friendId
            let friend = users[friendId];
            return (
              <Grid container alignItems='center' style={{ flexGrow: 1}}>
                {friend.profilePicUrl ?
                  <Img src={friend.profilePicUrl}
                    className={classes.shareIcon}/> :
                    <PersonIcon className={classes.shareIcon}/>}
                <Typography align='Left'
                  className={classes.shareItemText}>
                  {`${friend.fname} ${friend.lname}`}
                </Typography>
              </Grid>
            )
          default:
          return <div></div>
        }
      }
    }
  }

  filterItem(option){
    if(this.state.loaded){
      const { networks, connections } = this.props;
      const { searchInput } = this.state;
      let [typeId, type] = option.split('-');

      switch(type) {
        case "Network":
          let networkTitle = networks[typeId].title.toLowerCase();
          return networkTitle.includes(searchInput.toLowerCase());
        case "Connection":
          let connectionTitle = connections[typeId].title.toLowerCase();
          return connectionTitle.includes(searchInput.toLowerCase());
        default:
          return false;
      }
    }
  }

  render(){
    const { classes, open, type, shareOptions, currentUser } = this.props;
    const { permissions, loaded, searchInput } = this.state;

    let filteredOptions = [...shareOptions].filter(option => (
      searchInput !== '' ? this.filterItem(option) : true ));

    let search = (
      <Grid item xs={12} sm={11} md={10}
        className={classes.search}>
        <InputBase
          placeholder="Search..."
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

    // disabled={[...permissions].filter(x => x.includes('Network')).length > 0}

    let results = (
      <Grid item xs={12} sm={11} md={10}
        className={classes.resultsGrid}>
        {permissions.size > 0 ?
          <Grid container className={classes.chosenResults}>
            {[...permissions].map(perm => (
              <ListItem key={perm}
                className={perm.includes('All') ?
                  classes.listItemHeader : classes.listItem}
                onClick={this.handleUpdate(perm)}>
                {this.getItem(perm)}
                <Checkbox checked={permissions.has(perm)} />
              </ListItem>
            ))}
          </Grid> :
          <Grid container>
            <Typography gutterBottom align='Left'
              className={classes.emptyList}>
              Share your opportunity with any options below
            </Typography>
          </Grid>
        }
        <Grid container justify='flex-start'
          style={{ marginTop: 10 }}>
          <ListItem key={'-Network'}
            disabled={[...permissions].filter(x => x.includes('Network')).length > 0 && !permissions.has('-Network')}
            className={classes.listItemHeader}
            onClick={this.handleUpdate('-Network')}>
            {this.getItem('-Network')}
            <Checkbox checked={permissions.has('-Network')} />
          </ListItem>
          {[...filteredOptions].filter(x =>
            !permissions.has(x) && x.includes('Network')
          ).map(option => (
              <ListItem key={option} className={classes.listItem}
                disabled={permissions.has('-Network')}
                onClick={this.handleUpdate(option)}>
                {this.getItem(option)}
                <Checkbox
                  checked={permissions.has(option)} />
              </ListItem>
            ))}
          {currentUser.isAdmin &&
            [...filteredOptions].filter(x => x.includes('Connection'))
              .length > 0 &&
            <ListItem key={'-Connection'}
              disabled={[...permissions].filter(x => x.includes('Connection')).length > 0 && !permissions.has('-Connection')}
              className={classes.listItemHeader}
              onClick={this.handleUpdate('-Connection')}>
            {this.getItem('-Connection')}
            <Checkbox checked={permissions.has('-Connection')} />
          </ListItem>}
          {currentUser.isAdmin && [...filteredOptions].filter(x => (
            !permissions.has(x)) && x.includes('Connection')
          ).map(option => (
              <ListItem key={option} className={classes.listItem}
                disabled={permissions.has('-Connection')}
                onClick={this.handleUpdate(option)}>
                {this.getItem(option)}
                <Checkbox checked={permissions.has(option)} />
              </ListItem>
            ))}
        </Grid>
      </Grid>
    )
    // {[...filteredOptions].filter(opt => opt.includes('Network'))

    let submit = (
      <Grid container justify='flex-end' alignItems='center'
        className={classes.submitContainer}>
        <Button variant='contained'
          onClick={this.props.handleClose}
          classes={{ root: classes.actionButton}}
          style={{ marginRight: 10 }}>
          {`Cancel`}
        </Button>
        <Button color='primary' variant='contained'
          classes={{ root: classes.actionButton}}
          onClick={this.handleSave}>
          {`Save`}
        </Button>
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
              {`Share your opportunity`}
              <CloseIcon
                onClick={this.props.handleClose}
                style={{ cursor: 'pointer'}}/>
            </Grid>

            <Grid container justify='center'
              className={classes.contentContainer}>
              <Grid container justify='center' alignItems='flex-start'
                style={{ maxHeight: 300}}>
                {search}
                {loaded ? results : loading}
              </Grid>

              {submit}
            </Grid>
        </Dialog>
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShareModal));
