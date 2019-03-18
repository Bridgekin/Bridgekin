import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// import Contacts from './contacts';
import CircleCard from './circle_card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FeedCard from '../feed_card';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDownSharp';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  circles: state.entities.circles,
});

const mapDispatchToProps = dispatch => ({

});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  mobileFilterCard:{
    padding: "9px 8px 9px 8px",
    backgroundColor: `${theme.palette.base3}`,
    // borderTop: `1px solid ${theme.palette.border.primary}`,
    border: `1px solid ${theme.palette.border.primary}`,
    // width: '100%',
    marginBottom: 9,
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  mobileWaitlist:{
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
})

class CirclesFeed extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      circleAnchorEl: null
    }

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  handleMenuClick(menuAnchor){
    return e => {
      e.preventDefault();
      let anchor = this.state[menuAnchor];
      this.setState({ [menuAnchor]: anchor ? null : e.currentTarget})
    }
  }

  handleChangePage(dest){
    return e => {
      this.props.history.push(dest);
      this.setState({ circleAnchorEl: null })
    }
  }

  render(){
    const { classes, pages, currentUser,
      circles} = this.props;
    const { circleAnchorEl } = this.state;

    // let mobileFilter = (
    //   <Grid container justify='flex-end' alignItems='center'
    //     className={classes.mobileFilterCard}>
    //     <Button
    //       aria-owns={circleAnchorEl ? 'simple-menu' : undefined}
    //       aria-haspopup="true"
    //       classes={{ label: classes.buttonText}}
    //       onClick={this.handleMenuClick('circleAnchorEl')}
    //       style={{ textTransform: 'capitalize'}}
    //     >
    //       {/*pages.find(x => x.dest === pathName).title*/}
    //       <KeyboardArrowDownIcon />
    //     </Button>
    //     <Menu
    //       id="simple-menu"
    //       anchorEl={circleAnchorEl}
    //       open={Boolean(circleAnchorEl)}
    //       onClose={this.handleMenuClick('circleAnchorEl')}
    //     >
    //       {pages.map(page => (
    //         <MenuItem onClick={this.handleChangePage(page.dest)}>
    //           {page.title}
    //         </MenuItem>
    //       ))}
    //     </Menu>
    //   </Grid>
    // )

    let circleCards = Object.values(circles).map(circle => (
      <FeedCard contents={
          <CircleCard circle={circle} />
      } />
    ))

    // <div className={classes.mobileWaitlist}>
    //   {waitlistCard}
    // </div>
    // <Contacts pathName={pathName}/>
    return (
      <div style={{ paddingBottom:30, width: '100%'}}>
        {/*mobileFilter*/}
        <FeedCard contents={
          <CircleCard circle={{title: 'Add Contact', add: true}} />        
        } />
        {circleCards}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CirclesFeed));
