import AbstractComponent from "./abstract-component.js";
import {stringifyDate} from "../utils/util.js";

const moment = require(`moment`);

const createDayElement = (date, isSorting) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        ${isSorting ? `` : `<span class="day__counter">${date.getDate()}</span>
        <time class="day__date"
        datetime="${stringifyDate(date)}">
        ${moment(date).format(`MMMM`)} ${moment(date).format(`YY`)}</time>`}
      </div>

      <ul class="trip-events__list">

      </ul>
    </li>`
  );
};

export default class Day extends AbstractComponent {
  constructor(date, isSorting) {
    super();

    this._isSorting = isSorting ? isSorting : false;
    this._date = date;
  }
  getTemplate() {
    return createDayElement(this._date.startTime, this._isSorting);
  }

  set date(date) {
    this._date = date;
  }

  get date() {
    return this._date;
  }
}
