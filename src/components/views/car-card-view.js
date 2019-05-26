/* @jsx h */
import { h } from 'preact';

function CarCardView(props) {
  return (
    <div class="car-card-view">
      <img src={props.carData.picturePath} alt="" />

      <div class="car-card-view__infos">
        <p class="car-card-view__infos__title">
          {props.carData.brand} {props.carData.model}
        </p>
      </div>
    </div>
  );
}

export default CarCardView;
