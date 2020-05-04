import NoEventsComponent from "../components/no-events.js";
import TripInfoComponent from "../components/trip-info.js";
import MenuComponent from "../components/menu.js";
import FilterComponent from "../components/filter.js";
import SortComponent, {SortType} from "../components/sort.js";
import PointController from "./point-controller.js";
import DayComponent from "../components/day.js";
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

const renderTripEvents = (events, container, isSorting = false) => {
  let arr = events.slice();
  const dayComponentsArray = createDayComponents(arr, isSorting);

  if (!isSorting) {
    arr = arr.sort((a, b) => a.startTime - b.startTime);
  }

  const pointController = new PointController(container);

  arr.forEach((event) => {
    pointController.render(event, dayComponentsArray, isSorting);
  });

  dayComponentsArray.sort((a, b) => a.date.startTime - b.date.startTime).forEach((dayComponent) => render(container, dayComponent, RenderPosition.BEFOREEND));
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
