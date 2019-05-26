/* @jsx h */
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

import { setFilters } from '../../store/actions';
import Filters from '../filters';

function mapDispatchToProps(dispatch) {
  return {
    setFilters: filters => dispatch(setFilters(filters))
  };
}

class FiltersView extends Component {
  constructor() {
    super();

    this.filtersData = {};
  }

  /*
   * Builder filters
   */
  getFiltersComponent() {
    return this.props.filters.map(filter => {
      const TagName = Filters[`${filter.type}Filter`];

      return (
        <TagName
          name={filter.name}
          options={filter.options}
          callback={e => this.setFilter(e)}
        />
      );
    });
  }

  /*
   * Trigger when filter's data changes
   */
  setFilter(filterData) {
    this.filtersData[filterData.name] = filterData;
    this.props.setFilters(this.filtersData);
  }

  render() {
    return (
      <div class="filters-view">
        <div class="wrapper">
          <div class="df-center-y">{this.getFiltersComponent()}</div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(FiltersView);
