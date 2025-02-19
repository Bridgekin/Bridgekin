import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
// import { Container, Button } from 'semantic-ui-react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import { Link } from 'react-router-dom'
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from './theme';

import HomeImage from '../static/Login_Background_Image.jpg';
import BottomFade from '../static/bottom-fade.png';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  homeGrid:{
    flexGrow: 1,
    paddingTop: 0,
    backgroundImage: `url(${HomeImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    backgroundSize: 'cover',
    marginBottom: 50
  },
  header: { fontSize: 60, marginBottom: 30},
  buttonWrapper:{
    display: 'flex',
    border: '1px solid red'
  },
  label: {
    textTransform: 'lowercase',
  },
  bottomFade:{
    zIndex: 2,
  	position: 'relative',
  	bottom: '0%',
  	backgroundImage: `url(${BottomFade})`,
    backgroundSize:'cover',
    height: '250px',
    width: '100%',
  }
});

class NotFound extends Component {
  render () {
    const {classes} = this.props;

    const homeLink = <a href='/'>our homepage.</a>

    return (
      <Grid container justify="center" alignItems="center"
        className={classes.homeGrid}>
        <Grid item xs={6} style={{ marginTop: 100}}>
          <Typography variant="h1" align='center' color='textPrimary'
            gutterBottom className={classes.header}>
            Sorry
          </Typography>
          <Typography variant="h6" align='center' color='textPrimary'
            gutterBottom style={{ marginBottom: 30}}>
            We're usually much better at connecting the dots :)
          </Typography>
          <Typography variant="h6" align='center' color='textPrimary'
            style={{ marginBottom: 30}}>
            {"Try going back to "} {homeLink}
          </Typography>
        </Grid>
        <div className={classes.bottomFade} />
      </Grid>
    )
  }
}

export default withStyles(styles)(NotFound);
