import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FeedCard from '../feed_card';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

import PictureIconSVG from '../../static/opp_feed_icons/picture.svg'
import ShareIconSVG from '../../static/opp_feed_icons/share.svg'
import PrivacyIconSVG from '../../static/opp_feed_icons/privacy.svg'
import PersonIcon from '@material-ui/icons/PersonSharp';

import { openOppChange } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  source: ownProps.match.params.source,
});

const mapDispatchToProps = dispatch => ({
  openOppChange: (payload) => dispatch(openOppChange(payload)),
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  feedCard:{
    padding: "10px 8px 12px",
    backgroundColor: `${theme.palette.base3}`,
    borderTop: `1px solid ${theme.palette.border.secondary}`,
    borderBottom: `1px solid ${theme.palette.border.secondary}`,
    width: '100%',
    marginBottom: 9,
    [theme.breakpoints.up('sm')]: {
      border: `1px solid ${theme.palette.border.secondary}`,
      // borderRadius: 5,
      padding: "10px 17px 12px",
    },
  },
  createFilterMain:{
    // borderBottom: `1px solid ${theme.palette.border.primary}`,
    // height: 85
  },
  createFilterButton:{
    textTransform: 'none',
    backgroundColor: theme.palette.base4,
    margin: "5px 10px 5px 0px",
    fontSize: 12
  },
  filterButton:{
    color: '#505050',
    backgroundColor: 'white',
    border: '1px solid #696969',
    margin: '0px 5px',
    padding: "3px 5px",
    textTransform: 'capitalize'
  },
  filterButtonIcon:{
    width: 14,
    marginRight: 3,
    color: '#000000'
  },
  cardHeader: { fontSize: 13 },
  avatar:{
    height: 40,
    width: 40,
    color: theme.palette.text.primary
  },
})

const DEFAULTSTATE = {
  opportunityNeed: '',
  geography: [],
  industries: [],
  value: '',
  title: '',
  description: '',
  // status: 'Pending',
  picture: null,
  pictureUrl: null,
  // networks: [],
  anonymous: false,
  viewType: 'post',
  // permissions: ['-Network']
}

class CreateOppButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen(e){
    let payload = {
      opportunity: DEFAULTSTATE,
      mode: 'create'
    }
    this.props.openOppChange(payload);
  }

  render(){
    const { classes, currentUser } = this.props;

    let button = (
      <CardActionArea className={classes.feedCard}
        style={{ paddingBottom: 9}}
        onClick={this.handleOpen}>

        <Grid container alignItems='center'
          className={classes.createFilterMain}>
          {currentUser.profilePicUrl ? (
            <Avatar alt="profile-pic"
              src={currentUser.profilePicUrl}
              className={classes.avatar} />
          ) : (
            <AccountCircle className={classes.avatar}/>
          )}
          <Grid container style={{ flexGrow: 1, maxWidth: '84%', marginLeft: 10}}
            alignItems='center'>
            <Typography align='left' color="textSecondary"
              className={classes.cardHeader}
              style={{ padding: "15px 0px"}}>
              {`What's your business need or opportunity?`}
            </Typography>
          </Grid>
        </Grid>

        <Grid container style={{ paddingTop: 17}}>
          <Button className={classes.filterButton}>
            <img src={PictureIconSVG} alt='pic-icon'
              className={classes.filterButtonIcon}/>
            Image
          </Button>
          <Button className={classes.filterButton}>
            <PersonIcon className={classes.filterButtonIcon}/>
            Privacy
          </Button>
          <Button className={classes.filterButton}>
            {`Add Details`}
          </Button>
        </Grid>
      </CardActionArea>
    )

    return (
      <div>
        {button}
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateOppButton)));
