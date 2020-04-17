import {getTitleByType} from "./event.js";

const createFavoriteElement = () => {
  return (
    `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked="">
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
        </svg>
      </label>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`
  );
};

const createPicElements = (src, imgAmount) => {
  let pics = ``;

  for (let i = 0; i < imgAmount; i++) {
    pics += `<img class="event__photo" src="${src}${Math.random()}" alt="Event photo">\n`;
  }

  return pics;
};

export const createDescriptionElement = (info, src, imgAmount) => {
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${info}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${createPicElements(src, imgAmount)}
        </div>
      </div>
    </section>`
  );
};

const createEventDetails = (mode, offers) => {
  if (offers === undefined) {
    offers = [
      {name: `luggage`, active: true, text: `Add luggage`, price: 30},
      {name: `comfort`, active: true, text: `Switch to comfort class`, price: 100},
      {name: `meal`, active: false, text: `Add meal`, price: 15},
      {name: `seats`, active: false, text: `Choose seats`, price: 5},
      {name: `train`, active: false, text: `Travel by train`, price: 40},
      {name: `uber`, active: false, text: `Order Uber`, price: 20},
    ];
  }

  const activeOffers = offers.reduce((total, offer) => {
    total += `<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.name}-1" type="checkbox" name="event-offer-${offer.name}" ${offer.active ? `checked` : ``}>
                <label class="event__offer-label" for="event-offer-${offer.name}-1">
                  <span class="event__offer-title">${offer.text}</span>
                  +
                  €&nbsp;<span class="event__offer-price">${offer.price}</span>
                </label>
              </div>`;
    return total;
  }, ``);

  return (
    `<section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${activeOffers}
        </div>
      </section>

    </section>
  </form>`
  );
};

export const createEventFormElement = (mode, object) => {
  const eventObject = {
    type: object.type !== undefined ? object.type : `flight`,
    place: object.place,
    price: object.price,
    offers: object.offers,
  };
  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post" id="${mode}">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${eventObject.type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${eventObject.type === `taxi` ? `checked` : ``}>
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${eventObject.type === `bus` ? `checked` : ``}>
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${eventObject.type === `train` ? `checked` : ``}>
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${eventObject.type === `ship` ? `checked` : ``}>
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport" ${eventObject.type === `transport` ? `checked` : ``}>
              <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${eventObject.type === `drive` ? `checked` : ``}>
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${eventObject.type === `flight` ? `checked` : ``}>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${eventObject.type === `check-in` ? `checked` : ``}>
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing"  ${eventObject.type === `sightseeing` ? `checked` : ``}>
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant"  ${eventObject.type === `restaurant` ? `checked` : ``}>
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${eventObject.type ? getTitleByType(eventObject.type, ``) : `Flight to`}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${mode === `create` ? `` : eventObject.place}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
          <option value="Saint Petersburg"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 00:00">
        —
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 00:00">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          €
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${eventObject.price ? eventObject.price : ``}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${mode === `edit` ? `Delete` : `Cancel`}</button>
      ${mode === `edit` ? createFavoriteElement() : ``}
    </header>
    ${mode === `first` ? `` : createEventDetails(mode, eventObject.offers)}`
  );
};

export const createNoPointsText = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};


export const createListItemForFormElement = (mode, currentData) => {
  debugger
  return (
    `<li class="trip-events__item">${createEventFormElement(mode, currentData)}</li>`
  );
};
