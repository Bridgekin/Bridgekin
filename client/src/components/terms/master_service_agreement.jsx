import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
// import { Container, Button } from 'semantic-ui-react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
// import { Link } from 'react-router-dom'
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from '../theme';

import HomeImage from '../../static/Login_Background_Image.jpg';
import BottomFade from '../../static/bottom-fade.png';

// import UserAgreementText from './legal_text';
import PrivacyPolicyText from './privacy_policy_text.jsx';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  homeGrid:{
    flexGrow: 1,
    padding: "100px 0px",
    backgroundColor: theme.palette.base2
    // backgroundImage: `url(${HomeImage})`,
    // backgroundRepeat: 'no-repeat',
    // backgroundPosition: 'right',
    // backgroundSize: 'cover',
    // marginBottom: 50
  },
  card:{
    backgroundColor: theme.palette.base3
  },
  header: { margin: "30px 0px"},
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

class TermsAndConditions extends Component {
  render () {
    const {classes} = this.props;

    const homeLink = <Link to='/'>our homepage.</Link>
    const userAgreementLink = <Link to='/useragreement'>User Agreement</Link>
    const privacyPolicyLink = <Link to='/privacypolicy'>Privacy Policy</Link>

    return (
      <Grid container justify="center" alignItems="center"
        className={classes.homeGrid}>
        <Grid item xs={12} sm={10} md={8}>
          <Card className={classes.card}>
            <Grid container justify='center' alignItems='center'
              style={{ padding: 10}}>
              <Grid item sm={11} md={9}>
                <Typography variant="h1" align='center' color='textPrimary'
                  gutterBottom className={classes.header}>
                  Bridgekin Master Service Agreement
                </Typography>
                <Typography variant="body2" align='center' color='textPrimary'
                  gutterBottom style={{ marginBottom: 30}}>
                  <PrivacyPolicyText />
                </Typography>
                <Typography variant="h6" align='center' color='textPrimary'
                  style={{ marginBottom: 30}}>
                  {"Back to "} {homeLink}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(TermsAndConditions);
