// import React from 'react';
// import { connect } from 'react-redux';
// import { withStyles } from '@material-ui/core/styles';

// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import Modal from '@material-ui/core/Modal';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import PersonIcon from '@material-ui/icons/PersonSharp';
// import Avatar from '@material-ui/core/Avatar';
// import TextField from '@material-ui/core/TextField';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import VisibilitySensor from 'react-visibility-sensor';
// import Img from 'react-image'

// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Grow from '@material-ui/core/Grow';
// import Paper from '@material-ui/core/Paper';
// import Popper from '@material-ui/core/Popper';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';

// import Badge from '@material-ui/core/Badge';
// import CloseIcon from '@material-ui/icons/CloseSharp';

// // import { createCircle } from '../../actions/circle_actions';
// import { addMember, removeMember } from '../../actions/circle_actions';
// import { closeCircle } from '../../../actions/modal_actions';
// import { clearCircleErrors } from '../../../actions/error_actions';

// const mapStateToProps = (state, ownProps) => ({
//   currentUser: state.users[state.session.id],
//   users: state.users,
//   circleErrors: state.errors.circle,
//   circleModal: state.modals.circle,
//   connections: state.entities.connections,
//   circleConnections: state.entities.circleConnections
// });

// const mapDispatchToProps = dispatch => ({
//   closeCircle: () => dispatch(closeCircle()),
//   clearCircleErrors: () => dispatch(clearCircleErrors()),
//   addMember: (circleId, memberId) => dispatch(addMember(circleId, memberId)),
//   removeMember: (circleConnectionId) => dispatch(removeMember(circleConnectionId))
// });

// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   cardModalWrapper:{ padding: 0 },
//   grid:{
//     margin: 70
//   },
//   modalPaper:{
//     margin: 15,
//     backgroundColor: theme.palette.base3
//   },
//   badge: {
//     top: 19,
//     right: 19,
//     border: `1px solid`,
//     borderRadius: '50%',
//     height: 'auto',
//     color: theme.palette.base3,
//     backgroundColor: theme.palette.text.primary,
//     padding: 5,
//     cursor: 'pointer'
//   },
//   listText:{ color: theme.palette.text.primary},
//   pic: { width: 135, height: 135},
//   thanksHeader: {
//     marginBottom: 20
//   },
//   closeBar:{
//     backgroundColor: theme.palette.base4,
//     height: 33,
//     padding: "0px 10px",
//     [theme.breakpoints.up('sm')]: {
//       minWidth: 400,
//     }
//   },
//   profilePic:{
//     width: '100%', height: 'auto',
//     // fontSize: 50
//   }
// })

// class CircleModal extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       name: '',
//       search: '',
//       responsePage: false,
//       members: new Set(),
//       searchAnchorEl: null,
//       loaded: false
//     }

//     this.handleChange = this.handleChange.bind(this);
//     // this.handleMembersChange = this.handleMembersChange.bind(this);
//     this.handleMenuClose = this.handleMenuClose.bind(this);
//     this.handleClose = this.handleClose.bind(this);
//     this.filterSearch = this.filterSearch.bind(this);
//     this.getUser = this.getUser.bind(this);
//     this.updateMember = this.updateMember.bind(this);
//     // this.handleSubmit = this.handleSubmit.bind(this);
//     // this.handleClose = this.handleClose.bind(this);
//     this.transformCircleConnections = this.transformCircleConnections.bind(this);
//   }

//   componentDidMount(){
//     this.setState({ loaded: true })
//   }

//   handleChange(field){
//     return e => {
//       let input = e.target.value
//       this.setState({
//         [field]: input,
//         searchAnchorEl: (input.length > 0 ? e.currentTarget : null)
//       });
//     }
//   }

//   updateMember(connectionId, addBool){
//     return e => {
//       if (addBool){
//         this.props.addMember(this.props.circleModal.circleId, connectionId)
//         .then(() => this.setState({ searchAnchorEl: null, search: '' }))
//       } else {
//         const { circleConnections } = this.props;
//         let circleId =this.props.circleModal.circleId
//         const circleConnection = Object.values(circleConnections)
//           .filter(conn => conn.circleId === circleId &&
//             conn.connectionId === connectionId)[0]
//         this.props.removeMember(circleConnection.id)
//       }
//     }
//   }

//   handleMenuClose(e){
//     this.setState({ searchAnchorEl: null })
//   }

//   handleClose(e){
//     e.stopPropagation();
//     if(this.props.connectionErrors){
//       this.props.clearConnectionErrors();
//     }
//     this.setState({ name: '', responsePage: false, members: new Set()},
//     () => this.props.closeCircle());
//   };


//   capitalize(str){
//     let strArray = str.split(' ');
//     for (let i = 0; i < strArray.length; i++) {
//       strArray[i] = strArray[i][0].toUpperCase() + strArray[i].slice(1)
//     }
//     return strArray.join(' ')
//   }

//   transformCircleConnections(){
//     const { circleConnections } = this.props;
//     let transformedCircleConnections = Object.values(circleConnections)
//       .reduce((acc, circleConnection) => {
//         if(!acc[circleConnection.circleId]){
//           acc[circleConnection.circleId] = new Set()
//         }
//         // debugger
//         acc[circleConnection.circleId].add(circleConnection.connectionId)
//         return acc
//       }, {})
//     return transformedCircleConnections
//   }

//   filterSearch(user, connection){
//     const transformedCircleConnections = this.transformCircleConnections();
//     let circleId = this.props.circleModal.circleId
//     if(transformedCircleConnections[circleId]){
//       if(transformedCircleConnections[circleId].has(connection.id)){
//         return false
//       }
//       // debugger
//       // let user = this.getUser(connection);
//       let fname = user.fname.toLowerCase(),  lname = user.lname.toLowerCase()
//       const { search } = this.state;
//       let splitSearch = search.toLowerCase().split(' ');
//       if (splitSearch.length > 1){
//         return (fname.includes(splitSearch[0]) && lname.includes(splitSearch[1])) ||
//         (fname.includes(splitSearch[1]) && lname.includes(splitSearch[0]))
//       } else {
//         return fname.includes(splitSearch[0]) || lname.includes(splitSearch[0])
//       }
//     }
//     return true
//   }

//   getUser(connection){
//     const { users, currentUser } = this.props;
//     let friend = (currentUser.id !== connection.userId) ?
//     connection.userId : connection.friendId
//     return { user: users[friend], connection};
//   }

//   render(){
//     const { classes, circleModal, users,
//       circleErrors, currentUser, connections } = this.props;
//     const { loaded, name, responsePage, members,
//       searchAnchorEl } = this.state;


//     if(circleModal.open && loaded){
//       let connections = Object.values(this.props.connections)
//       .filter(x => x.status === 'Accepted')
//       .map(connection => this.getUser(connection))
//       // let circleErrorsList = this.props.circleErrors.map(error => (
//       //   <ListItem >
//       //     <ListItemText primary={error}
//       //       classes={{ primary: classes.listText }}/>
//       //   </ListItem>
//       // ));

//       const transformedCircleConnections = this.transformCircleConnections();
//       // debugger
//       let circlePage = (
//         <Grid container justify='center' alignItems='center'
//           style={{ maxWidth: 640, minWidth: 310, paddingBottom: 40}}>
//           <Grid container justify='flex-start' alignItems='center'
//             className={classes.closeBar}>
//             {`Edit Circle`}
//           </Grid>
//           <Grid container justify='center' alignItems='center'>
//             <Grid item xs={8} sm={6}
//               style={{ margin: "10px 0px"}}>
//               <TextField
//                 onChange={this.handleChange('search')}
//                 placeholder="Search ..."
//                 className={classes.textField}
//                 value={this.state.search}
//                 variant="outlined"
//                 fullWidth
//               />
//               <Popper open={Boolean(searchAnchorEl)} anchorEl={searchAnchorEl}
//                 transition disablePortal
//                 placement={'bottom-start'}
//                 style={{ zIndex: 5 }}>
//                 {({ TransitionProps, placement }) => (
//                   <Grow
//                     {...TransitionProps}
//                     id="menu-list-grow"
//                     >
//                     {/*style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}*/}
//                     <Paper style={{ minWidth: 300, maxHeight: 160, overflow: 'scroll' }}>
//                       <ClickAwayListener
//                         onClickAway={this.handleMenuClose}>
//                         {connections.filter(({user, connection}) => (
//                             this.filterSearch(user, connection)
//                           )).map(({user, connection}) => (
//                             <Grid container alignItems='center'
//                               onClick={this.updateMember(connection.id, true)}
//                               style={{ minWidth: 250}}>
//                               <Avatar>
//                                 {user.profilePicUrl ? (
//                                   <VisibilitySensor>
//                                     <Img src={user.profilePicUrl}
//                                       className={classes.profilePic}
//                                       />
//                                   </VisibilitySensor>
//                                 ):<PersonIcon />}
//                               </Avatar>
//                               <Typography variant="body1" gutterBottom
//                                 color="textPrimary" align='right'
//                                 style={{ fontSize: 13, marginLeft: 10, textTransform: 'capitalize'}}>
//                                 {`${user.fname} ${user.lname}`}
//                               </Typography>
//                             </Grid>
//                           ))
//                         }
//                       </ClickAwayListener>
//                     </Paper>
//                   </Grow>
//                 )}
//               </Popper>
//             </Grid>
//           </Grid>
//           <Grid container
//             style={{ maxHeight: 380, overflow: 'scroll'}}>
//             {!transformedCircleConnections[circleModal.circleId] ? (
//               <Grid container justify='center'>
//                 <Grid item xs={9} sm={7} md={6}>
//                   <Typography variant="body1" align='center' color="textSecondary"
//                     fullWidth style={{ fontSize: 18}}>
//                     {`Your circle is empty. Fill your circle by searching for connections above.`}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             ): ([...transformedCircleConnections[circleModal.circleId]].map(connectionId => {
//               let connection = this.props.connections[connectionId]
//               let user = this.getUser(connection).user
//               return (
//                 <Grid item xs={4} sm={3} container justify='center'
//                   style={{ padding: 5 }}>
//                   <Avatar style={{ width: '80%', height: 'auto'}}>
//                     {user.profilePicUrl ? (
//                       <VisibilitySensor>
//                         <Img src={user.profilePicUrl}
//                           className={classes.profilePic}
//                           />
//                       </VisibilitySensor>
//                     ):<PersonIcon className={classes.profilePic}/>}
//                   </Avatar>
//                   <Grid container justify='center'
//                     style={{ margin: "5px 0px"}}>
//                     <Typography variant="body1" align='center' color="textPrimary"
//                       noWrap
//                       style={{ fontSize: 15, fontWeight: 600, width:'100%', textTransform: 'capitalize'}}>
//                       {`${user.fname} ${user.lname}`}
//                     </Typography>
//                     <Typography variant="body1" align='center' color="textPrimary"
//                       noWrap
//                       style={{ fontSize: 12, fontWeight: 400, width:'100%', textTransform: 'capitalize'}}>
//                       {user.title && `${user.title} @ `}
//                       {user.company && `${user.company}`}
//                     </Typography>
//                   </Grid>
//                   <Grid container justify='center'>
//                     <Button variant="contained" color="primary"
//                       onClick={this.updateMember(connection.id, false)}
//                       style={{ fontSize: 10, padding: "6px 10px", textTransform: "capitalize"}}>
//                       {`Remove User`}
//                     </Button>
//                   </Grid>
//                 </Grid>
//               )
//             }) )}
//           </Grid>
//           {/*<GridList cols={5}
//             style={{ width: '100%'}}>
//             {circleMembers[circleModal.circleId].map(userId => {
//               let user = users[userId];
//               return <GridListTile key={userId} cols={1}
//                 style={{ width: 160}}>
//                 <Grid container justify='center'>
//                   <Avatar style={{ width: 150, height: 150 }}>
//                     {user.profilePicUrl ? (
//                       <VisibilitySensor>
//                         <Img src={user.profilePicUrl}
//                           className={classes.profilePic}
//                           />
//                       </VisibilitySensor>
//                     ):<PersonIcon />}
//                   </Avatar>
//                   <div>
//                     <Typography variant="body1" align='left' color="textPrimary"
//                       noWrap
//                       style={{ fontSize: 15, fontWeight: 600, width:'100%', textTransform: 'capitalize'}}>
//                       {`${user.fname} ${user.lname}`}
//                     </Typography>
//                     <Typography variant="body1" align='left' color="textPrimary"
//                       noWrap
//                       style={{ fontSize: 12, fontWeight: 400, width:'100%', textTransform: 'capitalize'}}>
//                       {user.title && `${user.title} @ `}
//                       {user.company && `${user.company}`}
//                     </Typography>
//                   </div>
//                 </Grid>
//               </GridListTile>
//             })}
//           </GridList>*/}
//         </Grid>
//       )

//       return (
//         <Dialog
//           open={circleModal.open}
//           onClose={this.handleClose}
//           className={classes.cardModalWrapper}
//           classes={{ paper: classes.modalPaper}}>
//           <Badge
//             badgeContent={<CloseIcon onClick={this.handleClose}/>}
//             classes={{ badge: classes.badge }}
//             style={{ width: '100%'}}
//             >
//             {circlePage}
//           </Badge>
//         </Dialog>
//       )
//     } else {
//       return <div></div>
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CircleModal));
