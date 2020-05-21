import NoEventsComponent from "../components/no-events.js";
import TripInfoComponent from "../components/trip-info.js";
import MenuComponent from "../components/menu.js";
import SortComponent, {SortType} from "../components/sort.js";
import PointController from "./point.js";
import DayComponent from "../components/day.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {stringifyDate} from "../utils/util.js";
import {EditFormMode, DefaultEvent} from "../const.js";
import NewButtonComponent from "../components/new-event-button.js";

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

  const uniqueDates = [];
  events.forEach((event) => {
    if (uniqueDates.every((it) => stringifyDate(event.startTime) !== stringifyDate(it.startTime))) {
      uniqueDates.push(event);
    }
  });

  return uniqueDates.map((event) => new DayComponent(event));
};

const sortDaysAndEventsByDefault = (days, container) => {
  days.sort((a, b) => a.date.startTime - b.date.startTime)
  .forEach((dayComponent) => render(container, dayComponent, RenderPosition.BEFOREEND));
};

export default class TripController {
  constructor(containerComponent, eventsModel) {
    this._container = containerComponent;

    this._controllers = [];
    this._model = eventsModel;
    this._newButtonComponent = new NewButtonComponent();
    this._noEventsComponent = new NoEventsComponent();
    this._tripInfoComponent = new TripInfoComponent();
    this._menuComponent = new MenuComponent();
    this._sortComponent = new SortComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._model.setFilterChangeHandler(this._onFilterChange);
  }

  _onDataChange(pointController, oldData, newData) {
    if (!newData) {
      pointController.destroy();
      this._model.removeEvent(oldData.id);
      this._updateEvents();
      return;
    } else if (!oldData) {
      this._model.addEvent(newData);
      this._updateEvents();
      return;
    } else {
      const isSuccess = this._model.updateEvent(oldData.id, newData);

      if (isSuccess) {
        pointController.render(newData);
      }
    }
  }

  _onSortTypeChange(currentSortType) {
    const sortedEvents = getSortedEvents(this._model.getEvents(), currentSortType);

    this._container.getElement().innerHTML = ``;
    this._controllers = this._renderTripEvents(
        sortedEvents,
        this._container.getElement(),
        currentSortType === SortType.DEFAULT ? false : true,
        this._onDataChange, this._onViewChange);
  }

  _onViewChange() {
    this._controllers.forEach((controller) => controller.setDefaultView());
  }

  render() {
    this._events = this._model.getEvents();
    const containerElement = this._container.getElement();

    if (!this._events) {
      render(containerElement, this._noEventsComponent, RenderPosition.BEFOREEND);
      return;
    }

    const headerMainElement = document.querySelector(`.trip-main`);
    const tripControlsElement = headerMainElement.querySelector(`.trip-controls`);
    const menuHeaderElement = tripControlsElement.querySelector(`h2`);
    const tripEventsElement = document.querySelector(`.trip-events`);

    this._newButtonComponent.setButtonHandler(() => {
      const newPointController = new PointController(this._container.getElement(), this._onDataChange, this._onViewChange);

      this._dayComponents.push(new DayComponent(DefaultEvent));
      newPointController.render(DefaultEvent, this._dayComponents, null, EditFormMode.CREATE);
      this._newButtonComponent.disabled();
    });

    render(headerMainElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(headerMainElement, this._newButtonComponent, RenderPosition.BEFOREEND);
    render(menuHeaderElement.nextSibling, this._menuComponent, `afterend`);
    render(tripEventsElement, this._sortComponent, RenderPosition.BEFOREEND);
    render(tripEventsElement, this._container, RenderPosition.BEFOREEND);

    this._renderEvents(this._events);
  }

  _renderEvents(events) {
    const containerElement = this._container.getElement();
    this._controllers = this._renderTripEvents(events, containerElement, false, this._onDataChange, this._onViewChange);
  }

  _removeEvents() {
    this._controllers.forEach((it) => it.destroy());
    this._controllers = [];
    this._container.getElement().innerHTML = ``;
  }

  _updateEvents() {
    this._removeEvents();
    this._renderEvents(this._model.getEvents().slice());
  }

  _onFilterChange() {
    this._updateEvents();
  }

  _renderTripEvents(events, container, isSorting = false, onDataChange, onViewChange) {
    let eventsCopy = events.slice();

    this._dayComponents = createDayComponents(eventsCopy, isSorting);

    if (!isSorting) {
      eventsCopy = eventsCopy.sort((a, b) => a.startTime - b.startTime);
    }

    const controllers = eventsCopy.map((event) => {
      const pointController = new PointController(container, onDataChange, onViewChange);

      pointController.render(event, this._dayComponents, isSorting, EditFormMode.EDIT);

      return pointController;
    });

    sortDaysAndEventsByDefault(this._dayComponents, container);

    return controllers;
  }
}
