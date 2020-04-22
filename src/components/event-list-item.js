import {createElement} from "../util.js";

const createListItemForFormElement = () => {
  return (
    `<li class="trip-events__item"></li>`
  );
};

export default class EventListItem {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createListItemForFormElement();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
