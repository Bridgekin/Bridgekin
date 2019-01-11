import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import blankProfilePic from '../../static/blank_profile_pic.png';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({

});

const styles = theme => ({
  jumboRoot: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1,
    marginTop: 100
  },
  cover: {
    width: 325,
    height: 325
  },
  card: {
    display: 'flex',
    alignItems: 'center'
  },
  cardSection:{
    marginTop: 10
  },
  wrapper:{
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  cardEditIcon:{
    color: "#d3d3d3",
    fontSize: 20
  }
});


class AccountHome extends React.Component {
  capitalize(str){
    return str[0].toUpperCase() + str.slice(1)
  }

  render(){
    const { classes, currentUser }= this.props;

    return (
      <Grid container justify="center" alignItems="center"
        spacing={24} className={classes.root}>
        <Grid item xs={10} sm={6} className={classes.homeContainer}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cover}
              image={blankProfilePic}
              title="Account Profile Picture"
            />
            <CardContent>
              <div className={classes.wrapper}>
                <Typography variant="h3" gutterBottom color="secondary"
                  align='left'>
                  {`${this.capitalize(currentUser.fname)} ${this.capitalize(currentUser.lname)}`}
                </Typography>
                <div style={{ marginLeft: 10 }}
                  onClick={() => this.props.history.push('/account/settings')}>
                  <i className={["far fa-edit", classes.cardEditIcon].join(' ')}/>
                </div>
              </div>

              <Typography variant="subtitle1" gutterBottom align='left'
                color="secondary" className={classes.cardSection}>
                Title
              </Typography>
              <Typography variant="h6" gutterBottom align='left'
                color="default">
                {this.capitalize(currentUser.title)}
              </Typography>

              <Typography variant="subtitle1" gutterBottom align='left'
                color="secondary" className={classes.cardSection}>
                Company
              </Typography>
              <Typography variant="h6" gutterBottom align='left'
                color="default">
                {this.capitalize(currentUser.company)}
              </Typography>

              <Typography variant="subtitle1" gutterBottom align='left'
                color="secondary" className={classes.cardSection}>
                Location
              </Typography>
              <Typography variant="h6" gutterBottom align='left'
                color="default">
                {currentUser.city ?
                  `${currentUser.city}, ${currentUser.country}` :
                  "Unknown"
                }
              </Typography>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountHome));
