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
  currentUser: state.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({})

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  homeGrid:{
    flexGrow: 1,
    paddingTop: 0,
    backgroundColor: theme.palette.grey2,
    padding: "30px 10px 30px 0px"
  },
  header: { margin: "30px 0px"},
  buttonWrapper:{
    display: 'flex',
    border: '1px solid red'
  },
  label: {
    textTransform: 'lowercase',
  },
  footerCardDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
    position: 'fixed',
    bottom: 10,
    right: 10,
    width: 250,
    height: 35
  },
  footerCardMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
});

class Footer extends Component {
  render () {
    const {classes, currentUser} = this.props;

    // {currentUser &&
    // <Grid container justify="center" alignItems="center"
    //   className={classes.homeGrid}>
    //   <Grid item xs={12} sm={10} container justify="space-between" >
    //     <Grid item xs={4} sm={3} md={2}>
    //       <Card>
    //         <CardActionArea onClick={()=> this.props.history.push('/useragreement')}>
    //           <Typography variant="body2" align='center' color='inherit'
    //             gutterBottom>
    //             User Agreement
    //           </Typography>
    //         </CardActionArea>
    //       </Card>
    //     </Grid>
    //
    //     <Grid item xs={4} sm={3} md={2}>
    //       <Card>
    //         <CardActionArea onClick={()=> this.props.history.push('/privacypolicy')}>
    //           <Typography variant="body2" align='center' color='inherit'
    //             gutterBottom>
    //             Privacy Policy
    //           </Typography>
    //         </CardActionArea>
    //       </Card>
    //     </Grid>
    //   </Grid>
    // </Grid> }

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Card className={classes.footerCardDesktop}>
          <CardActionArea onClick={()=> this.props.history.push('/useragreement')}>
            <Typography variant="body2" align='center' color='inherit'
              style={{ fontSize: 12}}
              gutterBottom>
              Terms, User Agreement, and Privacy Policy
            </Typography>
          </CardActionArea>
        </Card>

      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Footer));
