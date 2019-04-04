import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FilterButton from './filter_button';
import { needsChoices, industryChoices,
  geographyChoices, valueChoices } from '../../util/choices';

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
    zIndex: 1
  },
  filterButton:{
    color: 'black',
    backgroundColor: 'white',
    border: '2px solid black',
    margin: '0px 15px',
    padding: "3px 5px",
    textTransform: 'capitalize'
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
        justify='center' alignItems='center'>
        <Grid item xs={9} sm={7} md={5} lg={4} container
          alignItems='center' justify='space-between'>
          <Button className={classes.filterButton}>
            Source
          </Button>

          <FilterButton
            name='Need'
            key='opportunityNeed'
            options={needsChoices}
            params={this.props.filters['opportunityNeed']}
            updateFilter={this.props.updateFilter('opportunityNeed')}/>

          <FilterButton
            name='Industry'
            key='industries'
            options={industryChoices}
            params={this.props.filters['industries']}
            updateFilter={this.props.updateFilter('industries')}/>

          <FilterButton
            name='Location'
            key='geography'
            options={geographyChoices}
            params={this.props.filters['geography']}
            updateFilter={this.props.updateFilter('geography')}/>

          <FilterButton
            name='Value'
            key='value'
            options={valueChoices}
            params={this.props.filters['value']}
            updateFilter={this.props.updateFilter('value')}/>
        </Grid>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FilterBar));
