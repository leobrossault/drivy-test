/* @jsx h */
import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

import decimalCount from '../../helpers/decimalCount';

/*
 * Attribute prop from the store
 */
const mapStateToProps = state => {
  return { filters: state.filters };
};

class CarCardView extends Component {
  constructor() {
    super();
  }

  /*
   * Calculate rental price
   */
  getRentalPrice() {
    /*
     * Calculate distance price : distance * pricePerKm
     */
    const distancePrice = this.props.filters.distance
      ? this.props.filters.distance.value * this.props.carData.pricePerKm
      : this.props.carData.pricePerKm;

    /*
     * Calculate time price : duration * pricePerDay
     */
    const timePrice = this.props.filters.duration
      ? this.props.filters.duration.value * this.props.carData.pricePerDay
      : this.props.carData.pricePerDay;

    /*
     * Sum distance price and time price for the total
     */
    const totalPice = (distancePrice + timePrice) / 100;

    /*
     * Check decimal count to beautify the render
     */
    return decimalCount(totalPice) > 0
      ? parseFloat(totalPice).toFixed(1)
      : totalPice;
  }

  render() {
    return (
      <div className="car-card-view">
        <img src={this.props.carData.picturePath} alt="" />

        <div className="car-card-view__infos">
          <p className="car-card-view__infos__title">
            {this.props.carData.brand} {this.props.carData.model}
          </p>

          <div class="car-card-view__infos__price">
            <span>{this.getRentalPrice()}</span>
            <span>€</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CarCardView);
