import {getEventObjects} from "./mock/event.js";
import TripInfoComponent from "./components/trip-info.js";
import MenuComponent from "./components/menu.js";
import FilterComponent from "./components/filter.js";
import SortComponent from "./components/sort.js";
import DescriptionComponent from "./components/description.js";
import DaysListComponent from "./components/day-list.js";
import DayComponent from "./components/day.js";
import EventComponent from "./components/event.js";
import EventListItemComponent from "./components/event-list-item.js";
import EventEditFormComponent from "./components/event-edit-form.js";
import NoEventsComponent from "./components/no-events.js";
import {getInfo, CITIES, PICTURE} from "./const.js";
import {
  addEventListenerBySelector,
  removeEventListenerBySelector,
  getRandomInt,
  findEventObject,
  render,
  RenderPosition,
  getTitleByType,
} from "./util.js";

const events = getEventObjects(20);

let compareEventObject = {
  object: {},
  index: -1,
};

const renderTripEvents = (arr) => {
  let daysListElement = tripEventsElement.querySelector(`.trip-days`);

  if (!daysListElement) {
    document.querySelector(`.trip-events__msg`).remove();

    const sortComponent = new SortComponent();
    const daysListComponent = new DaysListComponent();
    render(tripEventsElement, sortComponent.getElement(), RenderPosition.BEFOREEND);
    render(tripEventsElement, daysListComponent.getElement(), RenderPosition.BEFOREEND);

    daysListElement = daysListComponent.getElement();
    newEventButtonElement.removeEventListener(`click`, addFirstEventHandler);
  }

  const dayComponent = new DayComponent();
  render(daysListElement, dayComponent.getElement(), RenderPosition.BEFOREEND);
  const eventListElements = daysListElement.querySelectorAll(`.trip-events__list`);
  const lastEventListElement = eventListElements[eventListElements.length - 1]; // temporary. need to find the day element

  arr.forEach((eventData) => {
    const eventComponent = new EventComponent(eventData);
    render(lastEventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
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

const deleteEditEventHandler = () => {
  const hiddenEvent = document.querySelector(`#hidden-event`);
  hiddenEvent.remove();

  const formElement = document.querySelector(`.event--edit`).closest(`li`);
  formElement.remove();
};

const closeEditFormHandler = () => {
  const formElement = document.querySelector(`.event--edit`).closest(`li`);
  formElement.remove();
  const hiddenEvent = document.querySelector(`#hidden-event`);
  hiddenEvent.style = ``;
  hiddenEvent.id = ``;
};

const saveEditedEventHandler = (evt) => {
  evt.preventDefault();
  const {formData, newEventObject} = createDataObject(evt.target);
  getOffersArray(formData, newEventObject);
  const {index} = findEventObject(compareEventObject.object, events);
  events.splice(index, 1, newEventObject);
  renderTripEvents([newEventObject]);
  deleteEditEventHandler();
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
    const descriptionComponent = new DescriptionComponent(getInfo(), PICTURE, getRandomInt(5));
    render(eventFormElement, descriptionComponent.getElement(), RenderPosition.BEFOREEND);
  }
};

const addNewEventHandler = () => {
  closeIfExistEditFormElement();

  const sortingFormElement = document.querySelector(`.trip-sort`);
  const eventEditFormComponent = new EventEditFormComponent(`create`, undefined);
  render(sortingFormElement, eventEditFormComponent.getElement(), `afterend`);
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

const formHandlers = {
  create: (formElement) => {
    formElement.remove();
    newEventButtonElement.disabled = false;
    newEventButtonElement.addEventListener(`click`, addNewEventHandler);
    document.removeEventListener(`keydown`, closeFormOnEscHandler);
  },
  edit: () => {
    closeEditFormHandler();
  }
};

const closeIfExistEditFormElement = () => {
  const formElement = document.querySelector(`.event--edit`);
  if (!formElement) {
    return;
  }

  const handler = formHandlers[formElement.id];
  if (typeof handler === `function`) {
    handler(formElement);
  }
};

const addFirstEventHandler = () => {
  const firstEventEditFormComponent = new EventEditFormComponent(`first`);
  render(tripEventsElement, firstEventEditFormComponent.getElement(), RenderPosition.AFTERBEGIN);
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

  const eventEditFormComponent = new EventEditFormComponent(`edit`, foundedEvent);
  const listElement = new EventListItemComponent();
  render(listElement.getElement(), eventEditFormComponent.getElement(), RenderPosition.BEFOREEND);

  render(parentListItemElement.nextSibling, listElement.getElement());
  addEventListenerBySelector(`.event--edit`, saveEditedEventHandler, `submit`);
  addEventListenerBySelector(`.event__reset-btn`, deleteEditEventHandler);
  addEventListenerBySelector(`.event__rollup-btn`, closeEditFormHandler, `click`, document.querySelector(`.event--edit`));
  addEventListenerBySelector(`.event__type-list`, changeTypeIconHandler);
};

const headerMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = headerMainElement.querySelector(`.trip-controls`);
const menuHeaderElement = tripControlsElement.querySelector(`h2`);
const tripEventsElement = document.querySelector(`.trip-events`);
const newEventButtonElement = headerMainElement.querySelector(`.btn`);

const tripInfoComponent = new TripInfoComponent();
const menuComponent = new MenuComponent();
const filterComponent = new FilterComponent();

render(headerMainElement, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
render(menuHeaderElement.nextSibling, menuComponent.getElement(), `afterend`);
render(tripControlsElement, filterComponent.getElement(), RenderPosition.BEFOREEND);

if (!events) {
  const noEventsComponent = new NoEventsComponent();
  render(tripEventsElement, noEventsComponent.getElement(), RenderPosition.BEFOREEND);
  newEventButtonElement.addEventListener(`click`, addFirstEventHandler);
} else {
  const sortComponent = new SortComponent();
  const daysListComponent = new DaysListComponent();
  render(tripEventsElement, sortComponent.getElement(), RenderPosition.BEFOREEND);
  render(tripEventsElement, daysListComponent.getElement(), RenderPosition.BEFOREEND);
  renderTripEvents(events);
  newEventButtonElement.addEventListener(`click`, addNewEventHandler);
}
