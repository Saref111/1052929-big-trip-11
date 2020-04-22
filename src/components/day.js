import {createElement} from "../util.js";

const createDayElement = () => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">1</span>
        <time class="day__date" datetime="2019-03-18">MAR 18</time>
      </div>

      <ul class="trip-events__list">

      </ul>
    </li>`
  );
};

export default class Day {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDayElement();
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
