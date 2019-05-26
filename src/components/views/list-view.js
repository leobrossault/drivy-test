/* @jsx h */
import { h, render, Component } from 'preact';

import CarCardView from './car-card-view';
import LoaderUi from '../ui/loader-ui';

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
    this.fetchCars().then(data => {
      this.setState({
        carsList: data,
        isLoaded: true
      });
    });
  }

  /*
   * Fetch API to get cars
   */
  fetchCars() {
    return fetch('/cars.json')
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

  render() {
    return (
      <div class="wrapper list-view">
        {this.state.isLoaded ? (
          <div>
            <div class="list-view__header">
              We have found <span>{this.state.carsList.length} results</span>{' '}
              for your next trip.
            </div>

            <div class="list-view__content">{this.renderCarsList()}</div>
          </div>
        ) : (
          <LoaderUi />
        )}
      </div>
    );
  }
}

export default ListView;
