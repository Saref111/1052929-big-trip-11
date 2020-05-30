import NoEventsComponent from "../components/no-events.js";
import TripInfoComponent from "../components/trip-info.js";

import SortComponent, {SortType} from "../components/sort.js";
import PointController from "./point.js";
import DayComponent from "../components/day.js";
import {render, RenderPosition} from "../utils/render.js";
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
  constructor(containerComponent, eventsModel, api) {
    this._container = containerComponent;
    this._api = api;

    this._controllers = [];
    this._eventsModel = eventsModel;
    this._destinationsModel = null;
    this._offersModel = null;
    this._newButtonComponent = new NewButtonComponent();
    this._noEventsComponent = new NoEventsComponent();
    this._tripInfoComponent = new TripInfoComponent();
    this._sortComponent = new SortComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._eventsModel.setFilterChangeHandler(this._onFilterChange);
  }

  _onDataChange(pointController, oldData, newData) {

    if (!newData) {
      this._api.deleteEvent(String(oldData.id))
        .then(() => {
          pointController.destroy();
          this._eventsModel.removeEvent(oldData.id);
          this._updateEvents();
        })
        .catch(() => {
          pointController.shake();
        });
      return;
    } else if (!oldData) {
      this._api.createEvent(newData)
        .then((pointModel) => {
          this._eventsModel.addEvent(pointModel);
          this._updateEvents();
          this._newButtonComponent.enabled();
        })
        .catch(() => {
          pointController.shake();
        });
      return;
    } else {
      this._api.updateEvent(oldData.id, newData)
        .then((event) => {
          const isSuccess = this._eventsModel.updateEvent(oldData.id, event);

          if (isSuccess) {
            pointController.render(event, null, null, EditFormMode.EDIT);
          }
        })
        .catch(() => {
          pointController.shake();
        });
    }
  }

  _onSortTypeChange(currentSortType) {
    const sortedEvents = getSortedEvents(this._eventsModel.getEvents(), currentSortType);

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
    this._events = this._eventsModel.getEvents();
    const containerElement = this._container.getElement();

    const headerMainElement = document.querySelector(`.trip-main`);
    const tripEventsElement = document.querySelector(`.trip-events`);

    this._newButtonComponent.setButtonHandler(() => {
      const newPointController = new PointController(this._container.getElement(), this._onDataChange, this._onViewChange, this._destinationsModel, this._offersModel);
      this._dayComponents.push(new DayComponent(DefaultEvent));

      newPointController.setEnableNewButtonHandler(this._newButtonComponent.enabled);
      newPointController.render(DefaultEvent, this._dayComponents, null, EditFormMode.CREATE);
      this._newButtonComponent.disabled();

      this._controllers.push(newPointController);
    });

    render(headerMainElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(headerMainElement, this._newButtonComponent, RenderPosition.BEFOREEND);

    render(tripEventsElement, this._sortComponent, RenderPosition.BEFOREEND);
    render(tripEventsElement, this._container, RenderPosition.BEFOREEND);

    if (!this._events || this._events.length === 0) {
      render(containerElement, this._noEventsComponent, RenderPosition.BEFOREEND);
      return;
    }

    this._renderEvents(this._events);
  }

  getSortComponent() {
    return this._sortComponent;
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
    this._renderEvents(this._eventsModel.getEvents().slice());
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
      const pointController = new PointController(container, onDataChange, onViewChange, this._destinationsModel, this._offersModel);

      pointController.render(event, this._dayComponents, isSorting, EditFormMode.EDIT);

      return pointController;
    });

    sortDaysAndEventsByDefault(this._dayComponents, container);

    return controllers;
  }

  setDestinationsModel(d) {
    this._destinationsModel = d;
  }

  setOffersModel(o) {
    this._offersModel = o;
  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

}
