import {getEventObjects} from "./mock/event.js";
import {createTripInfoElement} from "./components/trip-info.js";
import {createMenuElement} from "./components/menu.js";
import {createFilterElement} from "./components/filter.js";
import {createSortingElement} from "./components/sorting.js";
import {createDaysListElement} from "./components/day-list.js";
import {createDayElement} from "./components/day.js";
import {createEventElement} from "./components/event.js";
import {createEventEditFormElement} from "./components/event-edit-form.js";

const events = getEventObjects(20);

const render = (container, component, place = `beforeend`) => {
  container.insertAdjacentHTML(place, component);
};

const renderTripEvents = (arr) => {
  render(tripEventsElement, createDaysListElement());
  const daysListElement = tripEventsElement.querySelector(`.trip-days`);

  render(daysListElement, createDayElement());
  const eventListElement = daysListElement.querySelector(`.trip-events__list`);

  for (let event of arr) {
    render(eventListElement, createEventElement(event));
  }
};

const headerMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = headerMainElement.querySelector(`.trip-controls`);
const menuHeaderElement = tripControlsElement.querySelector(`h2`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(headerMainElement, createTripInfoElement(), `afterbegin`);
render(menuHeaderElement, createMenuElement(), `afterend`);
render(tripControlsElement, createFilterElement());
render(tripEventsElement, createSortingElement());
renderTripEvents(events);
const eventListElement = document.querySelector(`.trip-events__list`);
render(eventListElement, createEventEditFormElement(), `afterbegin`);
