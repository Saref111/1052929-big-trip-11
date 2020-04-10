import {TYPES, CITIES, getOffers, getInfo, PICTURE} from "../const.js";
import {getRandomArrayElement} from "../util.js";

export const getEventObjects = (count) => {
  const arr = [];

  for (let i = 0; i < count; i++) {
    let object = {};

    object.type = getRandomArrayElement(TYPES);
    object.place = getRandomArrayElement(CITIES);
    object.offers = getOffers();
    object.info = getInfo();
    object.pic = PICTURE;

    arr.push(object);
  }

  return arr;
};
