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

const capitalize = (string) => `${string[0].toUpperCase()}${string.slice(1)}`;
const getPreposition = (type) => [`sightseeing`, `restaurant`, `check-in`].includes(type) ? ` in ` : ` to `;
const getTitleByType = (type, place) => `${capitalize(type)}${getPreposition(type)}${place}`;

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export {
  getRandomArrayElement,
  getRandomInt,
  addEventListenerBySelector,
  removeEventListenerBySelector,
  findEventObject,
  createElement,
  getTitleByType,
  render,
  RenderPosition,
};
