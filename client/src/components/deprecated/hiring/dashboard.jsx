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
import Select from '@material-ui/core/Select';

import Loading from '../loading';
import Capitalize from 'capitalize';
import { fetchRefApplications, updateRefAppStatus } from '../../actions/ref_application_actions';
import { fetchRefOpps } from '../../actions/ref_opportunity_actions';
import { openDeleteOpp, openRefAppStatus } from '../../actions/modal_actions';
import { EPERM } from 'constants';

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
  openRefAppStatus: (payload) => dispatch(openRefAppStatus(payload)),
  updateRefAppStatus: (payload) => dispatch(updateRefAppStatus(payload))
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
  navButton: { margin: '10px 0px'},
  tableCell: { textTransform: 'capitalize' }
})

class HiringDashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      rowsPerPage: 10,
      tablePage: 1,
      actionAnchorEl: null,
      statusAnchorEl: null
    }
    this.handleChangeTablePage = this.handleChangeTablePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentDidMount(){
    const { userFeature } = this.props;

    if(!userFeature.initialPostingDate){
      this.props.history.push('/hiring/create/Manual')
    }

    async function loadData(){
      this.props.fetchRefApplications()
      await this.props.fetchRefOpps()
      await this.setState({ loaded: true})
    }
    loadData.bind(this)()
  }

  handleMenuClick(anchor){
    return e => {
      e.stopPropagation();
      const selectedEl = this.state[anchor];
      this.setState({ [anchor]: (selectedEl ? null : e.currentTarget)})
    }
  }

  handleStatusUpdate(val, refAppId){
    return e => {
      e.stopPropagation();
      const { refApps } = this.props;
      debugger
      this.props.openRefAppStatus({
        newStatus: val,
        refAppId
      })
    }
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

  handleUpdateAppStatus(row){
    return e => {
      e.stopPropagation()
      let value = e.target.value;
      if(value !== row.status){
        let payload = {
          status: value,
          id: row.id
        }
        this.props.updateRefAppStatus(payload);
      }
    }
  }

  downloadResume(resumeUrl){
    return (e) => {
      e.stopPropagation();
      window.location.replace(resumeUrl);
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
    const { actionAnchorEl, statusAnchorEl, loaded } = this.state;

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
                <TableCell component="th" scope="row"
                className={classes.tableCell}>
                  {row.title}
                </TableCell>
                {['typeOfPosition', 'compensation', 'location', 'status', 'views'].map(field =>{
                  if(field === 'location'){
                    return <TableCell align="right"
                    className={classes.tableCell}>{`${row.city}, ${row.state}`}</TableCell>
                  } else {
                    return <TableCell align="right"
                    className={classes.tableCell}>{row[field]}</TableCell>
                  }
                })}
              </TableRow>
            )}
          )}
        </TableBody>
        break;
      case `applications`:
        phrase = `My Applications`;
        headerCells = ["Type of Position", 'Compensation', 'Location', 'Status', 'Views', 'Resume'];
        rows = submittedApps.map(id => refApps[id])
          .filter(x => x.candidateId === currentUser.id)
          // .map(x => refOpps[x.refOppId])
        tableBody = <TableBody>
          {rows.map(row => {
            let refOpp = refOpps[row.refOppId]
            return (
              <TableRow 
              onClick={() => this.props.history.push(`/hiring/show/${refOpp.id}`)}>
                <TableCell component="th" scope="row"
                className={classes.tableCell}>
                  {refOpp.title}
                </TableCell>
                {['typeOfPosition', 'compensation', 'location', 'status', 'views', 'resume'].map(field =>{
                  if(field === 'location'){
                    return <TableCell align="right"
                    className={classes.tableCell}>{`${refOpp.city}, ${refOpp.state}`}</TableCell>
                  } else if (field === 'resume'){
                    
                    return <TableCell align='right'>
                      <Button style={{ textTransform:'none'}}
                      onClick={this.downloadResume(row.resumeUrl)}>View Resume</Button>
                    </TableCell>
                  } else {
                    return <TableCell align="right"
                    className={classes.tableCell}>{row[field]}</TableCell>
                  }
                })}
              </TableRow>
            )}
          )}
        </TableBody>
        break;
      case `received_applications`:
        phrase = `Received Applications`;
        headerCells = ["First Name", 'Last Name', 'Email', 'Resume','Status'];
        rows = ownedApps.map(id => refApps[id])
        // debugger
        tableBody = <TableBody>
          {rows.map(row => {
            return (
              <TableRow 
              onClick={() => this.props.history.push(`/hiring/show/${row.id}`)}>
                <TableCell component="th" scope="row"
                className={classes.tableCell}>
                  {`${refOpps[row.refOppId].title}`}
                </TableCell>
                {['fname', 'lname', 'email', 'resume','status'].map(field => {
                  if(field === 'status'){
                    return <TableCell>
                      <Select fullWidth
                        value={row.status}
                        onClick={(e)=> e.stopPropagation()}
                        onChange={this.handleUpdateAppStatus(row)}>
                        <MenuItem value={'open'}>Open</MenuItem>
                        <MenuItem value={'phone screen'}>Phone Screen</MenuItem>
                        <MenuItem value={'interview'}>Interview</MenuItem>
                        <MenuItem value={'hired'}>Hired</MenuItem>
                        <MenuItem value={'passed'}>Passed</MenuItem>
                      </Select>
                    </TableCell>
                  } else if (field === 'resume'){
                    return <TableCell align='right'>
                      <Button style={{ textTransform:'none', fontSize: 14, fontWeight: 400}}
                      onClick={this.downloadResume(row.resumeUrl)}>View Resume</Button>
                    </TableCell>
                  } else {
                    return <TableCell align="right"
                    className={classes.tableCell}>{row[field]}</TableCell>
                  }
                })}
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
                <TableCell component="th" scope="row"
                className={classes.tableCell}>
                  {row.title}
                </TableCell>
                {['typeOfPosition', 'compensation', 'location', 'status', 'views'].map(field =>{
                  if(field === 'location'){
                    return <TableCell align="right"
                    className={classes.tableCell}>{`${row.city}, ${row.state}`}</TableCell>
                  } else {
                    return <TableCell align="right"
                    className={classes.tableCell}>{row[field]}</TableCell>
                  }
                })}
                <TableCell>
                  <IconButton
                    onClick={this.handleMenuClick('actionAnchorEl')}>
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={actionAnchorEl}
                    open={Boolean(actionAnchorEl)}
                    onClose={this.handleMenuClick('actionAnchorEl')}
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
