const TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
const CITIES = [`Amsterdam`, `Chamonix`, `Geneva`, `Saint Petersburg`, `Kiev`, `Prague`, `New York`, `Beijing`, `Hongkong`, `Dubai`];

const FilterType = {
  EVERYTHING: `everything`,
  PAST: `past`,
  FUTURE: `future`,
};

const EditFormMode = {
  EDIT: `edit`,
  FIRST: `first`,
  CREATE: `create`,
};

const DefaultEvent = {
  id: 111,
  type: TYPES[0],
  place: CITIES[0],
  offers: [
  ],
  length: 6,
  startTime: new Date(),
  endTime: new Date(),
  isFavorite: false,
  price: 150,
};

const SHAKE_ANIMATION_TIMEOUT = 600;

export {TYPES, CITIES, FilterType, EditFormMode, DefaultEvent, SHAKE_ANIMATION_TIMEOUT};
