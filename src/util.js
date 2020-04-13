const getRandomInt = (max) => Math.floor(Math.random() * max);
const getRandomArrayElement = (arr) => arr[getRandomInt(arr.length)];
const addHandlerBySelector = (selector, handler, type = `click`) => {
  const element = document.querySelector(selector);
  element.addEventListener(type, handler);
};
const removeHandlerBySelector = (selector, handler, type = `click`) => {
  const element = document.querySelector(selector);
  element.removeEventListener(type, handler);
};

export {getRandomArrayElement, getRandomInt, addHandlerBySelector, removeHandlerBySelector};
