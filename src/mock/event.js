import {TYPES, CITIES, getOffers} from "../const.js";
import {getRandomArrayElement, getRandomInt, getRandomDate} from "../utils/util.js";

export const getEventObjects = (count) => {
  const events = [];

  for (let i = 0; i < count; i++) {
    const event = {};

    event.id = `${getRandomInt(999999)}`;
    event.type = getRandomArrayElement(TYPES);
    event.place = getRandomArrayElement(CITIES);
    event.offers = getOffers();
    event.startTime = getRandomDate();
    event.endTime = getRandomDate();
    event.isFavorite = false; // Math.random() > 0.5;
    event.price = getRandomInt(200);

    while (event.startTime >= event.endTime) {
      event.endTime = getRandomDate();
    }

    events.push(event);
  }

  return events;
};
