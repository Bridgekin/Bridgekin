import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

const mapStateToProps = state => ({
  windowHeight: state.window
});

const styles = theme => ({
  grid:{
    position: 'relative',
    padding: "0px 0px 0px 0px",
    // paddingTop: 45 + 18,
    flexGrow: 1,
    backgroundColor: theme.palette.base2,
    // backgroundColor: 'white',
    // minHeight: window.innerHeight
  },
  feedContainer:{
    position: 'relative',
  },
  mainColumn:{
    position: 'relative',
    height: '100%',
    padding: "0px 8px",
    paddingTop: 45 + 18,
    overflow: 'scroll'
  },
  sideColumnContent: {
    position: 'absolute',
    padding: "0px 8px",
    paddingTop: 45 + 18,
    height: '100%',
    overflow: 'scroll'
  }
  // feedContainer:{
  //   width: '100%',
  //   margin: '0 auto',
  //   [theme.breakpoints.up('md')]: {
  //     position: 'relative',
  //     width: 1040,
  //     height: '100%'
  //   },
  // },
  // mainColumn:{
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: 265,
  //     // marginLeft: 15,
  //     width: 500,
  //     position: 'relative',
  //     paddingLeft: 0,
  //     paddingRight: 0,
  //     display: 'inline-block'
  //   },
  // },
  // sideColumn:{
  //   paddingTop: 18,
  //   paddingLeft: 0,
  //   paddingRight: 0,
  //   display: 'none',
  //   [theme.breakpoints.up('sm')]: {
  //     display: 'inline-block'
  //   }
  // },
});

class FeedContainer extends React.Component{
  render () {
    const { column1, feed, column2, classes,
      home, windowHeight } = this.props;

    return (
      <Grid container justify='center' className={classes.grid}>
        <Grid xs={12} sm={11} md={10} container
          className={classes.feedContainer}
          style={{ height: windowHeight }}>
          <Grid item xs={4}
            style={{ position: 'relative'}}>
            <div className={classes.sideColumnContent}
              style={{ height: windowHeight-45-18 }}>
              {column1}
            </div>
          </Grid>
          <Grid item xs={4} className={classes.mainColumn}>
            {feed}
          </Grid>
          <Grid item xs={4}
            style={{ position: 'relative'}}>
            <div className={classes.sideColumnContent}
              style={{ height: windowHeight-45-18 }}>
              {column2}
            </div>
          </Grid>
        </Grid>
        {/*<div className={classes.feedContainer}>
          <div className={classes.sideColumn}
            style={{ position: 'fixed', top: 64 ,width: 250}}>
            {column1}
          </div>
          <div className={classes.mainColumn}>
            {feed}
          </div>
          <div className={classes.sideColumn}
            style={{ position: 'fixed', top:64, marginLeft: 15, width: 250,
            maxHeight: window.innerHeight-100, overflow: 'scroll' }}>
            {column2}
          </div>
        </div>*/}
      </Grid>
    )
  }
};

export default connect(mapStateToProps, {})(withStyles(styles)(FeedContainer));
