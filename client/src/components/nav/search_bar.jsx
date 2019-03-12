import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Popover from '@material-ui/core/Popover';
import MenuList from '@material-ui/core/MenuList';
import CircularProgress from '@material-ui/core/CircularProgress';

import SearchItem from './search_item';
import { fetchSearchResults } from '../../actions/user_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  searchResults: state.entities.searchResults,
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  fetchSearchResults: (searchInput, bool) => dispatch(fetchSearchResults(searchInput, bool))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.grey1}`,
    // marginRight: theme.spacing.unit * 2,
    // marginLeft: 0,
    width: '100%',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
      // marginLeft: theme.spacing.unit * 3,
      // width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.darkGrey,
    top: 0, right: 0
  },
  inputRoot: {
    color: theme.palette.darkGrey,
    width: '100%',
    fontSize: 15,
    fontWeight: 500,
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  menuPaper:{ minWidth: 300 },
  buttonText: { color: theme.palette.text.tertiary},
  navButtonText: { color: theme.palette.text.tertiary},
  listItemText: { fontSize: 12 }
})

class SearchBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchInput: '',
      searchLoading: true,
      searchAnchorEl: null,
    }

    this.timeout = null;
    this.handleClickAwayClose = this.handleClickAwayClose.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleAllResultsPage = this.handleAllResultsPage.bind(this);
  }

  handleClickAwayClose(anchorEl) {
    return e => {
      this.setState({ [anchorEl]: null });
    }
  }

  handleCloseMenu(e){
    this.setState({ searchAnchorEl: null });
  }

  handleSearchChange(e){
    let input = e.target.value;
    this.setState({
      searchLoading: true,
      searchAnchorEl: (input.length > 0 ? e.currentTarget : null),
      searchInput: input
    }, () => {
      if(input.length > 0){
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.props.fetchSearchResults(input, true)
          .then(() => this.setState({ searchLoading: false }))
        }, 500)
      }
    })
  }

  handleAllResultsPage(){
    const { searchInput } = this.state;
    this.setState({ searchAnchorEl: null })
    this.props.history.push(`/mynetwork/searchresults/${searchInput}`)
  }

  capitalize(str){
    if(str){
      return str[0].toUpperCase() + str.slice(1)
    }
    return ''
  }

  render(){
    const { classes, currentUser,users,
      searchResults } = this.props;

    const { searchAnchorEl,
    searchLoading,searchInput } = this.state;

    const searchOpen = Boolean(searchAnchorEl);

    if(currentUser){
      let results = !searchLoading && searchResults.slice(0,5).map(result => {
        let user = users[result];
        return <SearchItem user={user} closeMenu={this.handleCloseMenu}/>
      })

      let searchResultContainer = currentUser && (
        <Popper open={searchOpen} anchorEl={searchAnchorEl}
          transition disablePortal
          placement={'bottom-start'}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              >
              {/*style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}*/}
              <Paper style={{ minWidth: 300 }}>
                <ClickAwayListener
                  onClickAway={this.handleClickAwayClose('searchAnchorEl')}>
                  {searchLoading ? (
                    <Grid container justify='center' alignItems='center'
                      style={{ height: 100 }}>
                      <CircularProgress />
                    </Grid>
                  ) : (
                    <MenuList>
                      {results}
                      <MenuItem onClick={this.handleAllResultsPage}
                        style={{ fontWeight: 600}}>
                        {`See all results for "${searchInput}"`}
                      </MenuItem>
                    </MenuList>
                  )}
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )

      // let searchResultContainer = currentUser && (
      //   <Menu
      //     id="simple-menu"
      //     anchorEl={searchAnchorEl}
      //     open={searchOpen}
      //     onClose={this.handleCloseMenu}
      //     getContentAnchorEl={null}
      //     anchorOrigin={{
      //       vertical: 'bottom',
      //       horizontal: 'left',
      //     }}
      //     transformOrigin={{
      //       vertical: 'top',
      //       horizontal: 'left',
      //     }}
      //     disableAutoFocusItem
      //     classes={{ paper: classes.menuPaper }}
      //   >
      //     {searchLoading ? (
      //       <Grid container justify='center' alignItems='center'
      //         style={{ height: 100 }}>
      //         <CircularProgress />
      //       </Grid>
      //     ) : (
      //       <MenuList>
      //         {results}
      //         <MenuItem onClick={this.handleAllResultsPage}>
      //           {`See all results for "${searchInput}"`}
      //         </MenuItem>
      //       </MenuList>
      //     )}
      //   </Menu>
      // )

      return (
        <div className={classes.search}>
          <InputBase
            onClick={this.handleSearchChange}
            autoFocus={true}
            onChange={this.handleSearchChange}
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            />
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          {searchResultContainer}
        </div>
      )
    } else {
      return <div style={{ flexGrow: 1 }} />
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(SearchBar)));
