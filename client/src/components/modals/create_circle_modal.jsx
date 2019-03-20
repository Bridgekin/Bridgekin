import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/PersonSharp';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import VisibilitySensor from 'react-visibility-sensor';
import Img from 'react-image'

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/CloseSharp';

import { createCircle } from '../../actions/circle_actions';
import { closeCreateCircle } from '../../actions/modal_actions';
import { clearCircleErrors } from '../../actions/error_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  users: state.users,
  circleErrors: state.errors.circle,
  createCircleModal: state.modals.createCircle,
  connections: state.entities.connections
});

const mapDispatchToProps = dispatch => ({
  closeCreateCircle: () => dispatch(closeCreateCircle()),
  clearCircleErrors: () => dispatch(clearCircleErrors()),
  createCircle: circle => dispatch(createCircle(circle))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  cardModalWrapper:{ padding: 0 },
  grid:{
    margin: 70
  },
  modalPaper:{
    margin: 15,
    backgroundColor: theme.palette.base3
  },
  badge: {
    top: 19,
    right: 19,
    border: `1px solid`,
    borderRadius: '50%',
    height: 'auto',
    color: theme.palette.base3,
    backgroundColor: theme.palette.text.primary,
    padding: 5,
    cursor: 'pointer'
  },
  listText:{ color: theme.palette.text.primary},
  pic: { width: 135, height: 135},
  thanksHeader: {
    marginBottom: 20
  },
  closeBar:{
    backgroundColor: theme.palette.base4,
    height: 33,
    padding: "0px 10px",
    [theme.breakpoints.up('sm')]: {
      minWidth: 400,
    }
  },
  profilePic: {
    objectFit: 'cover',
    height: 'auto',
    width: '100%',
  },
  textField:{
    fontSize: 14
  }
})

class CreateCircleModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      search: '',
      responsePage: false,
      members: new Set(),
      searchAnchorEl: null,
      loaded: false
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMembersChange = this.handleMembersChange.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
    this.getUser = this.getUser.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount(){
    this.setState({ loaded: true })
  }

  handleChange(field){
    return e => {
      let input = e.target.value
      let resultsOpen = false;
      if(field === 'search') {
        this.setState({
          [field]: input,
          searchAnchorEl: (input.length > 0 ? e.currentTarget : null)
        });
      } else {
        this.setState({ [field]: input });
      }
    }
  }

  handleMembersChange(memberId){
    return e => {
      e.stopPropagation();
      // Close menu
      const { members } = this.state;
      if(members.has(memberId)){
        members.delete(memberId);
      } else {
        members.add(memberId);
      }
      this.setState({ members, searchAnchorEl: null, search: '' })
    }
  }

  handleMenuClose(e){
    this.setState({ searchAnchorEl: null })
  }

  handleClose(e){
    e.stopPropagation();
    if(this.props.connectionErrors){
      this.props.clearConnectionErrors();
    }
    this.setState({ name: '', search: '', responsePage: false, members: new Set()},
    () => this.props.closeCreateCircle());
  };

  handleSubmit(e){
    const { members, name } = this.state;
    let circle = {
      members: [...members],
      title: name
    }
    this.props.createCircle(circle)
    .then(() => {
      if(this.props.connectionErrors){
        let errors = this.props.connectionErrors;
        debugger
      } else {
        this.setState({ name: '', responsePage: false, members: new Set()},
        () => this.props.closeCreateCircle());
      }
    })
  }

  capitalize(str){
    let strArray = str.split(' ');
    for (let i = 0; i < strArray.length; i++) {
      strArray[i] = strArray[i][0].toUpperCase() + strArray[i].slice(1)
    }
    return strArray.join(' ')
  }

  filterSearch(user){
    if(this.state.members.has(user.id)){
      return false
    }

    let fname = user.fname.toLowerCase(),  lname = user.lname.toLowerCase()
    const { search } = this.state;
    let splitSearch = search.toLowerCase().split(' ');
    if (splitSearch.length > 1){
      return (fname.includes(splitSearch[0]) && lname.includes(splitSearch[1])) ||
        (fname.includes(splitSearch[1]) && lname.includes(splitSearch[0]))
    } else {
      return fname.includes(splitSearch[0]) || lname.includes(splitSearch[0])
    }
  }

  getUser(connection){
    const { users, currentUser } = this.props;
    let friend = (currentUser.id !== connection.userId) ?
    connection.userId : connection.friendId
    return users[friend];
  }

  render(){
    const { classes, createCircleModal, users,
      circleErrors } = this.props;
    const { loaded, name, responsePage, members,
      searchAnchorEl } = this.state;

    let connections = Object.values(this.props.connections)
      .filter(x => x.status === 'Accepted')
      .map(connection => this.getUser(connection))

    if(createCircleModal.open & loaded){
      let circleErrorsList = this.props.circleErrors.map(error => (
        <ListItem >
          <ListItemText primary={error}
            classes={{ primary: classes.listText }}/>
        </ListItem>
      ));

      let creatCirclePage = (
        <Grid container justify='center' alignItems='center'>
          <Grid container justify='flex-start' alignItems='center'
            className={classes.closeBar}>
            {`Network Circles`}
          </Grid>

          <Grid item xs={10} style={{ padding: "15px 0px 25px"}}>
            <Typography variant="body1" gutterBottom
              color="textPrimary" align='center'
              fullWidth
              style={{ fontSize: 14, marginBottom: 15 }}>
              {`Create a network circle so you can easily share with them and see their needs and opportunities in one place.`}
            </Typography>

            <Grid container alignItems='center'
              style={{ marginBottom: 10 }}>
              <Grid item xs={4} sm={5}>
                <Typography variant="body1" gutterBottom
                  color="textPrimary" align='right'
                  style={{ fontSize: 13, marginRight: 18 }}>
                  {`Circle Name`}
                </Typography>
              </Grid>
              <Grid item xs={8} sm={7}>
                <TextField
                  onClick={this.handleChange('name')}
                  onChange={this.handleChange('name')}
                  InputProps={{
                    classes: {
                      input: classes.textField
                    },
                  }}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container alignItems='center'
              style={{ marginBottom: 10 }}>
              <Grid item xs={4} sm={5}>
                <Typography variant="body1" gutterBottom
                  color="textPrimary" align='right'
                  style={{ fontSize: 13, marginRight: 18 }}>
                  {`Contacts`}
                </Typography>
              </Grid>
              <Grid item xs={8} sm={7}>
                <TextField
                  onClick={this.handleChange('search')}
                  onChange={this.handleChange('search')}
                  placeholder="Who would you like to add to this circle?"
                  InputProps={{
                    classes: {
                      input: classes.textField
                    },
                  }}
                  value={this.state.search}
                  variant="outlined"
                  fullWidth
                />

                <Popper open={Boolean(searchAnchorEl)} anchorEl={searchAnchorEl}
                    transition disablePortal
                    placement={'bottom-start'}>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        id="menu-list-grow"
                        >
                        {/*style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}*/}
                        <Paper style={{ minWidth: 300 }}>
                          <ClickAwayListener
                            onClickAway={this.handleMenuClose}>
                            {connections.filter(x => this.filterSearch(x))
                              .map(user => (
                                <Grid container alignItems='center'
                                  onClick={this.handleMembersChange(user.id)}
                                  style={{ minWidth: 250}}>
                                  <Avatar>
                                    {user.profilePicUrl ? (
                                      <VisibilitySensor>
                                        <Img src={user.profilePicUrl}
                                          className={classes.profilePic}
                                          />
                                      </VisibilitySensor>
                                    ):<PersonIcon />}
                                  </Avatar>
                                  <Typography variant="body1" gutterBottom
                                    color="textPrimary" align='right'
                                    style={{ fontSize: 13, marginLeft: 10, textTransform: 'capitalize'}}>
                                    {`${user.fname} ${user.lname}`}
                                  </Typography>
                                </Grid>
                              ))
                            }
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                  {/*<Menu
                    id="simple-menu"
                    anchorEl={searchAnchorEl}
                    open={Boolean(searchAnchorEl)}
                    onClose={this.handleMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    getContentAnchorEl={null}
                    >

                  </Menu>*/}
              </Grid>
            </Grid>
            <Grid container justify='flex-end'>
              <Grid item xs={7}
                style={{ height: 100, overflow: 'scroll'}}>
                {[...members].map(memberId => {
                  let user = users[memberId];
                  return <Grid item xs={12}
                    container justify='space-between'>
                    <Typography variant="body1" gutterBottom
                      color="textPrimary" align='left'
                      style={{ fontSize: 13, marginRight: 18, textTransform: 'capitalize' }}>
                      {`${user.fname} ${user.lname}`}
                    </Typography>
                    <CloseIcon onClick={this.handleMembersChange(memberId)}/>
                  </Grid>
                })}
              </Grid>
            </Grid>

          </Grid>

          <Grid container justify='flex-end' alignItems='center'
            style={{ height: 55, padding: "0px 20px"}}>
            <Button variant='contained' color="default"
              onClick={this.handleClose}>
              {`Cancel`}
            </Button>
            <Button variant='contained' color="primary"
              disabled={members.size === 0}
              style={{ marginLeft: 20 }}
              onClick={this.handleSubmit}>
              {`Create`}
            </Button>
          </Grid>
        </Grid>
      )

      let response = circleErrors.length === 0 ? (
        <Grid item xs={11} sm={10} md={8} className={classes.grid}
          container justify='flex-start'>
          <Typography variant="h2" id="modal-title" color='textPrimary'
            className={classes.thanksHeader} align='left'>
            {`Awesome - You've sent } a circle request!`}
          </Typography>
          <Typography variant="body1" id="simple-modal-description"
            align='left' color='textPrimary'>
            {`You can check your current, sent, and received friend requests in the "My Trusted Network" tab`}
          </Typography>
          <Grid item xs={12}>
            <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
              onClick={this.handleClose} color='primary'>
              Close
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={11} sm={10} md={8} className={classes.grid}
          container justify='flex-start'>
          <Typography variant="h2" id="modal-title" color='textPrimary'
            className={classes.thanksHeader} align='left'>
            You're almost there!
          </Typography>
          <Typography variant="body1" id="simple-modal-description"
            align='left' color='textPrimary'>
            It looks like we were unable to send your connection request because:
          </Typography>
          <List>
            {circleErrorsList}
          </List>
          <Grid item xs={12}>
            <Button variant="contained" style={{margin: '0 auto', marginTop: 30}}
              onClick={this.handleClose} color='primary'>
              Close
            </Button>
          </Grid>
        </Grid>
      )

      let modalContent = responsePage ? response : creatCirclePage

      return (
        <Dialog
          open={createCircleModal.open}
          onClose={this.handleClose}
          className={classes.cardModalWrapper}
          classes={{ paper: classes.modalPaper}}>
          <Badge
            badgeContent={<CloseIcon onClick={this.handleClose}/>}
            classes={{ badge: classes.badge }}
            style={{ width: '100%'}}
            >
            {modalContent}
          </Badge>
        </Dialog>
      )
    } else {
      return <div></div>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateCircleModal));
