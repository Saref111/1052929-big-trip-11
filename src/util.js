const getRandomInt = (max) => Math.floor(Math.random() * max);
const getRandomArrayElement = (arr) => arr[getRandomInt(arr.length)];

export {getRandomArrayElement, getRandomInt};
