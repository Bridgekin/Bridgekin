import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Contacts from './contacts';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDownSharp';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id]
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

class ContactsFeed extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      contactAnchorEl: null
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
      this.setState({ contactAnchorEl: null })
    }
  }

  render(){
    const { classes, pages, currentUser,
      waitlistCard } = this.props;
    const { contactAnchorEl } = this.state;
    const pathName = this.props.location.pathname;

    let page = pages.find(x => x.dest === pathName)
    // let pageTitle = pages.find(x => x.dest === pathName)[0].title}

    // let mobileFilter = (
    //   <Grid container justify='flex-end' alignItems='center'
    //     className={classes.mobileFilterCard}>
    //     <Button
    //       aria-owns={contactAnchorEl ? 'simple-menu' : undefined}
    //       aria-haspopup="true"
    //       classes={{ label: classes.buttonText}}
    //       onClick={this.handleMenuClick('contactAnchorEl')}
    //       style={{ textTransform: 'capitalize'}}
    //     >
    //       {page && page.title}
    //       <KeyboardArrowDownIcon />
    //     </Button>
    //     <Menu
    //       id="simple-menu"
    //       anchorEl={contactAnchorEl}
    //       open={Boolean(contactAnchorEl)}
    //       onClose={this.handleMenuClick('contactAnchorEl')}
    //     >
    //       {pages.map(page => (
    //         <MenuItem onClick={this.handleChangePage(page.dest)}>
    //           {page.title}
    //         </MenuItem>
    //       ))}
    //     </Menu>
    //   </Grid>
    // )

    return (
      <div style={{ paddingBottom:30, width: '100%'}}>
        {/*mobileFilter*/}
        {page && <Contacts pathName={pathName}/>}
        <div className={classes.mobileWaitlist}>
          {waitlistCard}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ContactsFeed));
