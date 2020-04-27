import AbstractComponent from "./abstract-component.js";
import {MONTHS, stringifyDate} from "../utils/util.js";

const createDayElement = (date) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${date.getDate()}</span>
        <time class="day__date"
        datetime="${stringifyDate(date)}">
        ${MONTHS[date.getMonth()]} ${date.getYear()}</time>
      </div>

      <ul class="trip-events__list">

      </ul>
    </li>`
  );
};

export default class Day extends AbstractComponent { // DATE
  constructor(date) {
    super();

    this._date = date;
  }
  getTemplate() {
    return createDayElement(this._date.startTime);
  }

  set date(date) {
    this._date = date;
  }

  get date() {
    return this._date;
  }
}
