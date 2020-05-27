import EventEditComponent from "../components/event-edit-form.js";
import EventComponent from "../components/event.js";
import PointModel from "../models/point.js";
import {render, replace, RenderPosition, remove} from "../utils/render.js";
import {stringifyDate} from "../utils/util.js";
import {EditFormMode} from "../const.js";

const getDestination = (place, model) => {
  debugger
  const {name, description, pictures} = model.getInfo(place);
  const reply = {"name": name, "description": description, "pictures": pictures}
  return reply;
};

const getOffersArray = (formData, totalOffers) => {
  const offersNames = Array.from(formData.keys()).filter((it) => it.startsWith(`event-offer-`));

  return offersNames.map((name) => {
    const offerName = name.slice(12).split(`-`).join(` `); // 12 is length of `event-offer-`
    const title = `${offerName[0].toUpperCase()}${offerName.slice(1, offerName.length)}`;
    const templateOffer = totalOffers.find((it) => it.title === title);
    return templateOffer;
  });
};

const parseFormData = (formData, id, currentOffers, destinationModel) => {
  return new PointModel({
    "id": id,
    "type": formData.get(`event-type`),
    "destination": getDestination(formData.get(`event-destination`), destinationModel),
    "base_price": Number(formData.get(`event-price`)),
    "offers": getOffersArray(formData, currentOffers),
    "date_from": new Date(formData.get(`event-start-time`)),
    "date_to": new Date(formData.get(`event-end-time`)),
    "is_favorite": Boolean(formData.get(`event-isFavorite`)),
  });
};

export default class PointController {
  constructor(containerElement, onDataChange, onViewChange, destinationsModel, offersModel) {
    this._container = containerElement;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;

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

    const {offers} = this._offersModel.getOffersByType(event.type);

    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(this._mode, event, this._destinationsModel, offers);
    this._dayComponent = isSorting ? this._dayComponents[0] : this._dayComponents.find((day) => stringifyDate(day.date.startTime) === stringifyDate(event.startTime));

    switch (this._mode) {
      case EditFormMode.CREATE:
        this._onViewChange();

        this._eventEditComponent.setSubmitHandler((evt) => {
          evt.preventDefault();
          const data = this._eventEditComponent.getData();
          this._onDataChange(this, null, data);
          remove(this._eventEditComponent);
        });

        this._eventEditComponent.setDeleteHandler(() => {
          this._onViewChange();
          this.destroy();
        });

        render(this._dayComponent.getElement().parentElement, this._eventEditComponent);
        document.addEventListener(`keydown`, this._onEscHandler);
        break;

      case EditFormMode.EDIT:
        this._eventComponent.setOpenEditHandler(() => {
          this._eventToEditHandler();
          document.addEventListener(`keydown`, this._onEscHandler);
        });

        this._eventEditComponent.setEditFormHandlers(
            this._editToEventHandler,
            (evt) => {
              evt.preventDefault();
              const formData = this._eventEditComponent.getData();
              const data = parseFormData(formData, event.id, offers, this._destinationsModel);
              this._onDataChange(this, event, data);
            },
            () => {
              this._onDataChange(this, event, null);
            },
            () => {
              const newEvent = PointModel.clone(event);
              newEvent.isFavorite = !newEvent.isFavorite;

              this._onDataChange(this, event, newEvent);
            },
            () => {
              const data = this._eventEditComponent.getData();
              this._onDataChange(this, event, data);
            }
        );


        if (oldEventEditComponent && oldEventComponent) {
          replace(this._eventComponent, oldEventComponent);
          replace(this._eventEditComponent, oldEventEditComponent);
          this._editToEventHandler();
        } else {
          render(this._dayComponent.getElement().querySelector(`ul`), this._eventComponent, RenderPosition.BEFOREEND);
        }
        break;
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
      if (this._mode === EditFormMode.EDIT) {
        this._editToEventHandler();
      } else {
        document.removeEventListener(`keydown`, this._onEscHandler);
        this.destroy();
      }
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
