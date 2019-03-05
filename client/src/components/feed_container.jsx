import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import theme from './theme';
// import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  grid:{
    position: 'relative',
    padding: "64px 0px 0px 0px",
    paddingTop: 64 + 18,
    flexGrow: 1,
    backgroundColor: theme.palette.base2,
    // backgroundColor: 'white',
    minHeight: window.innerHeight
  },
  feedContainer:{
    width: '100%',
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
      width: 1040,
      height: '100%'
    },
  },
  mainColumn:{
    [theme.breakpoints.up('sm')]: {
      marginLeft: 265,
      // marginLeft: 15,
      width: 500,
      position: 'relative',
      paddingLeft: 0,
      paddingRight: 0,
      display: 'inline-block'
    },
  },
  sideColumn:{
    paddingTop: 18,
    paddingLeft: 0,
    paddingRight: 0,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline-block'
    }
  },
});

class FeedContainer extends React.Component{
  render () {
    const { column1, feed, column2, classes } = this.props;
    return (
      <Grid container justify='center' className={classes.grid}>
        <div className={classes.feedContainer}>
          <div className={classes.sideColumn}
            style={{ position: 'fixed', top: 64 ,width: 250}}>
            {column1}
          </div>
          <div className={classes.mainColumn}>
            {feed}
          </div>
          <div className={classes.sideColumn}
            style={{ position: 'fixed', top:64, marginLeft: 15, width: 250}}>
            {column2}
          </div>
        </div>
      </Grid>
    )
  }
};

export default withStyles(styles)(FeedContainer);
