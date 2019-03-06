import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({

});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
})

class Template extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return <div></div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Template));
