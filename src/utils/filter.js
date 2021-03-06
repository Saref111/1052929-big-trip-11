import {FilterType} from "../const.js";

export const getEventsByFilter = (events, filterType) => {
  switch (filterType) {
    case FilterType.PAST:
      return events.slice().filter((event) => event.startTime < new Date());
    case FilterType.FUTURE:
      return events.slice().filter((event) => event.startTime > new Date());
    default:
      return events;
  }
};
