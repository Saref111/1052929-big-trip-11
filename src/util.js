const getRandomInt = (max) => Math.floor(Math.random() * max);
const getRandomArrayElement = (arr) => arr[getRandomInt(arr.length)];
const findEventObject = (currentEvent, events) => {
  const foundedEvent = events.find((event) => Number(currentEvent.price) === event.price && currentEvent.place === event.place && currentEvent.type === event.type);
  const index = events.indexOf(foundedEvent);
  console.log(index);
  return {foundedEvent, index};
};

const addEventListenerBySelector = (selector, handler, type = `click`, ctx = document) => {
  const elements = ctx.querySelectorAll(selector);
  if (elements) {
    elements.forEach((it) => it.addEventListener(type, handler));
  }
};

const removeEventListenerBySelector = (selector, handler, type = `click`, ctx = document) => {
  const elements = ctx.querySelectorAll(selector);
  if (elements) {
    elements.forEach((it) => it.removeEventListener(type, handler));
  }
};

export {getRandomArrayElement, getRandomInt, addEventListenerBySelector, removeEventListenerBySelector, findEventObject};
