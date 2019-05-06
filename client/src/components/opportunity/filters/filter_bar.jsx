import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FilterButton from './filter_button';
import SourceButton from './source_button';
import { needsChoices, industryChoices,
  geographyChoices, valueChoices } from '../../../util/choices';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({

});

const styles = theme => ({
  root: {
  },
  bar: {
    flexGrow: 1,
    backgroundColor: "rgb(255,255,255,0.8)",
    height: 45,
    borderBottom: `1px solid ${theme.palette.border.secondary}`,
    position: 'fixed',
    top: 45,
    zIndex: 1,
    padding: "0px 5px",
    [theme.breakpoints.up('sm')]: {
      padding: "0px 40px"
    }
  }
})

class FilterBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    const { classes } = this.props;
    return (
      <Grid container className={classes.bar}
        justify='flex-start' alignItems='center'>
        {/*<Grid item xs={9} sm={7} md={5} lg={4} container
          alignItems='center' justify='space-between'>*/}
        <SourceButton
          updateSource={this.props.updateSource} />

        <FilterButton
          name='Need'
          key='opportunityNeed'
          options={needsChoices}
          params={this.props.filters['opportunityNeed']}
          updateFilters={this.props.updateFilters('opportunityNeed')}/>

        <FilterButton
          name='Industry'
          key='industries'
          options={industryChoices}
          params={this.props.filters['industries']}
          updateFilters={this.props.updateFilters('industries')}/>

        <FilterButton
          name='Location'
          key='geography'
          options={geographyChoices}
          params={this.props.filters['geography']}
          updateFilters={this.props.updateFilters('geography')}/>

        <FilterButton
          name='Opportunity Size'
          key='value'
          options={valueChoices}
          params={this.props.filters['value']}
          updateFilters={this.props.updateFilters('value')}/>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FilterBar));
