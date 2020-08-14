import AbstractSmartComponent from "./abstract-smart-component.js";
import {stringifyTripDuration, stringifyPlaces} from "../utils/util.js";

const createTripInfoElement = (price, dates, places) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${stringifyPlaces(places)}</h1>

        <p class="trip-info__dates">${stringifyTripDuration(dates)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
      </p>
    </section>`
  );
};

export default class TripInfo extends AbstractSmartComponent {
  constructor() {
    super();

    this._totalPrice = 0;
    this._dates = [];
    this._places = [];
  }

  getTemplate() {
    return createTripInfoElement(this._totalPrice, this._dates, this._places);
  }

  setData(totalPrice, dates, places) {
    this._totalPrice = totalPrice;
    this._dates = dates;
    this._places = places;
  }

  recoveryListeners() {
  }
}
