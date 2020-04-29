import {getEventObjects} from "./mock/event.js";
import DaysListComponent from "./components/days-list.js";
import TripController from "./controllers/days-list.js";

const events = getEventObjects(20);


// const closeFormHandler = () => {
//   const form = document.querySelector(`.trip-events__item`);
//   form.remove();
//   newEventButtonElement.disabled = false;
//   newEventButtonElement.addEventListener(`click`, addNewEventHandler);
//   document.removeEventListener(`keydown`, closeFormOnEscHandler);
// };

// const closeFormOnEscHandler = (evt) => {
//   if (evt.key === `Escape`) {
//     closeFormHandler();
//   }
// };

// const filterOffers = (dataObj) => Object.keys(dataObj).filter((it) => it.startsWith(`event-offer`)).map((it) => it.slice(12)); // the '12' is the length of `event-offer`

// const getOffersArray = (dataObj, newObj) => {
//   const filteredKeys = filterOffers(dataObj);

//   newObj.offers.forEach((offer) => {
//     if (filteredKeys.includes(offer.name)) {
//       offer.active = true;
//     } else {
//       offer.active = false;
//     }
//   });
// };

// const createDataObject = (formElement) => {
//   const formData = Object.fromEntries(new FormData(formElement).entries());

//   const newEventObject = {
//     type: formData[`event-type`],
//     place: formData[`event-destination`],
//     startTime: formData[`event-start-time`],
//     endTime: formData[`event-end-time`],
//     price: formData[`event-price`],
//     favorite: formData[`event-favorite`],
//     offers: [
//       {name: `luggage`, active: true, text: `Add luggage`, price: 30},
//       {name: `comfort`, active: true, text: `Switch to comfort class`, price: 100},
//       {name: `meal`, active: false, text: `Add meal`, price: 15},
//       {name: `seats`, active: false, text: `Choose seats`, price: 5},
//       {name: `train`, active: false, text: `Travel by train`, price: 40},
//       {name: `uber`, active: false, text: `Order Uber`, price: 20},
//     ],
//   };

//   return {formData, newEventObject};
// };

// const saveEventHandler = (evt) => {
//   evt.preventDefault();

//   const {formData, newEventObject} = createDataObject(evt.target);
//   getOffersArray(formData, newEventObject);
//   renderTripEvents([newEventObject]);

//   closeFormHandler();
// };

// const changeTypeIconHandler = (evt) => {
//   if (evt.target.tagName === `INPUT`) {
//     const typeIcon = document.querySelector(`.event__type-btn`).querySelector(`img`);
//     typeIcon.src = `img/icons/${evt.target.value}.png`;
//     document.querySelector(`.event__type-output`).textContent = getTitleByType(evt.target.value, ``);
//   }
// };

// const getInfoHandler = (evt) => {
//   const eventDescriptionElement = document.querySelector(`.event__section--destination`);
//   if (eventDescriptionElement) {
//     eventDescriptionElement.remove();
//   }

//   if (CITIES.includes(evt.target.value)) {
//     const eventFormElement = document.querySelector(`.event--edit`);
//     const descriptionComponent = new DescriptionComponent(getInfo(), PICTURE, getRandomInt(5));
//     render(eventFormElement, descriptionComponent.getElement(), RenderPosition.BEFOREEND);
//   }
// };

// const addNewEventHandler = () => {
//   closeIfExistEditFormElement();

//   const sortingFormElement = document.querySelector(`.trip-sort`);
//   const eventEditFormComponent = new EventEditFormComponent(`create`, undefined);
//   render(sortingFormElement, eventEditFormComponent, `afterend`);
//   document.addEventListener(`keydown`, closeFormOnEscHandler);

//   addEventListenerBySelector(`.event--edit`, saveEventHandler, `submit`);
//   addEventListenerBySelector(`.event__reset-btn`, closeFormHandler);
//   addEventListenerBySelector(`.event__type-list`, changeTypeIconHandler);
//   addEventListenerBySelector(`.event__input--destination`, getInfoHandler, `change`);
//   //  reset filters - everything
//   //  reset sorting - default
//   newEventButtonElement.removeEventListener(`click`, addNewEventHandler);
//   newEventButtonElement.disabled = `true`;
// };

// const addFirstEventHandler = () => {
//   const firstEventEditFormComponent = new EventEditFormComponent(`first`);
//   render(tripEventsElement, firstEventEditFormComponent, RenderPosition.AFTERBEGIN);
//   newEventButtonElement.disabled = true;
//   addEventListenerBySelector(`.event--edit`, saveEventHandler, `submit`);
//   addEventListenerBySelector(`.event__reset-btn`, closeFormHandler);
// };

// const findDataObjectFromListItem = (listItem) => {
//   const formData = {
//     type: listItem.querySelector(`.event__type`).id,
//     place: listItem.querySelector(`.event__title`).id,
//     price: listItem.querySelector(`.event__price-value`).textContent,
//   };
//   return findEventObject(formData, events);
// };

// const formHandlers = {
//   create: (formElement) => {
//     formElement.remove();
//     newEventButtonElement.disabled = false;
//     newEventButtonElement.addEventListener(`click`, addNewEventHandler);
//     document.removeEventListener(`keydown`, closeFormOnEscHandler);
//   },
//   edit: () => {
//     // closeEditFormHandler();
//   }
// };

// const closeIfExistEditFormElement = () => {
//   const formElement = document.querySelector(`.event--edit`);
//   if (!formElement) {
//     return;
//   }

//   const handler = formHandlers[formElement.id];
//   if (typeof handler === `function`) {
//     handler(formElement);
//   }
// };
// const openEditFormHandler = (evt) => {

//   const saveEditedEventHandler = (event) => {
//     event.preventDefault();
//     const {formData, newEventObject} = createDataObject(event.target);
//     getOffersArray(formData, newEventObject);
//     const {index} = findEventObject(compareEventObject.object, events);
//     events.splice(index, 1, newEventObject);
//     renderTripEvents([newEventObject]);
//     deleteEditEventHandler();
//   };

//   const deleteEditEventHandler = () => {
//     remove(eventEditFormComponent);
//   };

//   const closeEditFormHandler = () => {
//     replace(listItemEventElement, eventEditFormComponent);
//   };

//   // closeIfExistEditFormElement();

//   const listItemEventElement = evt.target.closest(`li`);
//   listItemEventElement.id = `edit`;
//   const {foundedEvent, index} = findDataObjectFromListItem(listItemEventElement);
//   compareEventObject = {
//     object: foundedEvent,
//     index
//   };

//   const eventEditFormComponent = new EventEditFormComponent(`edit`, foundedEvent);

//   addEventListenerBySelector(`form`, saveEditedEventHandler, `submit`, eventEditFormComponent.getElement());
//   addEventListenerBySelector(`.event__reset-btn`, deleteEditEventHandler, `click`, eventEditFormComponent.getElement());
//   addEventListenerBySelector(`.event__rollup-btn`, closeEditFormHandler, `click`, eventEditFormComponent.getElement());
//   addEventListenerBySelector(`.event__type-list`, changeTypeIconHandler, `click`, eventEditFormComponent.getElement());

//   replace(eventEditFormComponent, listItemEventElement);
// };

// const headerMainElement = document.querySelector(`.trip-main`);
// const tripControlsElement = headerMainElement.querySelector(`.trip-controls`);
// const menuHeaderElement = tripControlsElement.querySelector(`h2`);
// const tripEventsElement = document.querySelector(`.trip-events`);
// const newEventButtonElement = headerMainElement.querySelector(`.btn`);

// render(headerMainElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
// render(menuHeaderElement.nextSibling, menuComponent, `afterend`);
// render(tripControlsElement, filterComponent, RenderPosition.BEFOREEND);


//   const sortComponent = new SortComponent();
//   const daysListComponent = new DaysListComponent();

//   newEventButtonElement.addEventListener(`click`, addNewEventHandler);

const daysListComponent = new DaysListComponent();
const tripController = new TripController(daysListComponent);
tripController.render(events);

