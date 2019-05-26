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

/*
 * Percentages values according to the duration
 */
const PERCENTAGES_VALUES = {
  1: 10,
  4: 30,
  10: 50
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
    const totalPrice = (distancePrice + timePrice) / 100;

    /*
     * Return the total price, with degressive price according to the duration
     */
    const degressivePrice = this.props.filters.duration
      ? this.getDegressivePrice(this.props.filters.duration.value, totalPrice)
      : totalPrice;

    /*
     * Check decimal count to beautify the render
     */
    return decimalCount(degressivePrice) > 0
      ? parseFloat(degressivePrice).toFixed(1)
      : degressivePrice;
  }

  /*
   * Calculate degressivity on the price
   */
  getDegressivePrice(duration, price) {
    let percentage = 0;

    for (let durationStep in PERCENTAGES_VALUES) {
      if (parseInt(durationStep) < duration) {
        percentage = PERCENTAGES_VALUES[durationStep];
      }
    }

    return percentage ? price : price - price * (percentage / 100);
  }

  /*
   * Calculate total price per day
   */
  getTotalPricePerDay(totalPrice, duration) {
    if (!duration) {
      return totalPrice;
    }

    const totalPricePerDay = totalPrice / duration.value;

    return decimalCount(totalPricePerDay) > 0
      ? parseFloat(totalPricePerDay).toFixed(1)
      : totalPricePerDay;
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
            <div class="car-card-view__infos__price--day">
              <div>
                {/* Price  per day */}
                <span>
                  {this.getTotalPricePerDay(
                    this.getRentalPrice(),
                    this.props.filters.duration
                  )}
                </span>
                <span>€</span>
              </div>

              <p>/day</p>
            </div>

            {/* Total price */}
            <div class="car-card-view__infos__price--total">
              total : {this.getRentalPrice()}€
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CarCardView);
