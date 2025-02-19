// import React from 'react';
// import { connect } from 'react-redux';
// import { Switch, Route , withRouter } from 'react-router-dom';
// import { AuthRoute, ProtectedRoute} from '../../util/route_util';

// import { withStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// // import TextField from '@material-ui/core/TextField';
// // import CircularProgress from '@material-ui/core/CircularProgress';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import Button from '@material-ui/core/Button';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDownSharp';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';

// // import { MuiThemeProvider } from '@material-ui/core/styles';
// // import theme from '../theme';
// import { fade } from '@material-ui/core/styles/colorManipulator';
// import { animateScroll } from 'react-scroll';

// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import IconButton from '@material-ui/core/IconButton';

// import FeedContainer from '../feed_container';
// import ProfileCard from './profile_card';
// import AccountSettings from './account_settings';
// import AccountOpportunities from './account_opportunities';
// import NotificationSettings from './notification_settings';
// import Notifications from './notifications'

// import queryString from 'query-string';

// const mapStateToProps = (state, ownProps) => {
//   const values = queryString.parse(ownProps.location.search)
//   return {
//   currentUser: state.users[state.session.id],
//   pathname: window.location.pathname,
//   oppFilter: values.oppFilter || 'posted'
// }};

// const styles = theme => ({
//   root: {
//     flexGrow: 1
//   },
//   grid:{
//     position: 'relative',
//     // padding: "64px 35px 50px 35px",
//     // padding: "64px 0px 0px 0px",
//     // marginTop: 64,
//     // paddingTop: 64 + 18,
//     flexGrow: 1,
//     backgroundColor: theme.palette.base2,
//     // backgroundColor: 'white',
//     minHeight: window.innerHeight
//   },
//   column:{
//     paddingLeft: 0,
//     paddingRight: 0,
//     display: 'inline-block'
//   },
//   filterCard:{
//     // marginTop: 18,
//     backgroundColor: theme.palette.base3,
//     width: '100%',
//     // borderRadius: 5,
//     border: `1px solid ${theme.palette.border.secondary}`
//   },
//   filterItem:{
//     borderTop: `1px solid ${theme.palette.border.secondary}`,
//   },
//   cardHeader: {
//     fontSize: 13,
//     fontWeight: 600
//   },
//   filterHeader:{
//     fontSize: 12,
//     fontWeight: 400
//   },
//   rightColumn:{
//     paddingLeft: 0,
//     paddingRight: 0,
//     display: 'none',
//     position: 'fixed',
//     top:64,
//     marginLeft: 20,
//     width: 250,
//     [theme.breakpoints.up('md')]: {
//       display: 'inline-block',
//     },
//   },
//   mainColumn:{
//     // display: 'none',
//     paddingBottom: 50,
//     [theme.breakpoints.up('sm')]: {
//       position: 'relative',
//       marginLeft: 270,
//       width: 500,
//       display: 'inline-block',
//     },
//   },
//   navigation:{
//     display:'none',
//     [theme.breakpoints.up('sm')]: {
//       padding: 0,
//       display: 'flex',
//       width: '100%'
//     },
//     marginBottom: 9
//   },
//   mobileNavigation:{
//     padding: "15px 25px",
//     borderTop: `1px solid ${theme.palette.border.primary}`,
//     borderBottom: `1px solid ${theme.palette.border.primary}`,
//     backgroundColor: theme.palette.base3,
//     [theme.breakpoints.up('sm')]: {
//       display: 'none'
//     },
//   },
//   mobileNavHeader:{
//     fontSize: 24
//   },
//   oppFiltersDesktop:{
//     padding: 0,
//     width: '100%',
//     display: 'none',
//     [theme.breakpoints.up('sm')]: {
//       display: 'flex'
//     }
//   },
//   oppFiltersMobile:{
//     padding: 0,
//     width: '100%',
//     height: 95,
//     display: 'flex',
//     // backgroundColor: `${theme.palette.lightGrey}`,
//     backgroundColor: theme.palette.base3,
//     borderTop: `1px solid ${theme.palette.border.secondary}`,
//     borderBottom: `1px solid ${theme.palette.border.secondary}`,
//     marginBottom: 10,
//     [theme.breakpoints.up('sm')]: {
//       display: 'none'
//     },
//     // marginTop: 20
//   },
//   mobileFilterButton:{
//     // margin: "0px 5px"
//   },
//   mobileFilterTypo: {
//     textTransform: 'capitalize',
//     fontSize: 13,
//     fontWeight: 400
//   },
//   bold: {fontWeight: 600 },
//   navMDContainer:{
//     display: 'none',
//     [theme.breakpoints.up('md')]: {
//       display: 'flex'
//     }
//   },
//   navSMContainer:{
//     display: 'none',
//     [theme.breakpoints.only('sm')]: {
//       display: 'flex'
//     }
//   },
//   moreIcon: { color: theme.palette.text.primary},
//   mobileAdjustFeed:{
//     paddingTop: 45,
//     paddingBottom: 30,
//     [theme.breakpoints.up('sm')]: {
//       paddingTop: 0
//     },
//   },
//   filterBar: {
//     flexGrow: 1,
//     backgroundColor: "rgb(255,255,255,0.8)",
//     height: 45,
//     borderBottom: `1px solid ${theme.palette.border.secondary}`,
//     position: 'fixed',
//     top: 45,
//     zIndex: 1,
//     padding: "0px 5px",
//     [theme.breakpoints.up('sm')]: {
//       display: 'none'
//     }
//   },
//   filterButton:{
//     color: 'black',
//     backgroundColor: 'white',
//     border: '1px solid black',
//     margin: '0px 4px',
//     padding: "3px 5px",
//     textTransform: 'capitalize',
//   },
// });


// class AccountMain extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       loaded: false,
//       // oppFilter: 'posted',
//       mobileNavAnchorEl: null,
//       tabVal: 0
//     };

//     // this.handleMobileNavClick = this.handleMobileNavClick.bind(this);
//     this.handleFilter = this.handleFilter.bind(this);
//     // this.handleNav = this.handleNav.bind(this);
//     this.handleChoice = this.handleChoice.bind(this);
//     this.menuToggle = this.menuToggle.bind(this);
//     this.handleTab = this.handleTab.bind(this);
//   }

//   // shouldComponentUpdate(nextProps, nextState){
//   //   debugger
//   //   if(nextProps.location.pathname !== this.props.location.pathname){
//   //     return true;
//   //   }
//   //   return true;
//   // }

//   handleChoice(optionUrl){
//     return e => {
//       this.setState({ mobileNavAnchorEl: null },
//       () => this.props.history.push(optionUrl));
//     }
//   }

//   menuToggle(e){
//     const { mobileNavAnchorEl } = this.state;
//     this.setState({ mobileNavAnchorEl: mobileNavAnchorEl ? null : e.currentTarget})
//   }

//   handleFilter(name){
//     return e => {
//       animateScroll.scrollTo(0);
//       // this.setState({ oppFilter: name });
//       this.props.history.push(`/account/opportunities?oppFilter=${name}`)
//     }
//   }

//   handleTab(e, tabVal){
//     this.setState({ tabVal })
//   }

//   // handleMobileNavClick(path){
//   //   return e => {
//   //     const { mobileNavAnchorEl } = this.state;
//   //     this.setState({ mobileNavAnchorEl: mobileNavAnchorEl ? null : e.currentTarget },
//   //     () => {
//   //       if(path){
//   //         this.props.history.push(path)
//   //       }
//   //     })
//   //   }
//   // }

//   // handleNav(path){
//   //   return e => {
//   //     // this.setState({ loaded: false},
//   //     // () => {
//   //       this.props.history.push(path);
//   //       const props = this.props;
//   //       debugger
//   //       // this.setState({ loaded: true })
//   //     // })
//   //   }
//   // }

//   render (){
//     let { classes, currentUser, oppFilter } = this.props;
//     let pathName = this.props.location.pathname;
//     let { mobileNavAnchorEl, tabVal } = this.state;

//     const mobileNavOpen = Boolean(mobileNavAnchorEl);

//     let pages = currentUser.isAdmin ? [
//       {title: 'My Profile', dest: '/account/profile'},
//       {title: 'Connected/Posted Opportunities', dest: '/account/opportunities'},
//       {title: 'Notifications', dest: '/account/notifications'},
//       {title: 'Settings', dest: '/account/settings'},
//       // {title: 'Notification Settings', dest: '/account/settings/notifications'},
//     ] : [
//       {title: 'My Profile', dest: '/account/profile'},
//       {title: 'Connected/Posted Opportunities', dest: '/account/opportunities'},
//       {title: 'Settings', dest: '/account/settings'}
//     ]

//     let focusedPage = pages.find(x => x.dest === pathName)

//     let navigation = (
//       <Grid container justify='center' alignItems='center'
//         className={ classes.navigation }>
//         <div className={classes.filterCard}>
//           <Typography align='left'
//             className={classes.cardHeader}
//             style={{ margin: "10px 15px"}}>
//             My Account
//           </Typography>

//           <List component="nav" disablePadding>
//             {pages.map(item => (
//               <ListItem button className={classes.filterItem}
//                 onClick={() => this.props.history.push(item.dest)}
//                 selected={pathName === item.dest}>
//                 <Typography variant="h6" align='left'
//                   color="textPrimary" className={classes.filterHeader}>
//                   {item.title}
//                 </Typography>
//               </ListItem>
//             ))}
//           </List>
//         </div>

//         <Button variant='contained'
//           onClick={() => this.props.history.push("/account/settings/notifications")}
//           style={{ marginTop: 20 }}>
//           {`Notification Settings`}
//         </Button>
//       </Grid>
//     )

//     // let mobileNavigation = (
//     //   <Grid container justify='flex-start' alignItems='center'
//     //     className={classes.mobileNavigation}>
//     //     <Typography align='left' color="textPrimary"
//     //       className={classes.mobileNavHeader}>
//     //       My Account
//     //       <IconButton
//     //         aria-label="More"
//     //         aria-owns={mobileNavOpen ? 'long-menu' : undefined}
//     //         aria-haspopup="true"
//     //         onClick={this.handleMobileNavClick()}
//     //         classes={{ label: classes.moreIcon }}
//     //         style={{ padding: 6}}
//     //         >
//     //         <MoreVertIcon />
//     //       </IconButton>
//     //     </Typography>
//     //
//     //     <Menu
//     //       id="long-menu"
//     //       anchorEl={mobileNavAnchorEl}
//     //       open={mobileNavOpen}
//     //       onClose={this.handleMobileNavClick()}
//     //     >
//     //       {pages.map(item => (
//     //         <ListItem button className={classes.filterItem}
//     //           onClick={this.handleMobileNavClick(item.dest)}
//     //           selected={pathName === item.dest}>
//     //           <Typography variant="body1" align='left'
//     //             color="textPrimary" className={classes.filterHeader}>
//     //             {item.title}
//     //           </Typography>
//     //         </ListItem>
//     //       ))}
//     //     </Menu>
//     //   </Grid>
//     // )

//     let mobileFilterBar = (
//       <Grid container className={classes.filterBar}
//         justify='flex-end' alignItems='center'>
//         <Button
//           onClick={this.menuToggle}
//           className={classes.filterButton}>
//           {focusedPage && focusedPage.title}
//           <KeyboardArrowDownIcon />
//         </Button>
//         <Menu
//           id="simple-menu"
//           anchorEl= {mobileNavAnchorEl}
//           open={Boolean(mobileNavAnchorEl)}
//           onClose={this.menuToggle}
//           anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'left',
//           }}
//           transformOrigin={{
//             vertical: 'top',
//             horizontal: 'left',
//           }}
//           MenuListProps={{
//             classes:{
//               root: classes.menu
//             }
//           }}
//           getContentAnchorEl={null}
//           >
//           {pages.map(page => (
//             <MenuItem className={classes.menuItem}
//               onClick={this.handleChoice(page.dest)}>
//               <Typography variant='body1' color='textPrimary'
//                 style={{ textTransform: 'capitalize', fontSize: 13}}>
//                 {page.title}
//               </Typography>
//             </MenuItem>
//           ))}
//         </Menu>
//       </Grid>
//     )


//     let filtersDesktop = currentUser.isAdmin ? [
//       {title: "Opportunities You've Posted", name: 'posted'},
//       {title: "Opportunities You've Saved", name: 'saved'},
//       {title: "Opportunities You've Connected To", name: 'connected'},
//       {title: "Opportunities You've Referred", name: 'referred'},
//       {title: "Opportunities You've Passed", name: 'passed'},
//     ] : [
//       {title: "Opportunities You've Posted", name: 'posted'},
//       {title: "Opportunities You've Saved", name: 'saved'},
//       {title: "Opportunities You've Connected To", name: 'connected'},
//       {title: "Opportunities You've Referred", name: 'referred'},
//       {title: "Opportunities You've Passed", name: 'passed'}
//     ]

//     let oppFiltersDesktop = (
//       <Grid container justify='center' alignItems='center'
//         className={classes.oppFiltersDesktop}>
//         <div className={classes.filterCard}>
//           <Typography align='left' color="textPrimary"
//             className={classes.cardHeader}
//             style={{ margin: "10px 15px"}}>
//             Connected Opportunities
//           </Typography>

//           <List component="nav" disablePadding>
//             {filtersDesktop.map(item => (
//               <ListItem button className={classes.filterItem}
//                 onClick={this.handleFilter(item.name)}
//                 selected={oppFilter === item.name}>
//                 <Typography variant="h6" align='left'
//                   color="textPrimary" className={classes.filterHeader}>
//                   {item.title}
//                 </Typography>
//               </ListItem>
//             ))}
//           </List>
//         </div>
//       </Grid>
//     )

//     let oppFiltersMobile = (
//       <Grid container justify='flex-start' alignItems='center'
//         className={classes.oppFiltersMobile}>
//         <div>
//           <Typography align='left' color='textPrimary'
//             className={classes.cardHeader}
//             style={{ margin: "10px 15px 10px"}}>
//             Opportunities You've
//           </Typography>
//         </div>
//         <Grid container justify='center'>
//           <Tabs
//             value={tabVal}
//             onChange={this.handleTab}
//             fullWidth
//             >
//             {filtersDesktop.map(item => {
//               let option = item.name;
//               return <Tab label={option}
//                 onClick={() => this.setState({ oppFilter: option })}
//                 style={{ textTransform: 'capitalize'}}/>
//             })}
//           </Tabs>
//         </Grid>
//         {/*<Grid container justify='space-around' >
//           {filtersDesktop.map(item => {
//             let option = item.name;
//             return <Button
//               onClick={() => this.setState({ oppFilter: option })}
//               className={classes.mobileFilterButton}>
//               <Typography variant="h6" align='left'
//                 color="textPrimary"
//                 className={oppFilter === option ?
//                   [classes.mobileFilterTypo, classes.bold].join(' ') :
//                   classes.mobileFilterTypo
//                 }>
//                 {option}
//               </Typography>
//             </Button>
//           })}
//         </Grid>*/}
//       </Grid>
//     )

//     let column1 = (
//       <div>
//         <div className={classes.navSMContainer}>
//           {navigation}
//         </div>
//         {pathName === '/account/opportunities' && oppFiltersDesktop}
//       </div>
//     )

//     let feed = (
//       <div className={classes.mobileAdjustFeed}>
//         {/*mobileNavigation*/}
//         {mobileFilterBar}
//         {pathName === '/account/opportunities' && oppFiltersMobile}
//         <Switch>
//           <ProtectedRoute path="/account/settings/notifications" component={NotificationSettings} />
//           <ProtectedRoute path="/account/settings" component={AccountSettings} />
//           <ProtectedRoute
//             path="/account/opportunities"
//             component={AccountOpportunities}
//           />
//           <ProtectedRoute
//             path="/account/profile"
//             component={ProfileCard}
//             passedProps={{ user: currentUser, detailed: true }}
//           />
//           <ProtectedRoute path="/account/notifications" component={Notifications} />
//         </Switch>
//       </div>
//     )

//     let filter = (
//       <div className={classes.navMDContainer}>
//         {navigation}
//       </div>
//     )

//     return (
//       <FeedContainer
//         column1={column1}
//         feed={feed}
//         column2={filter} />
//     )
//   }
// }

// export default withRouter(connect(mapStateToProps, {})(withStyles(styles)(AccountMain)));

// // <div style={{ position: 'relative', margin: '0 auto',
// //   width:1040, height: '100%'}}>
// //   <div className={classes.column}
// //     style={{ position: 'fixed', top:64, width: 250}}>
// //     <div className={classes.navSMContainer}>
// //       {navigation}
// //     </div>
// //     {pathName === '/account/opportunities' && oppFiltersDesktop}
// //   </div>
// //   <div className={classes.mainColumn}>
// //     {mobileNavigation}
// //     {pathName === '/account/opportunities' && oppFiltersMobile}
// //     <Switch>
// //       <ProtectedRoute path="/account/settings" component={AccountSettings} />
// //       <ProtectedRoute
// //           path="/account/opportunities"
// //           component={AccountOpportunities}
// //           passedProps={{ oppFilter  }} />
// //       <ProtectedRoute path="/account/home" component={AccountHome} />
// //     </Switch>
// //   </div>
// //   <div className={classes.rightColumn}>
// //     <div className={classes.navMDContainer}>
// //       {navigation}

// //#################################################

// // <FeedContainer
// //   column1={column1}
// //   feed={feed}
// //   column2={filter} />

// //#################################################

// // let { classes } = this.props;
// // let pathName = this.props.location.pathname;
// // let { oppFilter, mobileNavAnchorEl } = this.state;
// //
// // const mobileNavOpen = Boolean(mobileNavAnchorEl);
// //
// // let destinations = [
// //   {title: 'My Profile', dest: '/account/home'},
// //   {title: 'Connected/Posted Opportunities', dest: '/account/opportunities'},
// //   {title: 'Settings', dest: '/account/settings'}
// // ]
// //
// // let navigation = (
// //   <Grid container justify='center' alignItems='center'
// //     className={ classes.navigation }>
// //     <div className={classes.filterCard}>
// //       <Typography align='left'
// //         className={classes.cardHeader}
// //         style={{ margin: "10px 15px 0px"}}>
// //         My Account
// //       </Typography>
// //
// //       <List component="nav">
// //         {destinations.map(item => (
// //           <ListItem button className={classes.filterItem}
// //             onClick={() => this.props.history.push(item.dest)}
// //             selected={pathName === item.dest}>
// //             <Typography variant="h6" align='left'
// //               color="textPrimary" className={classes.filterHeader}>
// //               {item.title}
// //             </Typography>
// //           </ListItem>
// //         ))}
// //       </List>
// //     </div>
// //   </Grid>
// // )
// //
// // let mobileNavigation = (
// //   <Grid container justify='flex-start' alignItems='center'
// //     className={classes.mobileNavigation}>
// //     <Typography align='left'
// //       className={classes.mobileNavHeader}
// //       style={{ marginTop: 15 }}>
// //       My Account
// //       <IconButton
// //         aria-label="More"
// //         aria-owns={mobileNavOpen ? 'long-menu' : undefined}
// //         aria-haspopup="true"
// //         onClick={this.handleMobileNavClick()}
// //         style={{ padding: 6}}
// //         >
// //         <MoreVertIcon />
// //       </IconButton>
// //     </Typography>
// //
// //     <Menu
// //       id="long-menu"
// //       anchorEl={mobileNavAnchorEl}
// //       open={mobileNavOpen}
// //       onClose={this.handleMobileNavClick()}
// //     >
// //       {destinations.map(item => (
// //         <ListItem button className={classes.filterItem}
// //           onClick={this.handleMobileNavClick(item.dest)}
// //           selected={pathName === item.dest}>
// //           <Typography variant="body1" align='left'
// //             color="textPrimary" className={classes.filterHeader}>
// //             {item.title}
// //           </Typography>
// //         </ListItem>
// //       ))}
// //     </Menu>
// //   </Grid>
// // )
// //
// // let filtersDesktop = [
// //   {title: "Opportunities You've Connected To", name: 'connected'},
// //   {title: "Opportunities You've Referred", name: 'referred'},
// //   {title: "Opportunities You've Posted", name: 'posted'}
// // ]
// //
// // let oppFiltersDesktop = (
// //   <Grid container justify='center' alignItems='center'
// //     className={classes.oppFiltersDesktop}>
// //     <div className={classes.filterCard}>
// //       <Typography align='left'
// //         className={classes.cardHeader}
// //         style={{ margin: "10px 15px 0px"}}>
// //         Connected Opportunities
// //       </Typography>
// //
// //       <List component="nav">
// //         {filtersDesktop.map(item => (
// //           <ListItem button className={classes.filterItem}
// //             onClick={this.handleFilter(item.name)}
// //             selected={oppFilter === item.name}>
// //             <Typography variant="h6" align='left'
// //               color="textPrimary" className={classes.filterHeader}>
// //               {item.title}
// //             </Typography>
// //           </ListItem>
// //         ))}
// //       </List>
// //     </div>
// //   </Grid>
// // )
// //
// // let oppFiltersMobile = (
// //   <Grid container justify='flex-start' alignItems='center'
// //     className={classes.oppFiltersMobile}>
// //     <div>
// //       <Typography align='left'
// //         className={classes.cardHeader}
// //         style={{ margin: "10px 15px 10px"}}>
// //         Opportunities You've
// //       </Typography>
// //     </div>
// //     <Grid container justify='flex-start' >
// //       {['connected', 'referred', 'posted'].map(option => (
// //         <Button
// //           onClick={() => this.setState({ oppFilter: option })}
// //           className={classes.mobileFilterButton}>
// //           <Typography variant="h6" align='left'
// //             color="textPrimary"
// //             className={oppFilter === option ?
// //               [classes.mobileFilterTypo, classes.bold].join(' ') :
// //               classes.mobileFilterTypo
// //             }>
// //             {option}
// //           </Typography>
// //         </Button>
// //       ))}
// //     </Grid>
// //   </Grid>
// // )
// //
// // return (
// //   <div className={classes.root}>
// //     <Grid container justify='center' className={classes.grid}>
// //       <div style={{ position: 'relative', margin: '0 auto',
// //         width:1040, height: '100%'}}>
// //         <div className={classes.column}
// //           style={{ position: 'fixed', top:64, width: 250}}>
// //           <div className={classes.navSMContainer}>
// //             {navigation}
// //           </div>
// //           {pathName === '/account/opportunities' && oppFiltersDesktop}
// //         </div>
// //         <div className={classes.mainColumn}>
// //           {mobileNavigation}
// //           {pathName === '/account/opportunities' && oppFiltersMobile}
// //           <Switch>
// //             <ProtectedRoute path="/account/settings" component={AccountSettings} />
// //             <ProtectedRoute
// //                 path="/account/opportunities"
// //                 component={AccountOpportunities}
// //                 passedProps={{ oppFilter  }} />
// //             <ProtectedRoute path="/account/home" component={AccountHome} />
// //           </Switch>
// //         </div>
// //         <div className={classes.rightColumn}>
// //           <div className={classes.navMDContainer}>
// //             {navigation}
// //           </div>
// //         </div>
// //       </div>
// //     </Grid>
// //   </div>
// // )
// // }
// // }
