// import React from 'react';
// import { connect } from 'react-redux';

// import { withStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';

// import OpportunityCard from '../opportunity/opportunity_card';
// import Loading from '../loading';

// import { fetchConnectedOpportunities } from '../../actions/connected_opportunity_actions';

// const mapStateToProps = state => ({
//   currentUser: state.users[state.session.id],
//   // opportunityErrors: state.errors.opportunities,
//   connectedOpportunities: Object.values(state.entities.connectedOpportunities).reverse(),
//   facilitatedOpportunities: Object.values(state.entities.facilitatedOpportunities).reverse(),
// });

// const mapDispatchToProps = dispatch => ({
//   fetchConnectedOpportunities: () => dispatch(fetchConnectedOpportunities()),
// });

// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//     // marginTop: 35,
//     // position: 'relative',
//     // top: 64,
//     padding: "214px 20px 50px"
//   },
// });

// class AccountConnected extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       opportunitiesLoaded: false,
//       focusedNetwork: null
//     }
//     // this.handleDelete = this.handleDelete.bind(this);
//   }

//   componentDidMount(){
//     this.props.fetchConnectedOpportunities()
//     .then(() => this.setState({ opportunitiesLoaded: true }))
//   }

//   handleCardOpen(){
//     console.log('open card to edit page')
//   }

//   render(){
//     const { classes, connectedOpportunities,
//        facilitatedOpportunities } = this.props;

//     const { opportunitiesLoaded } = this.state;

//     if(opportunitiesLoaded){
//       // let breaker = connectedOpportunities.first.industries[0];
//       let connectedOpportunityCards = connectedOpportunities.map(opportunity => (
//         <Grid item xs={12} sm={6} md={4} justify="center" alignItems="center"
//           className={classes.gridItem}>
//           <OpportunityCard opportunity={opportunity}
//             classes={classes}
//             editable={false}/>
//         </Grid>
//       ));

//       let facilitatedOpportunityCards = facilitatedOpportunities.map(opportunity => (
//         <Grid item xs={12} sm={6} md={4} justify="center" alignItems="center"
//           className={classes.gridItem}>
//           <OpportunityCard opportunity={opportunity}
//             classes={classes}
//             editable={false}/>
//         </Grid>
//       ));

//       let opportunityGrid = (
//         <Grid container justify="center" alignItems="center" spacing={3}>

//           <Grid item xs={11} className={classes.gridOpp} >
//             <Typography variant="h2" gutterBottom align='left'
//               color="secondary">
//               Connected Opportunities
//             </Typography>
//             <Grid container style={{ flexGrow: 1 }}
//               justify="flex-start" alignItems="center" spacing={3}>
//               {connectedOpportunityCards}
//             </Grid>
//           </Grid>

//           <Grid item xs={11} style={{ marginTop: 40 }}>
//             <Typography variant="h2" gutterBottom align='left'
//               color="secondary">
//               Referred Opportunities
//             </Typography>
//             <Grid container style={{ flexGrow: 1 }}
//               justify="flex-start" alignItems="center" spacing={3}>
//               {facilitatedOpportunityCards}
//             </Grid>
//           </Grid>
//         </Grid>
//       )

//       return (
//         <Grid container className={classes.root}>
//           {opportunityGrid}
//         </Grid>
//       )
//     } else {
//       return (
//         <div style={{ padding: "214px 20px 50px" }}>
//           <Loading />
//         </div>
//       )
//     }

//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountConnected));
