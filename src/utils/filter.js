import {FilterType} from "../const.js";

export const getEventsByFilter = (events, filterType) => {
  switch (filterType) {
    case filterType === FilterType.PAST:
      return events.slice().filter((event) => event.starTime < new Date());
    case filterType === FilterType.FUTURE:
      return events.slice().filter((event) => event.starTime > new Date());
    default:
      return events;
  }
};
