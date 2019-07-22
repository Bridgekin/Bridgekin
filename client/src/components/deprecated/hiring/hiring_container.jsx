import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  dimensions: state.util.window
});

const mapDispatchToProps = dispatch => ({

});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  backgroundGrid:{
    position: 'relative',
    paddingTop: 45,
    flexGrow: 1,
    backgroundColor: theme.palette.base2,
  },
  grid:{
    background: 'white', 
    paddingTop: 18,
    borderRight: `1px solid ${theme.palette.border.secondary}`,
    borderLeft: `1px solid ${theme.palette.border.secondary}`
  }
})

class HiringContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    const { classes, content, dimensions } = this.props;

    return <Grid container justify='center'
      className={classes.backgroundGrid}>
      <Grid container item xs={12} sm={10} md={8} justify='center'
        className={classes.grid} style={{ minHeight: dimensions.height - 45}}>
        {content}
      </Grid>
    </Grid>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HiringContainer));
