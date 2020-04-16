import {getEventObjects} from "./mock/event.js";
import {createTripInfoElement} from "./components/trip-info.js";
import {createMenuElement} from "./components/menu.js";
import {createFilterElement} from "./components/filter.js";
import {createSortingElement} from "./components/sorting.js";
import {createDaysListElement} from "./components/day-list.js";
import {createDayElement} from "./components/day.js";
import {createEventElement} from "./components/event.js";
import {createEventFormElement, createNoPointsText, createDescriptionElement, createListItemForFormElement} from "./components/event-edit-form.js";
import {getOffers, getInfo, CITIES, PICTURE} from "./const.js";
import {addEventListenerBySelector, removeEventListenerBySelector, getRandomInt} from "./util.js";

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

const filterOffers = (dataObj) => Object.keys(dataObj).filter((it) => it.startsWith(`event-offer`)).map((it) => it.slice(12)); // the '12' is the length of `event-offer`

const pushOffer = (eventObject, offer) => {
  offer.active = true;
  eventObject.offers.push(offer);
};

const getOffersArray = (dataObj, newObj) => {
  const filteredKeys = filterOffers(dataObj);

  filteredKeys.forEach((key) => {
    let offers = getOffers();
    offers.forEach((it) => it.name.includes(key) ? pushOffer(newObj, it) : undefined);
  });
};

const createDataObject = (formElement) => {
  const formData = Object.fromEntries(new FormData(formElement).entries());

  const newEventObject = {
    type: formData[`event-type`],
    place: formData[`event-destination`],
    startTime: formData[`event-start-time`],
    endTime: formData[`event-end-time`],
    price: formData[`event-price`],
    favorite: formData[`event-favorite`],
    offers: [],
  };

  return {formData, newEventObject};
};

const saveEventHandler = (evt) => {
  evt.preventDefault();

  const {formData, newEventObject} = createDataObject(evt.target);

  getOffersArray(formData, newEventObject);

  renderTripEvents([newEventObject]);

  closeFormHandler();
};

const changeTypeIconHandler = (evt) => {
  if (evt.target.tagName === `INPUT`) {
    const typeIcon = document.querySelector(`.event__type-btn`).querySelector(`img`);
    typeIcon.src = `img/icons/${evt.target.value}.png`;
  }
};

const getInfoHandler = (evt) => {
  const eventDescriptionElement = document.querySelector(`.event__section--destination`);
  if (eventDescriptionElement) {
    eventDescriptionElement.remove();
  }

  if (CITIES.includes(evt.target.value)) {
    const eventFormElement = document.querySelector(`.event--edit`);
    render(eventFormElement, createDescriptionElement(getInfo(), PICTURE, getRandomInt(5))); // 5 is a max amount of pictures
  }
};

const addNewEventHandler = () => {
  const sortingFormElement = document.querySelector(`.trip-sort`);
  render(sortingFormElement, createEventFormElement(`create`, {}), `afterend`);
  document.addEventListener(`keydown`, closeFormOnEscHandler);

  addEventListenerBySelector(`.event--edit`, saveEventHandler, `submit`);
  addEventListenerBySelector(`.event__reset-btn`, closeFormHandler);
  addEventListenerBySelector(`.event__type-list`, changeTypeIconHandler);
  addEventListenerBySelector(`.event__input--destination`, getInfoHandler, `change`);
  //  reset filters - everything
  //  reset sorting - default
  newEventButtonElement.removeEventListener(`click`, addNewEventHandler);
  newEventButtonElement.disabled = `true`;
};

const closeIfExistEditFormElement = (evt) => {
  let formElement = document.querySelector(`.event--edit`);
  if (!formElement) {
    return undefined;
  } else if (formElement.id === `create`) {
    formElement.remove();

    newEventButtonElement.disabled = false;
    newEventButtonElement.addEventListener(`click`, addNewEventHandler);
    document.removeEventListener(`keydown`, closeFormOnEscHandler);
  } else if (formElement.id === `edit`) {
    console.log(evt);

  }
};

const addFirstEventHandler = () => {
  render(tripEventsElement, createEventFormElement(`first`), `afterbegin`);
  newEventButtonElement.disabled = true;
  addEventListenerBySelector(`.event--edit`, saveEventHandler, `submit`);
  addEventListenerBySelector(`.event__reset-btn`, closeFormHandler);
};

const closeEditFormHandler = (evt) => {
  let parentListItem = evt.target.closest(`li`);
  console.log(evt);


};

const findDataObjectFromListItem = (listItem) => {
  return {
    type: listItem.querySelector(`.event__type`).id,
    place: listItem.querySelector(`.event__title`).id,
    price: listItem.querySelector(`.event__price-value`).textContent,
  };
};

const openEditFormHandler = (evt) => {
  closeIfExistEditFormElement(evt);

  const parentListItemElement = evt.target.closest(`li`);

  const formDataObject = findDataObjectFromListItem(parentListItemElement);
  console.log(formDataObject);

  parentListItemElement.style = `display: none;`;
  removeEventListenerBySelector(`.event__rollup-btn`, openEditFormHandler, `click`, parentListItemElement); // do we need to delete this handler??
  render(parentListItemElement, createListItemForFormElement(`edit`, formDataObject), `afterend`);
  addEventListenerBySelector(`.event__rollup-btn`, closeEditFormHandler, `click`, parentListItemElement);


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
  addEventListenerBySelector(`.event__rollup-btn`, openEditFormHandler);
}
