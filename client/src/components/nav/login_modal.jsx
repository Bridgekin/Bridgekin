import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '40%',
    height: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends React.Component {
  state = {
    open: false,
  };

  handleSignUp(e){
    e.preventDefault();

    console.log('Handle SignUp');
  }
  handleLogin(e){
    e.preventDefault();

    console.log('Handle Login')
  }

  render() {
    const { classes } = this.props;

    let form = this.props.modalForm === 'signup' ? (
      <form onSubmit={this.handleSignup}>
        Signup
      </form>
    ) : (
      <form onSubmit={this.handleLogin}>
        Login
      </form>
    )

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          <div style={{top:'40%', left: '30%'}} className={classes.paper}>
            {form}
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
