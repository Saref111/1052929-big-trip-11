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

const MONTHS = {
  1: `JAN`,
  2: `FEB`,
  3: `MAR`,
  4: `APR`,
  5: `MAY`,
  6: `JUN`,
  7: `JUL`,
  8: `AUG`,
  9: `SEP`,
  10: `OCT`,
  11: `NOV`,
  12: `DEC`
};

const stringifyDate = (date, sign) => {
  return `${date.getFullYear()}${sign ? sign : `-`}${date.getMonth().length === 1 ? `0${date.getMonth()}` : date.getMonth()}${sign ? sign : `-`}${date.getDate()}`;
};

const stringifyTime = (time) => {
  return `${time.getHours()}:${time.getMinutes()}`;
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
  MONTHS,
};
