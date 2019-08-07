import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Loading from '../../loading';
import { fetchInvites, createInvites, updateInvite, deleteInvite } from '../../../actions/sales_invites_actions';
import { openSalesInvite } from '../../../actions/modal_actions'
import Capitalize from 'capitalize';
import InviteCard from './invite_card';
import uniqId from 'uniqid';
import merge from 'lodash/merge';
import isEmpty from 'lodash/isEmpty';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  dimensions: state.util.window,
  networkAdminMap: state.entities.sales.networkAdminMap,
  salesNetworks: state.entities.sales.salesNetworks,
  currentDashboardTarget: state.entities.sales.currentDashboardTarget,
  salesUserPermissions: state.entities.sales.salesUserPermissions,
  salesInvites: state.entities.sales.salesInvites,
  salesInviteErrors: state.errors.salesInvite,
});

const mapDispatchToProps = dispatch => ({
  fetchInvites: (networkId) => dispatch(fetchInvites(networkId)),
  createInvites: (payload) => dispatch(createInvites(payload)),
  openSalesInvite: (payload) => dispatch(openSalesInvite(payload)),
  updateInvite: (payload) => dispatch(updateInvite(payload)),
  deleteInvite: (inviteId) => dispatch(deleteInvite(inviteId))
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    paddingTop: 64 + 15,
    paddingBottom: '10%'
  }, 
})

class NetworkInvite extends React.Component {
  constructor(props) {
    super(props)
    let newId = uniqId();
    this.state = {
      loaded: false,
      validTarget: false,
      newInvites: {
        [newId]: { id: newId, email: '', fname: '', lname: '', relationship: 'both'}
      },
      lastAddedIdx: 0,
      rowsPerPage: 10,
      tablePage: 0,
      actionAnchorEl: null,
      personal: false
    }

    this.updateVariable  = this.updateVariable.bind(this)
    this.addAnotherUser = this.addAnotherUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.readyToSubmit = this.readyToSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdatePerms = this.handleUpdatePerms.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeTablePage = this.handleChangeTablePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.filterSalesInvites = this.filterSalesInvites.bind(this);
  }

  componentDidMount(){
    this.loadInvites()
  }

  componentDidUpdate(prevProps, prevState) {
    let thisDashTarget = this.props.currentDashboardTarget;
    let prevDashTarget = prevProps.currentDashboardTarget;
    if (thisDashTarget !== prevDashTarget) {
      this.loadInvites()
    }
    return true
  }

  loadInvites(){
    const { currentDashboardTarget } = this.props;
    
    if (isEmpty(currentDashboardTarget) || currentDashboardTarget.permissable_type === "User") {
      this.props.fetchInvites(currentDashboardTarget)
        .then(() => {
          this.setState({ 
            loaded: true, 
            validTarget: true,
            personal: true })
        })
    } else {
      this.props.fetchInvites(currentDashboardTarget)
        .then(() => {
          const { networkAdminMap, currentUser } = this.props;
          let admins = new Set(networkAdminMap[currentDashboardTarget.permissableId] || []);
          if (admins.has(currentUser.id)) {
            this.setState({ loaded: true, validTarget: true, personal: false})
          } else {
            this.setState({ loaded: true, validTarget: false, personal: false })
          }
        })
    }
  }

  updateVariable(payload){
    const { newInvites } = this.state;
    let newData = merge({}, newInvites[payload.id])
    newData[payload.field] = payload.value
    newInvites[payload.id] = newData
    this.setState({ newInvites })
  }

  addAnotherUser(){
    const { newInvites } = this.state;
    let newId = uniqId();
    newInvites[newId] = { id: newId, email: '', fname: '', lname: '', relationship: 'both'}
    this.setState({ newInvites })
  }

  deleteUser(id){
    const { newInvites } = this.state;
    delete newInvites[id]
    this.setState({ newInvites })
  }

  readyToSubmit(){
    const { newInvites } = this.state;
    let arr = Object.values(newInvites)
    for(let i = 0; i < arr.length; i++){
      let {email, fname, lname, relationship} = arr[i];
      if (!email || !fname || !lname || !relationship){
        return false
      }
    }
    return  true
  }

  filterSalesInvites(){
    const { salesInvites, currentDashboardTarget } = this.props;
    if (currentDashboardTarget.permissableType === "SalesNetwork"){
      return Object.values(salesInvites).filter(invite => invite.networkId === currentDashboardTarget.permissableId)
        .reverse()
    } else {
      return Object.values(salesInvites).filter(invite => !invite.networkId)
        .reverse()
    }
  }

  handleSubmit(){
    const { currentDashboardTarget } = this.props;
    const { newInvites } = this.state;
    let payload = { currentDashboardTarget, 
      newInvites: Object.values(newInvites) }
    this.props.createInvites(payload)
      .then(() => {
        // Reset invites if there aren't any errors
        if (this.props.salesInviteErrors === 0){
          let newId = uniqId();
          let newInvites = {
            [newId]: { id: newId, email: '', fname: '', lname: '', relationship: 'both' }
          }
          this.setState({ newInvites })
        }
        // Open up modal
        this.props.openSalesInvite({ page: 'response' })
      })
  }

  handleUpdatePerms(invite) {
    return e => {
      let val = e.target.value
      let payload = {
        id: invite.id,
        relationship: val
      }
      this.props.updateInvite(payload)
    }
  }

  handleDelete(id, uniqAnchor) {
    return e => {
      this.setState({ [uniqAnchor]: null},
        () => this.props.deleteInvite(id))
    }
  }

  handleMenuClick(anchor) {
    return e => {
      e.stopPropagation();
      const selectedEl = this.state[anchor];
      this.setState({ [anchor]: (selectedEl ? null : e.currentTarget) })
    }
  }

  handleChangeTablePage(e, tablePage) {
    this.setState({ tablePage })
  }

  handleChangeRowsPerPage(e) {
    this.setState({ rowsPerPage: e.target.value })
  }

  capitalize(title){
    return title.split(" ").map(word => Capitalize(word)).join(" ")
  }

  render() {
    const { dimensions, classes, salesNetworks, currentDashboardTarget, salesInvites } = this.props;
    const { loaded, validTarget, newInvites, tablePage, rowsPerPage, actionAnchorEl, personal } = this.state;
    
    if (loaded && validTarget && personal) {
      return <Grid container justify='center' alignItems='center' style={{ minHeight: dimensions.height }}>
        <Grid item xs={10} sm={6}>
          <Typography align='center' gutterBottom
            data-cy="progress-header"
            color='textPrimary'
            style={{ fontSize: 38, fontWeight: 600 }}>
            {`Feature in Progress`}
          </Typography>
          <Typography align='center' gutterBottom
            color='textSecondary'
            style={{ fontSize: 18 }}>
            {`We're working on getting this feature production ready! Come back here soon to see what we've been working on!`}
          </Typography>
          <Typography align='center'
            color='textSecondary'
            style={{ fontSize: 18 }}>
            {`If you have any questions, reach out to us at `}
            <a href=" mailto:admin@bridgekin.com">admin@bridgekin.com</a> {`.`}
          </Typography>
        </Grid>
      </Grid>
    } else if (loaded && validTarget && !personal){
      let pType = currentDashboardTarget.permissableType
      let network = salesNetworks[currentDashboardTarget.permissableId];
      let targetName = pType === "SalesNetwork" ? this.capitalize(network.title) : `Your Personal Contacts`

      let header = <Grid container justify='center'>
        <Typography color='textPrimary'
          data-cy='invite-header'
        style={{ fontSize: 34, marginBottom: 50}}>
          {`Invite Folks To Access ${targetName}`}
        </Typography>
      </Grid>
      let inviteCards = Object.values(newInvites).map(data => {
        return <InviteCard idx={data.id} data={data} updateVariable={this.updateVariable} deleteUser={this.deleteUser}/>
      })

      let inviteComp = <Grid item xs={10} sm={8}
      style={{ marginTop: 40 }}>
        {header}
        {inviteCards}
        <Grid container style={{ margin: "15px 0px" }}>
          <Button color='primary'
            data-cy='add-another-user'
            onClick={this.addAnotherUser}>
            {`Add Another User`}
          </Button>
        </Grid>
        <div>
          <Button variant='contained' color='primary'
            disabled={!this.readyToSubmit()}
            data-cy='submit-button'
            onClick={this.handleSubmit}
            style={{ textTrasform: 'none' }}>
            {`Send Invitations`}
          </Button>
        </div>
      </Grid>

      let headerCells = ["First Name", "Last Name",
        "Email", "Relationship", "Status", "User on Platform?", "Options"]

      let rows = this.filterSalesInvites()

      let tableHead = <TableHead>
        <TableRow>
          {headerCells.map(val => (
            <TableCell align="right">{val}</TableCell>
          ))}
        </TableRow>
      </TableHead>

      let tableBody = <TableBody>
        {rows.slice(tablePage * rowsPerPage, tablePage * rowsPerPage + rowsPerPage)
        .map(row => {

          return <TableRow>
            <TableCell component="th" scope="row"
              className={classes.tableCell}>
              {row.fname}
            </TableCell>
            {['lname', 'email', "relationship", "status", "user on platform?", "options"].map(field => {
              if (field === "options") {
                let uniqAnchor = actionAnchorEl + row.id
                return <TableCell>
                  <IconButton
                    onClick={this.handleMenuClick(uniqAnchor)}>
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={this.state[uniqAnchor]}
                    open={Boolean(this.state[uniqAnchor])}
                    onClose={this.handleMenuClick(uniqAnchor)}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    getContentAnchorEl={null}>
                    <MenuItem onClick={this.handleDelete(row.id, uniqAnchor)}>
                      {`Delete`}
                    </MenuItem>
                  </Menu>
                </TableCell>
              } else if (field === "relationship") {
                return <TableCell>
                  <Select fullWidth
                    value={row.relationship}
                    onClick={(e) => e.stopPropagation()}
                    onChange={this.handleUpdatePerms(row)}>
                    <MenuItem data-cy='rel-both'
                      value={'both'}>{`Request and grant access`}
                    </MenuItem>
                    <MenuItem data-cy='rel-request'
                      value={'request'}>{`Request Access`}</MenuItem>
                    <MenuItem data-cy='rel-give'
                      value={'give'}>{`Grant Access`}</MenuItem>
                  </Select>
                </TableCell>
              } else if (field === "user on platform?"){
                return <TableCell>
                  {row.recipientId ? `Yes` : `No`}
                </TableCell>
              } else {
                return <TableCell align="right"
                  className={classes.tableCell}>{row[field]}</TableCell>
              }
            })}
          </TableRow>
        })}
      </TableBody>

      let resultsComp = <Grid item xs={11}>
        <Typography gutterBottom align='left'
          style={{ fontSize: 28, margin: "30px 0px" }}>
          {`Manage Invites`}
        </Typography>
        {rows.length > 0 ? <Paper className={classes.paper}>
          <Table className={classes.table}
            size={'small'}>
            {tableHead}
            {tableBody}
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={tablePage}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangeTablePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper> : 
        <Typography fullWidth>
          {`You haven't sen't any invitations to join ${targetName}`}
        </Typography>
        }
      </Grid>

      return <div style={{ minHeight: dimensions.height }}>
        <Grid container justify='center'
          className={classes.grid}>
            {inviteComp}
            {resultsComp}
        </Grid>
      </div>
    } else if (loaded && !validTarget){
      return <Grid container justify='center' alignItems='center' style={{ minHeight: dimensions.height }}>
        <Grid item xs={10} sm={6}>
          <Typography align='center' gutterBottom
            color='textPrimary'
            style={{ fontSize: 38, fontWeight: 600 }}>
            {`Access Denied`}
          </Typography>
          <Typography align='center' gutterBottom
            color='textSecondary'
            style={{ fontSize: 18 }}>
            {`Inviting more people is a great way to increase visibility and get more introductions! However, your admin is currently the only one who can access this feature. `}
          </Typography>
          <Typography align='center'
            color='textSecondary'
            style={{ fontSize: 18 }}>
            {`Please reach out to your network admin to invite additional users. If you need help or have any questions you can email us at `}
            <a href=" mailto:admin@bridgekin.com">admin@bridgekin.com</a> {`.`}
          </Typography>
        </Grid>
      </Grid>
    } else {
      return <Grid container justify='center'
        alignItems='center' style={{ minHeight: dimensions.height }}>
        <Loading />
      </Grid>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NetworkInvite));
