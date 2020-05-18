import EventEditComponent from "../components/event-edit-form.js";
import EventComponent from "../components/event.js";
import {render, replace, RenderPosition, remove} from "../utils/render.js";
import {stringifyDate} from "../utils/util.js";
import {EditFormMode} from "../const.js";

export default class PointController {
  constructor(containerElement, onDataChange, onViewChange) {
    this._container = containerElement;
    this._dayComponents = null;
    this._dayComponent = null;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = EditFormMode.EDIT;

    this._onViewChange = onViewChange;
    this._onDataChange = onDataChange;
    this._onEscHandler = this._onEscHandler.bind(this);
    this._eventToEditHandler = this._eventToEditHandler.bind(this);
    this._eventToEditHandler = this._eventToEditHandler.bind(this);
    this._editToEventHandler = this._editToEventHandler.bind(this);
    this._deleteEventHandler = this._deleteEventHandler.bind(this);
  }

  render(event, dayComponents, isSorting, mode) {
    if (dayComponents) {
      this._dayComponents = dayComponents;
    }

    this._mode = mode;

    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(this._mode, event);
    this._dayComponent = isSorting ? this._dayComponents[0] : this._dayComponents.find((day) => stringifyDate(day.date.startTime) === stringifyDate(event.startTime));

    this._eventComponent.setOpenEditHandler(() => {
      this._eventToEditHandler();
      document.addEventListener(`keydown`, this._onEscHandler);
    });

    this._eventEditComponent.setEditFormHandlers(
        this._editToEventHandler,
        (evt) => {
          evt.preventDefault();
          const data = this._eventEditComponent.getData();
          this._onDataChange(this, event, data);
        },
        () => {
          this._onDataChange(this, event, null);
        },
        () => {
          this._onDataChange(this, event, Object.assign({}, event, {isFavorite: !event.isFavorite}));
        }
    );

    if (oldEventEditComponent && oldEventComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventEditComponent, oldEventEditComponent);
      this._editToEventHandler();
    } else {
      render(this._dayComponent.getElement().querySelector(`ul`), this._eventComponent, RenderPosition.BEFOREEND);
    }
  }

  _eventToEditHandler() {
    this._onViewChange();
    replace(this._eventEditComponent, this._eventComponent);
    this._mode = EditFormMode.EDIT;
  }

  _editToEventHandler() {
    document.removeEventListener(`keydown`, this._onEscHandler);
    this._eventEditComponent.rerender();

    if (document.contains(this._eventEditComponent.getElement())) {
      replace(this._eventComponent, this._eventEditComponent);
    }
  }

  _deleteEventHandler() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);

    if (this._dayComponent.getElement().querySelector(`ul`).children.length === 0) {
      remove(this._dayComponent);
    }
  }

  _onEscHandler(evt) {
    if (evt.keyCode === 27) {
      this._editToEventHandler();
    }
  }

  setDefaultView() {
    if (this._mode === EditFormMode.EDIT) {
      this._editToEventHandler();
    }
  }

  destroy() {
    remove(this._eventEditComponent);
    remove(this._eventComponent);
    document.removeEventListener(`keydown`, this._onEscHandler);
  }
}
