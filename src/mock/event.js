import {TYPES, CITIES, getOffers} from "../const.js";
import {getRandomArrayElement, getRandomInt, getRandomDate} from "../utils/util.js";

export const getEventObjects = (count) => {
  const arr = [];

  for (let i = 0; i < count; i++) {
    let object = {};

    object.type = getRandomArrayElement(TYPES);
    object.place = getRandomArrayElement(CITIES);
    object.offers = getOffers();
    object.startTime = getRandomDate();
    object.endTime = getRandomDate();
    object.price = getRandomInt(200) + object.offers.filter((offer) => offer.active).reduce((total, current) => {
      return total + current.price;
    }, 0);

    while(object.startTime >= object.endTime) {
      object.endTime = getRandomDate();
    }

    arr.push(object);
  }

  return arr;
};
