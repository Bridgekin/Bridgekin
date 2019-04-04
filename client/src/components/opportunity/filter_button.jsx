import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Button from '@material-ui/core/Button';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({

});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  filterButton:{
    color: 'black',
    backgroundColor: 'white',
    border: '2px solid black',
    margin: '0px 15px',
    padding: "3px 5px"
  },
  menu: { padding: 0 },
  menuItem:{

  },
  checkbox:{
    fontSize: 16
  },
  submitBar: {
    marginBottom: 5,
    padding: 5,
    borderTop: `1px solid ${theme.palette.border.primary}`
  }
})

class Template extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      anchorEl: null,
      params: new Set()
    }
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidUpdate(prevProps){
    if(prevProps.params !== this.props.params){
      const { params } = this.props;
      this.setState({ params: new Set([...params]) })
    }
  }

  openMenu(e){
    this.setState({ anchorEl: e.currentTarget })
  }

  closeMenu(e){
    const { params } = this.props;
    this.setState({ anchorEl: null, params: new Set([...params]) })
  }

  handleChoice(option){
    return e => {
      const { params } = this.state;
      if (params.has(option)){
        params.delete(option)
      } else {
        params.add(option)
      }
      this.setState({ params })
    }
  }

  handleSave(e){
    const { params } = this.state;
    this.setState({ anchorEl: null });
    this.props.updateFilter(params)
  }

  render(){
    const { classes, name, key, options } = this.props;
    const { anchorEl, params } = this.state;
    return (
      <div>
        <Button
          onClick={this.openMenu}
          className={classes.filterButton}>
          {name}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.closeMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          MenuListProps={{
            classes:{
              root: classes.menu
            }
          }}
          getContentAnchorEl={null}
          >
          {options.map(option => (
            <MenuItem className={classes.menuItem}
              onClick={this.handleChoice(option)}>
              <Checkbox
                checked={params.has(option)}
                className={classes.size}
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
              />
              <Typography variant='body1' color='textPrimary'
                style={{ textTransform: 'capitalize', fontSize: 13}}>
                {option}
              </Typography>
            </MenuItem>
          ))}
          <Grid container justify='flex-end'
            className={classes.submitBar}>
            <Button variant='contained' color='primary'
              onClick={this.handleSave}>
              Save
            </Button>
          </Grid>
        </Menu>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Template));
