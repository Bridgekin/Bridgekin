import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LoginModal from './login_modal';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: 20,
    marginRight: 20,
  },
};

class ButtonAppBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      modalForm: 'signup'
    };

    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(field){
    return e => {
      e.preventDefault();
      this.setState({ open: true, modalForm: field})
    }
  }

  handleClose(){
    this.setState({open: false})
  }

  render(){
    let classes = this.props.classes;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Bridgekin
            </Typography>
            <Button color="inherit">Find & Connect</Button>
            <Button color="inherit">Post Opportunities</Button>
            <Button color="inherit" onClick={this.handleClick('login')}>
              Login
            </Button>
            <Button color="inherit" onClick={this.handleClick('signup')}>
              Signup
            </Button>
            <LoginModal open={this.state.open} modalForm={this.state.modalForm}
              handleClose={this.handleClose}/>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

// ButtonAppBar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(ButtonAppBar);
