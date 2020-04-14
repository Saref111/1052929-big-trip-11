import {getEventObjects} from "./mock/event.js";
import {createTripInfoElement} from "./components/trip-info.js";
import {createMenuElement} from "./components/menu.js";
import {createFilterElement} from "./components/filter.js";
import {createSortingElement} from "./components/sorting.js";
import {createDaysListElement} from "./components/day-list.js";
import {createDayElement} from "./components/day.js";
import {createEventElement} from "./components/event.js";
import {createEventFormElement, createNoPointsText} from "./components/event-edit-form.js";
import {getOffers} from "./const.js";
import {addHandlerBySelector, removeHandlerBySelector} from "./util.js";

const events = getEventObjects(20);

const render = (container, component, place = `beforeend`) => {
  container.insertAdjacentHTML(place, component);
};

const renderTripEvents = (arr) => {
  let daysListElement = tripEventsElement.querySelector(`.trip-days`);

  if (!daysListElement) {
    document.querySelector(`.trip-events__msg`).remove();

    render(tripEventsElement, createSortingElement());
    render(tripEventsElement, createDaysListElement());

    daysListElement = tripEventsElement.querySelector(`.trip-days`);
    newEventButtonElement.removeEventListener(`click`, addFirstEventHandler);
  }

  render(daysListElement, createDayElement());
  const eventListElements = daysListElement.querySelectorAll(`.trip-events__list`);
  const lastEventListElement = eventListElements[eventListElements.length - 1]; // temporary. need to find the day element

  arr.forEach((event) => render(lastEventListElement, createEventElement(event)));
};

const closeFormHandler = () => {
  const form = document.querySelector(`.trip-events__item`);
  form.remove();
  newEventButtonElement.disabled = false;
  newEventButtonElement.addEventListener(`click`, addNewEventHandler);
  document.removeEventListener(`keydown`, closeFormOnEscHandler);
};

const closeFormOnEscHandler = (evt) => {
  if (evt.key === `Escape`) {
    closeFormHandler();
  }
};

const pushOffer = (eventObject, offer) => {
  offer.active = true;
  eventObject.offers.push(offer);
};

const getOffersArray = (dataObj, newObj) => {
  const keys = Object.keys(dataObj);
  const filteredKeys = keys.filter((it) => it.startsWith(`event-offer`)).map((it) => it.slice(12));

  filteredKeys.forEach((key) => {
    let offers = getOffers();
    offers.forEach((it) => it.name.includes(key) ? pushOffer(newObj, it) : undefined);
  });
};

const saveEventHandler = (evt) => {
  evt.preventDefault();

  const formData = Object.fromEntries(new FormData(evt.target).entries());

  const newEventObject = {
    type: formData[`event-type`],
    place: formData[`event-destination`],
    startTime: formData[`event-start-time`],
    endTime: formData[`event-end-time`],
    price: formData[`event-price`],
    favorite: formData[`event-favorite`],
    offers: [],
  };

  getOffersArray(formData, newEventObject);

  renderTripEvents([newEventObject]);

  closeFormHandler();
};

const addNewEventHandler = () => {
  // if (editForm) editForm.close()
  const sortingFormElement = document.querySelector(`.trip-sort`);
  render(sortingFormElement, createEventFormElement(`create`), `afterend`);
  document.addEventListener(`keydown`, closeFormOnEscHandler);

  addHandlerBySelector(`.event`, saveEventHandler, `submit`);
  addHandlerBySelector(`.event__reset-btn`, closeFormHandler);
  //  reset filters - everything
  //  reset sorting - default
  newEventButtonElement.removeEventListener(`click`, addNewEventHandler);
  newEventButtonElement.disabled = `true`;
};

const addFirstEventHandler = () => {
  render(tripEventsElement, createEventFormElement(`first`), `afterbegin`);
  newEventButtonElement.disabled = true;
  addHandlerBySelector(`.event`, saveEventHandler, `submit`);
  addHandlerBySelector(`.event__reset-btn`, closeFormHandler);
};

const headerMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = headerMainElement.querySelector(`.trip-controls`);
const menuHeaderElement = tripControlsElement.querySelector(`h2`);
const tripEventsElement = document.querySelector(`.trip-events`);
const newEventButtonElement = headerMainElement.querySelector(`.btn`);

render(headerMainElement, createTripInfoElement(), `afterbegin`);
render(menuHeaderElement, createMenuElement(), `afterend`);
render(tripControlsElement, createFilterElement());

if (!events) {
  render(tripEventsElement, createNoPointsText());
  newEventButtonElement.addEventListener(`click`, addFirstEventHandler);

} else {
  render(tripEventsElement, createSortingElement());
  render(tripEventsElement, createDaysListElement());
  renderTripEvents(events);
  newEventButtonElement.addEventListener(`click`, addNewEventHandler);
}
