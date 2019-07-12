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

import Loading from '../loading';
import Capitalize from 'capitalize';

import { fetchSalesIntros } from '../../actions/sales_intro_actions';
import { updateSalesIntro, deleteSalesIntro} from '../../actions/sales_intro_actions'

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
  dimensions: state.util.window,
  salesIntros: state.entities.sales.salesIntros,
  receivedRequests: state.entities.sales.receivedRequests,
  sentRequests: state.entities.sales.sentRequests,
  users: state.users,
  salesContacts: state.entities.sales.salesContacts
});

const mapDispatchToProps = dispatch => ({
  fetchSalesIntros: () => dispatch(fetchSalesIntros()),
  updateSalesIntro: (payload) => dispatch(updateSalesIntro(payload)),
  deleteSalesIntro: (id) => dispatch(deleteSalesIntro(id))
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
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){
    const { userFeature } = this.props;

    this.props.fetchSalesIntros()
    .then(() => this.setState({ loaded: true }))
  }

  handleMenuClick(anchor){
    return e => {
      e.stopPropagation();
      const selectedEl = this.state[anchor];
      this.setState({ [anchor]: (selectedEl ? null : e.currentTarget)})
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
      this.props.deleteSalesIntro(id)
      this.setState({ anchorEl: null})
    }
  }

  handleUpdateStatus(row, field){
    return e => {
      e.stopPropagation()
      let value = e.target.value;
      if(value !== row.status){
        let payload = {
          [field]: value,
          id: row.id
        }
        this.props.updateSalesIntro(payload);
      }
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
      ownedApps, currentUser, refOpps, refApps,
      salesIntros, receivedRequests, sentRequests,
      salesContacts, users} = this.props;
    const { actionAnchorEl, statusAnchorEl, loaded } = this.state;

    if(!loaded){
      return <Loading />
    }
    let phrase, rows, headerCells, tableBody;
    switch(page){
      case 'intros':
        phrase = `Intros Made` // sentRequests
        headerCells = ["First Name", "Last Name",
          "Title", "Company", "Employee Referrer",
          "Request Status", "Deal Status"] //"Options"]
        rows = [...receivedRequests].map(id => salesIntros[id]);
        tableBody = <TableBody>
          {rows.map(row => {
            let contact = salesContacts[row.contactId]
            let requestor = users[row.requestorId]
            return (
              <TableRow>
                <TableCell component="th" scope="row"
                  className={classes.tableCell}>
                  {contact.fname}
                </TableCell>
                {['lname', 'position', "company", "employee referral", "requestStatus", "dealStatus"].map(field => {
                  if (field === "employee referral") {
                    return <TableCell align="right"
                      className={classes.tableCell}>{`${Capitalize(requestor.fname)} ${Capitalize(requestor.lname)}`}
                      </TableCell>
                  } else if (field === "dealStatus") {
                    return <TableCell align="right"
                      className={classes.tableCell}>{row[field]}</TableCell>
                  } else if (field === "requestStatus"){
                    return <TableCell>
                      <Select fullWidth
                        value={row.requestStatus}
                        onClick={(e) => e.stopPropagation()}
                        onChange={this.handleUpdateStatus(row, 'requestStatus')}>
                        <MenuItem value={'open'}>Open</MenuItem>
                        <MenuItem value={"intro"}>Intro Received</MenuItem>
                        <MenuItem value={"don't know"}>Don't know</MenuItem>
                        <MenuItem value={"prefer not"}>Prefer not to reach out</MenuItem>
                      </Select>
                    </TableCell>
                  } else {
                    return <TableCell align="right"
                      className={classes.tableCell}>{contact[field]}</TableCell>
                  }
                })}
                {/* <TableCell>
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
                    <MenuItem onClick={this.handleDelete(row.id)}>
                      {`Delete`}
                    </MenuItem>
                  </Menu>
                </TableCell> */}
              </TableRow>
            )
          }
          )}
        </TableBody>
        break;
      default:
        phrase = `Intros Requested` // sentRequests
        headerCells = ["First Name", "Last Name",
          "Title", "Company", "Employee Referrer", "Request Status", "Deal Status", "Options"]
        rows = [...sentRequests].map(id => salesIntros[id]);

        tableBody = <TableBody>
          {rows.map(row => {
            let contact = salesContacts[row.contactId]
            let recipient = users[row.recipientId]

            return (
              <TableRow>
                <TableCell component="th" scope="row"
                className={classes.tableCell}>
                  {contact.fname}
                </TableCell>
                {['lname', 'position', "company", "employee referral", "requestStatus", "dealStatus"].map(field => {
                  if (field === "employee referral"){
                    return <TableCell align="right"
                      className={classes.tableCell}>{`${Capitalize(recipient.fname)} ${Capitalize(recipient.lname)}`}</TableCell>
                  } else if (field === "dealStatus"){
                    return <TableCell>
                      <Select fullWidth
                        value={row.dealStatus}
                        onClick={(e) => e.stopPropagation()}
                        onChange={this.handleUpdateStatus(row, 'dealStatus')}>
                        <MenuItem value={'open'}>Open</MenuItem>
                        <MenuItem value={'in discussion'}>In Discussion</MenuItem>
                        <MenuItem value={'in contract'}>In Contract</MenuItem>
                        <MenuItem value={'closed won'}>Closed Won</MenuItem>
                        <MenuItem value={'closed lost'}>Closed Lost</MenuItem>
                      </Select>
                    </TableCell>
                  } else if (field === 'requestStatus'){
                    return <TableCell>
                      <Select fullWidth
                        value={row.requestStatus}
                        onClick={(e) => e.stopPropagation()}
                        onChange={this.handleUpdateStatus(row, 'requestStatus')}>
                        <MenuItem value={'open'}>Open</MenuItem>
                        <MenuItem value={"intro"}>Intro Received</MenuItem>
                        <MenuItem value={"don't know"}>Don't know</MenuItem>
                        <MenuItem value={"prefer not"}>Prefer not to reach out</MenuItem>
                      </Select>
                    </TableCell>
                  } else {
                    return <TableCell align="right"
                    className={classes.tableCell}>{contact[field]}</TableCell>
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
        <Grid item xs={2} container justify='center' alignItems='center' direction='column'
        style={{ height: dimensions.height - 64, borderRight: `1px solid grey`, paddingBottom: 50}}>
          <Button className={classes.navButton}
          onClick={() => this.props.history.push(`/sales/stats/leads`)}>
            {`Intros Requested`}
          </Button>
          <Button className={classes.navButton}
          onClick={() => this.props.history.push(`/sales/stats/intros`)}>
            {`Intros Made`}
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
