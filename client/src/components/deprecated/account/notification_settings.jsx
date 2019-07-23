// import React from 'react';
// import { connect } from 'react-redux';
// import { withStyles } from '@material-ui/core/styles';

// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import Switch from '@material-ui/core/Switch';
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';

// import { fetchNotificationSettings, updateNotificationSetting }
//   from '../../actions/notification_setting_actions';

// import FeedCard from '../feed_card';
// import Loading from '../loading';
// import merge from 'lodash/merge';

// const mapStateToProps = (state, ownProps) => ({
//   currentUser: state.users[state.session.id],
//   notificationSettings: state.entities.notificationSettings
// });

// const mapDispatchToProps = dispatch => ({
//   fetchNotificationSettings: () => dispatch(fetchNotificationSettings()),
//   updateNotificationSetting: (notificationSetting) => dispatch(updateNotificationSetting(notificationSetting)),
// });

// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   notificationHeader:{ fontSize: 13, fontWeight: 600},
//   notificationSubHeader:{ fontSize: 11, fontWeight: 400, marginRight: 5},
//   notificationItem: { fontSize: 13, fontWeight: 400},
//   button:{
//     color: 'black',
//     backgroundColor: 'white',
//     border: '1px solid black',
//     padding: "3px 5px",
//     textTransform: 'capitalize',
//   },
//   menu: { padding: 0 },
//   // switchIcon: {backgroundColor: 'white'},
//   // switchBar: { backgroundColor: 'black'}
// })

// class NotificationSettings extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       loaded: false,
//       sending: false,
//       changed: false
//     }
//     this.handleChange = this.handleChange.bind(this);
//     this.handleMenuChange = this.handleMenuChange.bind(this);
//     this.handleMenuClick = this.handleMenuClick.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   componentDidMount(){
//     this.props.fetchNotificationSettings()
//     .then(() => {
//       this.setState(merge({}, {loaded: true},
//         this.props.notificationSettings))
//     })
//   }

//   handleChange(field){
//     return e => {
//       this.setState({ [field]: e.target.checked, changed: true})
//     }
//   }

//   handleMenuClick(anchor){
//     return e => {
//       const anchorEl = this.state[anchor];
//       this.setState({ [anchor]: anchorEl ? null : e.currentTarget})
//     }
//   }

//   handleMenuChange(option, cadence){
//     return e => {
//       e.stopPropagation();
//       this.setState({
//         [option.value]: cadence,
//         [option.anchor]: null,
//         changed: true
//       })
//     }
//   }

//   handleSubmit(e){
//     e.stopPropagation();
//     const { oppsSharedDirect, oppsSharedContacts, oppsSharedCommunities,
//       invitesRequested, emailOppsSharedDirect, emailInvitesRequested,
//       emailOppsSharedContacts, emailRecapSharedCommunities,
//       emailRecapSharedContacts } = this.state;

//     let notificationSetting = {
//       oppsSharedDirect, oppsSharedContacts, oppsSharedCommunities,
//       invitesRequested, emailOppsSharedDirect, emailInvitesRequested,
//       emailOppsSharedContacts, emailRecapSharedCommunities,
//       emailRecapSharedContacts
//     }

//     this.setState({ sending: true },
//     () => {
//       this.props.updateNotificationSetting(notificationSetting)
//       .then(() => this.setState({ sending: false, changed: false }))
//     })
//   }

//   render(){
//     const { classes } = this.props;
//     const { loaded, sending, changed } = this.state;

//     if (loaded){
//       let inAppOptions = [
//         {value: 'oppsSharedDirect', string: 'Opportunities sent to you directly from a contact'},
//         {value: 'oppsSharedContacts', string: 'Opportunities posted by one of your contacts'},
//         {value: 'oppsSharedCommunities', string: 'Opportunities posted within The Bridgekin Network'},
//         {value: 'invitesRequested', string: 'Contact invitation requests'}
//       ]
//       let emailSwitchOptions = [
//         {value: 'emailOppsSharedDirect', string: 'Opportunities sent to you directly from a contact'},
//         {value: 'emailOppsSharedContacts', string: 'Opportunities posted by one of your contacts'},
//         {value: 'emailInvitesRequested', string: 'Contact Invitation requests'}
//       ]
//       let emailRecapSelectOptions = [
//         {value: 'emailRecapSharedContacts', anchor: `contactsAnchorEl`, string: 'Summary of opportunities posted by your contacts'},
//         {value: 'emailRecapSharedCommunities', anchor: `communitiesAnchorEl`, string: 'Summary of opportunities posted within The Bridgekin Network'}
//       ]
//       let cadence = ['Daily', 'Weekly', 'Monthly', 'Never']

//       let notificationCard = (
//         <div>
//           <Grid container>
//             <Grid item xs={12} style={{ marginBottom: 10}}>
//               <Typography align='left' color='textPrimary'
//                 className={classes.notificationHeader}>
//                 {`Platform Notifications`}
//               </Typography>
//             </Grid>

//             {inAppOptions.map(option => (
//               <Grid container justify='space-between' alignItems='center'>
//                 <Grid item xs={10}>
//                   <Typography align='left' color='textPrimary'
//                     className={classes.notificationItem}>
//                     {option.string}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={2}>
//                   <Switch
//                     checked={this.state[option.value]}
//                     onChange={this.handleChange(option.value)}
//                     color="primary"
//                     style={{ height: 32}}
//                     classes={{
//                       icon: classes.switchIcon,
//                       bar: classes.switchBar
//                     }}
//                     />
//                 </Grid>
//               </Grid>
//             ))}
//           </Grid>

//           {<Grid container style={{ marginTop: 20}}>
//             <Grid item xs={12} style={{ marginBottom: 10}}>
//               <Typography align='left' color='textPrimary'
//                 className={classes.notificationHeader}>
//                 {`Email Notifications`}
//               </Typography>
//             </Grid>

//             {emailSwitchOptions.map(option => (
//               <Grid container justify='space-between' alignItems='center'>
//                 <Grid item xs={10}>
//                   <Typography align='left' color='textPrimary'
//                     className={classes.notificationItem}>
//                     {option.string}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={2}>
//                   <Switch
//                     checked={this.state[option.value]}
//                     onChange={this.handleChange(option.value)}
//                     color="primary"
//                     style={{ height: 32}}
//                     />
//                 </Grid>
//               </Grid>
//             ))}
//           </Grid>}

//           {<Grid container style={{ marginTop: 20 }}>
//             <Grid item xs={12} style={{ marginBottom: 10}}>
//               <Typography align='left' color='textPrimary'
//                 className={classes.notificationHeader}>
//                 {`Email Recap Notifications`}
//               </Typography>
//             </Grid>

//             {emailRecapSelectOptions.map(option => (
//               <Grid container justify='space-between' alignItems='center'>
//                 <Grid item xs={9}>
//                   <Typography align='left' color='textPrimary'
//                     className={classes.notificationItem}>
//                     {option.string}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={3} container justify='center'>
//                   <Button
//                     className={classes.button}
//                     style={{ textTransform: 'capitalize'}}
//                     onClick={this.handleMenuClick(option.anchor)}>
//                     {this.state[option.value] }
//                   </Button>
//                   <Menu
//                     id="simple-menu"
//                     anchorEl={this.state[option.anchor]}
//                     open={Boolean(this.state[option.anchor])}
//                     onClose={this.handleMenuClick(option.anchor)}
//                     anchorOrigin={{
//                       vertical: 'top',
//                       horizontal: 'right',
//                     }}
//                     transformOrigin={{
//                       vertical: 'top',
//                       horizontal: 'left',
//                     }}
//                     MenuListProps={{
//                       classes:{
//                         root: classes.menu
//                       }
//                     }}
//                     getContentAnchorEl={null}
//                     >
//                     {cadence.map(cad => (
//                       <MenuItem onClick={this.handleMenuChange(option, cad)}
//                         value={cad}>
//                         {cad}
//                       </MenuItem>
//                     ))}
//                   </Menu>
//                 </Grid>
//               </Grid>
//             ))}
//           </Grid>}

//           <Grid container justify='flex-end'
//             style={{ marginTop: 20 }}>
//             <Button variant='contained' color='primary'
//               disabled={!changed || sending} onClick={this.handleSubmit}>
//               Save
//             </Button>
//           </Grid>
//         </div>
//       )
//       return (
//         <FeedCard contents={notificationCard} />
//       )
//     } else {
//       return <Loading />
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NotificationSettings));
