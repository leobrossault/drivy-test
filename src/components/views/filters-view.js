/* @jsx h */
import { h, render, Component } from 'preact';

import Filters from '../filters';

class FiltersView extends Component {
  constructor() {
    super();

    this.filtersData = [];
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
  }

  /*
   * Edmit filters data to the parent component
   */
  emitToFiltersData() {
    this.props.callback(this.filtersData);
  }

  render() {
    return (
      <div class="filters-view">
        <div class="wrapper">
          <div class="df-center-y">
            {this.getFiltersComponent()}

            <button onClick={() => this.emitToFiltersData()}>Apply</button>
          </div>
        </div>
      </div>
    );
  }
}

export default FiltersView;
