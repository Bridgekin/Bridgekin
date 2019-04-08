import React from 'react';
// import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  feedCard:{
    padding: "10px 8px 12px",
    backgroundColor: `${theme.palette.base3}`,
    borderTop: `1px solid ${theme.palette.border.secondary}`,
    borderBottom: `1px solid ${theme.palette.border.secondary}`,
    // width: '100%',
    marginBottom: 9,
    [theme.breakpoints.up('sm')]: {
      border: `1px solid ${theme.palette.border.secondary}`,
      // borderRadius: 5,
      padding: "10px 17px 12px",
    },
    width: '100%'
  },
  mobileFeedCard:{
    padding: "9px 8px 9px 8px",
    backgroundColor: `${theme.palette.base3}`,
    // borderTop: `1px solid ${theme.palette.border.primary}`,
    border: `1px solid ${theme.palette.border.primary}`,
    // width: '100%',
    marginBottom: 9,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
})

const FeedCard = ({ contents, classes, mobile }) => (
  <div className={mobile ? classes.mobileFeedCard : classes.feedCard}>
    {contents}
  </div>
)

export default withStyles(styles)(FeedCard)
