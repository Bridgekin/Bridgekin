import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import PersonIcon from '@material-ui/icons/Person';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

const mapStateToProps = state => ({
  currentUser: state.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({

});

const styles = {
  root: {
    flexGrow: 1
  },
  homeGrid:{
    // background: theme.palette.darkGrey
    backgroundColor: 'RGBA(196,196,196,0.1)'
  },
  header:{
    marginTop: 25,
    marginBottom: 30,
    fontSize: 50,
    color: theme.palette.darkGrey
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.grey2}`,
    backgroundColor: theme.palette.white,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // '&:hover': {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  subtitleWrapper: {
    margin: 30
  },
  button: {
    fontSize: 12,
    fontWeight: 600
  },
  card: {
    borderRadius: theme.shape.borderRadius,
    padding: 15
  },
  label:{
    textTransform: 'capitalize',
    fontWeight: 600
  },
  subtitleDropdown:{
    margin: "20px 0px 20px 0px"
  },
  connectionsContainer:{
    marginBottom: 50
  }
};

class ConnectionsHome extends React.Component{
  render(){
    const { classes } = this.props;
    const people = [1,2,3,4,5];

    let subHeader = (
      <Grid item xs={11} container justify="center"
        alignItems="center" className={classes.subtitleWrapper}>
        <Grid item md={4} xs={0}/>
        <Grid item xs={8} md={4}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
        </Grid>

        <Grid item xs={10} sm={6} md={2} container justify='center'
          className={classes.subtitleDropdown}>
          <Button color="primary" className={classes.button}>
            Connection Requests
          </Button>
        </Grid>

        <Grid item xs={10} sm={6} md={2} container justify='center'
          className={classes.subtitleDropdown}>
          <Button color="primary" className={classes.button}>
            Add Trusted Contacts
          </Button>
        </Grid>
      </Grid>
    )

    let myTrustedNetwork = (
      <Grid item xs={10} md={6}>
        <Card className={classes.card}>
          <Grid container justify="space-around" alignItems="center"
            spacing={16}>

            <Grid item xs={11}>
              <Typography variant="h6" gutterBottom align="center"
                color="textPrimary">
                My Trusted Network
              </Typography>
            </Grid>

            <Grid item xs={5}
              style={{ display: 'flex', alignItems:'center'}}>
              <Typography variant="body2" align="center"
                className={classes.networkFilter}>
                {"Sort By: "}
              </Typography>
              <Button color="primary" classes={{ label: classes.label}}>
                Recently Added
              </Button>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="body2" align="center"
                style={{}}>
                120 Connections
              </Typography>
            </Grid>

            <Grid item xs={11}>
              <List className={classes.root}>
                { people.map(person => (
                  <ListItem button divider>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary="Example Contact"
                      secondary="Title, Position, Company"
                    />

                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete">
                        <MoreHorizIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    )

    let networkCircles = (
      <Grid item xs={10} md={6}>
        <Card className={classes.card}>
          <Grid container justify="space-around" alignItems="center"
            spacing={16}>

            <Grid item xs={11}>
              <Typography variant="h6" gutterBottom align="center"
                color="textPrimary">
                Network Circles
              </Typography>
            </Grid>

            <Grid item xs={5}
              style={{ display: 'flex', alignItems:'center'}}>
              <Typography variant="body2" align="center"
                className={classes.networkFilter}>
                {"Sort By: "}
              </Typography>
              <Button color="primary" classes={{ label: classes.label}}>
                Recently Added
              </Button>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="body2" align="center"
                style={{}}>
                7 Network Circles
              </Typography>
            </Grid>

            <Grid item xs={11}>
              <List className={classes.root}>
                { people.map(person => (
                  <ListItem button divider>
                    <ListItemAvatar>
                      <Avatar
                        style={{display:'flex', flexDirection:'column'}}
                        >
                        <div style={{display:'flex'}}>
                          <PersonIcon style={{fontSize:16}}/>
                          <PersonIcon style={{fontSize:16}}/>
                        </div>

                        <div style={{display:'flex'}}>
                          <PersonIcon style={{fontSize:16}}/>
                          <PersonIcon style={{fontSize:16}}/>
                        </div>

                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary="Example Network Circle"
                      secondary="XX Members"
                    />

                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete">
                        <MoreHorizIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    )

    return (
      <MuiThemeProvider theme={theme} className={classes.root}>
        <Grid container className={classes.homeGrid}
          justify="center" alignItems="center">
          <Grid item xs={10} container justify="center"
            alignItems="center" >
            <Typography variant="h1" className={classes.header}
              gutterBottom align="center">
              Coming Soon
            </Typography>
          </Grid>

          {subHeader}

          <Grid item xs={11} md={10} container justify="center"
            alignItems="center" spacing={16}
            className={classes.connectionsContainer}>

            {myTrustedNetwork}
            {networkCircles}
          </Grid>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ConnectionsHome));
