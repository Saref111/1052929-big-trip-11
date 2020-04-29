import NoEventsComponent from "../components/no-events.js";
import TripInfoComponent from "../components/trip-info.js";
import MenuComponent from "../components/menu.js";
import FilterComponent from "../components/filter.js";
import EventComponent from "../components/event.js";
import SortComponent, {SortType} from "../components/sort.js";
import DayComponent from "../components/day.js";
import EventEditComponent from "../components/event-edit-form.js";
import {render, replace, RenderPosition, remove} from "../utils/render.js";
import {stringifyDate} from "../utils/util.js";

const getEventDuration = (start, end) => end - start;

const getSortedEvents = (events, sortType) => {
  const currentEvents = events.slice();
  let sortedEvents = [];

  switch (sortType) {
    case SortType.PRICE:
      sortedEvents = currentEvents.sort((a, b) => b.price - a.price);
      break;
    case SortType.TIME:
      sortedEvents = currentEvents.sort((a, b) => getEventDuration(b.startTime, b.endTime) - getEventDuration(a.startTime, a.endTime));
      break;
    case SortType.DEFAULT:
      sortedEvents = currentEvents;
      break;
  }

  return sortedEvents;
};

const createDayComponents = (events, isSorting) => {
  if (isSorting) {
    return [new DayComponent(new Date(), true)];
  }

  let uniqueDates = [];
  events.forEach((event) => {
    if (uniqueDates.every((it) => stringifyDate(event.startTime) !== stringifyDate(it.startTime))) {
      uniqueDates.push(event);
    }
  });

  return uniqueDates.map((event) => new DayComponent(event));
};

const renderTripEvents = (arr, container, isSorting = false) => {
  const dayComponentsArray = createDayComponents(arr, isSorting);

  arr.forEach((event) => {
    const eventComponent = new EventComponent(event);
    const eventEditComponent = new EventEditComponent(`edit`, event);
    const dayComponent = isSorting ? dayComponentsArray[0] : dayComponentsArray.find((day) => stringifyDate(day.date.startTime) === stringifyDate(event.startTime));

    const eventToEditHandler = () => {
      replace(eventEditComponent, eventComponent);
    };

    const editToEventHandler = () => {
      replace(eventComponent, eventEditComponent);
    };

    const deleteEventHandler = () => {
      remove(eventComponent);
      remove(eventEditComponent);

      if (dayComponent.getElement().querySelector(`ul`).children.length === 0) {
        remove(dayComponent);
      }
    };

    eventComponent.setOpenEditHandler(eventToEditHandler);
    eventEditComponent.setEditFormHandlers(
        editToEventHandler,
        (evt) => {
          evt.preventDefault();
          editToEventHandler();
        },
        deleteEventHandler
    );

    render(dayComponent.getElement().querySelector(`ul`), eventComponent, RenderPosition.BEFOREEND);
    render(container, dayComponent, RenderPosition.BEFOREEND);
  });
};

export default class TripController {
  constructor(containerComponent) {
    this._container = containerComponent;

    this._noEventsComponent = new NoEventsComponent();
    this._tripInfoComponent = new TripInfoComponent();
    this._menuComponent = new MenuComponent();
    this._filterComponent = new FilterComponent();
    this._sortComponent = new SortComponent();
  }

  render(events) {
    const containerElement = this._container.getElement();

    if (!events) {
      render(containerElement, this._noEventsComponent, RenderPosition.BEFOREEND);
      return;
    }

    const headerMainElement = document.querySelector(`.trip-main`);
    const tripControlsElement = headerMainElement.querySelector(`.trip-controls`);
    const menuHeaderElement = tripControlsElement.querySelector(`h2`);
    const tripEventsElement = document.querySelector(`.trip-events`);

    this._sortComponent.setSortTypeChangeHandler((currentSortType) => {
      const sortedEvents = getSortedEvents(events, currentSortType);

      containerElement.innerHTML = ``;

      renderTripEvents(sortedEvents, containerElement, currentSortType === SortType.DEFAULT ? false : true);
    });

    render(headerMainElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(menuHeaderElement.nextSibling, this._menuComponent, `afterend`);
    render(tripControlsElement, this._filterComponent, RenderPosition.BEFOREEND);
    render(tripEventsElement, this._sortComponent, RenderPosition.BEFOREEND);
    render(tripEventsElement, this._container, RenderPosition.BEFOREEND);
    renderTripEvents(events, containerElement);
  }
}
