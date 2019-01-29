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

const styles = {
  root: {
    flexGrow: 1,
    // position: 'relative',
    // top: 64
  },
  grid:{
    position:"sticky",
    // top:64,
    bottom: 0,
    // height: 50,
    borderTop: `1px solid ${theme.palette.grey1}`
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
  footerCard: {
    // display: 'none',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'flex',
    // },
    // position: 'relative',
    // bottom: 10,
    // right: 10,
    width: 100,
    // height: 35
    margin: 15
  },
  actionArea:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    padding: 5
  },
  button: {
    textTransform: 'capitalize',
    fontSize: 12,
    // margin: 2
  }
};

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

    // <Card className={classes.footerCard}>
    //   <CardActionArea onClick={()=> this.props.history.push('/useragreement')}
    //     className={ classes.actionArea }>
    //     <Typography variant="body2" align='center' color='inherit'
    //       style={{ fontSize: 10}}>
    //       User Agreement
    //     </Typography>
    //   </CardActionArea>
    // </Card>
    //
    // <Card className={classes.footerCard}>
    //   <CardActionArea onClick={()=> this.props.history.push('/privacypolicy')}
    //     className={ classes.actionArea }>
    //     <Typography variant="body2" align='center' color='inherit'
    //       style={{ fontSize: 10}}>
    //       Privacy Policy
    //     </Typography>
    //   </CardActionArea>
    // </Card>

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <div style={{ position: 'relative', top: 64}}>
          {currentUser &&
          <Grid container justify='flex-end' alignItems="center"
            className={classes.grid}>

            <Button onClick={()=> this.props.history.push('/useragreement')}
              style={{ padding: "4px 8px 4px 8px", minHeight: 30}}>
              <Typography variant="body2" align='center' color='inherit'
                className={ classes.button}>
                User Agreement
              </Typography>
            </Button>

            <Button onClick={()=> this.props.history.push('/privacypolicy')}
              style={{ padding: "4px 8px 4px 8px", minHeight: 30, marginRight: 20}}>
              <Typography variant="body2" align='center' color='inherit'
                className={ classes.button}>
                Privacy Policy
              </Typography>
            </Button>

          </Grid>}
        </div>

      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Footer));
