import {createElement} from "../util.js";

const createDaysListElement = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class DaysList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDaysListElement();
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
