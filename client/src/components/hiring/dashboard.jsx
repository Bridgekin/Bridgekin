import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HiringContainer from './hiring_container';

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

import Loading from '../loading';
import { fetchRefApplications } from '../../actions/ref_application_actions';
import { fetchRefOpps } from '../../actions/ref_opportunity_actions';
import { openDeleteOpp } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  dimensions: state.util.window,
  userFeature: state.entities.userFeature,
  page: ownProps.match.params.page,
  refOpps: state.entities.hiring.refOpps,
  ownedOpps: state.entities.hiring.ownedOpps,
  refApps: state.entities.hiring.refApps,
  ownedApps: state.entities.hiring.ownedApps,
  submittedApps: state.entities.hiring.submittedApps,
});

const mapDispatchToProps = dispatch => ({
  fetchRefApplications: () => dispatch(fetchRefApplications()),
  fetchRefOpps: () => dispatch(fetchRefOpps()),
  openDeleteOpp: (payload) => dispatch(openDeleteOpp(payload)),
});

const styles = theme => ({
  grid:{
    paddingTop: 64,
    // paddingBottom: '10%'
  },
  root: {
    width: '100%',
  },
  paper: {
    // marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    // marginBottom: theme.spacing(2),
  },
  navButton: { margin: '10px 0px'}
})

class HiringDashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      rowsPerPage: 10,
      tablePage: 1,
      anchorEl: null
    }
    this.handleChangeTablePage = this.handleChangeTablePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentDidMount(){
    const { userFeature } = this.props;
    if(!userFeature.initialPostingDate){
      this.props.history.push('/hiring/create/AngelList')
    }

    async function loadData(){
      this.props.fetchRefApplications()
      await this.props.fetchRefOpps()
      await this.setState({ loaded: true})
    }
    loadData.bind(this)()
  }

  handleMenuClick(e){
    e.stopPropagation();
    const { anchorEl } = this.state;
    this.setState({ anchorEl: (anchorEl ? null : e.currentTarget)})
  }

  handleChangeTablePage(e, tablePage){
    this.setState({ tablePage })
  }

  handleChangeRowsPerPage(e){
    this.setState({ rowsPerPage: e.target.value})
  }

  handleDelete(id){
    return e => {
      e.stopPropagation();
      this.props.openDeleteOpp({
        oppId: id,
        type: 'hiring'
      })
      this.setState({ anchorEl: null})
    }
  }

  getHeader(phrase){
    return <Grid container
    style={{ paddingBottom: 30, borderBottom: `1px solid grey`, marginBottom: 20 }}>
      <Typography color='textPrimary' fullWidth
      style={{ fontSize: 24 }}>
        {phrase}
      </Typography>
    </Grid>
  }

  getContent(){
    const { classes, page, ownedOpps, submittedApps, 
      ownedApps, currentUser, refOpps, refApps } = this.props;
    const { anchorEl, loaded } = this.state;

    if(!loaded){
      return <Loading />
    }

    let phrase, rows, headerCells, tableBody;
    // debugger
    switch(page){
      case `referrals`:
        phrase = 'My Referrals'
        headerCells = ["Type of Position", 'Compensation', 'Location', 'Status'];
        rows = submittedApps.map(id => refApps[id])
          .filter(x => x.directReferrerId === currentUser.id)
          .map(x => refOpps[x.refOppId])
        tableBody = <TableBody>
          {rows.map(row => {
            return (
              <TableRow 
              onClick={() => this.props.history.push(`/hiring/show/${row.id}`)}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                {['typeOfPosition', 'compensation', 'location', 'status', 'views'].map(field =>{
                  if(field === 'location'){
                    return <TableCell align="right"
                    style={{ textTransform: 'capitalize'}}>{`${row.city}, ${row.state}`}</TableCell>
                  } else {
                    return <TableCell align="right">{row[field]}</TableCell>
                  }
                })}
              </TableRow>
            )}
          )}
        </TableBody>
        break;
      case `applications`:
        phrase = `My Applications`;
        headerCells = ["Type of Position", 'Compensation', 'Location', 'Status'];
        rows = submittedApps.map(id => refApps[id])
          .filter(x => x.candidateId === currentUser.id)
          .map(x => refOpps[x.refOppId])
        // debugger
        tableBody = <TableBody>
          {rows.map(row => {
            if(!row.title){
              debugger
            }
            return (
              <TableRow 
              onClick={() => this.props.history.push(`/hiring/show/${row.id}`)}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                {['typeOfPosition', 'compensation', 'location', 'status', 'views'].map(field =>{
                  if(field === 'location'){
                    return <TableCell align="right"
                    style={{ textTransform: 'capitalize'}}>{`${row.city}, ${row.state}`}</TableCell>
                  } else {
                    return <TableCell align="right">{row[field]}</TableCell>
                  }
                })}
              </TableRow>
            )}
          )}
        </TableBody>
        break;
      case `received_applications`:
        phrase = `Received Applications`;
        headerCells = ["First Name", 'Last Name', 'Email', 'Status'];
        rows = ownedApps.map(id => refApps[id])
        // debugger
        tableBody = <TableBody>
          {rows.map(row => {
            return (
              <TableRow 
              onClick={() => this.props.history.push(`/hiring/show/${row.id}`)}>
                <TableCell component="th" scope="row">
                  {`${refOpps[row.refOppId].title}`}
                </TableCell>
                {['fname', 'lname', 'email', 'status'].map(field => <TableCell align="right">{row[field]}</TableCell>)}
              </TableRow>
            )}
          )}
        </TableBody>
        break;
      default:
        phrase = `My Jobs`
        headerCells = ["Type of Position", 'Compensation', 'Location', 'Status', 'Views', 'Action']
        rows = ownedOpps.map(id => refOpps[id]);
        tableBody = <TableBody>
          {rows.map(row => {
            return (
              <TableRow
              onClick={() => this.props.history.push(`/hiring/show/${row.id}`)}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                {['typeOfPosition', 'compensation', 'location', 'status', 'views'].map(field =>{
                  if(field === 'location'){
                    return <TableCell align="right"
                    style={{ textTransform: 'capitalize'}}>{`${row.city}, ${row.state}`}</TableCell>
                  } else {
                    return <TableCell align="right">{row[field]}</TableCell>
                  }
                })}
                <TableCell>
                  <IconButton
                    onClick={this.handleMenuClick}>
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleMenuClick}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    getContentAnchorEl={null}>
                    <MenuItem onClick={() => `/hiring/show/${row.id}`}>
                      {`View/Edit`}
                    </MenuItem>
                    <MenuItem onClick={this.handleDelete(row.id)}>
                      {`Delete`}
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            )}
          )}
        </TableBody>
        break;
    }

    let tableHead = <TableHead>
      <TableRow>
        <TableCell>{`Job Title`}</TableCell>
        {headerCells.map(val =>(
          <TableCell align="right">{val}</TableCell>
        ))}
      </TableRow>
    </TableHead>

    return <Grid item xs={11}>
      {this.getHeader(phrase)}
      <Paper className={classes.paper}>
        <Table className={classes.table}
        size={'small'}>
          {tableHead}
          {tableBody}
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.tablePage}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangeTablePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    </Grid>
  }

  render(){
    const { classes, dimensions } = this.props;

    return <div style={{ minHeight: dimensions.height}}>
      <Grid container justify='center' 
      className={classes.grid}>
        <Grid item xs={2} container justify='flex-start' alignItems='center' direction='column'
        style={{ height: dimensions.height - 64, borderRight: `1px solid grey`, paddingTop: 50}}>
          <Button className={classes.navButton}
          onClick={() => this.props.history.push('/hiring/create/AngelList')}>
            {`Create a job`}
          </Button>
          <Button className={classes.navButton}
          onClick={() => this.props.history.push(`/hiring/dashboard`)}>
            {`My Jobs`}
          </Button>
          <Button className={classes.navButton}
          onClick={() => this.props.history.push(`/hiring/dashboard/received_applications`)}>
            {`Received Applications`}
          </Button>
          <Button className={classes.navButton}
          onClick={() => this.props.history.push(`/hiring/dashboard/referrals`)}>
            {`My Referrals`}
          </Button>
          <Button className={classes.navButton}
          onClick={() => this.props.history.push(`/hiring/dashboard/applications`)}>
            {`My Applications`}
          </Button>
        </Grid>
        <Grid item xs={12} sm={10} container justify='center' alignItems='flex-start'
        style={{ paddingTop: 50 }}>
          {this.getContent()}
        </Grid>
      </Grid>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HiringDashboard));
