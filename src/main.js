import {getEventObjects} from "./mock/event.js";
import {createTripInfoElement} from "./components/trip-info.js";
import {createMenuElement} from "./components/menu.js";
import {createFilterElement} from "./components/filter.js";
import {createSortingElement} from "./components/sorting.js";
import {createDaysListElement} from "./components/day-list.js";
import {createDayElement} from "./components/day.js";
import {createEventElement, getTitleByType} from "./components/event.js";
import {createEventFormElement, createNoPointsText, createDescriptionElement, createListItemForFormElement} from "./components/event-edit-form.js";
import {getInfo, CITIES, PICTURE} from "./const.js";
import {addEventListenerBySelector, removeEventListenerBySelector, getRandomInt, findEventObject} from "./util.js";

const events = getEventObjects(20);

let compareEventObject = {
  object: {},
  index: -1,
};

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

  arr.forEach((event) => {
    render(lastEventListElement, createEventElement(event));
    addEventListenerBySelector(`.event__rollup-btn`, openEditFormHandler);
  });
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

const getOffersArray = (dataObj, newObj) => {
  const filteredKeys = filterOffers(dataObj);

  newObj.offers.forEach((offer) => {
    if (filteredKeys.includes(offer.name)) {
      offer.active = true;
    } else {
      offer.active = false;
    }
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
    offers: [
      {name: `luggage`, active: true, text: `Add luggage`, price: 30},
      {name: `comfort`, active: true, text: `Switch to comfort class`, price: 100},
      {name: `meal`, active: false, text: `Add meal`, price: 15},
      {name: `seats`, active: false, text: `Choose seats`, price: 5},
      {name: `train`, active: false, text: `Travel by train`, price: 40},
      {name: `uber`, active: false, text: `Order Uber`, price: 20},
    ],
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

const saveEditedEventHandler = (evt) => {
  evt.preventDefault();

  const {formData, newEventObject} = createDataObject(evt.target);

  getOffersArray(formData, newEventObject);

  const {index} = findEventObject(compareEventObject.object, events);

  events.splice(index, 1, newEventObject);

  let hiddenEvent = document.querySelector(`#hidden-event`);
  hiddenEvent.remove();

  renderTripEvents([newEventObject]);

  let formElement = document.querySelector(`.event--edit`).closest(`li`);
  formElement.remove();

};

const changeTypeIconHandler = (evt) => {
  if (evt.target.tagName === `INPUT`) {
    const typeIcon = document.querySelector(`.event__type-btn`).querySelector(`img`);
    typeIcon.src = `img/icons/${evt.target.value}.png`;
    document.querySelector(`.event__type-output`).textContent = getTitleByType(evt.target.value, ``);
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
  closeIfExistEditFormElement();

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

const closeIfExistEditFormElement = () => {
  let formElement = document.querySelector(`.event--edit`);
  if (!formElement) {
    return undefined;
  } else if (formElement.id === `create`) {
    formElement.remove();

    newEventButtonElement.disabled = false;
    newEventButtonElement.addEventListener(`click`, addNewEventHandler);
    document.removeEventListener(`keydown`, closeFormOnEscHandler);
  } else if (formElement.id === `edit`) {
    formElement.remove();
    const hiddenEvent = document.querySelector(`#hidden-event`);
    hiddenEvent.style = ``;
    hiddenEvent.id = ``;
    addEventListenerBySelector(`.event__rollup-btn`, openEditFormHandler, `click`, hiddenEvent); // или просто оставить? (начало вопроса на строке 183)
  }

  return undefined; // как сделать так, чтобы не возвращать undefined?
};

const addFirstEventHandler = () => {
  render(tripEventsElement, createEventFormElement(`first`), `afterbegin`);
  newEventButtonElement.disabled = true;
  addEventListenerBySelector(`.event--edit`, saveEventHandler, `submit`);
  addEventListenerBySelector(`.event__reset-btn`, closeFormHandler);
};

const findDataObjectFromListItem = (listItem) => {
  const formData = {
    type: listItem.querySelector(`.event__type`).id,
    place: listItem.querySelector(`.event__title`).id,
    price: listItem.querySelector(`.event__price-value`).textContent,
  };
  return findEventObject(formData, events);
};

const openEditFormHandler = (evt) => {
  closeIfExistEditFormElement();

  const parentListItemElement = evt.target.closest(`li`);

  const {foundedEvent, index} = findDataObjectFromListItem(parentListItemElement);

  compareEventObject = {
    object: foundedEvent,
    index
  };

  parentListItemElement.style = `display: none;`;
  parentListItemElement.id = `hidden-event`;
  removeEventListenerBySelector(`.event__rollup-btn`, openEditFormHandler, `click`, parentListItemElement); // удалять ли здесь этот обработчки, чтобы потом опять добавлять его на строке 146?
  render(parentListItemElement, createListItemForFormElement(`edit`, foundedEvent), `afterend`);
  addEventListenerBySelector(`.event--edit`, saveEditedEventHandler, `submit`);
  addEventListenerBySelector(`.event__reset-btn`, closeFormHandler);
  addEventListenerBySelector(`.event__type-list`, changeTypeIconHandler);

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
