import EventEditComponent from "../components/event-edit-form.js";
import EventComponent from "../components/event.js";
import {render, replace, RenderPosition, remove} from "../utils/render.js";
import {stringifyDate} from "../utils/util.js";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(containerElement, onDataChange, onViewChange) {
    this._container = containerElement;
    this._dayComponents = null;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._onViewChange = onViewChange;
    this._onDataChange = onDataChange;
    this._onEscHandler = this._onEscHandler.bind(this);
    this._eventToEditHandler = this._eventToEditHandler.bind(this);
    this._eventToEditHandler = this._eventToEditHandler.bind(this);
    this._editToEventHandler = this._editToEventHandler.bind(this);
    this._deleteEventHandler = this._deleteEventHandler.bind(this);
  }

  render(event, dayComponentsArray, isSorting) {
    if (dayComponentsArray) {
      this._dayComponents = dayComponentsArray;
    }

    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(`edit`, event);
    this._dayComponent = isSorting ? this._dayComponents[0] : this._dayComponents.find((day) => stringifyDate(day.date.startTime) === stringifyDate(event.startTime));

    this._eventComponent.setOpenEditHandler(() => {
      this._eventToEditHandler();
      document.addEventListener(`keydown`, this._onEscHandler);
    });

    this._eventEditComponent.setEditFormHandlers(
        this._editToEventHandler,
        (evt) => {
          evt.preventDefault();
          this._editToEventHandler();
        },
        this._deleteEventHandler,
        () => {
          this._onDataChange(this, event, Object.assign({}, event, {isFavorite: !event.isFavorite}));
        }
    );

    if (oldEventEditComponent && oldEventComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventEditComponent, oldEventEditComponent);
    } else {
      render(this._dayComponent.getElement().querySelector(`ul`), this._eventComponent, RenderPosition.BEFOREEND);
    }
  }

  _eventToEditHandler() {
    this._onViewChange();
    replace(this._eventEditComponent, this._eventComponent);
    this._mode = Mode.EDIT;
  }

  _editToEventHandler() {
    document.addEventListener(`keydown`, this._onEscHandler);
    // this._eventEditComponent.rerender();  зачем нам тут ререндер? Он был в примере, а код пока работает и без него
    replace(this._eventComponent, this._eventEditComponent);
    this._mode = Mode.DEFAULT;
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
    if (this._mode === Mode.EDIT) {
      this._editToEventHandler();
    }
  }
}