import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import blankProfilePic from '../../static/blank_profile_pic.png';
import EditIcon from '@material-ui/icons/EditSharp';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddSharp';
import PersonIcon from '@material-ui/icons/PersonSharp';
import Avatar from '@material-ui/core/Avatar';

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
    // marginTop: 75,
    marginBottom: 75,
    position: 'relative',
    top: 164,
    padding: 50
  },
  cover: {
    width: '100%',
    height: 217
  },
  addProfilePicIcon:{
    width: '100%',
    height: 217,
    backgroundColor: theme.palette.lightGrey,
    color: theme.palette.grey1
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  cardSection:{
    marginTop: 10
  },
  content:{marginLeft: 20},
  wrapper:{
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  cardEditIcon:{
    color: "#d3d3d3",
    fontSize: 20
  },
  pic:{
    height: 'auto',
    width: '100%',
    // borderRadius: 0
  }
});


class AccountHome extends React.Component {
  capitalize(str){
    return str[0].toUpperCase() + str.slice(1)
  }

  render(){
    const { classes, currentUser }= this.props;

    // <CardMedia
    //   className={classes.pic}
    //   src={currentUser.profilePicUrl}
    //   title="Account Profile Picture"
    // />

    let profilePic = currentUser.profilePicUrl ? (
      <Avatar
        className={classes.pic}
        src={currentUser.profilePicUrl}
        alt="Account Profile Picture"
        onClick={()=> this.props.history.push('/account/settings/general')}
      />
    ) : (
      <PersonIcon
        className={classes.addProfilePicIcon}
        onClick={()=> this.props.history.push('/account/settings/general')}/>
    )

    return (
      <Grid container justify="center" alignItems="center"
        className={classes.root}>
        <Grid item xs={11} sm={9} md={8} lg={6}>
          <Card className={classes.card}>
            <Grid container justify="center" alignItems="flex-start"
              spacing={16}>

              <Grid item xs={8} md={5} container justify='center'>
                {profilePic}
              </Grid>

              <Grid item xs={8} md={6} className={classes.content}>
                <div className={classes.wrapper}>
                  <Typography variant="h3" gutterBottom color="secondary"
                    align='left'>
                    {`${currentUser.fname} ${currentUser.lname}`.toUpperCase()}
                  </Typography>
                  <div style={{ marginLeft: 10 }}
                    onClick={() => this.props.history.push('/account/settings/general')}>
                    <IconButton className={classes.button} aria-label="Edit">
                      <EditIcon />
                    </IconButton>
                  </div>
                </div>

                <Typography variant="h6" gutterBottom align='left'
                  color="secondary" className={classes.cardSection}>
                  Title
                </Typography>
                <Typography variant="body2" gutterBottom align='left'
                  color="default">
                  {currentUser.title ? this.capitalize(currentUser.title) : ''}
                </Typography>

                <Typography variant="h6" gutterBottom align='left'
                  color="secondary" className={classes.cardSection}>
                  Company
                </Typography>
                <Typography variant="body2" gutterBottom align='left'
                  color="default">
                  {currentUser.company ? this.capitalize(currentUser.company) : ''}
                </Typography>

                <Typography variant="h6" gutterBottom align='left'
                  color="secondary" className={classes.cardSection}>
                  Location
                </Typography>
                <Typography variant="body2" gutterBottom align='left'
                  color="default">
                  {currentUser.city ?
                    `${currentUser.city}, ${currentUser.country}` :
                    "Unknown"
                  }
                </Typography>
              </Grid>
            </Grid>

          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountHome)));
