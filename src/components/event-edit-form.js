import {getTitleByType, stringifyTime, stringifyDate, getRandomInt} from "../utils/util.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {CITIES, PICTURE, getTripInfo, EditFormMode, getOffers} from "../const.js";
// import {getDestinations} from "../mock/destination.js";
import AbstractSmartComponent from "./abstract-smart-component.js";
import DescriptionComponent from "./description.js";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const checkDestinationHandler = (evt) => {

  const target = evt.target;
  const datalist = document.querySelector(`#destination-list-1`);

  const options = Array.from(datalist.children).map((it) => it.value);

  if (!options.includes(target.value)) {
    target.setCustomValidity(`Please, choose the destination place from the list`);
  } else {
    target.setCustomValidity(``);
  }
};

const checkPrice = (evt) => {

  const target = evt.target;
  const value = Number(target.value);

  if (isNaN(value)) {
    target.setCustomValidity(`Please, write the price using digits.`);
  } else {
    target.setCustomValidity(``);
  }
};

const getOffersArray = (formData) => {
  const offers = getOffers();
  const activeOffers = Array.from(formData.keys()).filter((it) => it.startsWith(`event-offer-`));
  offers.forEach((offer) => {
    const isActive = activeOffers.includes(`event-offer-${offer.name}`);
    if (isActive) {
      offer.active = true;
    } else {
      offer.active = false;
    }
  });
  return offers;
};

const parseFormData = (formData, id) => {
  return {
    id,
    type: formData.get(`event-type`),
    place: formData.get(`event-destination`),
    price: formData.get(`event-price`),
    offers: getOffersArray(formData),
    startTime: new Date(formData.get(`event-start-time`)),
    endTime: new Date(formData.get(`event-end-time`)),
    isFavorite: formData.get(`event-isFavorite`),
  };
};

const getPlacesList = () => {
  const places = []; // FIX
  return places.reduce((acc, it) => {
    acc += `<option value="${it}"></option>`;
    return acc;
  }, ``);
};

const createEventDetails = (offers) => {
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

const buttonFavoriteTemplate = (isFavorite) => {
  return (
    `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
    <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
      </svg>
    </label>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Close event</span>
    </button>`
  );
};

const createEventFormElement = (mode, {type, place, price, offers, startTime, endTime, isFavorite, id}) => {
  if (!id) {
    id = Math.floor(Math.random() * 999999);
  }
  return (
    `${mode === EditFormMode.EDIT ? `<li class="trip-events__item">` : ``}<form class="trip-events__item  event  event--edit" action="#" method="post" id="${id}">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type === `taxi` ? `checked` : ``}>
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${type === `bus` ? `checked` : ``}>
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${type === `train` ? `checked` : ``}>
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${type === `ship` ? `checked` : ``}>
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport" ${type === `transport` ? `checked` : ``}>
              <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${type === `drive` ? `checked` : ``}>
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${type === `flight` ? `checked` : ``}>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${type === `check-in` ? `checked` : ``}>
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing"  ${type === `sightseeing` ? `checked` : ``}>
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant"  ${type === `restaurant` ? `checked` : ``}>
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${mode === EditFormMode.EDIT ? `Flight to` : getTitleByType(type, (mode !== EditFormMode.EDIT ? `` : place))}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${mode === EditFormMode.EDIT ? place : ``}" list="destination-list-1" required>
        <datalist id="destination-list-1">
          ${getPlacesList()}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${stringifyDate(startTime, `/`)} ${stringifyTime(startTime)}">
        —
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${stringifyDate(endTime, `/`)} ${stringifyTime(endTime)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          €
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price ? price : ``}" required>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${mode === EditFormMode.EDIT ? `Delete` : `Cancel`}</button>
      ${mode === EditFormMode.EDIT ? buttonFavoriteTemplate(isFavorite) : ``}
    </header>
    ${mode === EditFormMode.FIRST ? `` : createEventDetails(offers)}
    ${mode === EditFormMode.EDIT ? `</li>` : ``}`
  );
};

export default class EventEditForm extends AbstractSmartComponent {
  constructor(mode, data, destinationsModel, offersModel) {
    super();

    this._data = data;
    this._mode = mode;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._flatpickrStart = null;
    this._flatpickrEnd = null;

    this._descriptionComponent = null;

    this._submitHandler = null;
    this._deleteHandler = null;
    this._addFavoriteHandler = null;
    this._closeHandler = null;
    this._typeChangeHandler = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEventFormElement(this._mode, this._data);
  }

  setCloseHandler(handler) {
    if (handler) {
      this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
      this._closeHandler = handler;
    }
  }

  setSubmitHandler(handler) {
    if (this.getElement().querySelector(`form`)) {
      this.getElement().querySelector(`form`).addEventListener(`submit`, handler);
    } else {
      this.getElement().addEventListener(`submit`, handler);
    }

    this._submitHandler = handler;
  }

  setDeleteHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);
    this._deleteHandler = handler;
  }

  setAddFavoriteHandler(handler) {
    if (handler) {
      this.getElement().querySelector(`#event-favorite-1`).addEventListener(`click`, handler);
      this._addFavoriteHandler = handler;
    }
  }

  setChangeTypeHandler(handler) {
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, handler);
    this._typeChangeHandler = handler;
  }

  setEditFormHandlers(closeHandler, saveHandler, deleteHandler, favoriteHandler, typeHandler) {
    this.setCloseHandler(closeHandler);
    this.setSubmitHandler(saveHandler);
    this.setDeleteHandler(deleteHandler);
    this.setAddFavoriteHandler(favoriteHandler);
    this.setChangeTypeHandler(typeHandler);
  }

  _setValidationHandlers(placeInputHandler, priceInputHandler) {
    const placeInputElement = this.getElement().querySelector(`#event-destination-1`);
    placeInputElement.addEventListener(`input`, placeInputHandler);

    const priceInputElement = this.getElement().querySelector(`#event-price-1`);
    priceInputElement.addEventListener(`input`, priceInputHandler);
  }

  recoveryListeners() {
    this.setEditFormHandlers(
        this._closeHandler,
        this._submitHandler,
        this._deleteHandler,
        this._addFavoriteHandler,
        this._typeChangeHandler
    );
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();

    if (this._descriptionComponent) {
      render(this.getElement().querySelector(`.event__details`), this._descriptionComponent, RenderPosition.BEFOREEND);
    }
  }

  removeElement() {
    if (this._flatpickr) {
      this._flatpickrStart.destroy();
      this._flatpickrStart = null;
      this._flatpickrEnd.destroy();
      this._flatpickrEnd = null;
    }

    super.removeElement();
  }

  getData() {
    const form = this.getElement().querySelector(`form`) ? this.getElement().querySelector(`form`) : this.getElement();
    const formData = new FormData(form);

    return parseFormData(formData, form.id);
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`).addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `INPUT`) {
        this._data.type = evt.target.value;

        this.rerender();
      }
    });

    this._setValidationHandlers(checkDestinationHandler, checkPrice);

    element.querySelector(`#event-destination-1`).addEventListener(`input`, (evt) => {
      if (this._descriptionComponent) {
        remove(this._descriptionComponent);
      }

      const place = evt.target.value;

      if (this._destinationsModel.includesPlace(place)) {
        const {description, pictures} = this._destinationsModel.getInfo(place);

        this._descriptionComponent = new DescriptionComponent(description, pictures);

        render(element.querySelector(`.event__details`), this._descriptionComponent, RenderPosition.BEFOREEND);
      }
    });
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    const startTimeInputElement = this.getElement().querySelector(`#event-start-time-1`);
    const endTimeInputElement = this.getElement().querySelector(`#event-end-time-1`);

    this._flatpickrStart = flatpickr(startTimeInputElement, {
      altInput: true,
      allowInput: true,
      enableTime: true,
      altFormat: `d/m/Y H:i`,
      defaultDate: this._data.startTime || `today`,
    });

    this._flatpickrEnd = flatpickr(endTimeInputElement, {
      altInput: true,
      allowInput: true,
      enableTime: true,
      altFormat: `d/m/Y H:i`,
      defaultDate: this._data.endTime || `today`,
    });
  }
}


