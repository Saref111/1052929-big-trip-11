
import EventEditComponent from "../components/event-edit-form.js";
import EventComponent from "../components/event.js";
import {render, replace, RenderPosition, remove} from "../utils/render.js";
import {stringifyDate} from "../utils/util.js";

export default class PointController {
  constructor(containerElement) {
    this._container = containerElement;

    this._eventComponent = null;
    this._eventEditComponent = null;
  }

  render(event, dayComponentsArray, isSorting) {
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
  }
}
