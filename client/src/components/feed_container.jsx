import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

const mapStateToProps = state => ({
  dimensions: state.util.window
});

const styles = theme => ({
  grid:{
    position: 'relative',
    padding: "45px 0px 0px 0px",
    // paddingTop: 45 + 18,
    flexGrow: 1,
    backgroundColor: theme.palette.base2,
    // backgroundColor: 'white',
    // minHeight: window.innerHeight
  },
  // feedContainer:{
  //   position: 'relative',
  // },
  // mainColumn:{
  //   position: 'relative',
  //   height: '100%',
  //   padding: "0px 8px",
  //   paddingTop: 45 + 18,
  //   overflow: 'scroll'
  // },
  // sideColumnContent: {
  //   position: 'absolute',
  //   padding: "0px 8px",
  //   paddingTop: 45 + 18,
  //   height: '100%',
  //   overflow: 'scroll'
  // }
  feedContainer:{
    width: '100%',
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
      width: 1055, // 980 //1040,
      height: '100%'
    },
  },
  mainColumn:{
    [theme.breakpoints.up('sm')]: {
      marginLeft: 315,
      // marginLeft: 15,
      width: 425,
      position: 'relative',
      paddingLeft: 0,
      paddingRight: 0,
      display: 'inline-block'
    },
  },
  sideColumnAll:{
    paddingTop: 18,
    paddingLeft: 0,
    paddingRight: 0,
    display: 'none',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'inline-block'
    // }
  },
  sideColumn1:{
    [theme.breakpoints.up('sm')]: {
      display: 'inline-block'
    }
  },
  sideColumn2:{
    [theme.breakpoints.up('md')]: {
      display: 'inline-block'
    }
  }
});

class FeedContainer extends React.Component{
  // getWi
  render () {
    const { column1, feed, column2, classes,
      home, dimensions } = this.props;

    let adjustment = home ? 45 : 0

    return (
      <Grid container justify='center' className={classes.grid}
        style={{ paddingTop: 63+adjustment}}>
        <div className={classes.feedContainer}
          style={{ minHeight: dimensions.height}}>
          <div className={[classes.sideColumnAll, classes.sideColumn1].join(' ')}
            style={{ position: 'fixed', top: 45+adjustment, width: 300}}>
            {column1}
          </div>
          <div className={classes.mainColumn}>
            {feed}
          </div>
          <div className={[classes.sideColumnAll, classes.sideColumn2].join(' ')}
            style={{ position: 'fixed', top: 45+adjustment, marginLeft: 15, width: 300,
            maxHeight: dimensions.height-100, overflow: 'scroll' }}>
            {column2}
          </div>
        </div>
      </Grid>
    )
  }
};

export default connect(mapStateToProps, {})(withStyles(styles)(FeedContainer));
