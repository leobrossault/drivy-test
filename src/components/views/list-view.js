/* @jsx h */
import { h, render, Component } from 'preact';

import FilterView from './filters-view';
import CarCardView from './car-card-view';

import LoaderUi from '../ui/loader-ui';

const LIST_FILTERS = [
  {
    type: 'Number',
    name: 'duration',
    options: {
      label: 'Duration',
      placeholder: 'Enter a day between 1 and 30',
      suffix: 'day(s)',
      min: 1,
      max: 30,
      step: 1
    }
  },
  {
    type: 'Select',
    name: 'distance',
    options: {
      label: 'Distance',
      suffix: 'km',
      availableValues: () => {
        const step = 50;
        let values = [];

        for (let y = 50; y <= 3000; y += 50) {
          values.push(y);
        }

        return values;
      }
    }
  }
];

class ListView extends Component {
  constructor() {
    super();

    /*
     * Init state
     */
    this.state = {
      isLoaded: false,
      carsList: []
    };
  }

  /*
   * Fetch cars list when component did mount
   */
  componentDidMount() {
    this.setCarsList();
  }

  /*
   * Refresh data
   */
  setCarsList(filters) {
    this.setState({ isLoaded: false });

    this.fetchCars(filters).then(data => {
      this.setState({
        carsList: data,
        isLoaded: true
      });
    });
  }

  /*
   * Fetch API to get cars
   */
  fetchCars(filters) {
    let url = '/cars.json';

    /*
     * Build query with filters
     */
    if (filters) {
      url = `${url}${this.getQueryString(filters)}`;
    }

    return fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        return err;
      });
  }

  /*
   * Build each item in list
   * Return CarCardView component - It displays a car resume
   */
  renderCarsList() {
    return this.state.carsList.map(car => (
      <CarCardView key={car.id} carData={car} />
    ));
  }

  /*
   * Formatted queries to fetch with filters
   */
  getQueryString(filters) {
    let index = 0;
    let queries = '';

    for (let filter in filters) {
      if (filters[filter].value) {
        queries = `${queries}${index ? '&' : '?'}${filters[filter].name}=${
          filters[filter].value
        }`;
      }

      index++;
    }

    return queries;
  }

  render() {
    return (
      <div class="list-view">
        <FilterView
          filters={LIST_FILTERS}
          callback={data => this.setCarsList(data)}
        />

        <div class="wrapper list-view__container">
          <div class="list-view__header">
            We have found{' '}
            <span>
              {this.state.carsList.length}{' '}
              {this.state.carsList.length > 1 ? 'results' : 'result'}
            </span>{' '}
            for your next trip.
          </div>

          <div class="list-view__content df">{this.renderCarsList()}</div>
        </div>

        {!this.state.isLoaded && <LoaderUi />}
      </div>
    );
  }
}

export default ListView;
