import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
    borderTop: `0.5px solid ${theme.palette.grey1}`,
    backgroundColor: 'RGBA(196,196,196,0.1)'
  },
  headerTypography:{
    margin: "25px 0px 40px 0px"
  },
  refButton:{
    fontSize: '1rem',
    fontWeight: 500,
    // marginTop: 25,
    height: 55,
    width: 200
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonProgress: {
    color: '#4067B2',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -12,
  }
});

class OpportunityWaitlist extends React.Component{
  render(){
    const { loading, classes } = this.props;

    return(
      <Grid container className={classes.root}
        justify="center" alignItems="center">

        <Grid item container xs={10} md={8}  justify="flex-start" alignItems="center">
          <Typography variant="h2" gutterBottom align='left'
            color="secondary" className={classes.headerTypography}
            style={{ lineHeight: 1.5}}>
            {`Refer a trusted contact that would appreciate joining
              our community and we'll add them to our waitlist.`}
          </Typography>
        </Grid>

        <Grid item container xs={11} md={8} justify="center" alignItems="center"
          spacing={8}>
          <Grid item xs={12} md={3} >
            <TextField
            required
            id="outlined-required"
            label="First Name"
            placeholder="John"
            className={classes.textField}
            fullWidth
            variant="outlined"
            onChange={this.props.handleChange('fname')}
            />
          </Grid>

          <Grid item xs={12} md={5} justify="flex-end" alignItems="center">
            <TextField
            required
            id="outlined-required"
            label="Email"
            placeholder="johnsmith@email.com"
            className={classes.textField}
            fullWidth
            variant="outlined"
            onChange={this.props.handleChange('email')}
            />
          </Grid>

          <Grid item xs={12} md={4} className={classes.wrapper}>
            <Button variant="contained" color='secondary'
              className={classes.refButton}
              onClick={this.props.handleSubmit}
              disabled={loading}>
              Sign up
            </Button>
            {loading && <CircularProgress size={24}
              className={classes.buttonProgress} />}
          </Grid>
        </Grid>

      </Grid>
    )
  }
};

export default (withStyles(styles)(OpportunityWaitlist));

//REFERRAL CODE FOR WHEN WE WANT TO CREATE REFERRAL LINKS

// let networks = ([
//   <MenuItem value={10}>Ten</MenuItem>,
//   <MenuItem value={20}>Twenty</MenuItem>,
//   <MenuItem value={30}>Thirty</MenuItem>
// ])

// <Grid container className={classes.root}
//   justify="center" alignItems="center" spacing={24}>
//
//   <Grid item xs={9} justify="flex-end" alignItems="center">
//     <Typography variant="h4" gutterBottom align='center'
//       color="secondary" className={classes.headerTypography}>
//       Refer a trusted contact that would appreciate joining our community
//       and we'll add them to our waitlist
//     </Typography>
//   </Grid>
//
//   <Grid container className={classes.root}
//     justify="center" alignItems="center" spacing={24}>
//
//     <Grid item xs={10} sm={4} justify="center" alignItems="center">
//       <Typography variant="h6" gutterBottom align='center'
//         color="secondary" className={classes.headerTypography}>
//         Choose network to refer
//       </Typography>
//
//       <FormControl className={classes.formControl} fullWidth>
//         <Select
//           value={this.props.network}
//           onChange={this.props.handleChange}
//           name="age"
//           displayEmpty
//           className={classes.selectEmpty}
//         >
//           <MenuItem value=''>All Bridgekin</MenuItem>,
//           <MenuItem value='The Battery'>The Battery</MenuItem>,
//         </Select>
//         <FormHelperText>Networks</FormHelperText>
//       </FormControl>
//
//       <div className={classes.wrapper}>
//         <Button variant="contained" color='secondary' fullWidth
//           className={classes.refButton}>
//           Create Link
//         </Button>
//       </div>
//     </Grid>
//
//     <Grid item xs={10} sm={4} justify="center" alignItems="center">
//       <TextField
//       required
//       id="outlined-required"
//       placeholder='Link displays here'
//       className={classes.textField}
//       margin="normal"
//       fullWidth
//       value={this.props.referralLink}
//       />
//     </Grid>
//
//   </Grid>
//
// </Grid>
