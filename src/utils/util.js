import moment from "moment";

const getRandomInt = (max) => Math.floor(Math.random() * max);
const getRandomArrayElement = (arr) => arr[getRandomInt(arr.length)];
const findEventObject = (currentEvent, events) => {
  const foundedEvent = events.find((event) => Number(currentEvent.price) === Number(event.price) && String(currentEvent.place) === String(event.place) && String(currentEvent.type) === String(event.type));
  const index = events.indexOf(foundedEvent);
  return {foundedEvent, index};
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;

  const diffValue = sign * getRandomInt(8);

  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(targetDate.getHours() + diffValue);
  targetDate.setMinutes(targetDate.getMinutes() + (getRandomInt(10)));

  return targetDate;
};

const addEventListenerBySelector = (selector, handler, type = `click`, ctx = document) => {
  const elements = ctx.querySelectorAll(selector);
  if (elements) {
    elements.forEach((it) => it.addEventListener(type, handler));
  }
};

const capitalize = (string) => `${string[0].toUpperCase()}${string.slice(1)}`;
const getPreposition = (type) => [`sightseeing`, `restaurant`, `check-in`].includes(type) ? ` in ` : ` to `;
const getTitleByType = (type, place) => `${capitalize(type)}${getPreposition(type)}${place}`;
const getTitleByTypeInEditForm = (type) => `${capitalize(type)}${getPreposition(type)}`;

const stringifyDate = (date, sign) => {
  return moment(date).format(`YYYY${sign ? sign : `-`}MMMM${sign ? sign : `-`}DD`);
};

const stringifyTime = (time) => {
  return moment(time).format(`hh:mm`);
};

const getDuration = (ms) => {
  return moment.duration(ms, `milliseconds`).humanize();
};

export {
  getRandomArrayElement,
  getRandomInt,
  addEventListenerBySelector,
  findEventObject,
  getTitleByType,
  getRandomDate,
  stringifyDate,
  stringifyTime,
  getDuration,
  getTitleByTypeInEditForm,
};
