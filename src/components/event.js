import {getTitleByType} from "../util.js";
import AbstractComponent from "./abstract-component.js";

const getOffers = (arr) => {
  const activeOffers = arr.filter((it) => it.active).slice(0, 3);

  return activeOffers.map((it) => {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${it.text}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
      </li>`
    );
  }).join(`\n`);
};

export const createEventElement = (data) => {
  let {type, place, offers, startTime, endTime, price} = data;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type" id="${type}">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title" id="${place}">${getTitleByType(type, place)}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
          </p>
          <p class="event__duration">30M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${getOffers(offers)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Event extends AbstractComponent {
  constructor(data) {
    super();

    this._data = data;
  }

  getTemplate() {
    return createEventElement(this._data);
  }
}
