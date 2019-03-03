import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
// import { Container, Button } from 'semantic-ui-react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
// import { Link } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

import HomeImage from '../../static/Login_Background_Image.jpg';
import BottomFade from '../../static/bottom-fade.png';
import CardActionArea from '@material-ui/core/CardActionArea';

// import UserAgreementText from './legal_text';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id]
});

const styles = theme => ({
  grid:{
    position: 'fixed',
    bottom: 0,
    width: '100%'
  },
  button:{
    padding: "4px 8px 4px 8px",
    minHeight: 30
  },
  buttonText: {
    textTransform: 'capitalize',
    fontSize: 12,
    // margin: 2
  }
});

class Footer extends Component {
  render () {
    const {classes, currentUser} = this.props;
    if(currentUser){
      return (
        <Grid container justdify='flex-end' alignItems="center"
          className={classes.grid}>

          <Button onClick={()=> this.props.history.push('/useragreement')}
            className={ classes.button}>
            <Typography variant="body2" align='center'
              color='textPrimary' className={ classes.buttonText}>
              User Agreement
            </Typography>
          </Button>

          <Button onClick={()=> this.props.history.push('/privacypolicy')}
            style={{ marginRight: 20}} className={ classes.button}>
            <Typography variant="body2" align='center'
              color='textPrimary' className={ classes.buttonText}>
              Privacy Policy
            </Typography>
          </Button>

        </Grid>
      )
    } else {
      return <div></div>
    }
  }
}

export default connect(mapStateToProps, {})(withStyles(styles)(Footer));
