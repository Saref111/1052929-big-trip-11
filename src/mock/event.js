import {TYPES, CITIES, getOffers} from "../const.js";
import {getRandomArrayElement, getRandomInt, getRandomDate} from "../utils/util.js";

export const getEventObjects = (count) => {
  const arr = [];

  for (let i = 0; i < count; i++) {
    let object = {};

    object.id = getRandomInt(1000);
    object.type = getRandomArrayElement(TYPES);
    object.place = getRandomArrayElement(CITIES);
    object.offers = getOffers();
    object.startTime = getRandomDate();
    object.endTime = getRandomDate();
    object.isFavorite = false; // Math.random() > 0.5;
    object.price = getRandomInt(200);

    while (object.startTime >= object.endTime) {
      object.endTime = getRandomDate();
    }

    arr.push(object);
  }

  return arr;
};
