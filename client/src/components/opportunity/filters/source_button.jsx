import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  networks: state.entities.networks,
  workspaceOptions: state.entities.workspaceOptions,
  siteTemplate: state.siteTemplate,
  workspaces: state.workspaces,
  source: ownProps.match.params.source,
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
    border: '1px solid black',
    marginRight: 4,
    padding: "2px 3px",
    textTransform: 'capitalize',
    [theme.breakpoints.up('sm')]: {
      padding: "3px 5px"
    }
  },
  selectedButton:{
    color: 'white',
    background: 'black',
    '&:hover':{
      color: 'white',
      background: '#505050',
    }
  },
  menu: { padding: 0 },
  menuItem:{

  },
  extendSelected:{
    color: 'white',
    backgroundColor: 'black'
  },
  submitBar: {
    marginBottom: 5,
    padding: 5,
    borderTop: `1px solid ${theme.palette.border.primary}`
  }
})

class SourceButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      anchorEl: null,
      networksAnchorEl: null,
      source: ''
    }
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.getSource = this.getSource.bind(this);
    this.setChecked = this.setChecked.bind(this);
    this.toggleNetworksMenu = this.toggleNetworksMenu.bind(this);
    this.getNetworkMenuItems = this.getNetworkMenuItems.bind(this);
  }

  componentDidMount(){
    this.setState({ source: this.getSource()})
  }

  componentDidUpdate(prevProps){
    if(prevProps.source !== this.props.source){
      this.setState({ source: this.getSource()})
    }
  }

  getSource(){
    const { source } = this.props;
    return source ? source : '';
  }

  openMenu(e){
    this.setState({ anchorEl: e.currentTarget })
  }

  closeMenu(e){
    this.setState({ anchorEl: null, source: this.getSource() })
  }

  toggleNetworksMenu(e){
    e.stopPropagation();
    const { networksAnchorEl } = this.state;
    this.setState({ networksAnchorEl: networksAnchorEl ? null : e.currentTarget })
  }

  setChecked(value){
    const { source } = this.state;
    if (value === source){
      return true
    }
    return false
  }

  getNetworkMenuItems(){
    const { classes, networks, workspaceOptions } = this.props;

    let optionsArray = [...workspaceOptions]
    let networkItems = optionsArray.filter(x => x.includes('Network'))
    .map(value => {
      let id = value.split('-')[0]
      let network = networks[id]
      return <MenuItem className={classes.menuItem}
        onClick={this.handleChoice(value)}>
        <Checkbox
          checked={this.setChecked(value)}
          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
          checkedIcon={<CheckBoxIcon fontSize="small" />}
          />
        <Typography variant='body1' color='textPrimary'
          style={{ textTransform: 'capitalize', fontSize: 13}}>
          {network.title}
        </Typography>
      </MenuItem>
    })
    return networkItems
  }

  handleChoice(option){
    return e => this.setState({ source: option })
  }

  handleSave(type){
    return e => {
      this.setState({ anchorEl: null });

      if (type === 'save'){
        const { source } = this.state;
        this.props.updateSource(source)
      } else {
        this.props.updateSource('')
      }
    }
  }

  render(){
    const { classes, currentUser,
      workspaces, siteTemplate, workspaceOptions } = this.props;
    const { anchorEl, networksAnchorEl, source } = this.state;

    const genericDropdownOptions = currentUser.isAdmin ? [
      {header: 'All Opportunities' , subHeader: `Everything visible to you and the ${workspaces[siteTemplate.networkId].title} network`,
        value: '', disabled: false},
      {header: 'Bridgekin Network' , subHeader: 'Opportunities posted within my networks',
        value: 'all-networks', disabled: false},
      {header: 'All Connections' , subHeader: 'Opportunities posted by my connections',
        value: 'all-connections',disabled: false},
      // {header: 'All Circles' , subHeader: 'Opportunities posted within my circles',
      //   value: 'All-Circle',disabled: false},
      // {header: 'Direct Opportunities' , subHeader: 'Opportunities sent directly to me from my connections',
      //   value: 'direct-connections', disabled: false},
      ] : [
      {header: 'All Opportunities' , subHeader: `Everything visible to you and the ${workspaces[siteTemplate.networkId].title} network`,
      value: '', disabled: false},
      {header: 'Bridgekin Network' , subHeader: 'Opportunities posted within my networks',
        value: 'all-networks', disabled: false}
      ]

    let networks = [...workspaceOptions].filter(x => x.includes('Network'))

    return (
      <div>
        <Button onClick={this.openMenu}
          className={this.props.source !== ''?
            ([classes.filterButton, classes.selectedButton].join(' ')) :
            (classes.filterButton)
          }>
          Source
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
          {genericDropdownOptions.map(option => (
            <MenuItem className={classes.menuItem}
              onClick={this.handleChoice(option.value)}>
              <Checkbox
                checked={this.setChecked(option.value)}
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
              />
            <div>
              <Typography variant='body1' color='textPrimary'
                style={{ textTransform: 'capitalize', fontSize: 13}}>
                {option.header}
              </Typography>
              <Typography variant='body1' color='textSecondary'
                style={{ textTransform: 'capitalize', fontSize: 9}}>
                {option.subHeader}
              </Typography>
            </div>
              {option.value === 'all-networks' &&
                networks.length > 1 &&
                <Grid container justify='flex-end' style={{ flexGrow: 1 }}>
                  <IconButton onClick={this.toggleNetworksMenu}
                    className={classes.expand}>
                    <KeyboardArrowRightIcon
                      className={source.includes('Network') && classes.extendSelected}/>
                  </IconButton>
                </Grid>
              }
            </MenuItem>
          ))}
          <Grid container justify='space-between'
            className={classes.submitBar}>
            <Button className={classes.submitButton}
              onClick={this.handleSave('clear')}>
              Clear
            </Button>
            <Button
              className={classes.submitButton}
              onClick={this.handleSave('save')}>
              Apply
            </Button>
          </Grid>
        </Menu>

        {workspaceOptions && <Menu
          id="simple-menu"
          anchorEl={networksAnchorEl}
          open={Boolean(networksAnchorEl)}
          onClose={this.toggleNetworksMenu}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          MenuListProps={{
            classes:{
              root: classes.menu
            }
          }}
          getContentAnchorEl={null}
          >
          {this.getNetworkMenuItems()}
        </Menu>}
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SourceButton)));
