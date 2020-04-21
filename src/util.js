const getRandomInt = (max) => Math.floor(Math.random() * max);
const getRandomArrayElement = (arr) => arr[getRandomInt(arr.length)];
const findEventObject = (currentEvent, events) => {
  const foundedEvent = events.find((event) => Number(currentEvent.price) === Number(event.price) && String(currentEvent.place) === String(event.place) && String(currentEvent.type) === String(event.type));
  const index = events.indexOf(foundedEvent);
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

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {
  getRandomArrayElement,
  getRandomInt,
  addEventListenerBySelector,
  removeEventListenerBySelector,
  findEventObject,
  createElement,
};
