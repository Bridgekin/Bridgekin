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

import Img from 'react-image'
import CircularProgress from '@material-ui/core/CircularProgress';
import Switch from '@material-ui/core/Switch';

import PersonIcon from '@material-ui/icons/Person';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

import Joe from '../../static/my_trusted_network_images/Joe_Lopardo.png';
import Eric from '../../static/my_trusted_network_images/Eric_Conway.png';
import Jesse from '../../static/my_trusted_network_images/Jesse_Goodall.png';
import Lili from '../../static/my_trusted_network_images/Lili_Tawil.png';
import Tung from '../../static/my_trusted_network_images/Tung_Chan.png';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDownSharp';

import Random1 from '../../static/my_trusted_network_images/Random_Headshots/Random_1.jpg';
import Random2 from '../../static/my_trusted_network_images/Random_Headshots/Random_2.jpg';
import Random3 from '../../static/my_trusted_network_images/Random_Headshots/Random_3.jpg';
import Random4 from '../../static/my_trusted_network_images/Random_Headshots/Random_4.jpg';
import Random5 from '../../static/my_trusted_network_images/Random_Headshots/Random_5.jpg';
import Random6 from '../../static/my_trusted_network_images/Random_Headshots/Random_6.jpg';
import Random7 from '../../static/my_trusted_network_images/Random_Headshots/Random_7.jpg';
import Random8 from '../../static/my_trusted_network_images/Random_Headshots/Random_8.jpg';
import Random9 from '../../static/my_trusted_network_images/Random_Headshots/Random_9.jpg';
import Random10 from '../../static/my_trusted_network_images/Random_Headshots/Random_10.jpg';

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
  },
  trustedCover: {
    height: 'auto',
    width: '100%',
    objectFit: 'cover'
  },
  circleCover: {
    height: '20px',
    width: '50%',
    objectFit: 'cover',
    borderRadius: '50%',
    // margin: 0
  },
  loader:{
    height:'auto',
    width: "100%",
    background: theme.palette.lightGrey
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    backgroundColor: theme.palette.backgroundGrey,
    position:'relative',
    top: 64
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    backgroundColor: theme.palette.backgroundGrey,
    position:'relative',
    top: 64
  },
};

const people = [
  { title: 'CEO', company: 'Bridgekin', fname: 'joe', lname: 'lopardo', picture: Joe},
  { title: 'General Counsel', company: 'Bridgekin', fname: 'tung', lname: 'chan', picture: Tung},
  { title: 'Software Developer', company: 'Bridgekin', fname: 'eric', lname: 'conway', picture: Eric},
  { title: 'Graphic Designer', company: 'Bridgekin', fname: 'lili', lname: 'tawil', picture: Lili},
  { title: 'Technical Advisor', company: 'Bridgekin', fname: 'jesse', lname: 'goodall', picture: Jesse}
];

const circles = [
  { id: 0, title: 'Close VC Contacts', subtitle: '24 Members'},
  { id: 1, title: 'Portfolio Company CEOs', subtitle: '17 Members'},
  { id: 2, title: 'Fund 1 & 2 LPs', subtitle: '30 Members'},
  { id: 3, title: 'Inner Deal Circle', subtitle: '6 Members'},
  { id: 4, title: 'Al Investors', subtitle: '9 Members'}
]

const randomImages = {
  1: Random1, 2: Random2, 3: Random3, 4: Random4, 5: Random5,
  6: Random6, 7: Random7, 8: Random8, 9: Random9, 0: Random10,
}

class ConnectionsHome extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      toggle: true
    }
  }
  capitalize(str){
    let strArray = str.split(' ');
    for (let i = 0; i < strArray.length; i++) {
      strArray[i] = strArray[i][0].toUpperCase() + strArray[i].slice(1)
    }
    return strArray.join(' ')
  }

  handleChange(e){
    this.setState({ toggle: e.target.checked });
  };

  render(){
    const { classes } = this.props;
    const { toggle } = this.state;

    let subHeader = (
      <Grid item xs={11} container justify="center"
        alignItems="center" className={classes.subtitleWrapper}>
        <Grid item xs={8} md={4}  container justify='center'
          className={classes.subtitleDropdown} alignItems="center">
          <Button color="primary" className={classes.button}>
            Connection Requests
          </Button>
          <KeyboardArrowDownIcon />
        </Grid>

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

        <Grid item xs={8} md={4} container justify='center'
          className={classes.subtitleDropdown} alignItems="center">
          <Button color="primary" className={classes.button}>
            Add Trusted Contacts
          </Button>
          <KeyboardArrowDownIcon />
        </Grid>
      </Grid>
    )

    let subHeaderMobile= (
      <Grid item xs={12} container justify="flex-start"
        alignItems="center" className={classes.subtitleWrapper}
        spacing={8} style={{ marginTop: 0}}>
        <Grid item xs={6}  container justify='center'
          className={classes.subtitleDropdown} alignItems="center">
          <Button color="primary" className={classes.button}>
            Connection Requests
          </Button>
          <KeyboardArrowDownIcon />
        </Grid>

        <Grid item xs={6} container justify='center'
          className={classes.subtitleDropdown} alignItems="center">
          <Button color="primary" className={classes.button}>
            Add Trusted Contacts
          </Button>
          <KeyboardArrowDownIcon />
        </Grid>
      </Grid>
    )

    let loader = (
      <Grid container justify='center' alignItems='center'
        className={classes.loader}>
        <CircularProgress className={classes.progress} />
      </Grid>
    )

    let myTrustedNetwork = (
      <Grid item xs={12} md={6}>
        <Card className={classes.card}>
          <Grid container justify="space-around" alignItems="center"
            spacing={16}>

            <Grid item xs={11}>
              <Typography variant="h6" gutterBottom align="center"
                color="textPrimary">
                My Trusted Network
              </Typography>
            </Grid>

            <Grid item xs={10} sm={7} md={6} lg={5}
              style={{ display: 'flex', alignItems:'center'}}>
              <Typography variant="body2" align="center"
                className={classes.networkFilter}>
                {"Sort By: "}
              </Typography>
              <Button color="primary" classes={{ label: classes.label}}>
                Recently Added
              </Button>
              <KeyboardArrowDownIcon />
            </Grid>

            <Grid item xs={10} sm={5} md={5} lg={4}>
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
                        {person.picture ? (
                          <Img src={person.picture}
                            className={classes.trustedCover}
                            />
                        ):<PersonIcon />}
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary={`${this.capitalize(person.fname)} ${this.capitalize(person.lname)}`}
                      secondary={`${this.capitalize(person.title)} @ ${this.capitalize(person.company)}`}
                    />

                    <ListItemSecondaryAction>
                      <IconButton aria-label="More">
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
      <Grid item xs={12} md={6}>
        <Card className={classes.card}>
          <Grid container justify="space-around" alignItems="center"
            spacing={16}>

            <Grid item xs={11}>
              <Typography variant="h6" gutterBottom align="center"
                color="textPrimary">
                Network Circles
              </Typography>
            </Grid>

            <Grid item xs={5} container alignItems='center'>
              <Typography variant="body2" align="center"
                className={classes.networkFilter}>
                {"Sort By: "}
              </Typography>
              <Button color="primary" classes={{ label: classes.label}}>
                Recently Added
              </Button>
              <KeyboardArrowDownIcon />
            </Grid>

            <Grid item xs={4}>
              <Typography variant="body2" align="center"
                style={{}}>
                7 Network Circles
              </Typography>
            </Grid>

            <Grid item xs={11}>
              <List className={classes.root}>
                { circles.map(circle => (
                  <ListItem button divider>
                    <ListItemAvatar>
                      <Avatar
                        style={{display:'flex', flexDirection:'column'}}
                        >
                        <div style={{display:'flex'}}>
                          <img src={randomImages[`${((circle.id*4) + 1) % 10}`]}
                            className={classes.circleCover} alt='1'
                            />
                          <img src={randomImages[`${((circle.id*4) + 2) % 10}`]}
                            className={classes.circleCover} alt='2'
                            />
                        </div>

                        <div style={{display:'flex'}}>
                          <img src={randomImages[`${((circle.id*4) + 3) % 10}`]}
                            className={classes.circleCover} alt='3'
                            />
                          <img src={randomImages[`${((circle.id*4) + 4) % 10}`]}
                            className={classes.circleCover}
                            alt='4'
                            />
                        </div>

                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary={`${this.capitalize(circle.title)}`}
                      secondary={`${this.capitalize(circle.subtitle)}`}
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
        <Grid container className={classes.sectionDesktop}
          justify="center" alignItems="center">

          <Grid item xs={10} container justify="center"
            alignItems="center" >
            <Typography variant="h1" className={classes.header}
              gutterBottom align="center">
              Coming Soon
            </Typography>
          </Grid>

          {subHeader}

          <Grid item xs={11} container justify="center"
            alignItems="center" spacing={16}
            className={classes.connectionsContainer}>

            {myTrustedNetwork}
            {networkCircles}
          </Grid>
        </Grid>

        <Grid container className={classes.sectionMobile}
          justify="center" alignItems="center">

          <Grid item xs={12} container justify="center"
            alignItems="center" >
            <Typography variant="h1" className={classes.header}
              gutterBottom align="left">
              Coming Soon
            </Typography>
          </Grid>

          <Grid container justify='flex-end'>
            <Grid item container justify="space-around" xs={5} sm={4} md={3}>
              <Grid container justify='center' style={{ width: '100%'}}>
                <Switch
                  checked={this.state.toggle}
                  onChange={this.handleChange.bind(this)}
                  value="toggle"
                  style={{ width:'100%' }}
                  />
              </Grid>
              <Typography variant="body2" className={classes.header}
                 align="center"
                style={{ width: '40%', fontSize: 10, margin: 0}}>
                Network Circles
              </Typography>
              <Typography variant="body2" className={classes.header}
                align="center"
                style={{ width: '40%', fontSize: 10, margin: 0}}>
                My Trusted Network
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} container justify="center"
            alignItems="center" spacing={16}>

            {toggle ? myTrustedNetwork : networkCircles}
          </Grid>

          {subHeaderMobile}
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ConnectionsHome));
