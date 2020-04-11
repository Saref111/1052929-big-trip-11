import {getEventObjects} from "./mock/event.js";
import {createTripInfoElement} from "./components/trip-info.js";
import {createMenuElement} from "./components/menu.js";
import {createFilterElement} from "./components/filter.js";
import {createSortingElement} from "./components/sorting.js";
import {createDaysListElement} from "./components/day-list.js";
import {createDayElement} from "./components/day.js";
import {createEventElement} from "./components/event.js";
import {createEventEditFormElement} from "./components/event-edit-form.js";
import {getOffers} from "./const.js";
const events = getEventObjects(20);

const render = (container, component, place = `beforeend`) => {
  container.insertAdjacentHTML(place, component);
};

const renderTripEvents = (arr) => {
  const daysListElement = tripEventsElement.querySelector(`.trip-days`);

  render(daysListElement, createDayElement());
  const eventListElements = daysListElement.querySelectorAll(`.trip-events__list`);
  const lastEventListElement = eventListElements[eventListElements.length - 1]; // temporary

  for (let event of arr) {
    render(lastEventListElement, createEventElement(event));
  }
};

const closeFormHandler = (evt) => {
  if (evt.key === `Escape`) {
    const form = document.querySelector(`.trip-events__item`);
    form.remove();
    newEventButtonElement.disabled = false;
    newEventButtonElement.addEventListener(`click`, addNewEventHandler);
    document.removeEventListener(`keydown`, closeFormHandler);
  }
};

const getOffersArray = (dataObj, newObj) => {
  const keys = Object.keys(dataObj);
  const filteredKeys = keys.filter((it) => it.startsWith(`event-offer`)).map((it) => it.slice(12));

  for (const key of filteredKeys) {
    let offers = getOffers();
    offers.forEach((it) => {
      if (it.name === key) {
        it.active = true;
        newObj.offers.push(it);
      }
    });
  }

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
};

const addNewEventHandler = () => {
  // if (editForm) editForm.close()
  const eventListElement = document.querySelector(`.trip-events__list`);

  render(eventListElement, createEventEditFormElement(), `afterbegin`);
  document.addEventListener(`keydown`, closeFormHandler);

  const formElement = document.querySelector(`.event`);
  formElement.addEventListener(`submit`, saveEventHandler);
  //  reset filters - everything
  //  reset sorting - default
  newEventButtonElement.removeEventListener(`click`, addNewEventHandler);
  newEventButtonElement.disabled = `true`;
};

const headerMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = headerMainElement.querySelector(`.trip-controls`);
const menuHeaderElement = tripControlsElement.querySelector(`h2`);
const tripEventsElement = document.querySelector(`.trip-events`);
const newEventButtonElement = headerMainElement.querySelector(`.btn`);

render(headerMainElement, createTripInfoElement(), `afterbegin`);
render(menuHeaderElement, createMenuElement(), `afterend`);
render(tripControlsElement, createFilterElement());
render(tripEventsElement, createSortingElement());
render(tripEventsElement, createDaysListElement());
renderTripEvents(events);
newEventButtonElement.addEventListener(`click`, addNewEventHandler);

