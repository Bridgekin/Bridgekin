import React from 'react';
// import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  cardHeader:{
    fontSize: 14,
    fontWeight: 600
  },
  filterCard:{
    // marginTop: 18,
    backgroundColor: theme.palette.base3,
    width: '100%',
    borderRadius: 5,
    border: `1px solid ${theme.palette.border.primary}`
  },
  filterItem:{
    borderTop: `1px solid ${theme.palette.border.secondary}`,
  },
  filterHeader:{
    fontSize: 13,
    fontWeight: 500
  },
})

const FilterCard = ({ classes, title, pages, history, location }) => (
  <div className={classes.filterCard}>
    <Typography align='Left' color="textPrimary"
      className={classes.cardHeader}
      style={{ margin: "10px 15px 0px"}}>
      {title}
    </Typography>

    <List component="nav">
      {pages.map(item => (
        <ListItem button className={classes.filterItem}
          onClick={() => history.push(item.dest)}
          selected={location.pathname === item.dest}>
          <Typography variant="body1" align='left'
            color="textPrimary" className={classes.filterHeader}>
            {item.title}
          </Typography>
        </ListItem>
      ))}
    </List>
  </div>
)

export default withRouter(withStyles(styles)(FilterCard));
