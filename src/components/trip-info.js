import AbstractSmartComponent from "./abstract-smart-component.js";

const stringifyDates = (dates) => {
  console.log(dates);
  return `Mar 18&nbsp;&mdash;&nbsp;20`;
};

const stringifyPlaces = (places) => {
  return `Amsterdam &mdash; Chamonix &mdash; Geneva`;
};

const createTripInfoElement = (price, dates, places) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${stringifyPlaces(places)}</h1>

        <p class="trip-info__dates">${stringifyDates(dates)}</p>
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
